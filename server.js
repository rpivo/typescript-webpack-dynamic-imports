const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = 3000;

app.use('/', expressStaticGzip('dist', {
  enableBrotli: true
 }));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));