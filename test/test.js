console.log('style-handle: test');


// modules
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const opener = require('opener');

const config = {
	entry: {
		app: [
			"webpack-dev-server/client?http://localhost:8080/",
			"webpack/hot/dev-server",
			'./test/index.js'
		]
	},
	output: {
		path: __dirname,
		filename: 'bundle_index.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				ignore: [
					'babel-polyfill',
					'core-js'
				],
				presets: [
					"babel-preset-es2015",
					"babel-preset-stage-0"
				]
			}
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //hotの依存
	]
}

const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
	contentBase: "./test/",
	hot: true,
	inline: true
});
server.listen(8080, 'localhost', (arg)=>{
	opener('http://localhost:8080/');
});
