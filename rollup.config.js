import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
//import graphql from 'rollup-plugin-graphql'
import gql from 'rollup-plugin-graphql-tag'
import buble from 'rollup-plugin-buble'
//import uglify from 'rollup-plugin-uglify';
 

const FILE_NAME = "vue-mini-chatter"

const external = [
  "apollo-cache-inmemory",
  "apollo-client",
  "apollo-link",
  "apollo-link-http",
  "apollo-link-ws",
  "apollo-utilities",
  "graphql-tag",
  "moment"
]

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
        external,
        name: "VueMiniChatter",
        file: `dist/${FILE_NAME}.js`,
        format: 'iife'
      },
      {
        external,
        name: "VueMiniChatter",
        file: `dist/${FILE_NAME}.umd.js`,
        format: 'umd'
      }
    ],
    plugins: [
      commonjs(),
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
        presets: ["@babel/env"],
        // plugins: [
        //   "@babel/transform-runtime",
        //   "@babel/transform-async-to-generator",
        // ],
        runtimeHelpers: true,
      }),
      gql(),
      buble()
    ]
  }
]