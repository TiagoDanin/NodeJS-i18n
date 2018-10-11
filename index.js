const gettextParser = require("gettext-parser")
const fs = require('fs')
const path = require('path')

var defaultLang, translations, prefix, suffix, regex

class Resources {
	constructor (options) {
		this.options = {
			lang: 'en',
			translations: {},
			prefix: '{{',
			suffix: '}}',
			regex: /{{(\d*)}}/g,
			...options
		}
		defaultLang = this.options.lang
		translations = this.options.translations
		prefix = this.options.prefix
		suffix = this.options.suffix
		regex = this.options.regex

		translations[defaultLang] = {
			msgid: '',
			comments: {},
			msgstr: ['']
		}
	}

	load (lang, resourceFile) {
		var fileRaw = fs.readFileSync(path.resolve(resourceFile))
		var po = gettextParser.po.parse(fileRaw)
		translations[lang] = po.translations['']
		translations[lang][''][''] = {
			msgid: '',
			comments: {},
			msgstr: ['']
		}
		return translations[lang]
	}

	remove (lang) {
		translations[lang] = {}
		return true
	}
}

class Translation {
	constructor (lang) {
		this.lang = lang || defaultLang
		if (!translations[this.lang]) {
			console.error('Without resources')
		}
	}

	getTranslation (msgid) {
		msgid = msgid.toString()
		return translations[this.lang][msgid] || {
			msgid: msgid,
			comments: {},
			msgstr: [msgid]
		}
	}

	getMsgid (str, exp) {
		var n = 0
		if (str.reduce && exp) {
			return str.reduce((total, current, index) => {
				var select = `${prefix}${n}${suffix}`
				n++
				if (exp[index] === undefined) {
					select = ''
				}
				return `${total}${current}${select}`
			}, '')
		}
		return str
	}

	_ (str, ...exp) {
		var msgid = this.getMsgid(str, exp)
		var msgstr = this.getTranslation(msgid).msgstr
		if (str.reduce && exp) {
			return msgstr.toString().replace(regex, (match, key) => {
				return exp[Number(key)]
			}, '')
		}
		return msgstr.toString()
	}

	msgid (str, ...exp) {
		var msgid = this.getMsgid(str, exp)
		return this.getTranslation(msgid)
	}

	msgstr (str, ...exp) {
		var msgid = this.getMsgid(str, exp)
		return this.getTranslation(msgid).msgstr
	}

	comments (str, ...exp) {
		var msgid = this.getMsgid(str, exp)
		return this.getTranslation(msgid).comments
	}
}

module.exports = {
	Resources,
	Translation
}
