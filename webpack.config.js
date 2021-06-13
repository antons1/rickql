const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.([jt]sx?)?$/,
                use: "swc-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};