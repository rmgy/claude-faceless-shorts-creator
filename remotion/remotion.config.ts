import { Config } from '@remotion/cli/config';

// ../media is Remotion's public root: staticFile('library/logos/x') →
// ../media/library/x (reusable), staticFile('projects/<proj>/x') → ../media/projects/... (per-video).
Config.setPublicDir('../media');

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // auto

// Allow rendering through proxy with re-terminated TLS certificates
Config.setChromiumOptions({
  headless: true,
  args: [
    '--ignore-certificate-errors',
    '--ignore-certificate-errors-spellcheck',
    '--no-sandbox',
    '--disable-web-security',
    '--unsafely-treat-insecure-origin-as-secure=https://fonts.gstatic.com',
    '--allow-insecure-localhost',
  ],
});
