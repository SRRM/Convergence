const magnitude = vector => Math.sqrt(vector.map(elem => elem * elem).reduce((a, b) => a + b))

module.exports = magnitude
