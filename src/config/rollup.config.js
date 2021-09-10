import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
    nodeResolve(),
    commonjs(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  baseConfig.output.push({
    file: './dist/main.js',
    name: '',
    format: 'umd',
  });
}
if (process.env.NODE_ENV === 'production') {
  baseConfig.output.push({
    file: './dist/main.min.js',
    name: '',
    format: 'umd',
    plugins: [terser()],
  });
}
export default baseConfig;
