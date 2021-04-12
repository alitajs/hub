import typescript2 from 'rollup-plugin-typescript2';

export default {
  input: 'platforms/electron/main.ts',
  output: {
    file: 'platforms/electron/main.js',
    format: 'cjs',
  },
  plugins: [
    typescript2({
      tsconfig: 'platforms/electron/tsconfig.json',
      clean: true,
    }),
  ],
};
