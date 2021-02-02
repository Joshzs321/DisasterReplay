<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="16">
            <div id="header-title">
              <img style="width: 50px; padding: 0 15px" src="../assets/logo.png" alt="" />
              <span id="header-name">台风灾害演化过程再现系统</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div id="header-menu-container">
              <el-link icon="el-icon-edit-outline" @click="openCreateEventDialog">事件创建</el-link>
              <el-link icon="el-icon-video-camera" @click="changeTimeLineToShow">事件播放</el-link>
              <el-link icon="el-icon-document">事件报告</el-link>
              <el-link icon="el-icon-s-open" @click="handleMapTool">地图工具</el-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <ThreeMap></ThreeMap>
        <EventTree ref="eventTree"></EventTree>
        <Typhoon ref="Typhoon"></Typhoon>
        <div id="polt-area-container" v-show="poltAreaContainerToShow">
          <div v-show="plotAreaToShow">
            <plat-area>
            </plat-area>
          </div>
          <Play></Play>
        </div>
        <Tool ref="mapTool" @handlePlotAreaToShow='changePoltAreaContainerToShow'></Tool>
        <div id="progressTime" :class="TimelineActive?'':'progressTimeControl'"></div>
      </el-main>
    </el-container>
    <!-- 创建场景面板 -->
    <el-dialog title="事件创建" width="30%" :visible.sync="createEventDialogVisible" :before-close="resetEvent">
      <CreateEventDialog ref='eventCreateDialog'></CreateEventDialog>
      <span slot="footer" class="dialog-footer">
        <el-button id="table-collapse" @click="createEventDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEvent">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import ThreeMap from "./ThreeMap.vue";
import EventTree from "./EventTree.vue";
import PlatArea from "./platArea.vue";
import Play from "./Play.vue";
import Typhoon from "./Typhoon.vue";
import Tool from "./Tool.vue";
import CreateEventDialog from "./CreateEventDialog.vue";
import { request } from "../common/requestApi";
export default {
  data() {
    return {
      TimelineActive: false,
      poltAreaContainerToShow: false,
      tableCollpse: true,
      plotAreaToShow: true,
      createEventDialogVisible: false,
    };
  },
  components: {
    ThreeMap,
    EventTree,
    PlatArea,
    Play,
    Typhoon,
    Tool,
    CreateEventDialog,
  },
  methods: {
    changeTimeLineToShow() {
      this.TimelineActive = !this.TimelineActive;
    },
    handleMapTool() {
      this.$refs.mapTool.changeToolToShow();
    },
    changePoltAreaContainerToShow() {
      this.poltAreaContainerToShow = !this.poltAreaContainerToShow;
    },
    changeTableCollpse() {
      this.tableCollpse = !this.tableCollpse;
      this.plotAreaToShow = !this.plotAreaToShow;
    },
    openCreateEventDialog() {
      this.createEventDialogVisible = !this.createEventDialogVisible;
    },
    resetEvent() {
      this.createEventDialogVisible = false;
    },
    saveEvent() {
      this.createEventDialogVisible = false;
      // 显示事件树
      // this.treeToshow=true
      this.$refs.eventTree.createTreeNode();
      // 为了让再点开新建脚本的时候内容是空的
      this.$refs.eventCreateDialog.scenesCreated = [];
      // 创建脚本的同时，加载台风路径和属性数据,并保存到vuex中
      request.loadTyphoon("shanzhu", (data) => {
        this.$store.commit("setTyphoonTestData", data);
      });
      // 测试开启时间：后面要放到其他地方进行合理的逻辑控制
      var viewer = window.viewer;
      console.log('window.viewer: ', window.viewer);
      viewer.clock.startTime = Cesium.JulianDate.fromIso8601(
        "2018-09-07T20:00:00"
      );
      viewer.clock.stopTime = Cesium.JulianDate.fromIso8601(
        "2018-09-17T13:00:00"
      );
      viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
        "2018-09-07T20:00:00"
      );
      viewer.clock.multiplier = 400
      viewer.clock.shouldAnimate= true
    },
    changePlotAreaToShow() {
      this.plotAreaToShow = !this.plotAreaToShow;
    },
  },
  mounted() {},
};
</script>

<style scoped>
#progressTime {
  position: absolute;
  bottom: 0;
  width: 99.8%;
}
.progressTimeControl {
  z-index: -1;
}

#polt-area-container {
  position: absolute;
  bottom: 55px;
  width: 100%;
}
.el-header {
  background-color: #00b0f0;
  padding: 0px;
  z-index: 1;
  height: 50px !important;
}
#header-name {
  font-size: 30px;
  color: white;
}
#header-menu-container {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  color: white;
  align-items: center;
  height: 50px;
}
.el-main {
  padding: 0;
}
#header-title {
  padding: 0;
  display: flex;
  align-items: center;
  height: 50px;
  /* margin-top: 16px; */
}
.el-link {
  color: white !important;
  font-size: 20px;
}
</style>