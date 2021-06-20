const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies
const sharedDeps = Object.keys(deps).reduce((acc, curr) => Object.assign(acc, { [curr]: { singleton: true, eager: true }}), {});

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: "bundle-loader",
                options: {
                    lazy: true
                }
            },
            {
                test: /\.([jt]sx?)?$/,
                loader: "swc-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./index.html" }),
        new ModuleFederationPlugin({
            name: "episodes",
            remotes: {
                characters: "characters@http://localhost:3001/remoteEntry.js"
            },
            shared: sharedDeps
        })
    ],
    devServer: {
        port: process.env.PORT || 3000
    }
};