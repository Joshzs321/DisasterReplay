import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var layersMap = new Map([['http://localhost:6080/arcgis/services/shanzhu_test/MapServer/WMSServer', '雷达雨量图'], ['http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali', "谷歌影像图"], ['http://localhost:6080/arcgis/services/warnline/MapServer/WMSServer', '警戒线'], ['http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=d99ffacb3eeafd378927c060ab39bdab', '中文注记'],
['http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb', '天地图矢量图']
])
export default new Vuex.Store({
    state: {
        layers: layersMap,
        typhoonData: []
    },
    mutations: {
        setTyphoonTestData(state,data){
            state.typhoonData=data
        }
    },
    actions: {

    }
})