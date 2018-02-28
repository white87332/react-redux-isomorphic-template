const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry:
    {
        app: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            'babel-polyfill',
            `${path.resolve(__dirname, 'common')}/containers/app`
        ],
        // vendor: ['react', 'react-dom']
    },
    output:
    {
        path: '/asset/js/bundle/',
        filename: 'bundle.js',
        publicPath: '/asset/js/bundle/',
        chunkFilename: 'chunk.[chunkhash].js'
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
                    presets: ['react-hmre', ['env', { modules: false }], 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-async-to-generator']
                }
            },
            {
                test: /\.css|\.scss$/,
                use: [
                    'style',
                    {
                        loader: 'css',
                        options: {
                            options: { modules: false },
                        },
                    },
                    'sass?outputStyle=compressed',
                    'postcss'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
            },
        ],
        exprContextCritical: false
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NormalModuleReplacementPlugin(
            /.\/containerServer/,
            './containerClient'
        )
    ]
};
