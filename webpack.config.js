const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //真正实现多入口和多出口需要写成对象的方式
    entry:{
        index:__dirname+'/src/index.js',
        login:__dirname+'/src/login.js'
    }, // 入口文件
    output: {
        // [name]就可以将出口文件名和入口文件名一一对应
         // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: '[name][hash:4].js',
        path: path.resolve('dist')
    }, // 出口文件
    module: {}, // 处   理对应的模块
    plugins: [
        // 通过new 这个类来使用插件
        new HtmlWebpackPlugin({
            // 模板
            template:'./src/index.html',
            title:'index',
            hash:true ,// 会在打包好的js 后面加hash串，
            filename:'index.html',  // 多个页面必须制定filename
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            title:'login',
            template:'./src/login.html',
            filename:'login.html',
            hash:true,
            chunks:['login'] // 对应关系
        })
    ], // 处理对应的插件
    devServer: {}, // 开发服务器配置
    mode: 'development' // 模式配置
}