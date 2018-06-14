<template>
	<div>
		<el-row>
			<el-col :span="16" :offset="4">
				<el-card>
					<el-date-picker @change="update" v-model="year" type="year" placeholder="选择年">
					</el-date-picker>
					<div id="myChart" style="height: 500px; width: 1000px;">
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
				year: new Date()
			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			update() {
				this.$store.dispatch('loadCustomerConsume', {
					year: this.year.getFullYear()
				}).then(() => {
					this.drawLine();
				})				
			},
			drawLine() {
				var myChart = this.$echarts.init(document.getElementById('myChart'));
				var option = {
					title: {
						text: this.year.getFullYear() + '我的消费情况',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						
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
						name: '消费/元'
					},
					series: [{
						data: this.$store.getters.getCustomerConsumeByYear(this.year.getFullYear()),
						type: 'line',
						name: '消费'
					}]
				};
				myChart.setOption(option);
			}
		}
	}
</script>

<style>

</style>