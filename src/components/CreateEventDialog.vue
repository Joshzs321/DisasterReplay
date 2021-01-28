<template>
  <!-- 创建事件面板 -->
  <div class="dialog">
    <!-- header -->
    <!-- main -->
    <el-form ref="form" :model="form" label-width="100px" class="dadialog">
      <el-form-item label="事件名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="事件主题">
        <el-tag :key="tag" v-for="tag in form.themeTags" closable :disable-transitions="false"
          @close="handleCloseTag(tag)">
          {{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="form.themeTagInputVisible" v-model="form.themeTagInputValue"
          ref="saveTagInput" size="small" style="width: 100px" @keyup.enter.native="handleTTInputConfirm"
          @blur="handleTTInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showTTInput" style="margin-left: 10px">+ New Tag
        </el-button>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择开始日期" v-model="form.eventStartDate" style="width: 100%">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择开始时间" v-model="form.eventStartTime" style="width: 100%"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.eventEndDate" style="width: 100%">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.eventEndTime" style="width: 100%"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="添加配置文件">
        <el-upload class="upload" :auto-upload="false" :limit="1" :on-exceed="handleEventConfigExceed"
          :before-remove="beforeEventConfigRemove" :file-list="form.eventConfig">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="添加场景">
        <el-button @click="innerVisible=true">+</el-button>
        <!-- 内层dialog -->
        <el-dialog width="45%" title="子场景" :visible.sync="innerVisible" append-to-body>
          <el-form ref="form" label-width="100px">
            <el-form-item label="场景描述">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" style="width: 100%"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" style="width: 100%"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="场景类型">
              <el-radio v-model="radio" label="1">串行</el-radio>
              <el-radio v-model="radio" label="2">并行</el-radio>
            </el-form-item>
            <el-form-item label="播放速度">
              <el-slider v-model="value2"></el-slider>
            </el-form-item>
            <el-form-item label="场景层次">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in sceneLevel" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="要素选择">
              <el-transfer v-model="value" :data="data" :titles="['场景要素', '要素库']"></el-transfer>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sceneSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-collapse v-model="activeNames" @change="handleChange">
          <div v-for="(item,index) in scenesCreated" :key="index">
            <el-collapse-item :title="item.descibtion" name="1">
              <div>这是一个新场景</div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenesCreated: [],

      sceneLevel: [
        {
          value: "GJ",
          label: "国级",
        },
        {
          value: "SSJ",
          label: "省/市级",
        },
        {
          value: "CJ",
          label: "城市级",
        },
        {
          value: "JT",
          label: "具体地点",
        },
      ],
      dialogVisible: false,
      innerVisible: false,
      form: {
        //事件绑定
        name: "",
        themeTags: ["灾害", "救援"],
        themeTagInputVisible: false,
        themeTagInputValue: "",
        eventStartDate: "",
        eventStartTime: "",
        eventEndDate: "",
        eventEndTime: "",
        eventConfig: [],
        Sublist: [],
      },
    };
  },
  methods: {
    //关闭时提醒
    // handleCloseDialog(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    openSceneCreateDialog(){
      this.innerVisible=true
    },
    sceneSubmit() {
      this.innerVisible = false;
      this.scenesCreated.push({
        descibtion:'新场景'
      })
    },
    //关闭标签
    handleCloseTag(tag) {
      this.form.themeTags.splice(this.form.themeTags.indexOf(tag), 1);
    },
    //显示themetag的输入框
    showTTInput() {
      this.form.themeTagInputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //保存themetag的值
    handleTTInputConfirm() {
      let inputValue = this.form.themeTagInputValue;
      if (inputValue) {
        this.form.themeTags.push(inputValue);
      }
      this.form.themeTagInputVisible = false;
      this.form.themeTagInputValue = "";
      console.log(this.form.themeTagInputVisible);
    },
    //多加载文件事件
    handleEventConfigExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //移除文件事件
    beforeEventConfigRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style>
.dadialog {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
.dadialog .el-form-item__label {
  text-align: justify;
  text-align-last: justify;
}
.el-dialog__header {
  border-bottom: 1px solid #04312f;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
}
.input-new-tag {
  width: 30px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>