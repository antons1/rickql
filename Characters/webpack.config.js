const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies
const sharedDeps = Object.keys(deps).reduce((acc, curr) => Object.assign(acc, { [curr]: { singleton: true }}), {});

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
        new ModuleFederationPlugin({
            name: "characters",
            library: { type: "var", name: "characters" },
            filename: "remoteEntry.js",
            exposes: {
                "./Character": "./components/Character"
            },
            shared: sharedDeps
        })
    ],
    devServer: {
        port: process.env.PORT || 3001
    }
};