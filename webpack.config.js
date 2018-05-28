const path = require('path')
module.exports = {
    //真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    }, // 入口文件
    output: {
        // [name]就可以将出口文件名和入口文件名一一对应
        filename: '[name].js',
        path: path.resolve('dist')
    }, // 出口文件
    module: {}, // 处   理对应的模块
    plugins: [], // 处理对应的插件
    devServer: {}, // 开发服务器配置
    mode: 'development' // 模式配置
}