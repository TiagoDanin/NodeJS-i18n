const { Resources, Translation } = require('nodejs-i18n')

const resources = new Resources()
resources.load('pt', 'pt.po')

const user = new Translation('pt')

//i18n: My Hello World with NodeJs i18n
const world = user._`world` // Mundo
user._`Hello ${world}` // Olá mundo
