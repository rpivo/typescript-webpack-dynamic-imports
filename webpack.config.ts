const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

type ArgV = {
  mode?: string;
};

type Env = {
  analyze?: boolean;
};

type Module = {
  context: string;
};

module.exports = (env: Env = {}, argv: ArgV = {}) => {
  const { analyze = false } = env;
  const { mode = 'development' } = argv;

  const reactString = mode === 'production' ? 'production.min' : 'development';

  let pluginsArray = [
    new CopyPlugin({
      patterns: [
        `node_modules/react/umd/react.${reactString}.js`,
        `node_modules/react-dom/umd/react-dom.${reactString}.js`,
      ],
    }),
    new HtmlWebpackPlugin({
      reactString,
      template: './src/index.html',
    }),
  ];

  if (analyze) pluginsArray.push(new BundleAnalyzerPlugin());
  if (!analyze && mode === 'production') {
    pluginsArray.push(new CompressionPlugin({
      algorithm: 'gzip',
      deleteOriginalAssets: true,
      filename: '[path].gz[query]',
      minRatio: 0.8,
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    }));
    pluginsArray.push(new CompressionPlugin({
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: 11,
      },
      deleteOriginalAssets: true,
      filename: '[path].br[query]',
      minRatio: 0.8,
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
    })); 
  };

  return {
    devServer: {
      compress: true,
      contentBase: './dist',
      hot: true,
      open: true,
      port: 1235,
      writeToDisk: true,
    },
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      rules: [
        {
          include: path.join(__dirname, 'src'),
          loader: 'ts-loader',
          test: /\.ts$|tsx/,
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize: 100000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module: Module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)![1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
    },
    plugins: pluginsArray,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin({})],
    },
  };
};
