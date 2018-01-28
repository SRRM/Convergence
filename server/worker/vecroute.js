const reload = require('require-reload')(require)
const w2v = require('word2vec')

let model

const getModel = () => new Promise((resolve, reject) => {
  w2v.loadModel(path.join(__dirname, '../trainingText/vectors.txt'), (err, data) => {
    if (err !== null) return reject(err);
    resolve(data);
  });
})

const getModelAsync = async () => {
  model = await getModel()
};

getModelAsync()

module.exports = model
