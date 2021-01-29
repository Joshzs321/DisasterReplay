const Cesium = window.Cesium;
const defined = Cesium.defined;
const cvt = utils.CVT;
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
import utils from "./utils/utils";
export default class EntityManager {
    constructor(viewer) {
        if (viewer instanceof Cesium.Viewer) {
            this._viewer = viewer
        }
        if (!Cesium.defined(this._viewer)) {
            return
        }
        this.selectedEntity = undefined
        this.selectedEntityProperty = undefined
        this.popWinPosition = undefined
        this.eventType = [LEFT_CLICK, RIGHT_CLICK, MOUSE_MOVE]
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
        this.popDiv = false
        this.init(this._viewer)
    }
    init(viewer) {
        if (viewer instanceof Cesium.Viewer === false) {
            throw new Error("viewer不是一个有效的Cesium Viewer对象.");
        }
        var handler = this.handler

        viewer.scene.postRender.addEventListener(function () {
            if (defined(self.popWinPosition)) {
                const pos = cvt.cartesian2Pixel(self.popWinPosition, viewer);
                // 获取pop
                const ele = document.getElementById("entityPopContainer");
                if (!ele) {
                    return;
                }
                ele.style.left = pos.x - 115 - 5 + "px";
                ele.style.top = pos.y - 250 + "px";

                const curPos = self.popWinPosition;
                //标记转到地球背面隐藏气泡
                if (utils.pointVisibilityOnEarth(curPos, self._viewer)) {
                    ele.style.display = "block";
                } else {
                    ele.style.display = "none";
                }
            }
        });
        //点击实体显示entityPop
        const showPop = function (e) {
            const obj = viewer.scene.pick(e.position);
            if (
                defined(obj) && obj.id instanceof Cesium.Entity
            ) {
                self.popWinPosition = cvt.pixel2Cartesian(e.position, viewer);
                this.selectedEntity = obj.id
                console.log('obj.id: ', obj.id);
                this.setSelectedEntityProperty(obj.id)
                if (self.popDiv) {
                    self.destroyPopPanle();
                } else {
                    // 先将entity的数据传出去，再展示新pop
                    self.createPopPanel();
                }
            } else {
                self.destroyPopPanle();
            }
        };
        // 还有一个LEFT_CLICK事件绑定的是创建图元，在
        handler.setInputAction(showPop, LEFT_CLICK);
    }
    createPopPanel() {
        self.popDiv=true
        const evt = new CustomEvent('showEntityPop',
            {
                detail: {
                    property: this.selectedEntityProperty
                }
            })
        window.dispatchEvent(evt)
    }
    destroyPopPanle() {
        self.popDiv=false
        {
            const evt = new CustomEvent('closeEntityPop',
                {
                    detail: {
                        id: ''
                    }
                })
            window.dispatchEvent(evt)
        }
    }
    setSelectedEntityProperty(entity){
        var property=[]
        // 获取点击实体的坐标属性
        var cartesian3=entity.position.getValue();
        var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
        var lat=Cesium.Math.toDegrees(cartographic.latitude);
        var lng=Cesium.Math.toDegrees(cartographic.longitude);
        property.push({property:'latitude',value:lat},{property:'longitude',value:lng})
        // 获取点击实体的其他属性


        this.selectedEntityProperty=property
    }
}