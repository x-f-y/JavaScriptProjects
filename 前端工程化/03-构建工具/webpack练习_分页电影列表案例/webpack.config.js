const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/app-[contenthash:5].js',
    // output.assetModuleFilename 与 output.filename 相同，不过应用于 Asset Modules
    assetModuleFilename: 'assets/[hash:5][ext]',
    // output.chunkFilename 与 output.filename 类似，不过应用于非入口 chunk，
    // 用于指定通过代码分割（如 import() 动态导入语法或 SplitChunksPlugin 插件）生成的 chunk 的文件名
    chunkFilename: 'js/chunk-[contenthash:5].js',
    // publicPath: './',
    clean: true,
  },
  target: 'web',
  devtool: 'source-map',
  devServer: {
    port: 8080,
    static: './dist',
    proxy: {
      '/api': {
        // 当请求地址以 api 开头时，代理到另一个地址
        target: 'https://study.duyiedu.com', // 代理的目标地址
        changeOrigin: true, // 更改请求头中的host，无须深究，为避免出问题，最好写上
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(mp3|mp4)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(gif|png|webp|svg|jpg|jpeg|bmp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:5].css',
    }),
    new CopyPlugin({
      // 应用 复制文件 插件
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: './',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
};

