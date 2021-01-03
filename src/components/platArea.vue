<template>
  <div>
    <el-row>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>灾情动态累计</span>
            <el-select v-model="disasterData" filterable size="mini" placeholder="请选择地区">
              <el-option-group v-for="group in disasterOption" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class='plot-container'>
            <dv-capsule-chart :config="disasterDatatoShow" style="width:100%;height:140px;" />
          </div>
        </div>
      </el-col>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>灾情累计排名</span>
            <el-select v-model="antidisasterData" filterable size="mini" placeholder="请选择地区">
              <el-option-group v-for="group in antidisasterOption" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class='plot-container'>
            <dv-scroll-ranking-boards />
            <dv-scroll-ranking-board class="ranking" :config="compareDatatoShow" style="width:100%;height:140px;" />
          </div>
        </div>

      </el-col>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>监测站动态监测</span>
            <el-select v-model="station" filterable placeholder="请选择站点" size="mini" @change='loadStationChart'>
              <el-option-group v-for="group in stationType" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class='plot-container'>
            <div class="station-chart" ref="stationChart" style="height:140px;width:100%">
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>抗灾救灾累计描述</span>
          </div>
          <div class='plot-container scroll-container'>
            <div v-for="(item ,index) in disasterReport" :key="index">
              <div id="disaster-report">
                {{item.describetion}}
              </div>
              <div id="report-data">
                <div v-for="(dataItem,index) in item.datas" :key="index">
                  <el-tooltip class="item" effect="dark" :content="dataItem.item+dataItem.value+dataItem.unit" placement="left">
                     <dv-decoration-9 style="width:40px;height:40px;">{{dataItem.value}}</dv-decoration-9>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      disasterReport: [
        {

          describetion:
            "省国土资源厅将地质灾害隐患点和风险危险区域范围提供给当地政府，并配合当地政府迅速转移受地质灾害威胁的群众，截至18日17时，广东省自然资源系统共出动巡查排查人员46609人次，组织转移避险人员124839人，共排查地灾隐患点6169处，发现新增地灾隐患点38处。",
          datas: [
            {
              item: "排查人员",
              value: "46609",
              unit: "人次",
            },
            {
              item: "转移避险人员",
              value: "124839",
              unit: "人",
            },
            {
              item: "排查地灾隐患点",
              value: "6169",
              unit: "处",
            },
            {
              item: "新增地灾隐患点",
              value: "38",
              unit: "处",
            },
          ],
        },{
          describetion:
            "省民政厅共派出工作组3953个，开放应急避难场所5320个，转移安置共9.02万人，调拨帐篷735顶、折叠床3312床、棉被2000床等物资。",
          datas: [
            {
              item: "派出工作组",
              value: "3953",
              unit: "个",
            },
            {
              item: "应急避难场所",
              value: "5320",
              unit: "个",
            },
            {
              item: "安置人员",
              value: "9.02",
              unit: "万人",
            },
            {
              item: "帐篷",
              value: "735",
              unit: "顶",
            },
             {
              item: "折叠床",
              value: "3312",
              unit: "床",
            },
             {
              item: "棉被",
              value: "2000",
              unit: "床",
            }
          ],
        }
      ],
      disasterDatatoShow: {
        data: [
          {
            name: "南阳",
            value: 167,
          },
          {
            name: "周口",
            value: 67,
          },
          {
            name: "漯河",
            value: 123,
          },
          {
            name: "郑州",
            value: 55,
          },
          {
            name: "西峡",
            value: 98,
          },
        ],
      },
      compareDatatoShow: {
        data: [
          {
            name: "周口",
            value: 55123,
          },
          {
            name: "南阳",
            value: 12022,
          },
          {
            name: "西峡",
            value: 78932,
          },
          {
            name: "驻马店",
            value: 63411,
          },
          {
            name: "新乡",
            value: 44231,
          },
          {
            name: "dad",
            value: 33231,
          },
        ],
        // unit: "单位",
        // valueFormatter({ value }) {
        //   console.warn(arguments);
        //   const reverseNumber = (value + "").split("").reverse();
        //   let valueStr = "";

        //   while (reverseNumber.length) {
        //     const seg = reverseNumber.splice(0, 3).join("");
        //     valueStr += seg;
        //     if (seg.length === 3) valueStr += ",";
        //   }

        //   return valueStr.split("").reverse().join("");
        // },
      },
      disasterData: [],
      disasterOption: [
        {
          label: "受灾省份",
          options: [
            {
              value: "guangdong",
              label: "广东",
            },
            {
              value: "guangxi",
              label: "广西",
            },
            {
              value: "hainan",
              label: "海南",
            },
          ],
        },
        {
          label: "受灾县市",
          options: [
            {
              value: "guangzhou",
              label: "广州",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "jiangmen",
              label: "江门",
            },
            {
              value: "zhanjiang",
              label: "湛江",
            },
            {
              value: "zhuhai",
              label: "珠珠海江",
            },
            {
              value: "foshan",
              label: "佛山",
            },
            {
              value: "maoming",
              label: "茂名",
            },
            {
              value: "xianggang",
              label: "香港",
            },
          ],
        },
      ],
      antidisasterData: [],
      antidisasterOption: [
        {
          label: "省份",
          options: [
            {
              value: "guangdong",
              label: "广东",
            },
            {
              value: "guangxi",
              label: "广西",
            },
            {
              value: "hainan",
              label: "海南",
            },
          ],
        },
        {
          label: "县市",
          options: [
            {
              value: "guangzhou",
              label: "广州",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "jiangmen",
              label: "江门",
            },
            {
              value: "zhanjiang",
              label: "湛江",
            },
            {
              value: "zhuhai",
              label: "珠珠海江",
            },
            {
              value: "foshan",
              label: "佛山",
            },
            {
              value: "maoming",
              label: "茂名",
            },
            {
              value: "xianggang",
              label: "香港",
            },
          ],
          label: "应急部门",
          options: [
            {
              value: 1,
              label: "广东省消防大队",
            },
            {
              value: 2,
              label: "广东省民政局",
            },
            {
              value: 3,
              label: "广东省公安局",
            },
            {
              value: 4,
              label: "广东省海事局",
            },
            {
              value: 5,
              label: "广东省气象局",
            },
          ],
        },
      ],
      station: "",
      stationType: [
        {
          label: "气象站",
          options: [
            {
              value: "001",
              label: "50621",
            },
            {
              value: "002",
              label: "54621",
            },
            {
              value: "003",
              label: "54615",
            },
          ],
        },
        {
          label: "验潮站",
          options: [
            {
              value: "zhuhai",
              label: "珠海",
            },
            {
              value: "shantou",
              label: "汕头",
            },
            {
              value: "jiangmen",
              label: "江门",
            },
            {
              value: "zhanjiang",
              label: "湛江",
            },
            {
              value: "foshan",
              label: "佛山",
            },
            {
              value: "maoming",
              label: "茂名",
            },
          ],
        },
        {
          label: "海上浮标",
          options: [
            {
              value: "101",
              label: "ZH101",
            },
            {
              value: "102",
              label: "ZH102",
            },
            {
              value: "103",
              label: "SZ101",
            },
          ],
        },
      ],
    };
  },
  methods: {
    loadStationChart(station) {
      this.$echarts.init(this.$refs.stationChart).dispose();
      let myCharts1 = this.$echarts.init(this.$refs.stationChart);
      var base = +new Date(2014, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 150];
      var now = new Date(base);

      function addData(shift) {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
        date.push(now);
        data.push((Math.random() - 0.4) * 10);

        if (shift) {
          date.shift();
          data.shift();
        }

        now = new Date(+new Date(now) + oneDay);
      }

      for (var i = 1; i < 100; i++) {
        addData();
      }

      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          boundaryGap: [0, "50%"],
          type: "value",
        },
        grid: {
          x: 20,
          y: 5,
          x2: 5,
          y2: 22,
          borderWidth: 10,
        },
        series: [
          {
            name: "成交",
            type: "line",
            smooth: true,
            symbol: "none",
            stack: "a",
            areaStyle: {
              normal: {},
            },
            data: data,
          },
        ],
      };
      var timer = setInterval(function () {
        addData(true);
        myCharts1.setOption(option);
      }, 500);
    },
  },
};
</script>

<style scoped>
#disaster-report {
  color: white;
  font-size: 12px;
}
#report-data {
  color: red;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  font-size: 15px;
  padding: 5px 0px;
}
.ranking >>> .ranking-info {
  font-size: 1px;
}
.ranking >>> .row-item {
  padding: 0 9px;
}
.ranking >>> .ranking-column {
  margin: 2px;
}
.plot-box {
  margin: 0 2.5px;
  height: 170px;
}
.plot-header {
  color: white;
  opacity: 0.8;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  background-color: #02142b;
}
.plot-header span {
  padding-left: 14px;
}
.el-select {
  width: 120px;
  padding-left: 95px;
  padding-right: 14px;
}
.el-select >>> .el-input--mini .el-input__inner {
  height: 17px;
}
.plot-container {
  height: 140px;
  padding: 0px 5px;
  /* opacity: 0.5; */
  background-color: rgba(2, 20, 43, 0.5);
}
</style>