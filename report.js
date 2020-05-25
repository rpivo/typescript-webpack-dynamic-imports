const fs = require('fs');
const util = require('util');

const path = './reports/';
const files = fs.readdirSync(path);

const readFile = util.promisify(fs.readFile);

// dynamic list of metrics to calculate
let metrics = [];
metrics.push(['brotli', files.filter(file => file.includes('br-'))]);
metrics.push(['gzip', files.filter(file => file.includes('gz-'))]);

let report = {};

const getAllMetricAverages = (contentArr, metricName) => {
  const numericValueKeys = {
    'first-contentful-paint': 'First Contentful Paint',
    'largest-contentful-paint': 'Largest Contentful Paint',
    'first-meaningful-paint': 'First Meaningful Paint',
    'speed-index': 'Speed Index',
    'estimated-input-latency': 'Estimated Input Latency',
    'total-blocking-time': 'Total Blocking Time',
    'max-potential-fid': 'Max Potential First Input Delay',
    'cumulative-layout-shift': 'Cumulative Layout Shift',
    'server-response-time': 'Server Response Time',
    'first-cpu-idle': 'First CPU Idle',
    'interactive': 'Time to Interactive',
    'redirects': 'Redirect Delays',
    'mainthread-work-breakdown': 'Main-Thread Work Breakdown',
    'bootup-time': 'Bootup Time',
    'network-rtt': 'Network Round-Trip Time',
    'network-server-latency': 'Network Server Latency',
    'dom-size': 'DOM Size',
  };
  const diagnosticsKeys = {
    'numRequests': 'Number of Requests',
    'numScripts': 'Number of Scripts',
    'numStylesheets': 'Number of Stylesheets',
    'numFonts': 'Number of Fonts',
    'numTasks': 'Number of Tasks',
    'numTasksOver10ms': 'Number of Tasks Over 10ms',
    'numTasksOver25ms': 'Number of Tasks Over 25ms',
    'numTasksOver50ms': 'Number of Tasks Over 50ms',
    'numTasksOver100ms': 'Number of Tasks Over 100ms',
    'numTasksOver500ms': 'Number of Tasks Over 500ms',
    'maxRtt': 'Max Round-Trip Time',
    'maxServerLatency': 'Max Server Latency',
    'totalByteWeight': 'Total Byte Weight',
    'totalTaskTime': 'Total Task Time',
    'mainDocumentTransferSize': 'Main Document Transfer Size',
  };

  report[metricName] = {};

  const getAverage = arr => arr.reduce((acc, curr) => acc + curr, 0) / contentArr.length;

  console.log(`\n\x1b[37m${metricName}\n`);

  for (let [key, value] of Object.entries(numericValueKeys)) {
    let arr = [];

    for (item of contentArr) arr.push(item.audits[key].numericValue);

    const average = getAverage(arr);
    report[metricName][key] = average;
    console.log(`\x1b[37m> ${value}: \x1b[32m${getAverage(arr)}`);
  }

  for (let [key, value] of Object.entries(diagnosticsKeys)) {
    let arr = [];

    for (item of contentArr) arr.push(item.audits.diagnostics.details.items[0][key]);

    const average = getAverage(arr);
    report[metricName][key] = average;
    console.log(`\x1b[37m> ${value}: \x1b[32m${average}`);
  }
}

const getPromises = group =>
  group.map(singleFile => readFile(`${path}${singleFile}`)
    .then(singleFileContent => JSON.parse(singleFileContent)));

metrics.forEach(metric => {
  Promise.all(getPromises(metric[1]))
    .then(results => getAllMetricAverages(results, metric[0]))
    .finally(() => {
      if (Object.keys(report).length === metrics.length) {
        report = JSON.stringify(report);

        const filename = `report-${new Date().toLocaleString()}.json`
          .replace(/(\/|\s|:)/g,'-').replace(',','');

        fs.writeFile(`./reports/${filename}`, report, (err) => {
          if (err) throw err;
          console.log(`\n\x1b[37mReport written to file: \x1b[36m${filename}`);
        }); 
      }
    })
    .catch(function (error) {
      return error;
    });
});