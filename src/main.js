// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import axios from 'axios'
import { getCookie, setCookie, delCookie } from './utils/util.js'
import VueX from 'vuex'
import store from '../store'

Vue.use(ElementUI);
Vue.use(VueX)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.$cookieStore = {
	getCookie,
	setCookie,
	delCookie
}

Date.prototype.datetime = function() {
	return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + this.getDate() + ' ' + this.getHours() + ':' + ('0' + (this.getMinutes())).slice(-2) + ':' + this.getSeconds();
};

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})