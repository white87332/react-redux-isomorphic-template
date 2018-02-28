const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry:
    {
        app: [
            'babel-polyfill',
            `${path.resolve(__dirname, 'common')}/containers/app`
        ],
        // vendor: ['react', 'react-dom']
    },
    output:
    {
        path: path.resolve(__dirname, 'public', 'asset/js/bundle/'),
        filename: 'bundle.min.js',
        publicPath: '/asset/js/bundle/',
        chunkFilename: 'chunk.[chunkhash].min.js'
    },
    module:
    {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'common'),
                exclude: /node_modules/,
                query:
                {
                    presets: [['env', { modules: false }], 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-async-to-generator']
                }
            },
            {
                test: /\.css|\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: [
                        'css',
                        'sass',
                        'postcss'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
            }
        ],
        exprContextCritical: false
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /.\/containerServer/,
            './containerClient'
        ),
        new ExtractTextPlugin({
            filename: '../../css/bundle/bundle.min.css',
            allChunks: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.min.js'
        // })
    ],
};
