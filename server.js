const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const port = 3000;

app.use('/gz', expressStaticGzip('dist/gz', {
  enableBrotli: true,
}));

app.use('/br', expressStaticGzip('dist/br', {
  enableBrotli: true,
}));

app.listen(port, () => {
  console.log(`\n\nbrotli compressed files --> http://localhost:${port}/br/index.html`);
  console.log(`\n\ngzip compressed files --> http://localhost:${port}/gz/index.html`);
});