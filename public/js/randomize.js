const randomize = (final) => {
    return Math.floor(Math.random() * final)
}

const randomizeBinary = () => {
    return (Math.floor(Math.random() * 100)) % 2
}

const randomizeRange = (initial, final) => {
    return Math.floor(Math.random() * (Math.floor(final) - Math.ceil(initial) + 1)) + initial
}

exports.randomize = randomize
exports.randomizeRange = randomizeRange
exports.randomizeBinary = randomizeBinary