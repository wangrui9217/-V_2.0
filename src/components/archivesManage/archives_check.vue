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
									<span v-text="response.memberType=='0' ? '自然人' : '企业'"></span>
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
			<el-form ref="ruleForm1" v-if="isAssistant" :model="projectInfoListRequest" style="padding:30px 0 30px 10px;background-color:#fff;">
				<el-form-item :rules='rules.requiredInputValue' prop='content' label="资料确认备注：">
					<el-col :span="21">
						<el-input type="textarea" :rows="4" v-model="projectInfoListRequest.content"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div v-if="!isAssistant">
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
		<div class="common-bottom-btn">
			<el-button @click='$router.back(-1)'>取 消</el-button>
			<el-button type='primary' @click="saveInfo">提交审批</el-button>
		</div>
		<el-dialog title="档案审核结果" :visible.sync="dialogCheckVisible" width="40%">
			<el-form :model="projectInfoListRequest" label-width="100px" ref="ruleForm2" inline-message>
				<el-row>
					<el-form-item label="审核结果" prop='state' :rules='rules.requiredInputValue'>
						<el-radio-group v-model="projectInfoListRequest.state" @change="changeResult">
							<el-radio label="PASS">确认</el-radio>
							<el-radio label="BACK">回退</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label='备注' prop='content' :rules='rules.requiredInputValue'>
						<el-input v-model='projectInfoListRequest.content' type="textarea" :rows='4'></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCheckVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
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
			rules: Rules,
      projectInfoListRequest: {
        definitionKey: this.$route.query.definitionKey,
        content: "",
        archiveId: "",
        node: this.$route.query.node,
        state: "PASS"
      },
      isAssistant:
        this.$route.query.definitionKey != "yw_tree_one" &&
        this.$route.query.definitionKey != "yw_tree_one1", // 业务助理
      isLegal: this.$route.query.definitionKey == "yw_tree_one", // 法务
      isFirstReview: this.$route.query.definitionKey == "yw_tree_one1", // 初审
      response: {},
      historyResponses: [],
      list: [],
      dialogCheckVisible: false,

      orderId: this.$route.query.orderId
    };
  },
  methods: {
		changeResult() {
			this.$refs.ruleForm2.clearValidate()
			this.projectInfoListRequest.content = ""
		},
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
        }
      });
    },
    saveInfo() {
      if (this.isAssistant) {
        this.$refs.ruleForm1.validate(valid => {
          if (valid) {
            this.confirmProjectInfo(this.projectInfoListRequest);
          } else {
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
      } else {
        this.dialogCheckVisible = true;
        this.projectInfoListRequest.content = "";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isLegal) {
            this.projectInfoListRequest.userType = "3";
          }
          if (this.isFirstReview) {
            this.projectInfoListRequest.userType = "1";
          }
          this.confirmProjectInfo(this.projectInfoListRequest);
          this.dialogCheckVisible = false;
        } else {
					// this.$message.info("必填项不能为空！");
          return false;
        }
      });
    },
    confirmProjectInfo(data) {
      archivesController.confirmProjectInfo(data).then(res => {
        if (res.status === 200) {
          this.$message.success("提交成功！");
          this.$router.back(-1);
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
