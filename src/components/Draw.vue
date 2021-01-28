<template>
  <div id="draw-container">
    <div class="draw-item" v-for="(item,index) in drawPic" :key="index" @click="handleClick(item.event)">
      <el-tooltip class="item" effect="dark" :content="item.label" placement="left" :disabled="tooltipDisable">
        <img :src="item.url" alt="" style="width:25px;height:25px">
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import drawArrowTool from '../common/utils/drawArrow'
var url0 = require("../assets/img/point.png");
var url1 = require("../assets/img/line.png");
var url2 = require("../assets/img/polygon.png");
var url3 = require("../assets/img/arrow1.png");
var url4 = require("../assets/img/arrow2.png");
var url5 = require("../assets/img/arrow3.png");
var url6 = require("../assets/img/clear.png");
export default {
  data() {
    return {
      tooltipDisable: false,
      drawPic: [
        {
          label: "绘制点",
          url: url0,
          event: "drawPoint",
        },
        {
          label: "绘制线",
          url: url1,
          event: "drawLine",
        },
        {
          label: "绘制面",
          url: url2,
          event: "drawPolygon",
        },
        {
          label: "普通箭头",
          url: url3,
          event: "drawArrow1",
        },
        {
          label: "直线箭头",
          url: url4,
          event: "drawArrow2",
        },
        {
          label: "攻击箭头",
          url: url5,
          event: "drawArrow3",
        },
        {
          label: "清除重绘",
          url: url6,
          event: "clearDraw",
        },
      ],
    };
  },
  methods:{
      handleClick(event){
          this[event]()
      },
      drawPoint(){

      },
      drawLine(){

      },
      drawPolygon(){

      },
      drawArrow1(){

      },
      drawArrow2(){
          drawArrowTool.draw("straightArrow");
      },
      drawArrow3(){
          drawArrowTool.draw("attackArrow");
      },
      clearDraw(){

      }
  },
  mounted(){
    drawArrowTool.disable();
	  drawArrowTool.init(window.viewer);
  }
};
</script>

<style scoped>
#draw-container {
  position: absolute;
  right: 35px;
  top: 85px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 30px;
}
.draw-item:hover {
  background-color: orange;
  border-radius: 6px;
}
.draw-item {
  padding-top: 2px;
  cursor: pointer;
}
</style>