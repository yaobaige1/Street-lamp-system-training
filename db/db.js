/**
 * 
 * @param {*} success 
 * @param {*} error 
 */
module.exports = function (success, error) {
    if (typeof error == 'function') {
        error = () => {
            console.log("连接失败");
        }
    }
    // 安装 mongoose   npm i mongoose
    // 导入 mongoose
    const mongoose = require('mongoose')
    const { DBHOST, DBPORT, DBNAME } = require('../config/config')
    // 连接mongoose服务                        数据库名称  有则使用 没有则创建并且使用
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    //设置 strictQuery 为 true 可有可无
    mongoose.set('strictQuery', true)

    // 设置回调
    //设置连接成功回调  once 就运行一次  防止服务器掉线 后上线 反复调用 
    mongoose.connection.once('open', () => {
        success()
    })

    //设置连接错误的回调
    mongoose.connection.once('error', () => {
        error()
    })

    //设置连接关闭的回调
    mongoose.connection.once('close', () => {
        console.log("连接关闭");
    })

}