// lgt :[
//     "http://127.0.0.1:3000/images/l0.png",//status=0
//     "http://127.0.0.1:3000/images/l1.png",//1
//     "http://127.0.0.1:3000/images/l2.png",
//     "http://127.0.0.1:3000/images/l3.png",
//     "http://127.0.0.1:3000/images/l4.png",
//     "http://127.0.0.1:3000/images/l5.png",

//   ]
var global = {

    map: {},
    // /idData
    get_node_list: "http://127.0.0.1:3000/markers/data",
    get_node_detail: "http://127.0.0.1:3000/markersWeb/idData",
    set_node: "http://127.0.0.1:3000/markersWeb/update",
    get_areas: "http://127.0.0.1:5000/get_areas",
    add_node: "http://127.0.0.1:5000/add_node",
    lgt: [
        "http://127.0.0.1:3000/images/定点.png",//status=0
        "http://127.0.0.1:3000/images/l1.png",//1
        "http://127.0.0.1:3000/images/l2.png",
        "http://127.0.0.1:3000/images/l3.png",
        "http://127.0.0.1:3000/images/l4.png",
        "http://127.0.0.1:3000/images/l5.png",

    ],
    quyu:[{longitude:113.364715,latitude:23.133341},{longitude:113.359886,latitude:23.128139},{longitude:113.371416,latitude:23.129723}]

}


$(document).ready(function () {//jQuery  对原生js一种简化   实现应用思路 没有变化  小程序 onload


    console.log("ready");

    initMap();
    var area = 3;//下拉菜单   select
    loadNodeList(1, 2,0,0);//area, 2 路灯

    $("select").change(function () {
        console.log($("select option:selected").val())
        let index = $("select option:selected").val()
        switch (index) {
            case "1":
                console.log("a");
                // 设置以其中一个灯杆为地图中心
                var point = new BMap.Point(global.quyu[0].longitude, global.quyu[0].latitude);
                global.map.centerAndZoom(point, 20);
                break;
            case "2":
                console.log("b");
                // 设置以其中一个灯杆为地图中心
                var point = new BMap.Point(global.quyu[1].longitude, global.quyu[1].latitude);
                global.map.centerAndZoom(point, 20);
                break;
            case "3":
                console.log("c");
                // 设置以其中一个灯杆为地图中心
                var point = new BMap.Point(global.quyu[2].longitude,global.quyu[2].latitude);
                global.map.centerAndZoom(point, 20);
                break;
        }

    })
    // text()  == val()



});
let map = ''
function initMap() {
    // 百度地图API功能
    map = new BMap.Map("allmap", { coordsType: 3 });  // 创建Map实例
    global.map = map;//浅复制

    //map.centerAndZoom("广州", 15);      // 初始化地图,用城市名设置地图中心点

    var point = new BMap.Point(113.37126, 23.13928);

    map.centerAndZoom(point, 20);

    map.enableScrollWheelZoom(true);

    // var marker = new BMap.Marker(point);        // 创建标注    
    // var myIcon = new BMap.Icon("../res/l4.png", new BMap.Size(25, 25));      

    // marker.setIcon(myIcon);

    // var id = 2;
    // marker.addEventListener("click", () => { alert(id); });
    // map.addOverlay(marker);                     // 将标注添加到地图中 


}

let nodes = []
function loadNodeList(area, type,a,b) {
    $.getJSON(
        global.get_node_list,
        {
            "area": area,
            "type": type
        },
        function (data) {
            console.log("loadNodeList", data.data)

            nodes = JSON.parse(JSON.stringify(data.data));// nodes 对data的深复制
            console.log("我是nodes", nodes);
            nodes.forEach(el => {
                var point = new BMap.Point(el.longitude, el.latitude);
                var marker = new BMap.Marker(point);        // 创建标注   
                var idx = 1;
                if (el.iconPath == "../../images/定点.png") {
                    idx = 0
                } else if (el.iconPath == "../../images/11.png") {
                    idx = 1
                } else if (el.iconPath == "../../images/12.png") {
                    idx = 2
                } else if (el.iconPath == "../../images/13.png") {
                    idx = 3
                } else if (el.iconPath == "../../images/14.png") {
                    idx = 4
                } else if (el.iconPath == "../../images/15.png") {
                    idx = 5
                }

                var id = el.id;
                marker.addEventListener("click", () => {
                    //  alert(id);

                    $.get(global.get_node_detail, { id: id }, function (data) {
                        console.log("我是点击后获取的新数据", data);
                        let info = data.data
                        // info = data.data.find(item => {
                        //     return item.id = id
                        // })
                        console.log("我是info", data);
                        // console.log("我是打印的id",id);
                        // let quyu = document.querySelector('.quyu')
                        // quyu.innerHTML(info.region)

                        $(".quyu").text(info.region);
                        $(".shebei").text(info.id);
                        if (info.iconPath == "../../images/定点.png") {
                            $(".ztai").text("全灭");
                            $("#points").val(0);
                        } else if (info.iconPath == "../../images/11.png") {
                            $(".ztai").text("一亮三灭");
                            $("#points").val(1);
                        } else if (info.iconPath == "../../images/12.png") {
                            $(".ztai").text("两亮两灭");
                            $("#points").val(2);
                        } else if (info.iconPath == "../../images/13.png") {
                            $(".ztai").text("三亮一灭");
                            $("#points").val(3);
                        } else if (info.iconPath == "../../images/14.png") {
                            $(".ztai").text("全亮");
                            $("#points").val(4);
                        } else if (info.iconPath == "../../images/15.png") {
                            $(".ztai").text("故障");
                            $("#points").val(5);
                        }
                        $("#iddd").val(info.id);
                    })


                });

                var myIcon = new BMap.Icon(global.lgt[idx], new BMap.Size(25, 25));
                marker.setIcon(myIcon);
                global.map.addOverlay(marker);
                console.log("我是el", el);
            });
            // 设置以其中一个灯杆为地图中心
            // var point = new BMap.Point(nodes[0].longitude, nodes[0].latitude);
            // global.map.centerAndZoom(point, 20);
            var point = new BMap.Point(nodes[a].longitude, nodes[b].latitude);
            global.map.centerAndZoom(point, 20);

        }
    );

}

