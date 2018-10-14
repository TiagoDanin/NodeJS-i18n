#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const childProcess = require('child_process')
const util = require('util')
const exec = util.promisify(childProcess.exec)
const tempy = require('tempy')

const tmpDir = tempy.directory()
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

const tmpFiles = []
rl.on('line', (line) => {
	line = line.replace(/^\.\//g, '')
	var file = path.resolve(process.cwd() + '/' +  line)
	var raw = fs.readFileSync(file).toString()
	var fileOutput = ''
	for (rawLine of raw.split('\n')) {
		var n = 0
		fileOutput += rawLine.toString().replace(/\${([\.\[\]\d\s\w_-]*)}/g, (match, key) => {
			var output = `{{${n}}}`
			n++
			return output
		}, '') + '\n'
	}
	var tmpFile = path.resolve(tmpDir + '/' + line.replace(/\//g, '_'))
	tmpFiles.push(tmpFile)
	fs.writeFileSync(tmpFile, fileOutput)
})

rl.on('close', async (line) => {
	var indexFiles = path.resolve(tmpDir + '/indexAllFiles')
	fs.writeFileSync(indexFiles, `${tmpFiles.join('\n')}`)
	var keywords = [
		'_',
		'i18n',
		'msgid',
		'msgstr',
		'comments',
		'xgettext'
	]
	var args = [
		'--from-code=utf-8',
		'--add-comments=i18n',
		'--force-po',
		'--keyword=i18n',
		`--files-from=${indexFiles}`,
		'--output=/dev/stdout',
		`--keyword=${keywords.join(' --keyword=')}`,
		'--language=Perl' //More compatible with JavaScript format. '-'
	]
	var { stdout } = await exec(`xgettext ${args.join(' ')}`)
	stdout = stdout.replace(/perl/g, 'javascript') // :^)
	stdout = stdout.replace((new RegExp(path.resolve(tmpDir + '/') + '/', 'g')), '')
	stdout = stdout.replace(/#\.\si18n\s/g, '#. ')
	stdout = stdout.replace('charset=CHARSET', 'charset=UTF-8')
	console.log(stdout)
})
