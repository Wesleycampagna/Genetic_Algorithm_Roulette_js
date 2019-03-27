'use strict'

const express = require('express')
const main = express()
const path = require('path')

main.set('views', path.join(__dirname, 'views'))

main.get('/', (request, response) => {
    response.render(__dirname + 'index.html')
})

main .use(express.static(__dirname + '/'))

main.listen(8080, () => {
    console.log('server rodando')
})