var Cesium = window.Cesium

export const myflyto = function (viewer,lon, lat, height, dur, spj, fj, fgj) {
    //视角到中国
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
            heading: Cesium.Math.toRadians(spj), //水平角
            pitch: Cesium.Math.toRadians(fj), //俯角
            roll: Cesium.Math.toRadians(fgj) //翻滚角
        },
        duration: dur
    });
}
