const path = require('path');

module.exports = {
	mode: 'development',
	entry: ['./src/maps.js'],
	output: {
		path: path.resolve(__dirname, 'lib'),
		publicPath: '/lib/',
		filename: 'maps.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './src',
		watchContentBase: true
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env'],
						plugins: ['transform-class-properties']
					}
				}
			}
		]
	}
};
