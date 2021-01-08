import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json'
import postcss from 'rollup-plugin-postcss'
import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import fs from 'fs'

export default {
  input: 'src/index.ts', // 入口文件
  output: {
    file: 'dev/the-editor.js',
    format: 'umd',
    sourcemap: true,
    name: 'TheEditor'
  },
  plugins: [
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
    html({
      template: ({ attributes, bundle, files, publicPath, title }) => {
        const md = fs.readFileSync('src/sample.md', { encoding: 'utf-8' })
        return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>The Editor</title>
              <link rel="stylesheet" href="the-editor.css">
            </head>
            <body>
              <div id="editor" style="margin: 100px auto; max-width: 1080px; width: 100%">
                <textarea id="md" style="display: none">${md}</textarea>
              </div>
              <script src="the-editor.js"></script>
              <script>
                (function () {
                  window.onload = function() {
                    var container = document.getElementById('editor')
                    var editor = new TheEditor(container, {
                      value: document.getElementById('md').innerText,
                      lineNumbers: true
                    })
                  }
                })()
              </script>
            </body>
          </html>
        `
      }
    }),
    serve('dev')
  ]
}