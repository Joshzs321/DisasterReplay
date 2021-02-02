<template>
  <div>
    <el-row>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>灾情动态累计</span>
            <el-select v-model="disasterData" filterable size="mini" placeholder="请选择地区"
              @change='changeSelectdDisterArea'>
              <el-option-group v-for="group in disasterOption" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class='plot-container'>
            <!-- <div v-for="(item,index ) in disasterDatatoShow " :key='index'> -->
            <!-- <dv-border-box-8> -->
            <!-- <el-tooltip class="item" effect="dark" :content="'单位:'+item.data[0].unit" placement="right"> -->
            <!-- <dv-capsule-chart :config="item" showValue='true' style="width:100%;height:28px;" />
                 -->
            <!-- <dv-active-ring-chart :config="item" style="width:40px;height:40px" />
                  -->
            <!-- <el-badge :value="item.data[0].value" class="item">
                    <i >{{item.data[0].name}}</i>
                  </el-badge> -->
            <!-- <span style="color:white">{{item.data[0].name}}</span>
                  <span style="color:red">{{item.data[0].value}} </span> -->
            <!-- </el-tooltip> -->
            <el-table ref="singleTable" :data="disasterDatatoShow[selectdDisterArea]" highlight-current-row
              style="width: 100%" size='mini' row-class-name='row-class' header-row-class-name='table-header-class'
              max-height='140px'>
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column property="name" label="灾情项" width="150">
              </el-table-column>
              <el-table-column property="value" label="数量" width="150">
              </el-table-column>
              <el-table-column property="unit" label="单位" width="50">
              </el-table-column>
            </el-table>
            <!-- </dv-border-box-8> -->

            <!-- </div> -->

          </div>
        </div>
      </el-col>
      <el-col :span='6'>
        <div class="plot-box">
          <div class="plot-header">
            <span>灾情累计排名</span>
            <el-select v-model="antidisasterData" filterable size="mini" placeholder="请选择灾情项"
              @change="changeSelectedDisasterItem">
              <el-option-group v-for="group in compareDisasterOption" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class='plot-container'>
            <dv-scroll-ranking-boards />
            <dv-scroll-ranking-board class="ranking" :config="compareDatatoShow[selectdDisasterItem]"
              style="width:100%;height:140px;" />
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
            <el-switch v-model="SpectialInfoToShow" active-color="#13ce66" inactive-color="#ff4949"
              @change="changeSpectialInfo">
            </el-switch>
          </div>

          <div class='plot-container scroll-container'>
            <div v-for="(item ,index) in disasterReportTest" :key="index" :id="'spetial-Info'+index"
              class="spetial-info-item">
              <div id="disaster-report">
                {{item.describetion}}
              </div>
              <div id="report-data">
                <div v-for="(dataItem,index) in item.datas" :key="index">
                  <el-tooltip class="item" effect="dark" :content="dataItem.item+dataItem.value+dataItem.unit"
                    placement="left">
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
/* eslint-disable */
import $ from 'jquery'
import { request } from '../common/requestApi'
import {myflyto} from '../common/CesiumTool'
// var dataUrl = require('../assets/data/geological_disasters.json')
// var imgUrl = require('../assets/data/disasterPoint.png')
var Cesium = window.Cesium
export default {
  data() {
    return {
      SpectialInfo: [],
      activeChapterName: 'spetial-Info1',
      SpectialInfoToShow: false,
      selectdDisasterItem: '',
      selectdDisterArea: [],
      disasterReportTest: [
        {
          describetion:
            '省国土资源厅将地质灾害隐患点和风险危险区域范围提供给当地政府，并配合当地政府迅速转移受地质灾害威胁的群众，截至18日17时，广东省自然资源系统共出动巡查排查人员46609人次，组织转移避险人员124839人，共排查地灾隐患点6169处，发现新增地灾隐患点38处。',
          datas: [
            {
              item: '排查人员',
              value: '46609',
              unit: '人次',
            },
            {
              item: '转移避险人员',
              value: '124839',
              unit: '人',
            },
            {
              item: '排查地灾隐患点',
              value: '6169',
              unit: '处',
            },
            {
              item: '新增地灾隐患点',
              value: '38',
              unit: '处',
            },
          ],
        },
        {
          describetion:
            '省民政厅共派出工作组3953个，开放应急避难场所5320个，转移安置共9.02万人，调拨帐篷735顶、折叠床3312床、棉被2000床等物资。',
          datas: [
            {
              item: '派出工作组',
              value: '3953',
              unit: '个',
            },
            {
              item: '应急避难场所',
              value: '5320',
              unit: '个',
            },
            {
              item: '安置人员',
              value: '9.02',
              unit: '万人',
            },
            {
              item: '帐篷',
              value: '735',
              unit: '顶',
            },
            {
              item: '折叠床',
              value: '3312',
              unit: '床',
            },
            {
              item: '棉被',
              value: '2000',
              unit: '床',
            },
          ],
        },
      ],
      disasterDatatoShow: {
        guangdong: [
          {
            name: '死亡人口',
            value: 1,
            unit: '人',
          },
          {
            name: '受伤人口',
            value: 67,
            unit: '人',
          },
          {
            name: '转移安置人口',
            value: 45.246,
            unit: '千人',
          },
          {
            name: '农田受损面积',
            value: 55,
            unit: '公顷',
          },
          {
            name: '渔场受损面积',
            value: 98,
            unit: '公顷',
          },
        ],
        guangzhou: [
          {
            name: '死亡人口',
            value: 1,
            unit: '人',
          },
          {
            name: '受伤人口',
            value: 35,
            unit: '人',
          },
          {
            name: '转移安置人口',
            value: 23.654,
            unit: '千人',
          },
          {
            name: '农田受损面积',
            value: 33,
            unit: '公顷',
          },
          {
            name: '渔场受损面积',
            value: 45,
            unit: '公顷',
          },
        ],
      },
      compareDatatoShow: {
        NZWSS: {
          unit: '公顷',
          data: [
            {
              name: '湛江',
              value: 33,
            },
            {
              name: '广州',
              value: 11,
            },
            {
              name: '茂名',
              value: 56,
            },
            {
              name: '深圳',
              value: 41,
            },
            {
              name: '佛山',
              value: 10,
            },
            {
              name: '江门',
              value: 54,
            },
            {
              name: '珠海',
              value: 6,
            },
          ],
        },
        ZYRS: {
          unit: '人',
          data: [
            {
              name: '湛江',
              value: 55123,
            },
            {
              name: '广州',
              value: 23654,
            },
            {
              name: '茂名',
              value: 78932,
            },
            {
              name: '深圳',
              value: 63411,
            },
            {
              name: '佛山',
              value: 44231,
            },
            {
              name: '江门',
              value: 33231,
            },
            {
              name: '珠海',
              value: 15424,
            },
          ],
        },
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
          label: '受灾省份',
          options: [
            {
              value: 'guangdong',
              label: '广东',
            },
            {
              value: 'guangxi',
              label: '广西',
            },
            {
              value: 'hainan',
              label: '海南',
            },
          ],
        },
        {
          label: '受灾县市',
          options: [
            {
              value: 'guangzhou',
              label: '广州',
            },
            {
              value: 'Shenzhen',
              label: '深圳',
            },
            {
              value: 'jiangmen',
              label: '江门',
            },
            {
              value: 'zhanjiang',
              label: '湛江',
            },
            {
              value: 'zhuhai',
              label: '珠海',
            },
            {
              value: 'foshan',
              label: '佛山',
            },
            {
              value: 'maoming',
              label: '茂名',
            },
            {
              value: 'xianggang',
              label: '香港',
            },
          ],
        },
      ],
      antidisasterData: [],
      compareDisasterOption: [
        {
          label: '承载体',
          options: [
            {
              value: 'SWRS',
              label: '死亡人数',
            },
            {
              value: 'SSRS',
              label: '受伤人数',
            },
            { value: 'ZYRS', label: '转移人数' },
            {
              value: 'NZWSS',
              label: '农作物受损',
            },
          ],
        },
        {
          label: '县市',
          options: [
            {
              value: 'guangzhou',
              label: '广州',
            },
            {
              value: 'Shenzhen',
              label: '深圳',
            },
            {
              value: 'jiangmen',
              label: '江门',
            },
            {
              value: 'zhanjiang',
              label: '湛江',
            },
            {
              value: 'zhuhai',
              label: '珠珠海江',
            },
            {
              value: 'foshan',
              label: '佛山',
            },
            {
              value: 'maoming',
              label: '茂名',
            },
            {
              value: 'xianggang',
              label: '香港',
            },
          ],
          label: '应急部门',
          options: [
            {
              value: 1,
              label: '广东省消防大队',
            },
            {
              value: 2,
              label: '广东省民政局',
            },
            {
              value: 3,
              label: '广东省公安局',
            },
            {
              value: 4,
              label: '广东省海事局',
            },
            {
              value: 5,
              label: '广东省气象局',
            },
          ],
        },
      ],
      station: '',
      stationType: [
        {
          label: '气象站',
          options: [
            {
              value: '001',
              label: '50621',
            },
            {
              value: '002',
              label: '54621',
            },
            {
              value: '003',
              label: '54615',
            },
          ],
        },
        {
          label: '验潮站',
          options: [
            {
              value: 'zhuhai',
              label: '珠海',
            },
            {
              value: 'shantou',
              label: '汕头',
            },
            {
              value: 'jiangmen',
              label: '江门',
            },
            {
              value: 'zhanjiang',
              label: '湛江',
            },
            {
              value: 'foshan',
              label: '佛山',
            },
            {
              value: 'maoming',
              label: '茂名',
            },
          ],
        },
        {
          label: '海上浮标',
          options: [
            {
              value: '101',
              label: 'ZH101',
            },
            {
              value: '102',
              label: 'ZH102',
            },
            {
              value: '103',
              label: 'SZ101',
            },
          ],
        },
      ],
    }
  },
  methods: {
    changeSelectedDisasterItem(name) {
      this.selectdDisasterItem = name
    },
    changeSelectdDisterArea(name) {
      this.selectdDisterArea = name
    },
    loadStationChart(station) {
      this.$echarts.init(this.$refs.stationChart).dispose()
      let myCharts1 = this.$echarts.init(this.$refs.stationChart)
      var base = +new Date(2014, 9, 3)
      var oneDay = 24 * 3600 * 1000
      var date = []

      var data = [Math.random() * 150]
      var now = new Date(base)

      function addData(shift) {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(now)
        data.push((Math.random() - 0.4) * 10)

        if (shift) {
          date.shift()
          data.shift()
        }

        now = new Date(+new Date(now) + oneDay)
      }

      for (var i = 1; i < 100; i++) {
        addData()
      }

      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          boundaryGap: [0, '50%'],
          type: 'value',
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
            name: '成交',
            type: 'line',
            smooth: true,
            symbol: 'none',
            stack: 'a',
            areaStyle: {
              normal: {},
            },
            data: data,
          },
        ],
      }
      var timer = setInterval(function () {
        addData(true)
        myCharts1.setOption(option)
      }, 500)
    },
    changeSpectialInfo() {
      if (this.SpectialInfoToShow) {
        var _this = this
        $('.scroll-container').scroll(function () {
          var chapter = _this.disasterReportTest
          for (let i = 0; i < chapter.length; i++) {
            if (_this.isScrollShow('spetial-Info' + i)) {
              _this.setActiveChapter(chapter[i], i)
            }
          }
        })
      }
    },
    // 这是scoll相对于window的判断
    // isElementOnScreen(id) {
    //   var element = document.getElementById(id)
    //   console.log(element)
    //   var bounds = element.getBoundingClientRect()
    //   var top = window.innerHeight - bounds.top
    //   console.log('top: ', top)
    //   var bottom = window.innerHeight - bounds.bottom
    //   console.log(' bottom: ', bottom)
    //   return top < 150 && bottom > 49
    // },

    setActiveChapter(spetialInfoItem, index) {
      var chapterName = 'spetial-Info' + index
      if (chapterName === this.activeChapterName) return
      this.activeChapterName = chapterName
      // myflyto(this.$store.state.view[spetialInfoItem.area]);
      myflyto(window.viewer,112.91, 19.71, 382257, 1.0, 341.34, -56.87, 0)
      viewer.entities.removeAll()
      var promise = Cesium.GeoJsonDataSource.load(dataUrl)
      promise.then(function (dataSource) {
        var entities = dataSource.entities.values
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i]
          var entity1 = viewer.entities.add({
            name: entity._name,
            id: 'disasterPoint' + i,
            position: entity._position,
            billboard: {
              image: imgUrl,
              width: 20,
              height: 20,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0,
                5000000
              ),
            },
          })
          entity1.merge(entity)
        }
      })
    },
    // 判断spetial-info-item是否被遮挡，相对于父元素
    isScrollShow(id) {
      var elem = document.getElementById(id)
      var bounds = elem.getBoundingClientRect()
      var elemHeight = bounds.bottom - bounds.top
      var show = true
      var pBounds = elem.parentElement.getBoundingClientRect() //这里需要根据结构重新写
      if (
        pBounds.top - (1 / 2) * elemHeight > bounds.top ||
        pBounds.bottom + (1 / 2) * elemHeight < bounds.bottom
      ) {
        show = false
      }
      return show
    },
  },
  mounted() {
    // 打开灾害数据显示面板的时候去请求灾情统计数据
    // 但是动态变化展示的灾情数据应该在点击事件播放的时候去请求
    // 创建脚本的时候，数据直接放入vuex中，只有加载脚本的时候才发起请求
    // request.loadSpectialInfo((data) => {
    //   this.disasterReport = data
    // })
    var viewer = window.viewer
  },
}
</script>

<style scoped>
.spetial-info-item {
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dv-capsule-chart >>> .unit-label {
  display: none;
}
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
.el-table >>> .row-class {
  color: white;
  background-color: rgba(2, 20, 43, 1);
}

.el-table >>> .current-row > td {
  background: rgba(0, 158, 250, 0.219) !important;
}
.el-table >>> tbody tr:hover > td {
  background-color: rgba(0, 158, 250, 0.219) !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  color: #fff;
  background-color: #a2a4a7 !important;
}
</style>