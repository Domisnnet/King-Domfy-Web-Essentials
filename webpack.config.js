const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = [
  "ajuda.html", "aplicativo-movel-gratis.html", "artistas.html", "baixar.html",
  "cookies.html", "desenvolvedores.html", "empregos.html", "entrar.html",
  "imprensa.html", "inscrever-se.html", "legal.html", "lgpd.html", "marcas.html",
  "novidades.html", "player.html", "premium.html", "privacidade-termos.html",
  "privacidade.html", "sobre.html", "suporte.html", "termos.html"
];

const htmlPlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/pages', page),
    filename: `pages/${page}`,
    inject: 'body',
    minify: false
  });
});

module.exports = {
  mode: 'development', 
  entry: path.resolve(__dirname, 'src/js/app.js'),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false,
          esModule: false,
          sources: {
            list: [
              '...',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imagens/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'webfonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/home.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false
    }),

    ...htmlPlugins,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/templates'),
          to: 'templates',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/vendor'),
          to: 'vendor',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@imagens': path.resolve(__dirname, 'src/imagens'),
      'jquery': path.resolve(__dirname, 'src/vendor/jquery/jquery.min.js'),
    },
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    devMiddleware: {
      publicPath: '/',
    },
    watchFiles: ['src/**/*'],
    hot: true,
    open: true,
    port: 3000,
  },
};