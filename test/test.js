const { Resources, Translation } = require('../.')
const childProcess = require('child_process')
const util = require('util')
const exec = util.promisify(childProcess.exec)
const assert = require('assert')
const fs = require('fs')

let r
const removeDate = (text) => text.replace(/POT-Creation-Date.*"/g, '')

describe('Cli Test', () => {
	it('Create file01.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file01.js | node cli.js')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file01.po').toString()))
	})
	it('Create file02.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file02.js | node cli.js')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file02.po').toString()))
	})
	it('Create file03.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file03.js | node cli.js --all')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file03.po').toString()))
	})
	it('Create file04.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file04.js | node cli.js')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file04.po').toString()))
	})
	it('Create file05.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file05.js | node cli.js --all')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file05.po').toString()))
	})
	it('Create file06.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file06.js | node cli.js')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file06.po').toString()))
	})
	it('Create file07.po', async () => {
		const { stdout } = await exec('find . | grep test/fixtures/file07.js | node cli.js --value')
		assert.equal(removeDate(stdout), removeDate(fs.readFileSync('test/fixtures/file07.po').toString()))
	})
})

describe('Resources Test', () => {
	it('Create config', async () => {
		r = new Resources()
	})
	it('Load resource (pt.po)', async () => {
		r.load('pt', 'test/fixtures/file00.po')
	})
})

describe('Resources Test', () => {
	it('Parser string in default lang', async () => {
		const world = 'world'
		const translation = new Translation('')
		assert.equal(translation._`Hello ${world}`, 'Hello world')
	})
	it('Parser string in pt-BR', async () => {
		const translation = new Translation('pt')
		const world = translation._`world`
		assert.equal(translation._`Hello ${world}`, 'Olá mundo')
	})
})
