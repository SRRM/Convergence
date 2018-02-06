// const router = require('express').Router()
const { Game, Round, Word } = require('../../db/models')
// const commonWords = require('../../commonWords')
const getVersions = require('../../getVersions')
const PCA = require('ml-pca')

// const pluralVersions = word => [pl.singular(word), pl.plural(word)]
// const pluralArray = arr => [...arr.map(word => pl.singular(word)), ...arr.map(word => pl.plural(word))]
// const casedArray = wordArray => [...wordArray.map(word => word[0].toLowerCase() + word.slice(1)), ...wordArray.map(word => word[0].toUpperCase() + word.slice(1))]


// const pl = require('pluralize')




// module.exports = router

module.exports = function (router, shared) {

  function maybeValues(vector) {
    // avoids type errors

    if (vector.values) {
      return vector.values
    } else if (Array.isArray(vector) && vector.length) {
      return vector
    } else {
      return new Array(+shared.size).fill(0)
    }
  }

  function vectorAddition(vectorOne, vectorTwo) {
    // returns vector only as an array of values

    let v1 = maybeValues(vectorOne)
    let v2 = maybeValues(vectorTwo)

    return v1.map((x, i) => x + v2[i])
  }

  function addVectors(...vectors) {
    // allows addition of arbitrary number of vectors

    if (vectors.length === 2) {
      return vectorAddition(vectors[0], vectors[1])
    } else if (vectors.length > 2) {
      return addVectors(vectorAddition(vectors[0], vectors[1]), ...vectors.slice(2))
    } else if (vectors.length === 1) {
      return vectors[0]
    } else {
      return new Array(+shared.size).fill(0)
    }
  }

  function scalarMult(vector, scalar) {
    return maybeValues(vector).map(x => x * scalar)
  }

  function magnitude(vector) {
    return Math.sqrt(maybeValues(vector).map(x => x * x).reduce((a, b) => a + b))
  }

  function dotProduct(vectorOne, vectorTwo) {
    return maybeValues(vectorOne).map((x, i) => x * maybeValues(vectorTwo)[i]).reduce((a, b) => a + b)
  }

  function unit(vec) {
    // returns unit vector in direction of vec

    let vector = maybeValues(vec)
    const mag = magnitude(vector)
    if (mag === 0) {
      return vector
    }
    return vector.map(x => x / mag)
  }

  function personalityArray(personality) {
    // turns personality into array of words
    if (personality === '') {
      return []
    }
    return personality.match(/\w+/g).map(x => shared.getVector(x))
  }

  function aggregateStrategy(personality) {
    return unit(addVectors(...personality))
  }

  function getDistance(vectorOne, vectorTwo) {
    return 1 - (1 + shared.similarity(vectorOne, vectorTwo)) / 2
  }

  const primingDistance = 0.2

  function isNear(personalityElement, userVector, computerVector) {
    let userDistance = getDistance(personalityElement, userVector)
    let computerDistance = getDistance(personalityElement, computerVector)
    return userDistance < primingDistance || computerDistance < primingDistance
  }

  console.log('api words visited')

  router.get('/api/words', async (req, res, next) => {
    try {
      const allWords = await Word.findAll()

      const justWords = Array.from(new Set(allWords.map(x => x.word)))

      const vectorArray = await shared.getVectors(justWords)

      const justVectors = vectorArray.map(x => x.values)

      const pca = new PCA(justVectors)

      const eigenValues = pca.getEigenvalues()
      const eigenVectors = pca.getEigenvectors()
      const mappedVectors = pca.predict(eigenVectors)

      let firstValue = eigenValues[0]
      let secondValue = eigenValues[1]

      function scaleVectors(vectors, scalar) {
        return vectors.map(x => scalarMult(x, scalar))
      }

      const firstComponents = scaleVectors(eigenVectors, firstValue)

      const secondComponents = scaleVectors(eigenVectors, secondValue)

      function getTopDots(scaledVectors, predictions) {
        return scaledVectors.map(x => predictions.map(y => dotProduct(unit(x), unit(y)))).map(x => Math.max(x))
      }

      const firstDots = getTopDots(firstComponents, mappedVectors)

      const secondDots = getTopDots(secondComponents, mappedVectors)

      const firstEigenvectorIndex = firstDots.indexOf(Math.max(firstDots))

      const secondEigenvectorIndex = secondDots.indexOf(Math.max(secondDots))

      console.log('first eigenvector index: ', firstEigenvectorIndex)
      console.log('second eigenvector index: ', secondEigenvectorIndex)

      // let firstVector = eigenVectors.filter(x => mappedVectors.indexOf(scalarMult(x, firstValue)) !== -1 )
      // let secondVector = eigenVectors.filter(x => mappedVectors.indexOf(scalarMult(x, secondValue)) !== -1 )

      res.json({
        firstVector,
        secondVector,
        firstValue,
        secondValue
      })


    }
    catch (error) {
      next(error)
    }
  })

}
