# Lean JS App Starter Webpack Parts

[![npm](https://img.shields.io/npm/v/ljas-webpack.svg?colorB=brightgreen)](https://npmjs.com/package/ljas-webpack) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mattlean/ljas-webpack/blob/master/LICENSE)

This package offers functions known as **configuration parts**. These are used to compose [webpack](https://webpack.js.org) configurations in a simple and organized way.

They are currently used for [Lean JavaScript Application Starter](https://github.com/mattlean/lean-js-app-starter) and can be useful for your own webpack configurations.

## Install

`npm install --save-dev ljas-webpack`

`yarn add --dev ljas-webpack`

## Usage

The configuration parts are designed to offer simplified ways that make it quick and easy to get webpack to do what you want. If these default behaviors don't do exactly what you need, the functions still offer you other ways to fine-tune things so you'll always be in complete control.

One thing to note is that these parts were intended to be used with [webpack-merge](https://npmjs.com/package/webpack-merge). Although it is not required, it is highly recommended as it makes larger configurations much easier to manage.

The expected composition strategy is described on the ["Composing Configuration" page](https://survivejs.com/webpack/developing/composing-configuration) in the [SurviveJS webpack book](https://survivejs.com/webpack) which was written by an ex-webpack core team member, Juho Vepsäläinen.

## Documentation

You can view the [JSDoc](https://jsdoc.app) in [this repository's `/docs` directory](./docs) or at https://mattlean.github.io/ljas-webpack/docs.

## License

This project is [MIT licensed](https://github.com/mattlean/ljas-webpack/blob/master/LICENSE).
