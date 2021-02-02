import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/umd.ts', // 入口文件
  output: {
    file: 'dev/the-editor.js',
    format: 'umd',
    sourcemap: true,
    name: 'TheEditor'
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'index.html', dest: 'dev/'
        }
      ]
    }),
    postcss({
      extensions: ['.scss', '.css'],
      use: ['sass'],
      extract: true
    }),
    commonjs(),
    nodeResolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      },
      useTsconfigDeclarationDir: true
    }),
    serve('dev')
  ]
}