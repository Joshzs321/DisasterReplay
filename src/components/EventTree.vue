<template>
  <div id="tree-container" :class="isActive?'':'close-tree-container'">
    <dv-border-box-13>
      <h3 id="tree-header">灾害事件树</h3>
      <!-- <dv-decoration-7 style="width:150px;height:30px;">灾害事件树</dv-decoration-7> -->
      <dv-decoration-8 :reverse="true" style="width:165px;height:16px;" />
      <div class="my-icon-treeCollpse" @click="changeTreeCollpse">
        <i class="el-icon-d-arrow-right " v-show="treeCollpse" title="收起事件树"></i>
        <i class="el-icon-d-arrow-left " v-show="!treeCollpse" title="展开事件树"></i>
      </div>
      
      <div ref="Echart" style="height:450px;width:190px">
      </div>
      <!-- <dv-decoration-11 style="width:100px;height:30px;">添加节点</dv-decoration-11> -->
      
    </dv-border-box-13>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      isActive: false,
      treeCollpse: true,
      treeIsExisting: false,
      treeTestData: {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [
                          {
                            children: [],
                            name: "低压车间表计82",
                          },
                        ],
                        name: "低压车间表计82",
                      },
                    ],
                    name: "低压车间表计82",
                  },
                ],
                name: "低压关口表计1",
              },
            ],
            name: "高压子表计122",
          },
          {
            children: [
              {
                children: [],
                name: "低压关口表计101",
              },
            ],
            name: "高压子表计141",
          },
        ],
        name: "高压总表计102",
      },
    };
  },
  methods: {
    addNode() {
      console.log($("#tree-container"));
      this.treeTestData.children.push({
        children: [],
        name: 123,
      });
      this.createTreeNode();
    },
    changeTreeCollpse() {
      this.isActive = !this.isActive;
      this.treeCollpse = !this.treeCollpse;
    },
    createTreeNode() {
      if (!this.treeIsExisting) {
        const myCharts = this.$echarts.init(this.$refs.Echart);
        console.log(myCharts);

        let options = {
          tooltip: {
            // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
            trigger: "item", //默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
            triggerOn: "mousemove",
            position: "right",
          },
          series: [
            {
              type: "tree",
              data: [this.treeTestData],
              left: "2%",
              right: "2%",
              top: "15%",
              bottom: "10%",
              symbol: "emptyCircle",
              orient: "vertical",
              expandAndCollapse: true, //默认：true；子树折叠和展开的交互，默认打开 。
              initialTreeDepth: 2, //默认：2，树图初始展开的层级（深度）。根节点是第 0 层，然后是第 1 层、第 2 层，... ，直到叶子节点
              label: {
                normal: {
                  position: "top", //标签的位置。
                  rotate: 0, //标签旋转。从 -90 度到 90 度。正值是逆时针。
                  verticalAlign: "middle", //文字垂直对齐方式，默认自动。
                  align: "middle", //文字水平对齐方式，默认自动。
                  fontSize: 12, //文字的字体大小
                },
              },
              tooltip: {
                positon: "right",
              },
              leaves: {
                label: {
                  normal: {
                    position: "bottom",
                    rotate: 0,
                    verticalAlign: "middle",
                    align: "middle",
                    fontSize: 8, //文字的字体大小
                  },
                },
              },
              animationDurationUpdate: 750,
            },
          ],
        };
        myCharts.setOption(options);
      }
    },
    test() {
      console.log("1234");
    },
  },
  mounted() {
    console.log("aaa");
  },
};
</script>

<style scoped>
.my-icon-treeCollpse {
  color: white;
  background-color: rgba(2, 20, 43, 0.5);
  position: relative;
  left: 197px;
  display: inline-block;
  height: 41px;
  width: 25px;
  bottom: 44px;
  line-height: 46px;
  text-align: center;
  cursor: pointer;
}
h3 {
  padding: 0 50px;
  margin: 10px 0;
}

.close-tree-container {
  position: relative;
  left: -200px;
}
#tree-container {
  background-color: rgba(2, 20, 43, 0.5);
  /* opacity: 0.5; */
  color: white;
  height: calc(100vh - 280px);
  display: inline-block;
}
.dv-decoration-8{
    position: relative;
    left: 14px !important;
    top: 11px
}
#tree-header{
  margin: 0px;
  position: relative;
  top: 13px;
}
</style>