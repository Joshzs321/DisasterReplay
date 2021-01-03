<template>
  <div>
    <div id="tool-container" v-show="toolToShow">
      <div class="tool-group" v-for="(item,index) in toolSet" :key='index'>
        <div class="tool-header">{{item.group}}</div>
        <div class="tool-item" v-for="(toolItem,toolIndex) in item.content" :key="toolIndex" @click="handleClick(toolItem.event)">
          <el-tooltip class="item" effect="dark" :content="toolItem.label" placement="left">
            <img :src="toolItem.url" alt="" style="width:25px;height:25px">
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  Bus from  '../common/bus.js'
var url0 = require("../assets/img/tool0.png");
var url1 = require("../assets/img/tool1.png");
var url2 = require("../assets/img/tool2.png");
var url3 = require("../assets/img/tool3.png");
var url4 = require("../assets/img/tool4.png");
var url5 = require("../assets/img/tool5.png");
var url6 = require("../assets/img/tool6.png");
var url7 = require("../assets/img/tool7.png");
var url8 = require("../assets/img/tool8.png");
var url9 = require("../assets/img/tool9.png");
// var url6 = require("../assets/img/tool6.png");
// var url7 = require("../assets/img/tool7.png");
export default {
  data() {
    return {
      toolToShow:false,
      toolSet: [
        {
          group: "工具",
          content: [
            {
              label: "测距",
              url: url0,
              event:'measure'
            },
            {
              label: "缓冲区分析",
              url: url8,
              event:'buffer'
            },
            {
              label: "绘制",
              url: url9,
              event:'draw'
            },
          ],
        },
        {
          group: "实况",
          content: [
            {
              label: "台风",
              url: url7,
              event:'showTyphoon'
            },
            {
              label: "风场",
              url: url1,
              event:'showWind'
            },
            {
              label: "风暴潮",
              url: url2,
              event:'showSurge'
            },
            {
              label: "海浪",
              url: url3,
              event:'showWave'
            },
            {
              label: "降雨",
              url: url4,
              event:'showRain'
            },
            {
              label: "云图",
              url: url5,
              event:'showCloud'
            },
            {
              label: "灾情",
              url: url6,
              event:'showDisaster'
            },
          ],
        },
      ],
    };
  },
  methods:{
      changeToolToShow(){
          this.toolToShow=!this.toolToShow
      },
      handleClick(eventName){
        console.log(eventName);
        
        this[eventName]()
      },
      measure(){},
      buffer(){},
      draw(){},
      showDisaster(){
        this.$emit('handlePlotAreaToShow','')
      },
      showCloud(){},
      showRain(){},
      showWave(){},
      showSurge(){},
      showWind(){},
      showTyphoon(){
        Bus.$emit('brotherEvent','data')
      },

  },
  mounted(){
    

  }
};
</script>

<style  scoped>

#tool-container {
  color: white;
  font-size: 10px;
  position: absolute;
  right: 30px;
  top: 295px;
  width: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* 这样设置不会使内容受影响 */
  background-color: rgba(0,0,0,0.3)
}
.tool-header{
    background-color: #1182ee;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 4px 0px;
}
.tool-item{
    padding-top: 2px;
    cursor: pointer;
}
.tool-item:hover{
    background-color: orange;
    border-radius: 6px;
}
</style>