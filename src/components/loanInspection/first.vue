<template>
  <div>
		<div class="pt16">
			<p class='common-title'>项目查询</p>
			<div>
				<el-form label-position='left' :model='parameter' label-width="160px" style="margin-top:20px;">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label='项目编号：' prop='orderNo'>
								<el-input v-model="parameter.orderNo"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='企业名称/客户姓名：' prop='enterpriseName'>
								<el-input v-model="parameter.enterpriseName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" style="text-align:right;">
							<el-form-item>
								<el-button type="primary" @click="searchFnc">搜索</el-button>
								<!--<el-button @click="resetForm('searchForm')">重置</el-button>-->
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
        <template>
          <el-table
            ref="tableData"
            :data="tableData"
            highlight-current-row
            @row-click="openDetails"
            @selection-change="handleSelectionChange"
            @current-change="handleCurrentChange">
            <el-table-column property="orderNo" label="项目编号">
            </el-table-column>
            <el-table-column property="enterpriseName" label="企业名称/客户姓名">
            </el-table-column>
            <el-table-column property="loanAmount" label="放款金额">
            </el-table-column>
            <el-table-column property="projectTerm" label="借款期限">
              <template slot-scope="scope">
              <span v-text="scope.row.projectTerm"></span>
              <span v-text="$dict.findDictionaryName(scope.row.projectTermUnit)"></span>
              </template>
            </el-table-column>
            <el-table-column property="payment" label="还款方式">
            </el-table-column>
            <el-table-column property="loanTime" :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd')" label="放款日期" >
            </el-table-column>
          </el-table>
        </template>
				<el-pagination
				style="float:middle"
				@size-change="pageSizeChange"
				@current-change="pageNoChange"
				:current-page="pageNo"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="prev, pager, next, jumper,total, sizes"
				:total="total">
				</el-pagination>
			</div>
		</div>
		<div class="pt16">
			<p class='common-title'>确认选中项目信息</p>
			<div>
				<el-form label-position='left' :model='messageForm'  res=" firstInfo" label-width="145px">
					<el-row>
						<el-col :span="8">
							<el-form-item label='项目编号：' prop='orderNo' style="font-size:20px;">
                <span v-text="messageForm.orderNo"></span>
              </el-form-item>
						</el-col>
            <el-col :span="8">
              <el-form-item label='企业名称/客户姓名：' prop='enterpriseName' style="font-size:20px;">
                <span v-text="messageForm.enterpriseName"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label='贷款金额：' prop='projectAmount'>
                <span v-text="messageForm.projectAmount"></span>
              </el-form-item>
            </el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='贷款期限：' prop='projectTerm'>
                  <span v-text="messageForm.projectTerm"></span>
                  <span v-text="$dict.findDictionaryName(messageForm.projectTermUnit)"></span>
              </el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='企业地址：' prop='address'>
                <span v-text="messageForm.address"></span>
              </el-form-item>
						</el-col>
            <el-col :span="8">
              <el-form-item label='还款方式：' prop='payment'>
                <span v-text="messageForm.payment"></span>
              </el-form-item>
            </el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='业务开展日期：' prop='biginTime'>
                <span v-text="messageForm.biginTime"></span>
              </el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='业务结束日期：' prop='endTTime'>
                <span v-text="messageForm.endTTime"></span>
              </el-form-item>
						</el-col>
            <el-col :span="8">
              <el-form-item label='贷款用途：' prop='usages'>
                <span v-text="$dict.findDictionaryName(messageForm.usages)"></span>
              </el-form-item>
            </el-col>
					</el-row>
          <el-row>

            <el-col :span="8">
              <el-form-item label='业务经理：' prop='salesmanName'>
                <span v-text="messageForm.salesmanName"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label='初审经理：' prop='firstName'>
                <span v-text="messageForm.firstName"></span>
              </el-form-item>
            </el-col>
          </el-row>
				</el-form>
			</div>
		</div>
  </div>
</template>

<script>
import { loanInspectionController } from "./../../controller/common/loanInspection_controller";

export default {
  components: {},
  data() {
    return {
      currentRow:[],
      total: 0,
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      pageNo: 1,
      pageSize: 10,
      parameter:{
        orderNo:'',
        enterpriseName:''
      },
      messageForm:{
        orderNo:''
      },
      searchForm:{
        orderNo:'',
        enterpriseName:''
      },
      isHaveSelected: false,
      tableData: [],
      multipleSelection: [],
		 };
  },
  methods: {
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},

    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getqualityList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getqualityList();
    },
    // 获取多选参数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openDetails(row) {
      this.$emit('enabled',false)
    },
    searchFnc() {
      this.pageNo = 1;
      this.getqualityList()

    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val.id;
      this.getqualityInfo(val.id)
    },
    //质检列表查询
    getqualityList() {
      loanInspectionController
        .qualityList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: this.parameter
        })
        .then(res => {
          if(res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;       
            this.total = res.data.count;

            this.searchForm = res.data.data;
            this.tableData = res.data.data;
          }
        });
    },
    //确认信息查询\
      getqualityInfo(id){
        loanInspectionController
          .qualityInfo(id)
          .then(res => {
            this.messageForm = res.data;
            this.messageForm.endTTime = this.messageForm.endTTime ?this.$formatDate(this.messageForm.endTTime, "yyyy-MM-dd"):'';
            this.messageForm.biginTime = this.messageForm.biginTime ?this.$formatDate(this.messageForm.biginTime, "yyyy-MM-dd"):''

          });
      }
  },
  props: {},
  created() {
    this.getqualityList();
  },
  mounted() {},
  computed: {},
  watch: {
    multipleSelection: function () {
      let arr = [];
      for (let i in this.multipleSelection) {
        arr.push(this.multipleSelection[i].id);
      }
      console.log('勾中的id为：' + arr.join());
    }
  },
};
</script>

<style lang="scss" scoped>
.pt16 {
	padding-top: 16px;
}
.el-form-item__label{
    width: 0px !important;
  }
</style>
