# NodeJS i18n [![Build Status](https://travis-ci.org/TiagoDanin/NodeJS-i18n.svg?branch=master)](https://travis-ci.org/TiagoDanin/NodeJS-i18n)

Minimalistic internationalization using gettext style for NodeJS.

## Features

- Gettext style
- Easy of use
- Create .po via CLI
- Select lang per user

## How to Use

### Example
```javascript
const { Resources, Translation } = require('nodejs-i18n')

const r = new Resources()
r.load('pt', 'pt.po')

var user = new Translation('pt')
var world = user._`world` // Mundo
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

Create .po file with `nodejs-i18n`. Example: add in package.json

```json
"scripts": {
    "i18n": "find . | grep .js | sort | nodejs-i18n > en.po"
}
```

and run `$ npm run i18n`

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install nodejs-i18n --save
```

## Dependencies

- [gettext-parser](https://ghub.io/gettext-parser): Parse and compile gettext po and mo files to/from json, nothing more, nothing less
- [tempy](https://ghub.io/tempy): Get a random temporary file or directory path

## Dev Dependencies

- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT
