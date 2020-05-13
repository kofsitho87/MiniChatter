import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
//import graphql from 'rollup-plugin-graphql'
import gql from 'rollup-plugin-graphql-tag'
import buble from 'rollup-plugin-buble'
//import { uglify } from 'rollup-plugin-uglify'
import minify from 'rollup-plugin-babel-minify'
 

const FILE_NAME = "vue-mini-chatter"

const external = [
  "apollo-cache-inmemory",
  "apollo-client",
  "apollo-link",
  "apollo-link-http",
  "apollo-link-ws",
  "apollo-utilities",
  "graphql-tag",
  "moment",
]

export default [
  {
    external,
    input: 'src/index.js',
    output: [
      // {
      //   name: "VueMiniChatter",
      //   format: 'cjs',
      //   file: `dist/${FILE_NAME}.common.js`,
      //   //sourcemap: true
      // },
      {
        name: "VueMiniChatter",
				file: `dist/${FILE_NAME}.js`,
				format: 'es',
				//sourcemap: true
      },
      // {
      //   format: 'esm',
      //   file: `dist/${FILE_NAME}.esm.js`
      // },
      // {
      //   external,
      //   name: "VueMiniChatter",
      //   file: `dist/${FILE_NAME}.js`,
      //   format: 'iife'
      // },
      // {
      //   external,
      //   name: "VueMiniChatter",
      //   file: `dist/${FILE_NAME}.umd.js`,
      //   format: 'umd'
      // }
    ],
    plugins: [
      commonjs({
        //include: 'node_modules/**'
      }),
      vue({
        //css: `dist/${FILE_NAME}.css`,
        css: true, 
        compileTemplate: true,
        template: {
          isProduction: true,
        },
      }),
      resolve({
        browser: true
      }),
      babel({
        exclude: 'node_modules/**',
        //presets: ["@babel/env"],
        presets: [['@babel/preset-env', { modules: false }]],
        babelrc: false,
        runtimeHelpers: true,
        externalHelpers: true,
        plugins: [
          // "@babel/transform-async-to-generator",
          [
            'wildcard',
            {
              exts: [],
              nostrip: true,
            }
          ],
          '@babel/plugin-external-helpers',
          '@babel/plugin-transform-runtime'
        ],
      }),
      gql(),
      buble(),
      minify()
      //uglify()
    ]
  }
]