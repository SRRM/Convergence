const watch = require('watch')
const reload = require('require-reload')(require)
const chalk = require('chalk')
const vecroute = require('./shared/vecroute')
let worker = reload('./worker')
// let model = await vecroute


async function teardownWorker () {
  try {
    return new Promise(async (resolve, reject) => {
      if (worker) {
        console.log(chalk.green('Tearing down worker...'))
        await worker.teardown()
        console.log(chalk.green('...done!'))
        worker = undefined
        resolve()
      }
      else {
        resolve()
      }
    })
  }
  catch (error) {
    console.log(chalk.red(`
      Experienced an error while tearing down the worker.
      Exiting program as we cannot reliably recover from this state.
    `))
    console.error(error)
    process.exit()
  }
}

const reloadWorker = async () => {
  try {

    await teardownWorker()
    worker = reload('./worker')
    let model = await vecroute
    await worker.start(model)
  }
  catch (error) {
    console.error(chalk.red('Encountered error while reloading the worker...'))
    console.error(chalk.red('Waiting for code change to reload'))
    teardownWorker()
    console.error(error)
  }
}

if (process.env.NODE_ENV !== 'production') {
  watch.watchTree(__dirname + '/routes', { interval: 1 }, reloadWorker)
}
else {
  reloadWorker()
}
