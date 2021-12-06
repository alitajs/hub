import { defineConfig } from 'umi';

export default defineConfig({
  appType: 'pc',
  noBuiltInPlugins: true,
  // outputPath: 'platforms/electron/www/',
  presets: ['@alitajs/umi-presets-alita'],
  outputPath: './.el/renderer',
  publicPath: './',
});
