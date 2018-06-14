import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import login from '@/views/login'
import demo from '@/views/demo'
import demo2 from '@/views/demo2'

import sale from '@/views/sale/index'
import goodsSale from '@/views/sale/goods-sale'
import goodsDetails from '@/views/sale/goods-details'
import checkout from '@/views/sale/checkout'
import userCenter from '@/views/sale/user-center'
import userShoppingChart from '@/views/sale/user-shopping-chart'
import customerHabitFanChart from '@/views/sale/user_shopping_chart/habit_fan-chart'
import consume from '@/views/sale/user_shopping_chart/consume'

import manage from '@/views/manage/index'
import employeeInfo from '@/views/manage/employee-info'
import saleChart from '@/views/manage/sale-chart'
import saleLinechart from '@/views/manage/sale-linechart'
import discount from '@/views/manage/discount'
import stock from '@/views/manage/stock'
import goodsSale2 from '@/views/manage/goods-sale'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path: '/demo',
    	name: 'demo',
    	component: demo
    },
    {
    	path: '/demo2',
    	name: 'demo2',
    	component: demo2
    },
    {
    	path: '/sale',
    	name: 'sale',
    	component: sale,
    	children: [{
    		path: '',
    		redirect: 'goods-sale'
    	}, {
    		path: 'goods-sale',
    		component: goodsSale
    	}, {
    		path: 'goods/:id',
    		component: goodsDetails
    	}, {
    		path: 'checkout',
    		component: checkout
    	}, {
    		path: 'user-center',
    		component: userCenter
    	}, {
    		path: 'user-shopping-chart',
    		component: userShoppingChart,
    		children: [{
    			path: '',
    			component: customerHabitFanChart
    		}, {
    			path: 'habit',
    			component: customerHabitFanChart
    		}, {
    			path: 'consume',
    			component: consume
    		}]
    	}]
    },
    {
    	path: '/manage',
    	name: 'manage',
    	component: manage,
    	children: [{
    		path: '',
    		redirect: 'employee-info'
    	}, {
    		path: 'employee-info',
    		component: employeeInfo
    	}, {
    		path: 'sale-chart',
    		component: saleChart
    	}, {
    		path: 'sale-linechart',
    		component: saleLinechart
    	}, {
    		path: 'discount',
    		component: discount
    	}, {
    		path: 'stock',
    		component: stock
    	}, {
    		path: 'goods-sale',
    		component: goodsSale2
    	}]
    }
  ],
  scrollBehavior(to, from, savePosition) {
  	return {x: 0, y: 0}
  }
})
