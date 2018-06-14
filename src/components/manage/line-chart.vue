<template>
	<div>
		<el-date-picker @change="update" v-model="date" type="year" placeholder="选择年">
		</el-date-picker>
		<button @click="update">更新</button>
		<div id="myChart" :style="{width: width, height: height}">
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				saleRecord: [],
				typeNames: ['所有商品'],
				date: new Date()
			}
		},
		computed: {
			year() {
				var result = this.date.getFullYear();
				return result;
			},
			yearRecord() {
				return this.$store.getters.getRecordByYear(this.year)[0].data
			}
		},
		props: {
			width: {
				type: String,
				default: '1200px'
			},
			height: {
				type: String,
				default: '500px'
			}
		},
		mounted() {
			this.drawLine();

		},
		created() {
			this.$store.dispatch('loadYearRecord', {
				year: this.year
			})
			this.$store.dispatch('loadTypeNames').then(() => {
				this.$store.state.goods.typeNames.forEach(value => {
					this.typeNames.push(value.type_name);
					this.drawLine();
				})
			});
		},
		methods: {
			drawLine() {
				var myChart = this.$echarts.init(document.getElementById('myChart'));
				var option = {
					title: {
						text: this.year + '年全年销量变化情况',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis'
						
					},
					legend: {
						data: this.typeNames,
						top: 30,
						selected: {
							'生鲜水果': false,
							'进口食品': false,
							'休闲零食': false,
							'酒水乳饮': false,
							'粮油副食': false,
							'美妆个护': false,
							'家居用品': false,
							'家庭清洁': false,
							'母婴玩具': false
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
							'八月', '九月', '十月', '十一月', '十二月'
						],
						name: '月份'
					},
					yAxis: {
						name: '销量额/元'
					},
					series: this.yearRecord
				};
				myChart.setOption(option);
			},
			update() {
				this.$store.dispatch('loadYearRecord', {
					year: this.year
				}).then(() => {
					this.drawLine();
				})				
			}
		}
	}
</script>

<style>

</style>