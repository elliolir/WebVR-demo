module.exports = {
    entry: './src/index.jsx',
    output: { path: __dirname + "/dest/", filename: 'bundle.js' },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.less$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader', 'less-loader' ]},
            { test: /\.css$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader'] }
        ]
    }
};