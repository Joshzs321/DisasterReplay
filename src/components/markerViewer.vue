<!--
 * @Author: zhangbo
 * @E-mail: xtfge_0915@163.com
 * @Date: 2019-12-18 10:32:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-17 13:42:02
 * @Desc: 包括点标绘、文字标绘、模型标绘
 -->
<template>
  <div id="markerContainer" :style="{left:winPos.x+'px',top:winPos.y+'px'}">
    <el-dialog :title="markName+'附件'" :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-upload class="upload-class" ref="upload" :action="attachment.action" :on-remove="attachment.delete"
        :on-success="attachment.success" :file-list="attachment.fileList" :on-preview="attachment.download"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="$refs.upload.submit()">上传到服务器
        </el-button>
      </el-upload>
    </el-dialog>
    <div id="createMerkerPanel" v-if="markMode==='marker'" v-show="visible">
      <el-container v-show="!selectPanel">
        <el-tabs tab-position="bottom" :stretch='true'>
          <el-tab-pane label="基础信息">
            <!-- <el-header>
                <span>添加标记</span>
                <i class="el-icon-paperclip" v-if="attachment.enabled" @click="dialogVisible=true" title="附件" style="font-size:16px">附件</i>
                <span class="closebtn iconfont iconclose" @click="visible=false">x</span>
            </el-header> -->
            <el-container id="marker-panel">
              <el-table :data="infoData" border :stripe='true' :cell-style='tableRowStyle' max-height='145px'
                :show-header='false' style="width: 100%">
                <el-table-column prop="property" width="120">
                </el-table-column>
                <el-table-column prop="value" width="120">
                  <template slot-scope="scope">
                    <el-color-picker v-if="scope.row.type == 1" v-model="scope.row.value" size="mini">
                    </el-color-picker>
                    <div v-if="scope.row.type == 2">
                      <img :src="selectedImage" />
                      <a href="#" id="imageC" @click="selectPanel=true">更换</a>
                    </div>
                    <div v-if="scope.row.type == 3">
                      {{scope.row.value}}
                    </div>
                    <div v-if="scope.row.type == 4">
                      {{scope.row.value}}
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <!-- <el-main class="marker-main-class">
                        名称：
                        <el-input v-model="markName" ref="nameinput" @keyup.enter.native="update"></el-input>
                        <br />描述：
                        <el-input v-model="markRemark" type="textarea"></el-input>
                    </el-main>
                    <el-aside>
                        <img :src="selectedImage" />
                        <br />
                        <a href="#" id="imageC" @click="selectPanel=true">更换</a>
                    </el-aside> -->
            </el-container>
          </el-tab-pane>
          <el-tab-pane label="属性">
            <el-container id="marker-panel">
              <el-table :data="propertyData" border :stripe='true' :cell-style='tableRowStyle' max-height='145px'
                :show-header='false' style="width: 100%">
                <el-table-column prop="property" width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.property">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="value" width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
            <i class="el-icon-circle-plus add-property-text" @click="addProperty">添加属性</i>
          </el-tab-pane>
        </el-tabs>
      </el-container>
      <el-footer>
        <el-row>
          <el-col :span="16">
            <el-button type="primary" plain size="mini" id="submitbtn" style="background-color:#EEEEEE;color:black "
              @click="update">确定</el-button>
            <el-button type="danger" id="cancelbtn" plain size="mini"
              style="background-color:#34495E;color:white;margin-left:5px " @click="cancelMark">取消</el-button>
          </el-col>
          <el-col :span="8">
            <i class="el-icon-error delete-entity-text"  @click="deleteMark">删除要素</i>
          </el-col>
        </el-row>
      </el-footer>
      <div class="popup-tip-container">
        <div class="popup-tip"></div>
      </div>
    </div>
    <!-- 选择图标 -->
    <el-container v-show="selectPanel" class="image-list-class">
      <!-- <img :src="noImage" @click="changeHandler(undefined)"> -->
      <img v-for="(img,index) in images" :src="img" :key="index" @click="changeHandler(img)" />
    </el-container>
    <div id="createLabelPanel" :style="{left:winPos.x+'px',top:winPos.y+'px'}" v-if="markMode==='label'"
      v-show="visible">
      <el-input v-model="markName" @keypress.enter.native="update"></el-input>
      <el-button size="mini" @click="update">确定</el-button>
    </div>
    <input type="file" v-show="false" @change="importMarks" id="uploadhandler" accept=".json" />
  </div>
</template>

<script>
import MarkerManager from "../common/utils/MarkerManager";
import utils from "../common/utils/utils";
import { checkComponent, checkViewer } from "../common/utils/utils";

export default {
  name: "cesiumMarkerViewer",
  data() {
    return {
      infoData: [
        {
          type: 1,
          property: "marker-color",
          value: "#409EFF",
        },
        {
          type: 2,
          property: "marker-symbol",
          value: "",
        },
        {
          type: 3,
          property: "Latitude",
          value: 31.123,
        },
        {
          type: 4,
          property: "Longitude",
          value: 123.313,
        },
      ],
      propertyData: [
        {
          property: "Longitude",
          value: 123.313,
        },
        {
          property: "Longitude",
          value: 123.313,
        },
      ],
      visible: false,
      selectPanel: false,
      markName: "",
      markRemark: "",
      images: [],
      markMode: "",
      winPos: {
        x: 0,
        y: 0,
      },
      dialogVisible: false,
      fileList: [],
    };
  },
  computed: {},
  components: {},
  props: {
    extendImage: {
      type: Array,
      default: function () {
        return [];
      },
    },
    attachment: {
      default: function () {
        return {
          enabled: false,
          method: "",
        };
      },
    },
  },
  directives: {
    focus: {
      bind: function (el) {
        el.focus();
      },
      updated: function (el) {
        el.focus();
      },
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {
    const self = this;
    // 全局事件监听
    window.addEventListener("marker-edit", (e) => {
      const type = e.detail.type;
      self.visible = true;
      self.markName = e.detail.name;
      self.markRemark = e.detail.remark;
      self.winPos = {
        ...e.detail.pos,
      };
      self.$emit("editEvent", type);
    });
    window.addEventListener("marker-add", (e) => {
      // 设置自定义气泡的位置
      self.winPos = self.markerManager.panelPosition();
      self.visible = true;
      // 添加到全局图元管理中
      self.$emit("addEvent", e.detail.id, e.detail.name, e.detail.type);
    });
    window.addEventListener("marker-delete", (e) => {
      console.log('e1: ', e);
      self.visible = false;
      // 这是vue里的事件监听！！！
      self.$emit("deleteEvent", e.detail.id);
      self.markName = "";
      self.markRemark = "";
    });
    window.addEventListener("marker-update", (e) => {
      self.$emit("updateEvent", e.detail.id, e.detail.name);
      // 因为是双向绑定，再添加下一个时要将内容清空
      self.markName = "";
      self.markRemark = "";
    });

    window.addEventListener("showPop", (e) => {
      self.winPos = self.markerManager.panelPosition();
      self.visible = true;
    });
    window.addEventListener("closePop", (e) => {
      console.log('closePop');
      self.visible = false;
    });
    this.$nextTick(() => {
      utils.moveDiv("markerContainer");
    });
  },
  methods: {
    // 这个方法在父组件中调用的
    init(viewer) {
      if (this._viewer) {
        return;
      }
      checkViewer(viewer);
      this._viewer = viewer;
      // 在生成markerManager的时候就绑定了一个左击鼠标生成pop窗口的事件
      !this.markerManager && (this.markerManager = new MarkerManager(viewer));
      // 可选择的marker：从最外面的组件传进来的
      this.images = [this.markerManager.defaultImage, ...this.extendImage];
      this.selectedImage = this.markerManager.defaultImage;
    },
    addProperty() {
      var newProperty = {
        property: "",
        value: "",
      };
      this.propertyData.push(newProperty);
    },
    tableRowStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;padding:5px";
    },
    // 只是在地图上选择一个点，展示出来，还没有输入属性，点、文字等都是通过花点先
    pick(type = "marker", mode = "single") {
      checkComponent(this);
      if (this.markerManager) {
        this.markMode = type;
        return this.markerManager.pick(type, mode);
      }
    },
    createMarker(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createMarker(cartesian);
      }
    },
    panelPosition() {
      if (this.markerManager) {
        return this.markerManager.panelPosition();
      }
    },
    createLabel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    createModel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    removeEventListener() {
      if (this.markerManager) {
        return this.markerManager.removeEventListener();
      }
    },
    stopPick() {
      if (this.markerManager) {
        this.markerManager.stopPick();
      }
    },
    zoomTo(id) {
      if (this.markerManager) {
        this.markerManager.zoomTo(id);
      }
    },
    edit(id) {
      if (this.markerManager) {
        this.markerManager.edit(id);
      }
    },
    drop(id) {
      if (this.markerManager) {
        this.markerManager.drop(id);
      }
    },
    rename(id, name) {
      if (this.markerManager) {
        this.markerManager.rename(id, name);
      }
    },
    select(type, id, status) {
      if (this.markerManager) {
        this.markerManager.select(type, id, status);
      }
    },
    destroyPopPanle() {
      if (this.markerManager) {
        this.markerManager.destroyPopPanle();
      }
    },
    createPopPanel() {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
      }
    },
    import(feat) {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
        this.markerManager.import(feat);
      }
    },
    export(type) {
      if (this.markerManager) {
        this.markerManager.export(type);
      }
    },
    setFont(font) {
      if (this.markerManager) {
        this.markerManager.font = font;
      }
    },
    getFont() {
      if (this.activeMarker) {
        return this.markerManager.font;
      }
      return undefined;
    },
    setColor(color) {
      if (this.markerManager) {
        this.markerManager.color = color;
      }
    },
    setLabel(option) {
      if (this.markerManager) {
        this.markerManager.label = option;
      }
    },
    setModel(options) {
      if (this.markerManager) {
        this.markerManager.model = options;
      }
    },
    removeAll() {
      if (this.markerManager) {
        this.markerManager.removeAll();
      }
    },
    deleteMark() {
      if (this.markerManager) {
        this.markerManager.deleteMark();
      }
    },
    cancelMark(){
      this.visible=false
      if(!this.markerManager.selectedMarker){
        console.log('this.markerManager.selectedMarker: ', this.markerManager.selectedMarker);
        // 此时是新建状态时的marker
        this.markerManager.deleteMark();
      }
      this.markerManager.selectedMarker=undefined
      this.markerManager.activeMarker=undefined
    },
    update() {
      if (this.markerManager) {
        this.markerManager.update(this.markName, this.markRemark);
        this.visible = false;
      }
    },
    changeHandler(img) {
      if (this.markerManager) {
        this.markerManager.changeHandler(img);
        this.selectedImage = img;
      }
      this.selectPanel = false;
    },
    generateId() {
      if (this.markerManager) {
        return this.markerManager.generateId();
      }
    },
    getById(id) {
      if (this.has(id)) {
        return this.markerManager.get(id);
      }
    },
    has(id) {
      if (this.markerManager) {
        return this.markerManager.has(id);
      }
      return false;
    },
    importMarks() {},
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.popup-tip {
  width: 0;
  height: 0;
  margin: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #fff;
  box-shadow: none;
}
.popup-tip-container {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  position: relative;
  float: left;
  margin-left: 50%;
  right: 10px;
}
.delete-entity-text {
  color: red;
  top: 13px;
  cursor: pointer;
  position: relative;
  right: 20px;
}
.delete-entity-text:hover {
  color: #e25353;
}

.add-property-text {
  position: relative;
  left: -77px;
  top: 5px;
  color: #2980b9;
  cursor: pointer;
  margin: 5px;
}
.add-property-text:hover {
  color: #5bb8f7;
}
#marker-panel {
  max-height: 132px;
}
#createMerkerPanel >>> .el-tabs__header {
  background-color: white;
  margin-top: 0px;
}
#marker-panel >>> .el-color-picker__trigger {
  border: none;
  height: 10px;
  width: 72px;
  padding: 0;
}
#marker-panel >>> .el-color-picker--mini {
  height: 20px;
  line-height: 20px;
}
#marker-panel >>> .el-color-picker__icon {
  display: none;
}
#marker-panel >>> .el-color-picker__color {
  border: none;
}
#marker-panel >>> .el-table__row {
  height: 30px;
}
#markerContainer >>> .el-tabs__content {
  background-color: white;
}
#marker-panel >>> .el-input__inner {
  width: 90px;
  height: 20px;
  background-color: inherit;
  border: none;
  padding: 0;
}
#createMerkerPanel #marker-panel >>> .el-input {
  margin-bottom: 0px !important;
}

#marker-panel >>> .el-icon-circle-plus-outline:before {
  padding-left: 4px;
  padding-right: 3px;
}

#markerContainer {
  position: fixed;
  z-index: 2;
  top: -20px;
  font-size: $font-size;

  * {
    font-size: $font-size;
  }
}

#msg1,
.msg {
  width: 150px;
  height: 30px;
  position: fixed;
}

#submit1,
.submit {
  position: fixed;
  height: 34px;
  width: 34px;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 3px 12px;
  font-size: $font-size;
  line-height: 1.42857143;
  color: $color;
  background-color: $bg-color;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: $b-radius;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.form-control::-moz-placeholder {
  color: $color;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: $color;
}

.form-control::-webkit-input-placeholder {
  color: $color;
}

.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}

.marker-main-class {
  color: $color;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: $font-size;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 0px;
}

#menu {
  position: fixed;
  width: 100px;
  height: 70px;
  border: 2px solid #b7b1a3;
  background-color: $bg-color;
  text-align: left;
}

#createMerkerPanel {
  ::v-deep a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      font-size: 14px;
      text-decoration: none;
      color: $color;
    }
  }

  ::v-deep .el-button--primary {
    span {
      color: #409eff !important;
    }

    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }

  ::v-deep .el-button--danger {
    span {
      color: #f56c6c !important;
    }

    &:hover {
      span {
        color: #ffffff !important;
      }
    }
  }
}

#menu > div {
  width: 80px;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  padding-left: 20px;
  padding-top: 0px;
}

#menu > div:hover {
  background-color: #e5e5e5;
}

.no-image-class {
  width: 24px;
  height: 24px;
  line-height: 24px;
}

#createMerkerPanel {
  left: 0px;
  top: 0px;
  position: absolute;
  border: 0px solid #b7b1a3;
  color: $color;

  .image-list-class {
    display: block;
    padding: 10px;
  }
}

#createMerkerPanel .el-input {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-top: 0px;
  margin-bottom: 30px !important;
  margin-left: 0px !important;
}

#createMerkerPanel .el-button {
  display: inline-block;
  float: left;
  margin: 5px 0px;
  border: none;
}
#createMerkerPanel .el-button:hover {
  color: #5bb8f7 !important;
}
#createMerkerPanel .el-header {
  height: 45px !important;
  line-height: 30px;
  color: $color;
  padding: $padding;

  span,
  i {
    margin: $item-margin;
    color: $color;
  }
}

#createMerkerPanel .el-footer {
  padding: 0 8px;
  background-color: white;
  height: 36px !important;
}

#createMerkerPanel .el-textarea {
  width: 78%;
}

#createMerkerPanel .el-aside {
  width: 20% !important;
  // padding-left: 10px;
  text-align: center;
  line-height: 20px;

  a {
    display: inline-block;
    width: 32px;
  }
}

#createMerkerPanel .el-main {
  width: 70%;
  padding-left: 10px !important;
}

#createMerkerPanel .el-main {
  padding: 0px 0px 0px 0px;
}

#createMerkerPanel img {
  vertical-align: middle;
  height: 20px;
}

.crusor-tip {
  width: 200px;
  height: 30px;
  line-height: 30px;
  vertical-align: center;
  border: 1px solid #e5e5e5;
  color: white;
  background-color: #00000099;
  position: fixed;
}

#createLabelPanel {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 320px;

  .el-input {
    display: inline-block;
    width: 200px;
    margin: 0 10px;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      background-color: $bg-color;
      border: 1px solid $border-color;
      border-radius: $b-radius;
      width: 199px;
      height: 38px;
      color: #ffffff;
    }
  }

  .el-button {
    display: inline-block;
    margin: 0 2px;
    width: 92px;
    height: 36px;
    background-color: $color;
    border: none;
    color: #ffffff;
    border-radius: $b-radius;
    vertical-align: middle;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }

  ::v-deep .el-dialog__body {
    padding: 0 20px;
  }

  .upload-class {
    min-height: 200px;
  }
}
</style>
