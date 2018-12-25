<template>
  <div>
		<div>
			<p class='common-title management-title'>项目审批记录</p>
			<div class="content">
				<el-table :data="approvalHistoryResponseList" border class="g-table" ref="table" style="margin-top:0;">
					<el-table-column prop="node" label="审批节点">
					</el-table-column>
					<el-table-column prop="state" label="审批结果">
						<template slot-scope="scope">
							<span v-text="scope.row.state === '1' ? '通过' : (scope.row.state === '2' ? '拒绝' : '回退')"></span>
						</template>
					</el-table-column>
					<el-table-column prop="projectAmount" label="审批金额">
					</el-table-column>
					<el-table-column label="期限">
						<template slot-scope="scope">
							<span v-text="scope.row.projectTerm"></span>
							<span v-text="$dict.findDictionaryName(scope.row.projectTermUnit)"></span>
						</template>
					</el-table-column>
					<el-table-column prop="paymentplanId" label="还款方式">
						<template slot-scope="scope">
							<span v-text="$dict.findDictionaryName(scope.row.paymentplanId)"></span>
						</template>
					</el-table-column>
					<el-table-column prop="feeplanId" label="费用方案" width="100">
						<template slot-scope="scope">
							<span v-text="scope.row.feeplanId === 1 ? '默认方案' : '技术服务费方案'"></span>
						</template>
					</el-table-column>
					<el-table-column prop="projectRate" label="费率" width="110px">
						<template slot-scope="scope">
							<span v-text="scope.row.projectRate + (scope.row.feeplanId === 1 ? ('%/' + $dict.findDictionaryName(scope.row.projectrateUnit)) : '%/月')"></span>
						</template>
					</el-table-column>
					<el-table-column prop="managementRate" label="平台利率" width="80">
						<template slot-scope="scope">
							<span v-text="scope.row.managementRate ? (scope.row.managementRate + (scope.row.feeplanId === 1 ? '' : ('%/' + $dict.findDictionaryName(scope.row.projectrateUnit)))) : ''"></span>
						</template>
					</el-table-column>
					<el-table-column prop="interestPayment" label="付息方式">
						<template slot-scope="scope">
							<span v-text="$dict.findDictionaryName(scope.row.interestPayment)"></span>
						</template>
					</el-table-column>
					<el-table-column prop="overdueRate" label="逾期费率" width="120px">
						<template slot-scope="scope">
							<span v-text="scope.row.overdueRate ? scope.row.overdueRate + '‰/天' : ''"></span>
						</template>
					</el-table-column>
					<el-table-column prop="loanCondition" label="原因">
					</el-table-column>
					<el-table-column prop="auditOpinion" label="审批意见">
					</el-table-column>
					<el-table-column prop="createTime" label="审批时间" width="160" :formatter="(row) => $formatDate(row.createTime, 'yyyy-MM-dd hh:mm:ss')">
					</el-table-column>
				</el-table>
			</div>
		</div>
  </div>
</template>

<script>
import {orderController} from './../../controller/common/order_controller'
  export default {
    data () {
      return {
				orderId: this.$route.query.orderId,
				orderResponse: {},
				approvalHistoryResponseList : [],
      }
    },
    methods: {
			getApproveRecord () {
        const orderId = this.orderId
        orderController.queryApplyDetail({orderId}).then(res => {
          if (res.status === 200) {
						this.orderResponse = res.data.orderResponse
						let createTime = new Date(this.orderResponse.createTime);
            this.orderResponse.createTime = this.orderResponse.createTime ? this.$formatDate(createTime, "yyyy-MM-dd hh:mm:ss") : "";
						this.approvalHistoryResponseList = res.data.approvalHistoryResponseList
          }
        })
			},

    },
		props: {},
		created() {
			this.getApproveRecord()
		},
    mounted () {},
    components: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .common-title.management-title {
		border: none;
	}
	.content {
		padding-left: 16px;
		.el-form-item {
			margin-bottom: 0px;
		}
	}
</style>
