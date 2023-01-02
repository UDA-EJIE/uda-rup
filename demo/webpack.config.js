/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createBackendServer = require('../backend.js');
createBackendServer(8081);

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        main: path.resolve(__dirname, 'app/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'demo/js/[name].js',
        chunkFilename: 'demo/js/[name].js'
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        port: 8080,
        proxy: [{
            context: '/audit',
            target: 'http://localhost:8081/'
        }, {
            context: '/demo/rup/resources',
            target: 'http://localhost:8080/',
            pathRewrite: {
                '/demo/rup/resources': '/i18n'
            }
        }, {
            context: ['/demo', '/demo/api'],
            target: 'http://localhost:8081/',
            pathRewrite: {
                '/demo/api': '/demo'
            }
        }],
        open: {
        	target: ["demo/index.html"],
        	app: {
        		name: "firefox",
        	},
        },
        client: {
        	progress: true
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            Popper: ['popper.js', 'default'],
        }),

        new HtmlWebpackPlugin({
            template: './demo/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],

    module: {
        rules: [
            {
                test: require.resolve('jquery-migrate'),
                use: 'imports-loader?define=>false',
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    knownHelpers: ['i18n'],
                    helperDirs: [
                        path.join(__dirname, '../src/helper'),

                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS 
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                    	postcssOptions: {
                    		plugins: function () { // post css plugins, can be exported to postcss.config.js
                            	return [
                                	require('precss'),
                                	require('autoprefixer')
                                ];
                        	}
                    	}
                    }
                }, {
                    loader: 'sass-loader',
                    options: {}
                }]
            }, {
                test: /\.png$|\.gif$|\.cur$|\.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: '/'
                    }
                }]
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                use: [{
                    loader: 'url-loader'
                }]
            }, {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        publicPath: '/rup/html/templates/rup_calendar/',
                        outputPath: 'rup/html/templates/rup_calendar/'
                    }
                },
            }
        ]
    },
    resolve: {

        modules: ['node_modules', path.resolve(__dirname, 'app'), 'src'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js',
            'marionette': 'backbone.marionette/lib/backbone.marionette.js',

            'jqueryUI': 'jquery-ui-dist/jquery-ui.js',

            'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
            'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
            'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
            'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
            'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',

            'calendar': path.join(__dirname, '../src/external/bootstrap-calendar'),

            // CSS ROUTES
            './images': path.join(__dirname, '../assets/images'),
            '../images': path.join(__dirname, '../demo/images'),
            './cursors': path.join(__dirname, '../assets/cursors'),
            '../css/images/table': path.join(__dirname, '/images'),
            './externals/icons': '@mdi/font/fonts',
            './fonts': path.join(__dirname, '../assets/fonts'),
            '../fonts': '@mdi/font/fonts/'
        }

    }
};