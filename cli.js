#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const esprima = require('esprima')
const gettextParser = require('gettext-parser')
const argv = require('minimist')(process.argv)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

const whiteList = [
	'String',
	'Template'
]
const prefixs = [
	'i18n',
	'_'
]
const comments = []

let n = 0
let check = false

const po = {
	charset: 'utf-8',
	headers: {
		'content-type': 'text/plain; charset=UTF-8',
		'content-transfer-encoding': 'UTF-8'
	},
	translations: { '': {}}
}

rl.on('line', (line) => {
	line = line.replace(/^\.\//g, '')
	const file = path.resolve(process.cwd() + '/' +  line)
	const code = fs.readFileSync(file).toString()

	let tokens = esprima.tokenize(code, {
		loc: true,
		comment: true
	})

	tokens = tokens.reduce((total, current, index) => {
		if (argv.all && !check) {
			check = true
		}
		if (current.type == 'LineComment' && current.value.match(/i18n/i)) {
			comments.push(current)
		} else if (current.type == 'Identifier' && prefixs.includes(current.value)) {
			check = true
		} else if (check) {
			if (whiteList.includes(current.type) && typeof check == 'boolean') {
				check = current.type
			}
			if (!whiteList.includes(current.type)) {
				if (current.type == 'Punctuator' && current.value == ')') {
					check = false
				}
				return total
			}

			if (check == whiteList[0]) { //String
				total.push(current)
				//check = false
			} else if (current.value.startsWith('}')) {
				const old = total[total.length-1]
				total[total.length-1].value = `${old.value}${n}${current.value}`
				total[total.length-1].loc.end = current.loc.end
				n++
			} else if (current.value.startsWith('`') && !total[total.length-1].value.endsWith('${')) {
				n = 0
				total.push(current)
			}
			if (check == current.type && (
				total[total.length-1].value.endsWith('"') ||
				total[total.length-1].value.endsWith('\'') ||
				total[total.length-1].value.endsWith('`')
			)) {
				const comment = comments[comments.length-1]
				if (comment) {
					const commentLine = comment.loc.start.line
					const codeLine = total[total.length-1].loc.start.line
					if (commentLine == codeLine || commentLine+1 == codeLine) {
						total[total.length-1].comment = comment.value.replace(/[#\s]*i18n[\s:]*/i, '')
					}
				}
				check = false
			}
		}
		return total
	}, [{value: ''}])

	tokens = tokens.filter(t => t.value != '')
	tokens.map((token) => {
		token.value = token.value.replace(/['"`](.*)['"`]/s, '$1')
		if (Object.keys(po.translations['']).includes(token.value)) {
			po.translations[''][token.value].comments.reference += (
				`\n${line}:${token.loc.start.line}:${token.loc.start.column}`
			)
			if (token.comment) {
				po.translations[''][token.value].comments.extracted += '\n' + token.comment
			}
		} else {
			po.translations[''][token.value] = {
				msgid: token.value,
				comments: {
					reference: `${line}:${token.loc.start.line}:${token.loc.start.column}`
				},
				msgstr: []
			}
			if (token.comment) {
				po.translations[''][token.value].comments.extracted = token.comment
			}
		}
	})
})

rl.on('close', async (line) => {
	console.log(
		gettextParser.po.compile(po).toString().trim().replace(/\\\\/sg, '\\')
	)
})
