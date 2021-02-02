<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  Viewer,
  Cartographic,
  UrlTemplateImageryProvider,
  WebMapServiceImageryProvider,
  WebMapTileServiceImageryProvider,
  Cartesian3,
  Math,
  CesiumTerrainProvider,
  ArcGISTiledElevationTerrainProvider
} from "cesium";
import * as Cesium from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css";
import viewerCesiumNavigationMixin from "@znemz/cesium-navigation";
import "@znemz/cesium-navigation/dist/index.css";
console.log('threeMap-import');

// 所有组件中的import的逻辑js代码都会在系统初始化时先加载？
window.Cesium = Cesium
export default {
  mounted() {
    console.log('threeMap');
    
    this.initViewer();
  },
  methods: {
    initViewer() {
      const viewer = new Viewer("cesiumContainer", {
        baseLayerPicker: true,
        fullscreenButton: false,
        geocoder: false,
        infoBox:false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        // timeline: false,
        // animation: false,
        selectionIndicator:false,
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      }),
        // imageryProvider: googleMapProvider
        // 不开地形，后面画箭头会出问题，拾取点出错
        // terrainProvider: new ArcGISTiledElevationTerrainProvider({
        //   url:
        //     "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        // }),
      });

      // viewer.extend(Cesium.viewerCesiumInspectorMixin);
      // viewer.cesiumInspector.container.style.display = "";

      window.viewer = viewer;
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.globe.showGroundAtmosphere = false;

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(103.84, 31.15, 17850000),
        orientation: {
          heading: Math.toRadians(348.4202942851978),
          pitch: Math.toRadians(-89.74026687972041),
          roll: Math.toRadians(0),
        },
      });

      // let googleMapProvider = new UrlTemplateImageryProvider({
      //   url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
      // });

      var layers = viewer.scene.imageryLayers;
      // var testlayer = layers.addImageryProvider(
      //   new WebMapServiceImageryProvider({
      //     url:
      //       "http://localhost:6080/arcgis/services/shanzhu_test/MapServer/WMSServer",
      //     layers: 0,
      //     crs: "EPSG:4326",
      //     enablePickFeatures: false,
      //     parameters: {
      //       service: "WMS",
      //       format: "image/png",
      //       transparent: true,
      //       name: "test",
      //     },
      //   }),
      //   1
      // );
      // 天地图矢量底图
      // var TDTLayer = layers.addImageryProvider(
      //   new WebMapTileServiceImageryProvider({
      //     url:
      //       "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
      //     layer: "tdtVecBasicLayer",
      //     style: "default",
      //     format: "image/jpeg",
      //     tileMatrixSetID: "GoogleMapsCompatible",
      //     show: true,
      //   })
      // );

      // 谷歌影像图
      // var googleLayer = layers.addImageryProvider(
      //   new UrlTemplateImageryProvider({
      //     url:
      //       "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
      //   }),
      //   0
      // );

      // 影像的中文注记
      // layers.addImageryProvider(
      //   new WebMapTileServiceImageryProvider({
      //     url:
      //       "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=d99ffacb3eeafd378927c060ab39bdab",
      //     layer: "tdtAnnoLayer",
      //     style: "default",
      //     format: "image/jpeg",
      //     tileMatrixSetID: "GoogleMapsCompatible",
      //   })
      // );

      //警戒线
      // layers.addImageryProvider(
      //   new WebMapServiceImageryProvider({
      //     url:
      //       "http://localhost:6080/arcgis/services/warnline/MapServer/WMSServer",
      //     layers: "0,1",
      //     crs: "EPSG:4326",
      //     enablePickFeatures: false,
      //     parameters: {
      //       service: "WMS",
      //       format: "image/png",
      //       transparent: true,
      //     },
      //   }),
      //   2
      // );
      this.initNavgationBar(viewer);
    },

    initNavgationBar(viewer) {
      var options = {};
      options.defaultResetView = Cartographic.fromDegrees(
        116.39,
        39.9,
        5000000.0
      );
      options.enableCompass = true;
      options.enableZoomControls = true;
      options.enableDistanceLegend = true;
      options.enableCompassOuterRing = true;
      viewerCesiumNavigationMixin(viewer, options);
    },
  },
};
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
