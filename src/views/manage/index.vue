<template>
	<div>
		<h1>后台管理</h1>
		<el-container>
			<el-aside width="250px">
				<sidemenu @message="handleSelect" :active="active"></sidemenu>
			</el-aside>
			<el-container>
				<el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" 
					@tab-click="select" @tab-remove="handleRemove">
					<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
						<router-view  v-if="editableTabsValue == item.name"></router-view>
					</el-tab-pane>
				</el-tabs>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import sidemenu from '@/components/manage/side-menu'
	export default {
		data() {
			return {
				editableTabsValue: '',
				editableTabs: [],
				tabIndex: 2,
				active: ''
			}
		},
		methods: {
			handleTabsEdit(targetName, action) {
				if(action === 'add') {
					let newTabName = ++this.tabIndex + '';
					this.editableTabs.push({
						title: 'New Tab',
						name: newTabName,
						content: 'New Tab content'
					});
					this.editableTabsValue = newTabName;
				}
				if(action === 'remove') {
					let tabs = this.editableTabs;
					let activeName = this.editableTabsValue;
					if(activeName === targetName) {
						tabs.forEach((tab, index) => {
							if(tab.name === targetName) {
								let nextTab = tabs[index + 1] || tabs[index - 1];
								if(nextTab) {
									activeName = nextTab.name;
								}
							}
						});
					}

					this.editableTabsValue = activeName;
					this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				}
			},
			handleRemove(name) {
				this.refresh();
			},
			select(tab) {
				this.active = tab.name;
				this.$router.push({
					path: '/manage/' + tab.name
				})
				
			},
			handleSelect(key) {
				var newTabName = key;
				var flag = false;
				this.editableTabs.forEach(value => {
					if(value.name == newTabName) {
						this.editableTabsValue = newTabName;
						flag = true;
					}
				})
				if(flag == false) {
					this.editableTabs.push({
						title: key,
						name: newTabName,
						content: key
					})
					this.editableTabsValue = newTabName;
				}

			},
			refresh() {
				this.$router.push({
					path: '/manage/' + this.editableTabsValue
				})
			}
		},
		created() {
			this.$store.dispatch('loadCurrentMonthRecord');
			var paths = this.$router.currentRoute.fullPath.split('/');
			var path = paths[paths.length - 1];
			this.editableTabs.push({
				name: path,
				title: path
			})
			this.editableTabsValue = path;
			this.active = this.$router.currentRoute.path.split('/').pop();
		},
		components: {
			sidemenu
		}
	}
</script>

<style>

</style>