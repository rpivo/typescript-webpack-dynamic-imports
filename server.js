const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = 3000;

app.use('/', (req, res, next) => {
  const isInternetExplorer = req.headers['user-agent'] &&
    req.headers['user-agent'].indexOf('MSIE') > -1;

  const path = isInternetExplorer ? 'dist/gz' : 'dist/br';

  expressStaticGzip(path, {
    enableBrotli: isInternetExplorer ? false : true,
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));