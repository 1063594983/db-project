<template>
	<div>
		<el-date-picker @change="update" v-model="date" type="year" placeholder="选择年">
		</el-date-picker>
		<div id="myChart" :style="{width: width, height: height}">
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				yearGoodsRecord: [],
				date: new Date()
			}
		},
		props: {
			width: {
				type: String,
				default: '800px'
			},
			height: {
				type: String,
				default: '500px'
			}
		},
		computed: {
			types() {
				var types = [];
				this.$store.state.goodsType.forEach(value => {
					types.push(value.type_name);
				})
				return types;
			},
			data() {
				return this.$store.state.fanChart;
			},
			yearRecord2() {
				return this.$store.getters.getRecord2ByYear(this.year)[0].data
			},
			year() {
				return this.date.getFullYear()
			}
		},
		created() {
			this.$store.dispatch('loadYearRecord2', {
				year: this.year
			}).then(() => {
				this.drawLine();
			})
			if(this.$store.state.fanChart.length == 0) {
				var result = [];
				this.types.forEach(value => {
					result.push({
						name: value,
						value: this.getYearAmount(value)
					})
				})
				result.forEach(value => {
					value.value = value.value.toFixed(2);
				})
				this.$store.commit('loadFanChart', result);
			}
		},
		mounted() {
			this.drawLine();

		},
		methods: {
			drawLine() {
				var myChart = this.$echarts.init(document.getElementById('myChart'));
				var option = {
					title: {
						text: this.year + '年超市销量情况',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{b} : {c}元 ({d}%)"
					},
					legend: {
						// orient: 'vertical',
						// top: 'middle',
						bottom: 10,
						left: 'center',
						data: this.types
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: this.yearRecord2,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				myChart.setOption(option);
			},
			update() {
				this.$store.dispatch('loadYearRecord2', {
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