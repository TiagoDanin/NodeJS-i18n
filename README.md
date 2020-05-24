# NodeJS i18n

[![Travis](https://img.shields.io/travis/TiagoDanin/NodeJS-i18n.svg?branch=master&style=flat-square)](https://travis-ci.org/TiagoDanin/NodeJS-i18n) [![Downloads](https://img.shields.io/npm/dt/nodejs-i18n.svg?style=flat-square)](https://npmjs.org/package/nodejs-i18n) [![Node](https://img.shields.io/node/v/nodejs-i18n.svg?style=flat-square)](https://npmjs.org/package/nodejs-i18n) [![Version](https://img.shields.io/npm/v/nodejs-i18n.svg?style=flat-square)](https://npmjs.org/package/nodejs-i18n) 

Minimalistic internationalization using gettext style for NodeJS

## Features

- Gettext Style
- Easy Imprementation
- Create .po via CLI
- Select Lang per User

## Installation

Module available through the [npm registry](https://www.npmjs.com/). It can be installed using the [`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) or [`yarn`](https://yarnpkg.com/en/) command line tool.

```sh
# Yarn (Recomend)
yarn global add nodejs-i18n
# NPM 
npm install nodejs-i18n --global
```

## Usage

```sh
# Create file
find . | grep .js | sort | nodejs-i18n > en.po

# Create file (all strings) [beta]
find . | grep .js | sort | nodejs-i18n --all > en.po

# Create file (get identifier value) [beta]
find . | grep .js | sort | nodejs-i18n --value > en.po
```

## Example

```js
const { Resources, Translation } = require('nodejs-i18n')

const resources = new Resources()
resources.load('pt', 'pt.po')

const user = new Translation('pt')

//i18n: My Hello World with NodeJs i18n
const world = user._`world` // Mundo
user._`Hello ${world}` // Olá mundo
```

## Documentation

### Options

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
# Using Yarn
yarn test
```

## Dependencies

<details>
	<summary><a href="https://ghub.io/argv">argv</a>: CLI Argument Parser</summary>
	<b>Author</b>: Corey Hart</br>
	<b>License</b>: </br>
	<b>Version</b>: 0.0.2
</details>
<details>
	<summary><a href="https://ghub.io/esprima">esprima</a>: ECMAScript parsing infrastructure for multipurpose analysis</summary>
	<b>Author</b>: Ariya Hidayat</br>
	<b>License</b>: BSD-2-Clause</br>
	<b>Version</b>: ^4.0.1
</details>
<details>
	<summary><a href="https://ghub.io/gettext-parser">gettext-parser</a>: Parse and compile gettext po and mo files to/from json, nothing more, nothing less</summary>
	<b>Author</b>: Andris Reinman</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^4.0.3
</details>
<details>
	<summary><a href="https://ghub.io/minimist">minimist</a>: parse argument options</summary>
	<b>Author</b>: James Halliday</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: ^1.2.5
</details>
<details>
	<summary><a href="https://ghub.io/tempy">tempy</a>: Get a random temporary file or directory path</summary>
	<b>Author</b>: Sindre Sorhus</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: 0.5.0
</details>

## Dev Dependency

<details>
	<summary><a href="https://ghub.io/mocha">mocha</a>: simple, flexible, fun test framework</summary>
	<b>Author</b>: TJ Holowaychuk</br>
	<b>License</b>: MIT</br>
	<b>Version</b>: 7.2.0
</details>

## Related

<details>
	<summary><a href="https://ghub.io/gettext-parser">gettext-parser</a>: Parse and compile gettext po and mo files to/from json, nothing more, nothing less</summary>
	<b>Author</b>: Andris Reinman</br>
	<b>License</b>: MIT
</details>

## Contributors

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/TiagoDanin/NodeJS-i18n/issues). [List of all contributors](https://github.com/TiagoDanin/NodeJS-i18n/graphs/contributors).

## License

[MIT](LICENSE) © [TiagoDanin](https://TiagoDanin.github.io)