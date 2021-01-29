import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var layersMap = new Map([['http://localhost:6080/arcgis/services/shanzhu_test/MapServer/WMSServer', '雷达雨量图'], ['http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali', "谷歌影像图"], ['http://localhost:6080/arcgis/services/warnline/MapServer/WMSServer', '警戒线'], ['http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=d99ffacb3eeafd378927c060ab39bdab', '中文注记'],
['http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb', '天地图矢量图']
])
export default new Vuex.Store({
    state: {
        layers: layersMap,
        typhoonTestData: [
            {
            "time": "2018-09-07T20:00:00",
            "longitude": 165.3,
            "latitude": 12.9,
            "strong": "热带风暴(TS)",
            "power": 8,
            "speed": 18,
            "move_dir": "西西北",
            "move_speed": 28,
            "pressure": 1000,
            "radius7": 250,
            "radius10": 0,
            "radius12": 0,
            "radius7_quad": {
                "ne": 250,
                "se": 150,
                "sw": 150,
                "nw": 150
            },
            "radius10_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "radius12_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "remark": "",
            "forecast": [
                {
                    "sets": "日本",
                    "points": [
                        {
                            "time": "2018-09-08T08:00:00",
                            "longitude": 162.6,
                            "latitude": 13.6,
                            "strong": "热带风暴(TS)",
                            "power": 8,
                            "speed": 18,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 998,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-08T20:00:00",
                            "longitude": 159.2,
                            "latitude": 14.2,
                            "strong": "热带风暴(TS)",
                            "power": 8,
                            "speed": 20,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 996,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T20:00:00",
                            "longitude": 152.3,
                            "latitude": 13.6,
                            "strong": "强热带风暴(STS)",
                            "power": 10,
                            "speed": 25,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T20:00:00",
                            "longitude": 146.4,
                            "latitude": 13.0,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 975,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                },
                {
                    "sets": "中国",
                    "points": [
                        {
                            "time": "2018-09-08T08:00:00",
                            "longitude": 162.0,
                            "latitude": 13.7,
                            "strong": "热带风暴(TS)",
                            "power": 8,
                            "speed": 20,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 995,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-08T20:00:00",
                            "longitude": 159.1,
                            "latitude": 14.0,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 23,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T08:00:00",
                            "longitude": 155.7,
                            "latitude": 13.9,
                            "strong": "强热带风暴(STS)",
                            "power": 10,
                            "speed": 25,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 985,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T20:00:00",
                            "longitude": 152.1,
                            "latitude": 13.7,
                            "strong": "强热带风暴(STS)",
                            "power": 10,
                            "speed": 28,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 982,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T08:00:00",
                            "longitude": 148.7,
                            "latitude": 13.1,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 30,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T20:00:00",
                            "longitude": 145.7,
                            "latitude": 12.3,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 970,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T20:00:00",
                            "longitude": 141.9,
                            "latitude": 11.9,
                            "strong": "台风(TY)",
                            "power": 13,
                            "speed": 38,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 965,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-12T20:00:00",
                            "longitude": 138.5,
                            "latitude": 13.2,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 42,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 955,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                },
                {
                    "sets": "韩国",
                    "points": [
                        {
                            "time": "2018-09-08T20:00:00",
                            "longitude": 159.5,
                            "latitude": 14.5,
                            "strong": "热带风暴(TS)",
                            "power": 8,
                            "speed": 20,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 996,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T20:00:00",
                            "longitude": 151.9,
                            "latitude": 14.2,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 24,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T20:00:00",
                            "longitude": 146.5,
                            "latitude": 13.4,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 970,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T20:00:00",
                            "longitude": 142.6,
                            "latitude": 13.6,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 43,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 950,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-12T20:00:00",
                            "longitude": 139.5,
                            "latitude": 15.2,
                            "strong": "强台风(STY)",
                            "power": 15,
                            "speed": 50,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 930,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                }
            ]
        },
          {
            "time": "2018-09-08T02:00:00",
            "longitude": 163.8,
            "latitude": 13.0,
            "strong": "热带风暴(TS)",
            "power": 8,
            "speed": 18,
            "move_dir": "西西北",
            "move_speed": 28,
            "pressure": 998,
            "radius7": 350,
            "radius10": 0,
            "radius12": 0,
            "radius7_quad": {
                "ne": 350,
                "se": 150,
                "sw": 150,
                "nw": 250
            },
            "radius10_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "radius12_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "remark": "",
            "forecast": [
                {
                    "sets": "中国",
                    "points": [
                        {
                            "time": "2018-09-08T14:00:00",
                            "longitude": 160.6,
                            "latitude": 13.7,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 23,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T02:00:00",
                            "longitude": 157.4,
                            "latitude": 14.0,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 30,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T14:00:00",
                            "longitude": 153.9,
                            "latitude": 13.9,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 970,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T02:00:00",
                            "longitude": 150.4,
                            "latitude": 13.5,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 42,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 955,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T14:00:00",
                            "longitude": 147.5,
                            "latitude": 12.8,
                            "strong": "超强台风(Super TY)",
                            "power": 16,
                            "speed": 52,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 935,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T02:00:00",
                            "longitude": 144.8,
                            "latitude": 12.3,
                            "strong": "超强台风(Super TY)",
                            "power": 16,
                            "speed": 55,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 930,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-12T02:00:00",
                            "longitude": 141.0,
                            "latitude": 12.2,
                            "strong": "超强台风(Super TY)",
                            "power": 17,
                            "speed": 60,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 920,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-13T02:00:00",
                            "longitude": 137.5,
                            "latitude": 13.7,
                            "strong": "超强台风(Super TY)",
                            "power": 17,
                            "speed": 60,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 920,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                },
                {
                    "sets": "日本",
                    "points": [
                        {
                            "time": "2018-09-09T02:00:00",
                            "longitude": 157.5,
                            "latitude": 14.2,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 23,
                            "move_dir": "西",
                            "move_speed": 31,
                            "pressure": 992,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T02:00:00",
                            "longitude": 150.6,
                            "latitude": 13.9,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 31,
                            "move_dir": "西",
                            "move_speed": 31,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T02:00:00",
                            "longitude": 145.2,
                            "latitude": 13.2,
                            "strong": "台风(TY)",
                            "power": 13,
                            "speed": 39,
                            "move_dir": "西",
                            "move_speed": 24,
                            "pressure": 965,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                },
                {
                    "sets": "韩国",
                    "points": [
                        {
                            "time": "2018-09-09T02:00:00",
                            "longitude": 157.9,
                            "latitude": 14.2,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 24,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T02:00:00",
                            "longitude": 150.1,
                            "latitude": 13.8,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 29,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T02:00:00",
                            "longitude": 144.9,
                            "latitude": 12.9,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 970,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-12T02:00:00",
                            "longitude": 141.5,
                            "latitude": 13.8,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 43,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 950,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-13T02:00:00",
                            "longitude": 138.4,
                            "latitude": 15.5,
                            "strong": "强台风(STY)",
                            "power": 15,
                            "speed": 50,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 930,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                }
            ]
        },
          {
            "time": "2018-09-08T05:00:00",
            "longitude": 162.9,
            "latitude": 13.1,
            "strong": "热带风暴(TS)",
            "power": 8,
            "speed": 18,
            "move_dir": "西西北",
            "move_speed": 25,
            "pressure": 998,
            "radius7": 200,
            "radius10": 0,
            "radius12": 0,
            "radius7_quad": {
                "ne": 200,
                "se": 150,
                "sw": 150,
                "nw": 200
            },
            "radius10_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "radius12_quad": {
                "ne": 0,
                "se": 0,
                "sw": 0,
                "nw": 0
            },
            "remark": "",
            "forecast": [
                {
                    "sets": "中国",
                    "points": [
                        {
                            "time": "2018-09-08T17:00:00",
                            "longitude": 160.1,
                            "latitude": 13.7,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 23,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 990,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T05:00:00",
                            "longitude": 156.9,
                            "latitude": 13.9,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 30,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-09T17:00:00",
                            "longitude": 153.5,
                            "latitude": 13.8,
                            "strong": "台风(TY)",
                            "power": 12,
                            "speed": 35,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 970,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T05:00:00",
                            "longitude": 150.0,
                            "latitude": 13.3,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 42,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 955,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T17:00:00",
                            "longitude": 147.2,
                            "latitude": 12.7,
                            "strong": "强台风(STY)",
                            "power": 14,
                            "speed": 45,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 950,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T05:00:00",
                            "longitude": 144.7,
                            "latitude": 12.1,
                            "strong": "强台风(STY)",
                            "power": 15,
                            "speed": 50,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 940,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-12T05:00:00",
                            "longitude": 141.0,
                            "latitude": 12.6,
                            "strong": "超强台风(Super TY)",
                            "power": 16,
                            "speed": 55,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 930,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-13T05:00:00",
                            "longitude": 137.7,
                            "latitude": 14.6,
                            "strong": "超强台风(Super TY)",
                            "power": 17,
                            "speed": 60,
                            "move_dir": null,
                            "move_speed": null,
                            "pressure": 920,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                },
                {
                    "sets": "日本",
                    "points": [
                        {
                            "time": "2018-09-09T05:00:00",
                            "longitude": 156.7,
                            "latitude": 14.2,
                            "strong": "热带风暴(TS)",
                            "power": 9,
                            "speed": 23,
                            "move_dir": "西",
                            "move_speed": 31,
                            "pressure": 992,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-10T02:00:00",
                            "longitude": 150.6,
                            "latitude": 13.9,
                            "strong": "强热带风暴(STS)",
                            "power": 11,
                            "speed": 31,
                            "move_dir": "西",
                            "move_speed": 31,
                            "pressure": 980,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        },
                        {
                            "time": "2018-09-11T02:00:00",
                            "longitude": 145.2,
                            "latitude": 13.2,
                            "strong": "台风(TY)",
                            "power": 13,
                            "speed": 39,
                            "move_dir": "西",
                            "move_speed": 24,
                            "pressure": 965,
                            "radius7": null,
                            "radius10": null,
                            "remark": null
                        }
                    ]
                }
            ]
        },
    ]
    },
    mutation: {

    },
    actions: {

    }
})