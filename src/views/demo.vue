<template>
	<div>
		<fan-chart :year="2017"></fan-chart>
		<goodsList @filter="handleFilter" :goods-list="goodsListFiltered" :lines="2" :lineSize="4"></goodsList>
		<button @click="test">点击</button>
		<goods-details :goodsDetails="goodsList[1]"></goods-details>
		<comment-list :comment-list="commentList"></comment-list>
	</div>
</template>

<script>
	import goodsCard from '@/components/sale/goods-card'
	import goodsList from '@/components/sale/goods-list'
	import fanChart from '@/components/manage/fan-chart'
	import lineChart from '@/components/manage/line-chart'
	import goodsDetails from '@/components/sale/goods-details'
	import commentCard from '@/components/sale/comment-card'
	import commentList from '@/components/sale/comment-list'
	
	export default {
		data() {
			return {
				goodsDetails: {
					"type_id": 1,
					"goods_id": 1,
					"goods_name": "越南白心火龙果（1个）",
					"goods_description": "越南白心火龙果（1个）",
					"goods_price": 7.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/dragon_fruit1.jpg\"}, {\"src\": \"/static/images/fruits/dragon_fruit2.jpg\"}]",
					"goods_source": "越南",
					"type_name": "生鲜水果"
				},
				goodsList: [{
					"type_id": 1,
					"goods_id": 1,
					"goods_name": "越南白心火龙果（1个）",
					"goods_description": "越南白心火龙果（1个）",
					"goods_price": 7.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/dragon_fruit1.jpg\"}, {\"src\": \"/static/images/fruits/dragon_fruit2.jpg\"}]",
					"goods_source": "越南",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 2,
					"goods_name": "山东红富士苹果（3个）",
					"goods_description": "山东红富士苹果（3个）",
					"goods_price": 6.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/apple1.jpg\"}]",
					"goods_source": "山东",
					"type_name": "生鲜水果"
				}, {
					"type_id": 2,
					"goods_id": 3,
					"goods_name": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_description": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_price": 72,
					"goods_image": "[{\"src\": \"/static/images/food/milk1.jpg\"}]",
					"goods_source": "新西兰",
					"type_name": "进口食品"
				}, {
					"type_id": 3,
					"goods_id": 4,
					"goods_name": "三只松鼠开心果（225g x 1袋）",
					"goods_description": "三只松鼠开心果（225g x 1袋）",
					"goods_price": 28.9,
					"goods_image": "[{\"src\": \"/static/images/food/pistachio1.jpg\"}]",
					"goods_source": "上海",
					"type_name": "休闲零食"
				}, {
					"type_id": 1,
					"goods_id": 5,
					"goods_name": "新疆库尔勒香梨(1kg)",
					"goods_description": "新疆库尔勒香梨(1kg)",
					"goods_price": 15.8,
					"goods_image": "[{\"src\": \"/static/images/fruits/pear1.jpg\"}]",
					"goods_source": "新疆",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 6,
					"goods_name": "四川安岳黄柠檬（4个）",
					"goods_description": "四川安岳黄柠檬（4个）",
					"goods_price": 5.5,
					"goods_image": "[{\"src\": \"/static/images/fruits/lemon1.jpg\"}]",
					"goods_source": "四川",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 7,
					"goods_name": "海南小台农芒果（1kg）",
					"goods_description": "海南小台农芒果（1kg）",
					"goods_price": 9.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/mango1.jpg\"}]",
					"goods_source": "海南",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 8,
					"goods_name": "进口凤梨（1个）",
					"goods_description": "进口凤梨（1个）",
					"goods_price": 19.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/pineapple1.jpg\"}]",
					"goods_source": "菲律宾",
					"type_name": "生鲜水果"
				}, {
					"type_id": 1,
					"goods_id": 9,
					"goods_name": "常瀛进口香蕉（5根）",
					"goods_description": "常瀛进口香蕉（5根）",
					"goods_price": 12.9,
					"goods_image": "[{\"src\": \"/static/images/fruits/banana1.jpg\"}]",
					"goods_source": "常瀛",
					"type_name": "生鲜水果"
				}, {
					"type_id": 2,
					"goods_id": 10,
					"goods_name": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_description": "新西兰低脂牛奶（250ml x 24盒）",
					"goods_price": 72,
					"goods_image": "[{\"src\": \"/static/images/food/milk1.jpg\"}]",
					"goods_source": "新西兰",
					"type_name": "进口食品"
				}, {
					"type_id": 2,
					"goods_id": 11,
					"goods_name": "巧克力威化饼干（600g x 1盒）",
					"goods_description": "巧克力威化饼干（600g x 1盒）",
					"goods_price": 79,
					"goods_image": "[{\"src\": \"/static/images/food/biscuit1.jpg\"}]",
					"goods_source": "德国",
					"type_name": "进口食品"
				}, {
					"type_id": 2,
					"goods_id": 12,
					"goods_name": "三只松鼠开心果（225g x 1袋）",
					"goods_description": "三只松鼠开心果（225g x 1袋）",
					"goods_price": 28.9,
					"goods_image": "[{\"src\": \"/static/images/food/pistachio1.jpg\"}]",
					"goods_source": "上海",
					"type_name": "进口食品"
				}],
				commentList: [{
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}, {
					author: '123',
					content: '123'
				}],
				goodsListFiltered: [],
				filterOption: null,
				comment: {
					author: '123',
					content: '123'
				}
			}
		},
		computed: {
			
		},
		created() {
			this.goodsListFiltered = this.goodsList;
		},
		methods: {
			handleFilter(option) {
				this.filterOption = option;
				this.updateList();
			},
			test() {
				this.goodsList.pop();
			},
			updateList() {
				var minPrice = this.filterOption.price.minPrice;
				var maxPrice = this.filterOption.price.maxPrice;
				var isDiscount = this.filterOption.discount;
				var types = this.filterOption.type;
				var result = [];
				this.goodsList.forEach(value => {
					if(types.indexOf(value.type_name) != -1 
					&& value.goods_price >= (minPrice == '' ? 0 : minPrice)
					&& value.goods_price <= (maxPrice == '' ? 9999 : maxPrice)) {
						result.push(value);
					}
				})
				this.goodsListFiltered = result;
			}
		},
		components: {
			goodsCard,
			goodsList,
			fanChart,
			lineChart,
			goodsDetails,
			commentCard,
			commentList
		}
	}
</script>

<style>

</style>