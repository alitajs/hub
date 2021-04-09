import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'pc',
  noBuiltInPlugins: true,
  outputPath: 'platforms/electron/www/',
  publicPath: './',
});
