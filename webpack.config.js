const path = require('path')
module.exports = {
    entry: './src/index.js', // 入口文件
    output: { 
        filename:'bundle.js',
        path:path.resolve('dist')
    }, // 出口文件
    module: {}, // 处   理对应的模块
    plugins: [], // 处理对应的插件
    devServer: {}, // 开发服务器配置
    mode: 'development' // 模式配置
}