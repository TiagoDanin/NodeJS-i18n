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
