<template>
  <div>
    <div class="g-listpage__style">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待申请放款项目" name="first" >
          <div>
            <div class="search-group">
              <div>
                <!--{{parameterTemp.orderStatus}}-->
              </div>
              <div class="right">
                <!--<el-select v-model='parameterTemp.orderStatus' placeholder='请选择订单状态' clearable>-->
                <!--<el-option-->
                <!--v-for="item in $dict.findDictData('OrderStatus')"-->
                <!--:key='item.id'-->
                <!--:label='item.value'-->
                <!--:value='item.name'>-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-select v-model='parameterTemp.payment' placeholder='请选择还款方式' clearable >-->
                <!--<el-option-->
                <!--v-for="item in $dict.findDictData('Repayment')"-->
                <!--:key='item.id'-->
                <!--:label='item.value'-->
                <!--:value='item.id'>-->
                <!--</el-option>-->
                <!--</el-select>-->
                <el-input class=" search-btn" v-model="parameterTemp.enterpriseName"  placeholder="借款主体名称"  clearable>
                </el-input>
                <el-input class=" search-btn" v-model="parameterTemp.codeCard"  placeholder="统一授信码/申请人证件号码"  clearable>
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
                prop="enterpriseName"
                :width="200"
                label="借款主体名称"
              >
              </el-table-column>
              <el-table-column
                prop="codeCard"
                label="统一信用代码/身份证"
              >
              </el-table-column>
              <el-table-column
                prop="receiveAccountName"
                label="收款帐户名">
              </el-table-column>
              <el-table-column
                prop="receiveBank"
                label="开户行"
              >
              </el-table-column>
              <el-table-column
                prop="receiveAccount"
                label="收款账户"
              >
              </el-table-column>
              <el-table-column
                prop="loanAmount"
                label="放款金额（万元）"
              >
              </el-table-column>
              <el-table-column
                prop="fullMarkTime"
                label="满标时间"
                :formatter="(row) => $formatDate(row.fullMarkTime, 'yyyy-MM-dd hh:mm')"
              >
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="loanApply(scope.row, 'already')" v-if="scope.row.lendProcessId">提交申请</el-button>
                  <el-button type="text" @click="loanApply(scope.row)" v-else>放款申请</el-button>
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
        <el-tab-pane label="已申请放款项目" name="second" >
          <div class="search-group">
            <div></div>
            <div class="right">
              <!--<el-select v-model='parameter2Temp.orderStatus' placeholder='请选择订单状态' clearable >-->
              <!--<el-option-->
              <!--v-for="item in $dict.findDictData('OrderStatus')"-->
              <!--:key='item.id'-->
              <!--:label='item.value'-->
              <!--:value='item.name'>-->
              <!--</el-option>-->
              <!--</el-select>-->
              <el-input class=" search-btn" v-model="parameter2Temp.enterpriseName"  placeholder="借款主体名称"  clearable>
              </el-input>
              <el-input class=" search-btn" v-model="parameter2Temp.codeCard"  placeholder="统一授信码/申请人证件号码"  clearable>
              </el-input>
              <el-button type="primary" @click="searchFn2()" :loading="isLoading2">查询</el-button>
            </div>

          </div>
          <el-table
            border
            class="g-table"
            :data="tableData2"
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
      <!--      </el-table-column>
            <el-table-column
              prop="memberNo"
              label="会员号"
            >
            </el-table-column>
            <el-table-column
              prop="receiveBank"
              label="开户行"
            >
            </el-table-column>
            <el-table-column
              prop="receiveAccount"
              label="收款账号"
            >-->
            </el-table-column>
            <el-table-column
              prop="loanAmount"
              label="放款金额（万元）"
            >
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              label="放款状态"
              :formatter="(row) => $dict.findDictionaryId('OrderStatus', row.orderStatus)"
            >
            </el-table-column>
            <el-table-column
              prop="loanTime"
              label="放款时间"
              :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd hh:mm')"
            >
            </el-table-column>
            <el-table-column
              prop="loanTime"
              label="申请时间"
              :formatter="(row) => $formatDate(row.loanApplyTime, 'yyyy-MM-dd hh:mm')"
            >
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" @click="viewLoanApply(scope.row)">查看</el-button>
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
  import { lendController } from "./../../controller/common/lend_controller";
  export default {
    data () {
      return {
        activeName: 'first',
        parameter: {
          enterpriseName: '',
          codeCard: ''
        },
        parameterTemp: {
          enterpriseName: '',
          codeCard: ''
        },
        parameter2: {
          enterpriseName: '',
          codeCard: ''
        },
        parameter2Temp: {
          enterpriseName: '',
          codeCard: ''
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
      viewLoanApply (row) {
        this.$router.push({name: 'loanDetail', query: {orderId: row.businessKey, definitionKey: row.definitionKey, node: row.name, processInstanceId: row.processInstanceId, type: 'check'}})
      },
      loanApply (row, flag) {
        this.$confirm('是否进行该操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (flag) {
            const params = {
              businessKey: row.businessKey,
              content: '',
              definitionKey: 'salesman_apply',
              node: '业务员发起放款申请',
              processInstanceId: row.lendProcessId,
              state: 'PASS'
            }
            lendController.lendCheck(params).then(res => {
              if (res.status === 200) {
                this.$message.success('操作成功！')
                this.searchFn(true)
                this.searchFn2(true)
              }
            })
          } else {
            lendController.lendApply(row).then(res => {
              if (res.status === 200) {
                this.$message.success('操作成功！')
                this.searchFn(true)
                this.searchFn2(true)
              }
            })
          }
        }).catch(() => {})
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
        lendController.getOrderList(params).then(res => {
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
        lendController.alreadyApplyList(params).then(res => {
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
