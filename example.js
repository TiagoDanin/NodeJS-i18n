const { Resources, Translation } = require('nodejs-i18n')

const r = new Resources()
r.load('pt', 'pt.po')

const user = new Translation('pt')
//i18n: My Hello World with NodeJs i18n
const world = user._`world` // Mundo
user._`Hello ${world}` // Olá mundo
