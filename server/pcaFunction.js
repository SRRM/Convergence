//Works on any dimension
const cov = require('compute-covariance')
const eig = require('eig')
const math = require('mathjs')

const dummyData1 = [
    [2.5, 2.4],
    [0.5, 0.7],
    [2.2, 2.9],
    [1.9, 2.2],
    [3.1, 3.0],
    [2.3, 2.7],
    [2, 1.6],
    [1, 1.1],
    [1.5, 1.6],
    [1.1, 0.9]
]

const dummyData3 = [
    [2.5, 2.4, 1.2],
    [0.5, 0.7, 0.3],
    [2.2, 2.9, 0.9],
    [1.9, 2.2, 1.2],
    [3.1, 3.0, 2.1],
    [2.3, 2.7, 1.3],
    [2, 1.6, 0.4],
    [1, 1.1, 2.3],
    [1.5, 1.6, 2.8],
    [1.1, 0.9, 2.9]
]

const dummyData5 = [
    [2.5, 2.4, 1.2, 3, 7],
    [0.5, 0.7, 0.3, 4, 7],
    [2.2, 2.9, 0.9, 3, 7],
    [1.9, 2.2, 1.2, 1, 7.1],
    [3.1, 3.0, 2.1, 2, 7],
    [2.3, 2.7, 1.3, 1.1, 6.9],
    [2, 1.6, 0.4, 0.5, 7],
    [1, 1.1, 2.3, 2.4, 7],
    [1.5, 1.6, 2.8, 3.4, 7.1],
    [1.1, 0.9, 2.9, 2.3, 7]
]

module.exports = async function PCA(data) {


    // console.log('dummyData: ', dummyData)
    const dataDimension = data[0].length
    // console.log(`\nDummy data of ${dataDimension} dimensions: \n`, data)

    const transposeddata = math.transpose(data)
    // console.log('\nTransposed dummy data: \n', transposeddata)


    const getMean = dataArr => dataArr.reduce((val, acc) => val + acc) / dataArr.length
    const getMeans = transposedDataArr => transposedDataArr.map(row => getMean(row))

    const meansArray = getMeans(transposeddata)
    // console.log('\n means: \n', meansArray )

    const meanAdjustedData = data.map(dataPoint => dataPoint.map((val, idx) => val - meansArray[idx]))
    // console.log('\n mean adjusted data: \n', meanAdjustedData )

    const covarianceMatrix = cov(...transposeddata)
    // console.log('\n covariance matrix of n dimensional data: \n', covarianceMatrix )

    const eigResult = await eig(covarianceMatrix)

    const firstVector = eigResult.eigenvectors[0].reverse()
    const secondVector = eigResult.eigenvectors[1].reverse()

    const featureVector = [firstVector, secondVector]

    console.log(math.size(featureVector))
    // console.log('\n feature vector: \n', featureVector)

    const rowDataAdjust = transposeddata

    console.log(math.size(rowDataAdjust))

    const finalData = math.multiply(featureVector, rowDataAdjust)
    // console.log('\nfinalData: \n', finalData, '\n')
    return math.transpose(finalData)
}
// asyncFunc()

