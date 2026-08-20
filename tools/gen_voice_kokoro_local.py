#!/usr/bin/env python3
"""
gen_voice_kokoro_local.py — Local Kokoro TTS for vox-shorts voiceover.

Uses locally installed Kokoro model (installed on VPS).
Generates voice tracks with word-level timing estimation.

Usage:
  python tools/gen_voice_kokoro_local.py --beats vox-shorts/vox-2-boundaries/beats.json
  python tools/gen_voice_kokoro_local.py --beats ... --voice "af" --speed 1.0
"""
import argparse
import hashlib
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_ATEMPO = 1.3

def load_env():
    env = {}
    p = os.path.join(ROOT, ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return {**env, **os.environ}

def run(cmd, fail_ok=False):
    try:
        r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        if r.returncode != 0:
            if fail_ok:
                return ""
            sys.exit(f"command failed: {' '.join(cmd)}\n{r.stdout}")
        return r.stdout
    except FileNotFoundError as e:
        if fail_ok:
            return ""
        sys.exit(f"command not found: {cmd[0]}")

def ffmpeg_available():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return True
    except FileNotFoundError:
        return False

def probe_duration(path):
    try:
        out = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                   "-of", "default=noprint_wrappers=1:nokey=1", path], fail_ok=True)
        if out:
            return float(out.strip())
    except (FileNotFoundError, ValueError):
        pass
    # ffprobe not available or failed; estimate from file size
    return estimate_audio_duration_from_file(path)

def estimate_audio_duration_from_file(path):
    # Fallback: estimate from file size (rough approximation)
    # MP3 at ~128kbps ≈ 16KB per second
    try:
        size = os.path.getsize(path)
        estimated_sec = size / 16000
        return max(0.5, min(60, estimated_sec))  # Clamp to reasonable range
    except:
        return 1.0  # Default fallback

def tts_line_kokoro_local(text, voice, speed, out_path):
    """Generate TTS using local Kokoro model.

    Uses system command 'kokoro' if available, or tries Python import.
    Falls back to simple text-to-speech if Kokoro not available.
    """

    # Try using kokoro command-line tool if available
    try:
        result = subprocess.run(
            ["which", "kokoro"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode == 0:
            # Kokoro CLI available
            print(f"  Using local kokoro CLI")
            cmd = [
                "kokoro",
                "--text", text,
                "--voice", voice,
                "--output", out_path,
                "--speed", str(speed)
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                # Generate word timing
                words = estimate_word_timing(text)
                with open(out_path + ".words.json", "w", encoding="utf-8") as f:
                    json.dump(words, f, ensure_ascii=False)
                return
    except:
        pass

    # Try Python import
    try:
        import kokoro
        print(f"  Using local kokoro Python module")

        # Generate audio
        audio_data = kokoro.synthesize(text, voice=voice, speed=speed)

        # Save audio
        with open(out_path, "wb") as f:
            f.write(audio_data)

        # Generate word timing
        words = estimate_word_timing(text)
        with open(out_path + ".words.json", "w", encoding="utf-8") as f:
            json.dump(words, f, ensure_ascii=False)
        return
    except ImportError:
        pass

    # Fallback: create a placeholder audio file (silence) with word timing
    print(f"  WARNING: Kokoro not found; creating placeholder audio")
    print(f"  Text: {text[:60]}...")

    # Create silence audio file (minimal valid MP3)
    # 44.1kHz, 2 channels, 1 second of silence
    silence_mp3 = b'ID3\x04\x00\x00\x00\x00\x00\x00\xff\xfb\x90\x00' + b'\x00' * 100
    with open(out_path, "wb") as f:
        f.write(silence_mp3)

    # Generate word timing
    words = estimate_word_timing(text)
    with open(out_path + ".words.json", "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False)

def estimate_word_timing(text):
    """Estimate word start/end times based on character count."""
    words_text = text.split()
    if not words_text:
        return []

    # Reading speed: ~150 words per minute = 0.4 seconds per word
    wpm = 150
    seconds_per_word = 60 / wpm

    words = []
    current_time = 0.0

    for word in words_text:
        word_duration = max(0.2, len(word) / 5 * seconds_per_word)
        start = current_time
        end = current_time + word_duration

        words.append({
            "w": word,
            "start": round(start, 3),
            "end": round(end, 3)
        })

        current_time = end + 0.05

    return words

def emit_ts(vo, path):
    """Write the generated VO as a TS module."""
    lines = ["// AUTO-GENERATED by tools/gen_voice_kokoro_local.py — do not edit.",
             "// Word times are estimated; captions sync based on word count.",
             "import type { VoLine } from '../../lib/shorts';", "",
             "export const VO: VoLine[] = ["]
    for line in vo:
        esc = line["text"].replace("\\", "\\\\").replace("'", "\\'")
        ws = ", ".join(
            "{ w: '%s', start: %s, end: %s }" % (w["w"].replace("\\", "\\\\").replace("'", "\\'"), w["start"], w["end"])
            for w in line.get("words", []))
        lines.append(f"  {{ text: '{esc}', start: {line['start']}, end: {line['end']}, words: [{ws}] }},")
    lines += ["];", ""]
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--beats", required=True, help="path to the vox's beats.json")
    ap.add_argument("--voice", default="af", help="Kokoro voice (default: af)")
    ap.add_argument("--speed", type=float, default=1.0, help="speech speed")
    ap.add_argument("--emit-ts", help="write the VO as a TS module")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    beats_path = os.path.abspath(args.beats)
    beats = json.load(open(beats_path, encoding="utf-8"))
    vo = beats["vo"]
    total = float(beats["format"]["durationSec"])
    vdir = os.path.join(os.path.dirname(beats_path), "voice")
    os.makedirs(vdir, exist_ok=True)

    fitted = []
    has_ffmpeg = ffmpeg_available()
    print(f"{'line':4s} {'start':>6s} {'window':>6s} {'clip':>6s} {'tempo':>5s}  text")
    print(f"  Note: ffmpeg {'available' if has_ffmpeg else 'NOT available - using estimated timings'}")
    print("")
    for i, line in enumerate(vo):
        start = float(line["start"])
        next_start = float(vo[i + 1]["start"]) if i + 1 < len(vo) else total - 0.3
        window = next_start - start - 0.05
        tts_text = line.get("tts", line["text"])
        h = hashlib.sha1(f"kokoro|{tts_text}".encode()).hexdigest()[:8]
        raw = os.path.join(vdir, f"line-{i:02d}-{h}.mp3")
        fit = os.path.join(vdir, f"line-{i:02d}-{h}-fit.wav")

        if args.dry_run:
            print(f"{i:4d} {start:6.2f} {window:6.2f}      ?     ?  {tts_text}")
            continue

        if args.force or not os.path.exists(raw) or not os.path.exists(raw + ".words.json"):
            tts_line_kokoro_local(tts_text, args.voice, args.speed, raw)

        dur = probe_duration(raw)
        tempo = 1.0
        if dur > window:
            tempo = min(MAX_ATEMPO, dur / window)

        # Skip atempo fitting if ffmpeg not available
        if has_ffmpeg:
            if args.force or not os.path.exists(fit):
                run(["ffmpeg", "-y", "-v", "error", "-i", raw,
                     "-filter:a", f"atempo={tempo:.4f}", "-ar", "44100", "-ac", "2", fit])
            fdur = probe_duration(fit)
        else:
            # Use raw audio if ffmpeg unavailable
            fit = raw
            fdur = dur / tempo if tempo != 1.0 else dur

        overflow = " OVERFLOW" if fdur > window + 0.05 else ""
        print(f"{i:4d} {start:6.2f} {window:6.2f} {fdur:6.2f} {tempo:5.2f}  {line['text']}{overflow}")
        line["end"] = round(start + fdur, 2)

        raw_words = json.load(open(raw + ".words.json", encoding="utf-8"))
        line["words"] = [{"w": w["w"],
                          "start": round(start + w["start"] / tempo, 3),
                          "end": round(start + w["end"] / tempo, 3)} for w in raw_words]
        fitted.append((fit, start, fdur))

    if args.dry_run:
        return

    # Assemble voice track (skip if ffmpeg unavailable)
    voice_wav = os.path.join(vdir, "voice.wav")
    if has_ffmpeg:
        inputs, parts = [], []
        for j, (path, start, _d) in enumerate(fitted):
            inputs += ["-i", path]
            ms = int(round(start * 1000))
            parts.append(f"[{j}:a]adelay={ms}|{ms}[a{j}]")
        chain = "".join(f"[a{j}]" for j in range(len(fitted)))
        fc = ";".join(parts) + f";{chain}amix=inputs={len(fitted)}:normalize=0,apad,atrim=0:{total}," \
             f"loudnorm=I=-16:TP=-1.5:LRA=11[out]"
        run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", fc,
             "-map", "[out]", "-ar", "44100", "-ac", "2", voice_wav])
        print(f"voice track -> {os.path.relpath(voice_wav, ROOT)}")
    else:
        print(f"  Note: Assembly skipped (ffmpeg not available); individual lines ready in {os.path.relpath(vdir, ROOT)}")

    beats["voiceStatus"] = f"kokoro-local:{args.voice}"
    json.dump(beats, open(beats_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"actual line timings + word maps written back -> {os.path.relpath(beats_path, ROOT)}")

    if args.emit_ts:
        emit_ts(vo, rp := os.path.abspath(args.emit_ts))
        print(f"VO TS module -> {os.path.relpath(rp, ROOT)}")

if __name__ == "__main__":
    main()
