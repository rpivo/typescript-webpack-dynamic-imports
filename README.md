### Optimizations

#### compression-webpack-plugin
For production builds, **compression-webpack-plugin** compresses all files to both brotli and gzip formats. These files can then be selectively served depending on if the browser can work with brotli compression or not.