const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry:
    {
        app: [
            'babel-polyfill',
            `${path.resolve(__dirname, 'common')}/containers/app`
        ]
    },
    output:
    {
        path: path.resolve(__dirname, 'public', 'dist/'),
        filename: 'bundle.min.js',
        publicPath: '/dist/',
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
        )
    ],
};
