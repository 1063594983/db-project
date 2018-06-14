<template>
	<div>
		<el-row>
			<el-col :span="16" :offset="4">
				<el-card>
					<div id="myChart" style="width: 1000px; height: 500px;">
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				habitData: [],
				typeNames: []
			}
		},
		created() {
			this.init();
			
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			drawLine() {
				var myChart = this.$echarts.init(document.getElementById('myChart'));
				var option = {
					title: {
						text: '我的购物习惯',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{b}({d}%)"
					},
					legend: {
						// orient: 'vertical',
						// top: 'middle',
						bottom: 10,
						left: 'center',
						data: this.typeNames
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: this.habitData,
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
			init() {
				this.$store.dispatch('loadCustomerHabit');
				this.$store.state.goods.typeNames.forEach((value, index) => {
					this.habitData.push({
						name: value.type_name,
						value: this.$store.state.customer.customerHabit[index]
					})
					this.typeNames.push(value.type_name);
				})			
			}
		}
	}
</script>

<style>
</style>