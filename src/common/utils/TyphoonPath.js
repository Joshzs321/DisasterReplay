const Cesium=window.Cesium
class typhoonPath {
    constructor(viewer) {
        this.viewer = viewer
    }
    loadDate() {
        let windCircleRadius = [["30KTS", "300", "350", "380", "260"], ["50KTS", "130", "130", "140", "130"], ["64KTS", "60", "60", "60", "60"]];
        let typhoonPoint = { lon: 125.10, lat: 24.30 };
        this.drawWindCircle(windCircleRadius, typhoonPoint);
    }
    /**
             * 绘制台风风圈
             * @param {Array} windCircleRadius 
             * @param {object} typhoonPoint 
             */

}
export default typhoonPath