const reload = require('require-reload')(require)
const w2v = require('word2vec')
const path = require('path')

// let model
console.time('loader')
const getModel = async () => await new Promise(async (resolve, reject) => {
   w2v.loadModel(path.join(__dirname, '../../trainingText/vectors.txt'), (err, data) => {
     console.timeEnd('loader')
    if (err !== null) return reject(err);
    resolve(data);
  });
})

// let model = getModel()

// const getModelAsync = async () => {
//   let mod = await getModel()
//   return mod
// };

// model = getModelAsync()

module.exports = getModel()
