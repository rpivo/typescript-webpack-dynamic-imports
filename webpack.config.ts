const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

type Env = {
  analyze?: boolean;
};
type ArgV = {
  mode?: string;
}

module.exports = (env: Env = {}, argv: ArgV) => {
  const { analyze = false } = env;
  const { mode = 'development' } = argv;
  const reactEnv = mode === 'production' ? 'production.min' : 'development';
  let pluginsArray = [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        `node_modules/react/umd/react.${reactEnv}.js`,
        `node_modules/react-dom/umd/react-dom.${reactEnv}.js`,
      ],
    }),
    new HtmlWebpackPlugin({
      reactEnv,
      template: './src/index.html',
    }),
  ];
  if (analyze) pluginsArray.push(new BundleAnalyzerPlugin());

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
      occurrenceOrder: true,
      providedExports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      splitChunks: {
        chunks: 'all',
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
