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
let comments = []
let n = 0
let check = false

let po = {
	charset: 'utf-8',
	headers: {
		'content-type': 'text/plain; charset=UTF-8',
		'content-transfer-encoding': 'UTF-8'
	},
	translations: { '': {}}
}

rl.on('line', (line) => {
	line = line.replace(/^\.\//g, '')
	let file = path.resolve(process.cwd() + '/' +  line)
	let code = fs.readFileSync(file).toString()

	let tokens = esprima.tokenize(code, {
		loc: true,
		comment: true
	})

	tokens = tokens.reduce((total, current, index) => {
		if (argv.all) {
			check = true
		}
		if (current.type == 'LineComment' && current.value.match(/i18n/i)) {
			comments.push(current)
		} else if (current.type == 'Identifier' && prefixs.includes(current.value)) {
			check = true
		} else if (check && whiteList.includes(current.type)) {
			if (current.type == whiteList[0]) {
				total.push(current)
			} else if (current.value.startsWith('}')) {
				let old = total[total.length-1]
				total[total.length-1].value = `${old.value}${n}${current.value}`
				total[total.length-1].loc.end = current.loc.end
				n++
			} else if (current.value.startsWith('`') && !total[total.length-1].value.endsWith('${')) {
				n = 0
				total.push(current)
			}
			if (
				total[total.length-1].value.endsWith('"') ||
				total[total.length-1].value.endsWith('\'') ||
				total[total.length-1].value.endsWith('`')
			) {
				let comment = comments[comments.length-1]
				if (comment) {
					let commentLine = comment.loc.start.line
					let codeLine = total[total.length-1].loc.start.line
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
	tokens.forEach((token) => {
		token.value = token.value.replace(/['"`](.*)['"`]/, '$1')
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
	})
})

rl.on('close', async (line) => {
	console.log(gettextParser.po.compile(po).toString())
})
