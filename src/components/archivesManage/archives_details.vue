<template>
	<div class="common-box">
		<div class="common-container pb80">
			<div>
				<div>
					<p class='common-title management-title first-title'>项目基本信息</p>
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
				<div v-if="fawu">
					<p class='common-title management-title'>档案信息确认和意见</p>
					<div class="content">
						<el-form label-position='left' :model='fawu' label-width="160px">
							<el-row>
								<el-col :span="8">
									<el-form-item label="法务资料确认结果：">
										<span>已确认</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="确认人：">
										<span v-text="fawu.createName"></span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="确认时间：">
										<span v-text="$formatDate(fawu.createTime, 'yyyy-MM-dd hh:mm:ss')"></span>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item label="确认意见：">
										<span v-text="fawu.content"></span>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</div>
				<div v-if="fengkong">
					<p class='common-title management-title'>档案信息确认和意见</p>
					<div class="content">
						<el-form label-position='left' :model='fengkong' label-width="160px">
							<el-row>
								<el-col :span="8">
									<el-form-item label="风控资料确认结果：">
										<span>已确认</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="确认人：">
										<span v-text="fengkong.createName"></span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="确认时间：">
										<span v-text="$formatDate(fengkong.createTime, 'yyyy-MM-dd hh:mm:ss')"></span>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item label="确认意见：">
										<span v-text="fengkong.content"></span>
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
			</div>
		</div>
		<div class="common-bottom-btn">
			<el-button @click='$router.back(-1)'>取 消</el-button>
		</div>
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
        node: this.$route.query.node,
        state: "PASS"
      },
      isLegal: this.$route.query.definitionKey == "yw_tree_two", // 法务
      isFirstReview: this.$route.query.definitionKey == "yw_tree_two1", // 初审
      response: {},
      historyResponses: [],
      list: [],
      dialogCheckVisible: false,
      fawu: {},
      fengkong: {},

      orderId: this.$route.query.orderId
    };
  },
  methods: {
    getProjectInfo() {
      const orderId = this.orderId;
      let type;
      if (this.isLegal) {
        type = 2;
      }
      if (this.isFirstReview) {
        type = 1;
      }
      archivesController.queryProjectInfo({ orderId, type }).then(res => {
        if (res.status === 200) {
          this.response = res.data.response;
          this.list = res.data.list;
          this.historyResponses = res.data.historyResponses;
          this.projectInfoListRequest.archiveId = this.response.id;
          this.projectInfoListRequest.fileNumber = res.data.response.fileNumber;
          this.getHistory(this.response.id);
        }
      });
    },
    getHistory(archiveId) {
      archivesController.getHistory({ archiveId }).then(res => {
        if (res.status === 200) {
          this.fawu = res.data.fawu ? res.data.fawu : false;
          this.fengkong = res.data.fengkong ? res.data.fengkong : false;
        }
      });
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
.common-title.management-title.first-title {
	margin-top: 0px;
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
