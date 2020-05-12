import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
//import uglify from 'rollup-plugin-uglify';
 

const FILE_NAME = "vue-mini-chatter"

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: `dist/${FILE_NAME}.common.js`,
        //sourcemap: true
      },
      {
				file: `dist/${FILE_NAME}.es.js`,
				format: 'es',
				//sourcemap: true
      },
      {
        format: 'esm',
        file: `dist/${FILE_NAME}.esm.js`
      },
      {
        file: `dist/${FILE_NAME}.js`,
        format: 'iife'
      }
    ],
    plugins: [
      commonjs(),
      vue({
        css: `dist/${FILE_NAME}.css`,
      }),
      resolve({
        browser: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
    ]
  }
]