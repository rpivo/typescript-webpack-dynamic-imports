const fs = require('fs');
const util = require('util');

const path = './reports/';
const files = fs.readdirSync(path);

const readFile = util.promisify(fs.readFile);

// dynamic list of metrics to calculate
let metrics = [];
metrics.push(['brotli', files.filter(file => file.includes('br-'))]);
metrics.push(['gzip', files.filter(file => file.includes('gz-'))]);

const getPromises = group =>
  group.map(singleFile => readFile(`${path}${singleFile}`)
    .then(singleFileContent => JSON.parse(singleFileContent)));

const getAverage = (contentArr, metricName) => {
  let itemArr = [];
  for (item of contentArr) itemArr.push(item.audits['first-contentful-paint'].numericValue);
  const average = itemArr.reduce((acc, curr) => acc + curr, 0);
  console.log(`${metricName} / average first-contentful-paint: ${average / contentArr.length}`);
}

metrics.forEach(metric => {
  Promise.all(getPromises(metric[1]))
    .then(results => getAverage(results, metric[0]))
    .catch(function (error) {
      return error;
    });
});