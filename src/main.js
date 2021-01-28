// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'jquery'
import VueAxios from 'vue-axios'
import vuescroll from "vuescroll";//引入vuescroll
import "vuescroll/dist/vuescroll.css";//引入vuescroll样式
import store from './store'

Vue.use(vuescroll);//使用
var echarts = require('echarts');
Vue.prototype.$echarts = echarts
    // import ElementUI from 'element-ui'
import './plugins/element.js'
// import './plugins/vueMaterial.js'
import './assets/CSS/global.css'
import './assets/CSS/index.css'
// 注册库，使所有组件都能使用该库
// Vue.use(ElementUI);
// VueAxios是axios的Vue插件
Vue.use(VueAxios,axios )
Vue.config.productionTip = false;
// 数据可视化
import dataV from '@jiaminghi/data-view'
Vue.use(dataV);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    store,
    template: '<App/>'
})