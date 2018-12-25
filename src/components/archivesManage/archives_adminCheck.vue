<template>
  <div class="common-box">
		<div class="common-container pb80">
			<div>
				<p class='common-title management-title'>项目基本信息</p>
				<div class="content">
					<el-form label-position='left' :model='response' label-width="160px">
						<el-row>
							<el-col :span="8">
								<el-form-item label="项目编号：">
									<span v-text="response.orderNo"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款类型：">
									<span v-text="response.memberType==='0' ? '自然人' : '企业'"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体名称：">
									<span v-text="response.enterpriseName"> </span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="放款金额（万元）：">
									<span v-text="response.loanAmount"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="放款时间：">
									<span v-text="$formatDate(response.loanTime, 'yyyy-MM-dd hh:mm:ss')"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="社会统一编码/身份证：">
									<span v-text="response.idCard"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="业务初审：">
									<span v-text="response.firstTrial"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="所属部门：">
									<span v-text="response.firstTrialDept"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="档案提交时间：">
									<span v-text="$formatDate(response.archiveApplyTime, 'yyyy-MM-dd hh:mm:ss')"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</div>
			<div>
				<p class='common-title management-title'>项目资料清单</p>
				<div class="content">
					<el-table :data="list" border class="g-table" ref="table" style="width: 100%">
						<el-table-column label="资料类型" prop="categoryId" :formatter="(row) => $dict.findResourceName(row.categoryId)">
						</el-table-column>
						<el-table-column label="资料名称" prop="nameId" :formatter="(row) => $dict.findResourceName(row.nameId)">
						</el-table-column>
						<el-table-column label="资料形式" prop="form">
						</el-table-column>
						<el-table-column label="数量（份数）" prop="number">
						</el-table-column>
						<el-table-column label="备注" prop="remark">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div>
				<p class='common-title management-title'>项目档案审核记录</p>
				<div class="content">
					<el-table :data="historyResponses" border class="g-table" ref="table" style="width: 100%">
						<el-table-column label="审核节点" prop="node">
						</el-table-column>
						<el-table-column label="审核状态" prop="state">
							<template  slot-scope="scope">
								<span v-text="scope.row.state==='1' ? '通过' : '回退'"></span>
							</template>
						</el-table-column>
						<el-table-column label="审核/回退意见" prop="content">
						</el-table-column>
						<el-table-column label="提交时间" prop="" :formatter="(row) => $formatDate(row.createTime, 'yyyy-MM-dd')">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div v-if="ensureInfo">
				<p class='common-title management-title'>档案信息确认和意见</p>
				<div class="content">
					<el-form label-position='left' :model='ensureInfo' label-width="160px">
						<el-row>
							<el-col :span="8">
								<el-form-item :label="isFirstReview ? '风控' : '法务' + '资料确认结果：'">
									<span>已确认</span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="确认人：">
									<span v-text="ensureInfo.createName"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="确认时间：">
									<span v-text="$formatDate(ensureInfo.createTime, 'yyyy-MM-dd hh:mm:ss')"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="确认意见：">
									<span v-text="ensureInfo.content"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</div>
		</div>
		<div class="common-bottom-btn">
			<el-button @click='$router.back(-1)'>取 消</el-button>
			<el-button type='primary' @click="saveInfo">提交审批</el-button>
		</div>
		<el-dialog title="档案归档结果" :visible.sync="dialogCheckVisible" width="40%">
			<el-form :model="projectInfoListRequest" label-width="120px" ref="projectInfoListRequest">
				<el-row>
					<el-form-item label="档案归档状态" prop='state'>
						<el-radio-group v-model="projectInfoListRequest.state">
							<el-radio label="PASS">确认归档</el-radio>
							<el-radio label="BACK">回退</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-row>
				<el-row v-show="projectInfoListRequest.state === 'PASS'">
					<el-form-item label='档案编号'>
						<el-input v-model='projectInfoListRequest.fileNumber' :rows='4' :disabled="hasFileNumber"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item :label="projectInfoListRequest.state === 'PASS' ? '归档意见' : '回退原因'">
						<el-input v-model='projectInfoListRequest.content' type="textarea" :rows='4'></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCheckVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('projectInfoListRequest')">确 定</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { archivesController } from "@/controller/syd/archives_controller";
import Rules from "@/util/rules";

export default {
  data() {
    return {
			projectInfoListRequest: {
				definitionKey: this.$route.query.definitionKey,
				content: "",
				archiveId: "",
				node:  this.$route.query.node,
				state: "PASS"
			},
			isLegal: this.$route.query.definitionKey =='yw_tree_two',	// 法务
			isFirstReview: this.$route.query.definitionKey == 'yw_tree_two1',	// 初审
			response: {},
			historyResponses: [],
			list: [],
			dialogCheckVisible: false,
			hasFileNumber: "",
			orderId: this.$route.query.orderId,
			ensureInfo: {}
    };
  },
  methods: {
		getHistory(archiveId) {
			archivesController.getHistory({ archiveId }).then(res => {
				if(res.status === 200) {
					if(this.isFirstReview) {
						this.ensureInfo =  res.data.fengkong ? res.data.fengkong : false
					}
					if(this.isLegal) {
						this.ensureInfo = res.data.fawu ? res.data.fawu : false
					}
				}
			})
		},
		getProjectInfo() {
      const orderId = this.orderId;
			let type;
			if(this.isLegal) {
				type = 2
			}
			if(this.isFirstReview) {
				type = 1
			}
      archivesController.queryProjectInfo({ orderId,type }).then(res => {
        if (res.status === 200) {
					this.response = res.data.response
					this.list = res.data.list
					this.historyResponses = res.data.historyResponses
					this.projectInfoListRequest.archiveId = this.response.id
					this.projectInfoListRequest.fileNumber = res.data.response.fileNumber
					this.hasFileNumber = res.data.response.fileNumber ? true : false
					this.getHistory(this.response.id)
        }
      });
		},
		saveInfo() {
			this.dialogCheckVisible = true
			this.projectInfoListRequest.content = ""
		},
		submitForm(formName) {
			if(this.isLegal) {
				this.projectInfoListRequest.userType = '3'
			}
			if(this.isFirstReview) {
				this.projectInfoListRequest.userType = '1'
			}

			this.confirmProjectInfo(this.projectInfoListRequest)
			this.dialogCheckVisible = false
			// this.$refs[formName].validate((valid) => {
			// 	if (valid) {
					
			// 	} else {
			// 		return false
			// 	}
			// })
		},
		confirmProjectInfo(data) {
			archivesController.confirmProjectInfo(data).then(res => {
				if (res.status === 200) {
					this.$message.success("提交成功！");
					this.$router.back(-1)
				}
			})
		}
  },
  props: {},
  created() {
    this.getProjectInfo();
  },
  mounted() {},
  components: {},
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.pb80 {
	padding-bottom: 80px;
}
.common-title.management-title {
	border: none;
	margin-top: 10px;
}
.g-table {
	margin-top: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
.content {
	padding-left: 16px;
}
</style>
