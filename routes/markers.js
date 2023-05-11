var express = require('express');
var router = express.Router();
const MarkersModel = require('../models/MarkersModels')

router.get('/data', (req, res) => {
    MarkersModel.find()
        .then(re => {
            console.log("获取成功", res);
            res.json({
                code: '200',
                msg: '获取成功',
                data: re
            })
        })
        .catch(err => {
            console.log("获取失败", err);
            res.json({
                code: '401',
                msg: '获取失败',
                data: null
            })
        })
})

router.post('/data', (req, res) => {
    console.log("我是id", req.body._id);
    MarkersModel.findById(req.body._id)
        .then(re => {
            console.log("获取成功", res);
            res.json({
                code: '200',
                msg: '获取成功',
                data: re
            })
        })
        .catch(err => {
            console.log("获取失败", err);
            res.json({
                code: '401',
                msg: '获取失败',
                data: null
            })
        })
})

// 修改
router.post('/update', (req, res) => {
    MarkersModel.updateOne({ _id: req.body._id }, { iconPath: req.body.iconPath })
        .then(re => {
            MarkersModel.findById({ _id: req.body._id })
                .then(re => {
                    res.json({
                        code: '0000',
                        msg: '修改成功',
                        data: re
                    })
                })
                .catch(err => {
                    res.json({
                        code: '1010',
                        msg: '修改失败',
                        data: err
                    })
                })
        })
        .catch(err => {
            res.json({
                code: '1007',
                msg: '修改失败',
                data: null
            })
        })
})


// 创建
router.post('/create', (req, res) => {
    MarkersModel.create({ ...req.body })
        .then(re => {
            console.log("添加成功", re);
            res.json({
                code: '2000',
                msg: '创建成功',
                data: re
            })
        })
        .catch(err => {
            console.log("添加失败", err);
            res.json({
                code: '1008',
                msg: '创建失败',
                data: err
            })
        })
})

module.exports = router;