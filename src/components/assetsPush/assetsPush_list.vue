<template>
  <div class="g-listpage__style" >
		<div>
			<el-tabs   v-model="activeName" tab-position="top">
				<el-tab-pane label="待推送项目" name="first">
					<assetsPushTodoList></assetsPushTodoList>
				</el-tab-pane>
				<el-tab-pane label="已推送项目" name="second">
					<assetsPushAlreadyList></assetsPushAlreadyList>
				</el-tab-pane>
			</el-tabs>
		</div>
  </div>
</template>

<script>
import assetsPushTodoList from './assetsPush_todoList'
import assetsPushAlreadyList from './assetsPush_alreadyList'
export default {
  components: {assetsPushTodoList,assetsPushAlreadyList},
  data() {
    return {
      activeName: 'first',
      orderId: ""
    };
  },
  methods: {},
  created() {
    this.orderId = this.$route.query.orderId
  },
  props: {}
};
</script>

<style lang="scss" scoped>
.g-listpage__style {
  padding-top: 10px;
}
</style>
