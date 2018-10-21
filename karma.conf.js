const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = config => {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      './test/WeatherComponent.test.js',
    ],

    preprocessors: {
      'src/assets/js/WeatherComponent.vue': ['webpack'],
      'test/*.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [ "@babel/preset-env" ],
                compact: false
              }
            }
          },
        ]
      },
      devtool: 'source-map',
      resolve: {
        extensions: ['.js', '.vue', '.json'],
      },
      plugins: [
        new VueLoaderPlugin(),
      ]
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
      }
    },

    browsers: ['PhantomJS', 'PhantomJS_custom'],

    // you can define custom flags
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};
