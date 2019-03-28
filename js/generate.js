const randomize = require('../js/randomize')

/**
 * Create the matriz [object.lines][object.collumn]
 * 
 * @param {object.lines} first The number of lines of matriz 
 * @param {object.collumn} second The number of collumns of matriz 
 * @returns {matriz} return matriz
 */
let createMatriz = (obj) => {

    let matriz = new Array()

    for (let i = 0; i < obj.lines; i++) {
        let matriz_collumn = new Array()

        for (let j = 0; j < obj.collumn; j++)
            matriz_collumn[j] = randomize.randomizeBinary()

        matriz[i] = matriz_collumn

    }

    return matriz
}


/**
 * Concatena uma matriz x por y em um vetor 
 * 
 * @param {matriz[][]} first matriz x por y
 * @returns {vector} return vetor
 */
let getVectorFromMatriz = (matriz) => {

    let vector = new Array()

    matriz.forEach(element => {
        for (let i = 0; i < element.length; i++) {
            vector.push(element[i])
        }
    })

    return vector
}


module.exports.MatrizP = function (obj) {

    console.log('lines - ' + obj.lines);
    console.log('lines - ' + obj.collumn);


    let matrizP = new Array()

    this.get = (indice) => {
        try {
            return matrizP[indice]
        } catch (err) {
            console.log(err.Array());
        }
    }

    this.create = () => {

        for (let i = 0; i < obj.numberOfIndividuals; i++) {
            matrizP.push(getVectorFromMatriz(createMatriz(obj)))
        }
    }

    this.getMatrizP = () => {
        return matrizP
    }
}

module.exports.getHammingDistance = (matriz, objective) => {
    
    let vector = new Array()

    matriz.forEach(element => {
    
        let value = 0
        for (let i = 0; i < element.length; i++) {
            if (element[i] != objective[i]) ++value
        }

        vector.push(value)
    })

    return vector
}

module.exports.getFitness = (hammingDistance, obj) => {    
    let vector = new Array()

    let valueTotalOfPixels = (obj.lines * obj.collumn)

    hammingDistance.forEach(element => {
        vector.push(valueTotalOfPixels - element)
    })

    return vector
}

module.exports.fitness = (vector) => {
    let fitness = 0
    vector.forEach(element => {
        fitness += element
    })

    return vector.length - fitness
}


module.exports.getRoulette = (fitness) => {
    
    let totalFitness = 0
    let pieceToEachIndividual = new Float32Array(fitness.length)
    let aux = 0
    
    /* por utilizar Float32Array o método push não funciona de igual modo logo um iterator se faze necessario */
    let iterator = 0
    
    fitness.forEach(element => {
        totalFitness += element
    });

    fitness.forEach(element => {
        aux += (element * 360) / totalFitness
        pieceToEachIndividual[iterator++] = aux
    });
    
    return pieceToEachIndividual
    
}


module.exports.objective = (dimension) => {
    
    let obj = new Array()

    for(let i = 0; i < dimension; i++) 
        obj.push(randomize.randomizeBinary())

    return obj
}