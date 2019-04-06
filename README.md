# NodeJS i18n
[![Version](https://img.shields.io/npm/v/nodejs-i18n.svg?style=flat-square)](https://npmjs.org/package/nodejs-i18n)
[![Downloads](https://img.shields.io/npm/dt/nodejs-i18n.svg?style=flat-square)](https://npmjs.org/package/nodejs-i18n)
[![Travis](https://img.shields.io/travis/TiagoDanin/NodeJS-i18n.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/NodeJS-i18n)

Minimalistic internationalization using gettext style for NodeJS

## Features
- Gettext Style
- Easy Imprementation
- Create .po via CLI
- Select Lang per User

## Installation
Module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
# NPM
npm install nodejs-i18n --global
# Or Using Yarn
yarn global add nodejs-i18n
```

## Documentation
### Example
```javascript
const { Resources, Translation } = require('nodejs-i18n')

const r = new Resources()
r.load('pt', 'pt.po')

const user = new Translation('pt')
//i18n: My Hello World with NodeJs i18n
const world = user._`world` // Mundo
user._`Hello ${world}` // Olá mundo
```

#### Options :: Resources({})
- **lang** - String
> Lang id.</br>
> Default value: `en`

#### Options :: Resources({}).load(lang, file)
Load translation

- **lang** - String
> Lang id.</br>

- **file** - String
> File path

#### Options :: Resources({}).remove()
Remove translation.

- **lang** - String
> Lang id.</br>

#### Options :: Translation(lang)
Select translation.

- **lang** - String
> Lang id.</br>

#### Options :: Translation(lang).\_(string)
String translation.

- **String** - String

### CLI

Create en.po files with `nodejs-i18n`. Add in your package.json

```json
"scripts": {
    "i18n": "find . | grep .js | sort | nodejs-i18n > en.po"
}
```

and run `$ npm run i18n` or `$ yarn i18n`

## Tests
To run the test suite, first install the dependencies, then run `test`:

```sh
# NPM
npm test
# Or Using Yarn
yarn test
```

## Dependencies
- [argv](https://ghub.io/argv): CLI Argument Parser
- [esprima](https://ghub.io/esprima): ECMAScript parsing infrastructure for multipurpose analysis
- [gettext-parser](https://ghub.io/gettext-parser): Parse and compile gettext po and mo files to/from json, nothing more, nothing less
- [tempy](https://ghub.io/tempy): Get a random temporary file or directory path

## Dev Dependencies
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## Related
- [gettext-parser](https://ghub.io/gettext-parser): Parse and compile gettext po and mo files to/from json, nothing more, nothing less

## Contributors
Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/NodeJS-i18n/issues). [List of all contributors](https://github.com/TiagoDanin/NodeJS-i18n/graphs/contributors).


## License
[MIT](LICENSE) © [TiagoDanin](https://TiagoDanin.github.io)
