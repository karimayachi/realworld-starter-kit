module.exports = [
  {
    mode: 'development',
    entry: './src/index.ts',
    target: 'web',
    devtool: 'inline-source-map', devServer: {
      contentBase: './public',
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/dist/',
      filename: 'index.js',
    }
  }
];