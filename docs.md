### Example
```javascript
const { Resources, Translation } = require('nodejs-i18n')

const r = new Resources()
r.load('pt', 'pt.po')

var user = new Translation('pt')
//i18n: My Hello World with NodeJs i18n
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

Create .po files with `nodejs-i18n`. Add in your package.json

```json
"scripts": {
    "i18n": "find . | grep .js | sort | nodejs-i18n > en.po"
}
```

and run `$ npm run i18n`
