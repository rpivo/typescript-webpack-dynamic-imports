## Optimizations

### Packages Used

#### compression-webpack-plugin
For production builds, **compression-webpack-plugin** compresses all files to both brotli and gzip formats. These files can then be selectively served depending on if the browser can work with brotli compression or not.

#### copy-webpack-plugin
Copies external, servable React files from `node_modules` into the `/dist` during the build.

#### express-static-gzip
In order to locally test and serve compressed brotli / gzip files, spin up a local express server and use `express-static-gzip`.

#### html-webpack-plugin
Generates an `index.html` file from a template during the build that can change depending on environment variables.