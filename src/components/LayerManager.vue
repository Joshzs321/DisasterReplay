<template>
  <div id="layer-manager-container">
    <el-tree :props="props" node-key="id" :default-checked-keys="defaultCheck" :load="loadNode" lazy show-checkbox
      @check="handleNodeClick" @check-change="handleCheckChange">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
      },
      count: 1,
      baseLayersName: [],
      baseLayers: new Map(),
      CZTLayers: [],
      KZTLayers: [],
      seletedCZTLayers: [],
      seletedNode: "",
      defaultCheck: [100, 101, 102],
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      //   控制图层隐藏
      var layer = this.baseLayers.get(data.name);
      layer.show = !layer.show;
    },
    handleNodeClick(data, checked) {},
    // 动态来确定当前时刻存在的图层
    loadNode(node, resolve) {
      if (node.level === 0) {
        //   设置较大id使其默认选中
        return resolve([
          { id: 100, name: "基础地理信息" },
          { id: 101, name: "承载体图层" },
          { id: 102, name: "抗灾体图层" },
        ]);
      }
      if (node.level > 1) return resolve([]);

      if (node.data.name === "基础地理信息") {
        return resolve(this.baseLayersName);
      } else if (node.data.name === "承载体图层") {
        return resolve(this.CZTLayers);
      } else if (node.data.name === "抗灾体图层") {
        return resolve(this.KZTLayers);
      }
    },
  },
  mounted() {
    let viewr = window.viewer;
    let imageLayerLength = viewr.imageryLayers.length;
    for (let i = 0; i < imageLayerLength; i++) {
      var layer = viewr.imageryLayers.get(i);
      var url = layer.imageryProvider.url;
      var layerName = this.$store.state.layers.get(url);
      if (layerName) {
        this.baseLayersName.push({ id: i, name: layerName });
        this.baseLayers.set(layerName, layer);
      }
    }
  },
};
</script>

<style scoped>
#layer-manager-container {
  position: absolute;
  width: 134px;
  right: 34px;
  top: 113px;
  display: inline-block;
  float: right;
}
</style>