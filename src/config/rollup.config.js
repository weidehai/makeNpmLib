import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import path from 'path';

console.log(process.env.NODE_ENV);
const baseConfig = {
  input: './src/index.ts',
  output: [],
  plugins: [
    typescript(),
    alias({
      entries: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  baseConfig.output.push({
    file: './dist/main.js',
    format: 'cjs',
  });
}
if (process.env.NODE_ENV === 'production') {
  baseConfig.output.push({
    file: './dist/main.min.js',
    format: 'cjs',
    plugins: [terser()],
  });
}
export default baseConfig;
