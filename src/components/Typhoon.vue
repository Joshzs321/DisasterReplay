<template>
  <div id="Typhoon-container" v-show="TyphoonToShow">
    <div class="data-item" v-for="(item,index) in TyphoonData" :key="index">
      <i>
        <img :src="TyphoonIconUrl[index]" alt="" style="width:36px;height:36px">
      </i>
      <div>
        <p class="item-value" v-text="item.value"></p>
        <p class="item-label">{{item.label}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import  Bus from  '../common/bus.js'
var url0 = require("../assets/img/0.png");
var url1 = require("../assets/img/1.png");
var url2 = require("../assets/img/2.png");
var url3 = require("../assets/img/3.png");
var url4 = require("../assets/img/4.png");
var url5 = require("../assets/img/5.png");
var url6 = require("../assets/img/6.png");
var url7 = require("../assets/img/7.png");
export default {
  data() {
    return {
      TyphoonToShow:false,
      TyphoonData: [
        {
          label: "级别",
          value: "超强台风",
        },
        {
          label: "位置",
          value: "106.6°E,23.5°N",
        },
        {
          label: "风力",
          value: "7级 14m/s",
        },
        {
          label: "气压",
          value: "150千帕",
        },
        {
          label: "移速",
          value: "1km/H",
        },
        {
          label: "七级风圈半径",
          value: "1km",
        },
        {
          label: "十级风圈半径",
          value: "1km",
        },
        {
          label: "十二级风圈半径",
          value: "1km",
        },
      ],
      TyphoonIconUrl: [url0, url1, url2, url3, url4, url5, url6, url7],
    };
  },
  methods:{
    changeTyphoonToShow(){
      this.TyphoonToShow=!this.TyphoonToShow
    }
  },
  mounted(){
    Bus.$on('brotherEvent',(data)=>{
        this.TyphoonToShow=!this.TyphoonToShow
    })
  }
};
</script>

<style scoped>
#Typhoon-container {
  display: flex;
  justify-content: space-around;
  background-color: #1182EE;
  position: absolute;
  top: 52px;
  left: 226px;
  color: white;
  font-size: 10px;
  width: 70%;
}
.data-item {
  display: flex;
  
}
.data-item div {
    padding-left: 2px;
    /* margin: 0; */
  }
  .item-value{
    margin: 0;
    font-size: 15px;
  }
  .item-label{
    margin: 0;
  }
</style>