const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    // entry:['./src/index.js','./src/login.js'],
    //真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: __dirname + '/src/index.js',
        login: __dirname + '/src/login.js'
    }, // 入口文件
    output: {
        // [name]就可以将出口文件名和入口文件名一一对应
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: '[name][hash:4].js',
        path: path.resolve('dist')
    }, // 出口文件
    resolve: {
        // 别名
        alias: {
            $: './src/jquery.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use:'babel-loader',
                include:'/src/', // 支转换 src 目录下的
                exclude:'/node_modules/' // 排除
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            }
        ]
    }, // 处   理对应的模块
    plugins: [
        // 打包前先清空
        new CleanWebpackPlugin('dist'),
        // 通过new 这个类来使用插件
        new HtmlWebpackPlugin({
            // 模板
            template: './src/index.html',
            title: 'index',
            hash: true,// 会在打包好的js 后面加hash串，
            filename: 'index.html',  // 多个页面必须制定filename
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'login',
            template: './src/login.html',
            filename: 'login.html',
            hash: true,
            chunks: ['login'] // 对应关系
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/[name].css')
    ], // 处理对应的插件
    devServer: {
        contentBase:'./dist',
        port:'8888',
        open:true, // 自动打开浏览器
        hot:false //开启热更新
    }, // 开发服务器配置
    mode: 'development' // 模式配置
}