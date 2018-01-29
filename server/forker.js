const watch = require('watch')
const reload = require('require-reload')(require)
const shared = reload('./shared')
const chalk = require('chalk')
const vecroute = reload('./index.js')

// var model

// const getModel = () => new Promise((resolve, reject) => {
//   w2v.loadModel(path.join(__dirname, '../trainingText/vectors.txt'), (err, data) => {
//     if (err !== null) return reject(err);
//     resolve(data);
//   });
// })

// const getModelAsync = async () => {
//   model = await getModel()
// };

// getModelAsync()


let worker

async function teardownWorker () {
  try {
    return new Promise(async (resolve, reject) => {
      if (worker) {
        // console.log(chalk.green('Tearing down worker...'))
        await worker.teardown()
        // console.log(chalk.green('...done!'))
        worker = undefined
        resolve()
      }
      else {
        resolve()
      }
    })
  }
  catch (error) {
    // console.log(chalk.red(`
    //   Experienced an error while tearing down the worker.
    //   Exiting program as we cannot reliably recover from this state.
    // `))
    console.error(error)
    process.exit()
  }
}

const reloadWorker = async () => {
  try {
    await teardownWorker()
    worker = reload('./worker')
    await worker.start(vecroute)
  }
  catch (error) {
    console.error(chalk.red('Encountered error while reloading the worker...'))
    console.error(chalk.red('Waiting for code change to reload'))
    teardownWorker()
    console.error(error)
  }
}

if (process.env.NODE_ENV !== 'production') {
  watch.watchTree(__dirname + '/worker', { interval: 1 }, reloadWorker)
}
else {
  reloadWorker()
}
