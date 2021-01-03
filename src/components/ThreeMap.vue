<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { Viewer, Cartographic, UrlTemplateImageryProvider , WebMapServiceImageryProvider,WebMapTileServiceImageryProvider } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import viewerCesiumNavigationMixin from '@znemz/cesium-navigation'
import '@znemz/cesium-navigation/dist/index.css'

export default {
  mounted() {
    this.initViewer()
  },
  methods: {
    initViewer() {
      const viewer = (this.$viewer = new Viewer('cesiumContainer', {
        baseLayerPicker: true,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false,
        imageryProvider: googleMapProvider
      }))
      viewer._cesiumWidget._creditContainer.style.display = 'none'
      viewer.scene.globe.showGroundAtmosphere = false

      let googleMapProvider = new UrlTemplateImageryProvider({
        url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
      })

      var layers = viewer.scene.imageryLayers;
      layers.addImageryProvider(new WebMapServiceImageryProvider({
        url:'http://localhost:6080/arcgis/services/shanzhu_test/MapServer/WMSServer',
        layers:0,
        crs:'EPSG:4326',
        parameters:{
          service:'WMS',
          format:'image/png',
          transparent:true
        }
      }),1)

      // 谷歌影像图
      layers.addImageryProvider(
        new UrlTemplateImageryProvider({
            url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
        })
      ,0)
      // 影像的中文注记
      layers.addImageryProvider(new WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=d99ffacb3eeafd378927c060ab39bdab",    
        layer: "tdtAnnoLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible" 
      }));

      //警戒线
      layers.addImageryProvider(new WebMapServiceImageryProvider({
        url: "http://localhost:6080/arcgis/services/warnline/MapServer/WMSServer",    
        layers:'0,1',
        crs:'EPSG:4326',
        parameters:{
          service:'WMS',
          format:'image/png',
          transparent:true
        }
      }),2);
      this.initNavgationBar(viewer)
    },
    initNavgationBar(viewer) {
      var options = {}
      options.defaultResetView = Cartographic.fromDegrees(116.39, 39.9, 5000000.0)
      options.enableCompass = true
      options.enableZoomControls = true
      options.enableDistanceLegend = true
      options.enableCompassOuterRing = true
      viewerCesiumNavigationMixin(viewer, options)
    }
  }
}
</script>

<style scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
