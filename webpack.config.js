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
    template: path.join(__dirname, 'src/pages', page),
    filename: `pages/${page}`,
    inject: 'body'
  });
});

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/', 
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imagens/[name][ext][query]'
        }
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'webfonts/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/home.html',
      filename: 'index.html',
      inject: 'body'
    }),
    ...htmlPlugins,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/templates', to: 'templates' },
        { from: 'src/vendor', to: 'vendor' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      'jquery': path.resolve(__dirname, 'src/vendor/jquery/jquery.min.js'),
      'popper.js': path.resolve(__dirname, 'src/vendor/popper/popper.min.js'),
      'bootstrap': path.resolve(__dirname, 'src/vendor/bootstrap/js/bootstrap.bundle.min.js'),
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
    devMiddleware: {
      publicPath: '/'
    },
    watchFiles: ['src/**/*'],
    hot: true,
    open: true,
  },
};