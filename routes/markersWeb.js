var express = require('express');
var router = express.Router();
const MarkersModel = require('../models/MarkersModels')

// 首页
router.get('/index', (req, res) => {
    res.render('index_sample')
    // res.sendFile('../public/javascripts/control.js')
    // res.sendFile('../public/javascripts/jquery-3.6.4.min.js')
})

// 表单提交
router.all('/update', (req, res) => {
    console.log(req.query);
    let points = req.query.points
    let id = Number(req.query.id)
    console.log(id, points);
    // console.log("我对对对", req.body);
    let iconPath = ''
    if (points == 0) {
        iconPath = "../../images/定点.png"
    } else if (points == 1) {
        iconPath = "../../images/11.png"
    } else if (points == 2) {
        iconPath = "../../images/12.png"
    } else if (points == 3) {
        iconPath = "../../images/13.png"
    } else if (points == 4) {
        iconPath = "../../images/14.png"
    } else if (points == 5) {
        iconPath = "../../images/15.png"
    }
    console.log(iconPath);
    MarkersModel.updateOne({ id: id }, { iconPath: iconPath })
        .then(re => {
            console.log(re);
            MarkersModel.findOne({ id: id })
                .then(rea => {
                    console.log(rea);
                    res.json({
                        code: '200',
                        msg: '获取成功',
                        data: rea
                    })
                })
        })
        .catch(er => {
            res.json({
                code: '2001',
                msg: '获取失败',
                data: er
            })
        })

})
router.get('/idData', (req, res) => {
    let id = req.query.id
    MarkersModel.findOne({id:id})
        .then(rea => {
            console.log(rea);
            res.json({
                code: '200',
                msg: '获取成功',
                data: rea
            })
        })
        .catch(er => {
            res.json({
                code: '2001',
                msg: '获取失败',
                data: er
            })
        })
})
module.exports = router;