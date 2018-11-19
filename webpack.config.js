const webpack = require('webpack');
const path = require('path');


module.exports = {
  mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./src", // string | object | array  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string    // the filename template for entry chunks
    publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
    library: "MyLibrary", // string,
    // the name of the exported library
    libraryTarget: "umd", // universal module definition    // the type of the exported library
  /* Advanced output configuration (click to show) */  },
  module: {
    // configuration regarding modules
    rules: [
      // TODO go back and look at old webpack config's loaders for glsl
      {
        enforce: "pre",
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        },
      },
      {
        test: /\.html$/,
        use: [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },
      { oneOf: [ /* rules */ ] },
      // only use one of these nested rules
      { rules: [ /* rules */ ] },
      // use all of these nested rules (combine with conditions to be useful)
      { resource: { and: [ /* conditions */ ] } },
      // matches only if all conditions are matched
      { resource: { or: [ /* conditions */ ] } },
      { resource: [ /* conditions */ ] },
      // matches if any condition is matched (default for arrays)
      // { resource: { not: /* condition */ } }
      // matches if the condition is not matched
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      './src',
      'node_modules/three/examples/js',
      // 'node_modules/three/examples/fonts'
      // 'local_modules',
    ],
    // directories where to look for modules
    extensions: [".js", ".json"],
    // extensions that are used
  },
  performance: {
    hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: "web", // enum  // the environment in which the bundle should run
  stats: "errors-only",  // lets you precisely control what bundle information gets displayed
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      THREE: 'three/build/three.js',
      Stats: 'three/examples/js/libs/stats.min'
    }),
    new webpack.HotModuleReplacementPlugin({ }),
    /* 
     * TODO use this plugin for assets
    new CopyWebpackPlugin([
      {from: 'src/textures',to:'textures'},
      {from: 'src/models',to:'models'},
    ])
    */
  ],
}
