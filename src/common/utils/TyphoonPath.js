const Cesium = window.Cesium
// const ColorMap = new Map([
//     ['热带风暴(TS)', new Cesium.Color(81, 127, 226)],
//     ['热带低压(TD)', new Cesium.Color(76, 235, 77)],
//     ['强台风(STY)', new Cesium.Color(229, 120, 226)],
//     ['强热带风暴(STS)', new Cesium.Color(237, 238, 40)],
//     ['台风(TY)', new Cesium.Color(240, 164, 40)],
//     ['超强台风(Super TY)', new Cesium.Color(225, 0, 0)]
// ])
class TyphoonPath {
    constructor(viewer) {
        this.viewer = viewer
        this.ColorMap=new Map([
            ['热带风暴(TS)', Cesium.Color.CORNFLOWERBLUE],
            ['热带低压(TD)', Cesium.Color.LAWNGREEN],
            ['强台风(STY)', Cesium.Color.BLUEVIOLET],
            ['强热带风暴(STS)', Cesium.Color.YELLOW],
            ['台风(TY)', Cesium.Color.DARKORANGE],
            ['超强台风(Super TY)', Cesium.Color.RED]
        ])
        this.path=[]
    }
    loadDate(data) {
        let windCircleRadius = [["30KTS", "300", "350", "380", "260"], ["50KTS", "130", "130", "140", "130"], ["64KTS", "60", "60", "60", "60"]];
        let typhoonPoint = { lon: 125.10, lat: 24.30 };
        this.drawTyphoonPoint(data);
        this.drawTyphoonLine()
    }
    /**
     * 绘制台风风圈
     * @param {Array} windCircleRadius 
     * @param {object} typhoonPoint 
     */
    drawTyphoonPoint(data) {
        var l = data.length
        for (let i = 0; i < l; i++) {
            const element = data[i];
            console.log('element: ', element);
            let color = this.ColorMap.get(element.strong)
            let lat = element.latitude
            let lon = element.longitude
            this.path.push(lon,lat)
            var point=new Cesium.Entity({
                position: Cesium.Cartesian3.fromDegrees(lon, lat),
                point: {
                    pixelSize: 10,
                    color: color,
                    // 给点设置一个可见范围
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000000)
                },
                properties:{
                    test:'test'
                }
            })
            this.viewer.entities.add(point);
        }
    }
    drawTyphoonLine(){
        var Line = viewer.entities.add({
            name: "Red line on terrain",
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(this.path),
              width: 2,
              material: Cesium.Color.BLUE,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000000),
              clampToGround: true,
            },
          });
    }
}
export default TyphoonPath