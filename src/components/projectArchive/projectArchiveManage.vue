<template>
  <div>
    <div class="g-listpage__style">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待审核回款申请" name="first" >
          <div>
            <div class="search-group">
              <div>
                <label>机构名称：</label>
                <el-select v-model='parameterTemp.deptName' placeholder='请选择机构名称' clearable>
                  <el-option
                    v-for="item in $dict.getDictData('Depts')"
                    :key='item.deptId'
                    :label='item.name'
                    :value='item.name'>
                  </el-option>
                </el-select>
              </div>
              <div class="right">
                <el-input class=" search-btn" v-model="parameterTemp.enterpriseName"  placeholder="借款主体名称/身份证/手机"  clearable>
                </el-input>
                <el-button type="primary" @click="searchFn()" :loading="isLoading">查询</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              border
              class="g-table"
              style="width: 100%">
              <el-table-column
                prop="repaymentNum"
                label="回款申请编号"
              >
              </el-table-column>
              <el-table-column
                prop="orderNo"
                label="项目编号"
              >
              </el-table-column>
              <el-table-column
                prop="enterpriseName"
                :width="200"
                label="借款主体名称"
              >
              </el-table-column>
              <el-table-column
                prop="codeCard"
                :width="200"
                label="统一信用代码/身份证"
              >
              </el-table-column>

              <el-table-column
                prop="loanAmount"
                label="放款金额">
              </el-table-column>
              <el-table-column
                prop="repaymentAmount	"
                label="回款申请金额">
              </el-table-column>
              <el-table-column
                prop="repaymentType"
                label="回款类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.repaymentType === '1'">客户自主还款</span>
                  <span v-if="scope.row.repaymentType === '2'">公司垫付</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="applyUserName"
                label="业务员姓名">
              </el-table-column>
              <el-table-column
                prop="applyUserDept"
                label="所属机构"
              >
              </el-table-column>
              <el-table-column
                prop="applyTime"
                label="回款申请时间"
                :formatter="(row) => $formatDate(row.applyTime, 'yyyy-MM-dd')"
              >
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="loanApply(scope.row, 'approve')">处理</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="float:middle"
              @size-change="pageSizeChange"
              @current-change="pageIndexChange"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="prev, pager, next, jumper,total, sizes"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核回款申请" name="second" >
          <div class="search-group">
            <div>
              <label>机构名称：</label>
              <el-select v-model='parameter2Temp.deptName' placeholder='请选择机构名称' clearable>
                <el-option
                  v-for="item in $dict.getDictData('Depts')"
                  :key='item.deptId'
                  :label='item.name'
                  :value='item.name'>
                </el-option>
              </el-select>
              <label>回款审核结果：</label>
              <el-select v-model='parameter2Temp.state' placeholder='请选择回款审核结果' clearable>
                <el-option
                  v-for="item in option"
                  :key='item.value'
                  :label='item.name'
                  :value='item.value'>
                </el-option>
              </el-select>
            </div>
            <div class="right">
              <el-input class=" search-btn" v-model="parameter2Temp.enterpriseName"  placeholder="借款主体名称/身份证/手机"  clearable>
              </el-input>
              <el-button type="primary" @click="searchFn2()" :loading="isLoading2">查询</el-button>
            </div>

          </div>
          <el-table
            :data="tableData2"
            border
            class="g-table"
            style="width: 100%">
            <el-table-column
              prop="repaymentNum"
              label="回款申请编号"
            >
            </el-table-column>
            <el-table-column
              prop="orderNo"
              label="项目编号"
            >
            </el-table-column>
            <el-table-column
              prop="targetNo"
              label="项目标号"
            >
            </el-table-column>
            <el-table-column
              prop="enterpriseName"
              :width="200"
              label="借款主体名称"
            >
            </el-table-column>
            <el-table-column
              prop="codeCard"
              :width="200"
              label="统一信用代码/身份证"
            >
            </el-table-column>
            <el-table-column
              prop="loanAmount"
              label="放款金额">
            </el-table-column>
            <el-table-column
              prop="repaymentAmount"
              label="回款申请金额">
            </el-table-column>
            <el-table-column
              prop="repaymentType"
              label="回款类型">
              <template slot-scope="scope">
                <span v-if="scope.row.repaymentType === '1'">客户自主还款</span>
                <span v-if="scope.row.repaymentType === '2'">公司垫付</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="审核结果">
              <template slot-scope="scope">
                <span v-if="scope.row.state === '0'">待审核</span>
                <span v-if="scope.row.state === '1'">同意</span>
                <span v-if="scope.row.state === '2'">驳回</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="applyUserName"
              label="业务员姓名">
            </el-table-column>
            <el-table-column
              prop="applyUserDept"
              label="所属机构"
            >
            </el-table-column>
            <el-table-column
              prop="applyTime"
              label="回款申请时间"
              :formatter="(row) => $formatDate(row.applyTime, 'yyyy-MM-dd')"
            >
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click="loanApply(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float:middle"
            @size-change="pageSizeChange2"
            @current-change="pageIndexChange2"
            :current-page="pageIndex2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="prev, pager, next, jumper,total, sizes"
            :total="total2">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>
<script>
  import { planController } from "./../../controller/common/plan_controller";
  export default {
    data () {
      return {
        activeName: 'first',
        option: [{name: '同意垫付', value: '1'}, {name: '垫付驳回', value: '2'}],
        parameter: {
          deptName: '',
          enterpriseName: '',
          // state: '',
          type: '1'
        },
        parameterTemp: {
          deptName: '',
          enterpriseName: '',
          // state: '',
          type: '1'
        },
        parameter2: {
          deptName: '',
          enterpriseName: '',
          state: '',
          type: '2'
        },
        parameter2Temp: {
          deptName: '',
          enterpriseName: '',
          state: '',
          type: '2'
        },
        tableData: [],
        tableData2: [],
        pageIndex: 1,
        pageSize: 10,
        total: null,
        pageIndex2: 1,
        pageSize2: 10,
        total2: null,
        isLoading: false,
        isLoading2: false
      }
    },
    methods: {
      loanApply (row, flag) {
        if (flag) {
          this.$router.push({name: 'moneyBackDetail', query: {orderId: row.repaymentNum}})
        } else {
          this.$router.push({name: 'moneyBackDetail', query: {orderId: row.repaymentNum, type: 'check'}})
        }
      },
      // 搜索分页
      pageIndexChange (pageIndex) {
        this.pageIndex = pageIndex
        this.init()
      },
      pageSizeChange (pageSize) {
        this.pageSize = pageSize
        this.init()
      },
      searchFn (flag) {
        this.isLoading = !flag
        this.parameter = {...this.parameterTemp}
        this.pageIndex = 1
        this.init()
      },
      //
      pageIndexChange2 (pageIndex) {
        this.pageIndex2 = pageIndex
        this.init2()
      },
      pageSizeChange2 (pageSize) {
        this.pageSize2 = pageSize
        this.init2()
      },
      searchFn2 (flag) {
        this.isLoading2 = !flag
        this.parameter2 = {...this.parameter2Temp}
        this.pageIndex2 = 1
        this.init2()
      },
      //
      init () {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          parameter: this.parameter
        }
        planController.queryPlanReviewList(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.count
          }
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      },
      init2 () {
        let params = {
          pageIndex: this.pageIndex2,
          pageSize: this.pageSize2,
          parameter: this.parameter2
        }
        planController.queryPlanReviewList(params).then(res => {
          if (res.status === 200) {
            this.tableData2 = res.data.data
            this.total2 = res.data.count
          }
          this.isLoading2 = false
        }).catch(() => {
          this.isLoading2 = false
        })
      }
    },
    mounted () {
      this.init()
      this.init2()
    },
    computed: {
    }
  }
</script>
<style lang="scss" scoped>
  .formula-form {
    width: 200px;
    margin-right: 20px;
  }
  .sech{
    float: right;
  }

  .spanClass{
    color: #1890FF;
  }
  .spanCl{
    color: #595959;
  }
  .el-row{
    margin-bottom: 10px;
  }
  .clearfix{ clear:both}
  /*.el-tabs__nav-scroll{*/
  /*float: right;*/
  /*}*/
  .iconfont-search{
    width: 32px;
    height: 32px;
    display: inline-block;
  }
  .el-icon-info{
    color: #1890FF;
    margin-right: 10px;
  }
  .right-top{
    float: right;
  }
  .el-tabs__nav-wrap{
    background: red;
  }
  #pane-first{
    background: white;
  }
  .el-button+.el-button{
    margin-left: 0px;
  }
  .workedit-scheme{
    background: white;
    padding: 30px;
    margin-bottom: 30px;
    margin: 0 23px 0 23px;
  }
  .actions button{
    color: #1890FF;
  }
  .el-tag{
    width: 100%;
    margin-bottom: 16px;
  }
  .workedit{
    // width: 1720px;
    // height: 900px;
    // background:rgb(240, 242, 245);
  }
  .workedit-loan{
    background: white;
    padding: 30px;
    margin-bottom: 30px;
  }
  .search-btn{
    width: 39%;
  }
  .search-btn2{
    width: 29%;
  }
  .actions {
    color: #0000ff;
    button {
      color: #0000ff;
      border: none;
      background: none;
      cursor: pointer;
      outline: none;
      &[disabled] {
        cursor: no-drop;
        color: #999;
      }
    }
  }
  .search-group{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-wrap: wrap;
    div + label{
      margin-left: 20px;
    }
    .el-button{
      min-width: 90px;
    }
    .el-input{
      flex: 1;
    }
    .right{
      display: flex;
      &>div{
        flex: 1;
        margin-right: 5px;
      }
    }
  }

</style>
