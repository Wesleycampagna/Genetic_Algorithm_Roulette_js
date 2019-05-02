'use strict'

const express = require('express')
const main = express()
const path = require('path')

const init = require('./modules/Initialize')

main.set('views', path.join(__dirname, 'views'))
main.engine('html', require('ejs').renderFile)

main.set('view engine', 'html')

main.use(express.static(__dirname + '/public'))

main.get('/', (request, response) => {
    //response.render('pages/index')
    console.log(request.query);

    /*      PATTERN

    ?numberOfIndividuals=16&taxOfCrossover=0.7&taxOfMutation=0.3
    &lines=5&collumn=5&maxStack=4000

    */
    response.send(init(request.query))
})

main.get('/t', (req, res) => {
    console.log('that!!');
    res.render('pages/teste')
})

main.listen(7070, () => {
    console.log('server rodando')
})