<template>
  <div>
    <div class="g-listpage__style">
      <div>
        <div class="search-group">
          <div>
            <!--<label>机构名称：</label>-->
            <!--<el-select v-model='parameterTemp.orderStatus' placeholder='请选择订单状态' clearable>-->
              <!--<el-option-->
                <!--v-for="item in $dict.findDictData('OrderStatus')"-->
                <!--:key='item.id'-->
                <!--:label='item.value'-->
                <!--:value='item.name'>-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<label>归档状态：</label>-->
            <!--<el-select v-model='parameterTemp.payment' placeholder='请选择还款方式' clearable >-->
              <!--<el-option-->
                <!--v-for="item in $dict.findDictData('Repayment')"-->
                <!--:key='item.id'-->
                <!--:label='item.value'-->
                <!--:value='item.id'>-->
              <!--</el-option>-->
            <!--</el-select>-->
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
            prop="memberNo"
            label="会员号"
          >
          </el-table-column>
          <el-table-column
            prop="loanAmount"
            label="放款金额">
          </el-table-column>
          <el-table-column
            prop="loanTime"
            :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd')"
            label="放款时间">
          </el-table-column>
          <el-table-column
            prop="receiveAccountName"
            label="放款状态">
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="loanApply(scope.row)">回款申请</el-button>
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
    </div>
  </div>
</template>
<script>
  import { planController } from "./../../controller/common/plan_controller";
  export default {
    data () {
      return {
        parameter: {
          deptName: '',
          enterpriseName: '',
          state: ''
        },
        parameterTemp: {
          deptName: '',
          enterpriseName: '',
          state: ''
        },
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        total: null,
        isLoading: false
      }
    },
    methods: {
      loanApply (row) {
        this.$router.push({name: 'moneyBackListDetail', query: {orderId: row.id}})
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
      init () {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          parameter: this.parameter
        }
        planController.queryPlanOrderList(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.count
          }
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      }
    },
    mounted () {
      this.init()
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
