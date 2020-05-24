### Packages Used

#### compression-webpack-plugin
For production builds, **compression-webpack-plugin** compresses all files to both brotli and gzip formats. These files can then be selectively served depending on if the browser can work with brotli compression or not.

#### copy-webpack-plugin
Copies external, servable React files from `node_modules` into the `/dist` folder during the build.

#### express-static-gzip
In order to locally test and serve compressed brotli / gzip files, spin up a local express server that uses `express-static-gzip` to serve these compressed files.

#### html-webpack-plugin
Generates an `index.html` file from a template during the build that can change depending on environment variables.

#### webpack-bundle-analyzer
Graphically displays chunk and bundle sizes, providing a deeper understanding of the build output.

<hr />

### Optimizations

#### brotli & gzip Compression
Webpack builds both brotli and gzip files, outputting these files into `/br` and `/gz` folders inside the `/dist` output folder. When the local express server is spun up, each of these folder paths can be tested for performance (the brotli folder will generally be lighter). 

#### Dynamic Imports
Inside **App.tsx** is an example of a dynamic import. When serving the build, clicking on the rendered button results in lazy-loaded imports. These dynamic imports can be seen coming in on the network tab when the button is clicked rather than on page load.

#### Webpack `maxSize`
Webpack is set to output bundles and chunks with a `maxSize` of 244,000 bytes. Webpack identifies files larger than 244kb as `big`.