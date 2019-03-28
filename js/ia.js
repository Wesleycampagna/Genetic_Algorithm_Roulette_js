const generate = require('./generate')
const randomize = require('./randomize')


/* Constants */
const TAX_OF_CROSSOVER = 0.6
const TAX_OF_MUTATION = 0.02
const NUMBER_OF_INDIVIDUALS = 8
const FLOOR_CEIL_CP = 2
const MAX_STACK = 3000
let generation = 0


const object = {
    lines: 4, 
    collumn: 4,
    numberOfIndividuals: NUMBER_OF_INDIVIDUALS
}


const DIMENSION = object.lines * object.collumn
const OBJECTIVE = generate.objective(DIMENSION)


function recursiveAlgorith (matrizP, MAX_STACK) {
    
    /* calcula a distancia de Hamming -> bits incorretos em relação ao valor objetivo do vetor */
    let hammingDistance = generate.getHammingDistance(matrizP, OBJECTIVE)
    
    /* calcula a diferença em relação ao valor ideal do vetor */
    let allFitness = generate.getFitness(hammingDistance, object)
    
    MAX_STACK > 1 ? isFinal = false : isFinal = true

    console.log(matrizP);    
    console.log('\nGENERATION: ' + ++generation);    
    console.log('obj: ' + OBJECTIVE);
    console.log('fitness: ' + allFitness);
    console.log('media fitness ' + getMedia(allFitness));    

    if (! isFinal && !isMaxFitness(allFitness)) {
        
        /* atribui a porcentagem de cada individuo baseada no calculo de seu fitness  */
        let porcentualRoulette = generate.getRoulette(allFitness)
        
        /* sorteia porcentagens aleatórias */
        let randomicRoulette = getRandomicRoulette (NUMBER_OF_INDIVIDUALS)
        
        /* seleciona individuos para realização do crossover -> retorna o indice de vetor dos elementos selecionados  */
        let selectedElementsToCrossover = selectCrossover(randomicRoulette, porcentualRoulette)
        
        /* seleciona os escolhidos pelo Roulette e atribui na MatrizP */
        matrizP = setNewPopulation(selectedElementsToCrossover, matrizP)

        /* crossover escolhendo alguns dos elementos para crossover */
        matrizP = crossover(selectedElementsToCrossover, matrizP)

        /* adiciona uma mutação flutuante de 0,02% de chance de acontecimento */
        matrizP = mutation(matrizP)
        
        -- MAX_STACK

        console.log('\n')

        recursiveAlgorith(matrizP, MAX_STACK)
    }

    else
        console.log('\nO OBJETIVO FOI CONCLUIDO!\n');
}


function isMaxFitness (vector) {

    for (let iterator in vector)

        if (vector[iterator] == DIMENSION)
            return true

    return false
}


function getRandomicRoulette () {
    let rouletteRandom = new Array()
    
    for (let iterator = 0; iterator < NUMBER_OF_INDIVIDUALS; iterator++) {
        rouletteRandom.push(randomize.randomize(360))
    }

    return rouletteRandom
}


function selectCrossover (randomVec, porcentVec) {
    let vectorFinalPositions = new Array()

    randomVec.forEach(element => {

        let position = 0

        porcentVec.forEach(roulette => {
            if (roulette < element) position++            
        });

        vectorFinalPositions.push(position)
    })
    
    return vectorFinalPositions
}


function crossover (indexMatrizP, matrizP) {
    let sets = generateSets(indexMatrizP)
    
    console.log('escolha de individuos para crossover: ');
    console.log(sets)

    sets.forEach(element => {

        /* valor de 0.0 a 1.0 */
        let coeficiente = (randomize.randomize(10)  / 10)

        if (coeficiente < TAX_OF_CROSSOVER){

            let one = matrizP[element[0]]
            let two = matrizP[element[1]]

            /* Aqui eu coloco um local minimo pra quebra do gene: Se DIMENSION = 12 e FLOOR_CEIL_CP = 2
            a quebra so pode acontecer da segunda posição até a décima */
            let cp = randomize.randomizeRange(FLOOR_CEIL_CP, DIMENSION - FLOOR_CEIL_CP)

            /* Aqui ele deve ser mais eficiente ainda --> não faz a troca genetica qndo o resultado não é melhor que o anterior
            let result = cross(one, two, cp)
            if ( result > generate.fitness(matrizP[element[0]]) ) {
                matrizP[element[0]] = result
                console.log('enter');
            }
            result = cross(two, one, cp)            
            if ( result > generate.fitness(matrizP[element[1]]) ) {
                matrizP[element[1]] = result
                console.log('enter2');
            } */

            matrizP[element[0]] = cross(one, two, cp)        
            matrizP[element[1]] = cross(two, one, cp)            
            
        }

        
    })

    return matrizP
}


function generateSets(vector){
    
    let duplas = new Array()

    let dupla = new Array()

    for(key in vector) {
    
        dupla.push(vector[key])

        if ((key) % 2){
            
            duplas.push(dupla)
            dupla = new Array()
        }
    } 

    return duplas
}


function cross( vectorOne, vectorTwo, cp){

    let geneticProcess = new Array()

    for (let iterator = 0; iterator < DIMENSION; iterator++)
        (iterator < cp) ? geneticProcess.push(vectorOne[iterator]) : geneticProcess.push(vectorTwo[iterator])
        
    return geneticProcess

}


function setNewPopulation(selectCrossover, matrizP){
    let newMatrizP = new Array()

    selectCrossover.forEach(element => {
        newMatrizP.push(matrizP[element])
    })

    return newMatrizP
}


function mutation (matriz) {

    for (let i = 0; i < NUMBER_OF_INDIVIDUALS; i++){

        for (let j = 0; j < DIMENSION; j ++){
            
            if ((randomize.randomize(100) / 100) <= TAX_OF_MUTATION){
                console.log('MUTATION: [ ' + i + ' ][ ' + j + ' ]');
                matriz[i][j] == 0 ? matriz[i][j] = 1 : matriz[i][j] = 0
            }
        }
    }

    return matriz
}


function getMedia(vector) {
    let media = 0
    
    vector.forEach(element => {
        media += element
    })

    return media/vector.length
}


/* ------------------------------------------------------------------ */

/* chamada Inicial acontece aqui */
let matrizP = new generate.MatrizP(object)
matrizP.create()

let isFinal = false;

matriz = matrizP.getMatrizP()

recursiveAlgorith(matriz, MAX_STACK)


/* ----------------------------------------------------------------- */


/* console.log('get ==> ' + matrizP.get(1))
console.log(matrizP.getMatrizP());
console.log(OBJECTIVE); */