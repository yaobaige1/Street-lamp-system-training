const mongoose = require('mongoose')
let MarkersSchema = new mongoose.Schema({
    latitude: {
        type: mongoose.Schema.Types.Mixed,
    },
    longitude: {
        type: mongoose.Schema.Types.Mixed
    },
    id: {
        type: Number
    },
    iconPath: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    region:{
        type:String
    }
})
// 创建模型对象，对文档操作的发展对象  book 是数据库中 集合的名称  BookSchema是 结构对象 相当于文档的结构
let MarkersModel = mongoose.model('markers', MarkersSchema);

module.exports = MarkersModel