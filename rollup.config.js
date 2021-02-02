import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

const banner =
  '/*!\n' +
  ` * the-editor.js v${pkg.version}\n` +
  ` * Copyright (c) 2020-${new Date().getFullYear()} Johnson\n` +
  ` * Released under the ${pkg.license} License.\n` +
  ' */'

const commonPlugins = [
  commonjs(),
  nodeResolve(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        module: 'ESNext'
      }
    },
    useTsconfigDeclarationDir: true
  })
]

export default [
  {
    input: 'src/index.ts', // 入口文件
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      banner
    },
    plugins: [
      postcss({
        extensions: ['.scss', '.css'],
        use: ['sass'],
        extract: true
      }),
      ...commonPlugins
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'esm',
      sourcemap: true,
      banner
    },
    plugins: [
      postcss({
        extensions: ['.scss', '.css'],
        use: ['sass'],
        extract: true
      }),
      ...commonPlugins
    ]
  },
  {
    input: 'src/umd.ts',
    output: {
      file: pkg.umd,
      format: 'umd',
      name: 'TheEditor', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
      sourcemap: false,
      banner,
      plugins: [
        terser()
      ]
    },
    plugins: [
      postcss({
        extensions: ['.scss', '.css'],
        use: ['sass'],
        extract: true,
        minimize: true
      }),
      ...commonPlugins
    ]
  }
]
