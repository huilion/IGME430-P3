const path = require('path');

module.exports = {
    entry: {
        app: './client/main.jsx',
        login: './client/login.jsx',
        feed: './client/Feed.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};