<template>
  <div class="common-container">
    <div>
      <div class="search-group">
        <div>
          <label>机构名称：</label>
          <el-select v-model='parameterTemp.orderStatus' placeholder='请选择订单状态' clearable>
            <el-option
              v-for="item in $dict.findDictData('OrderStatus')"
              :key='item.id'
              :label='item.value'
              :value='item.name'>
            </el-option>
          </el-select>
          <label>放款状态：</label>
          <el-select v-model='parameterTemp.payment' placeholder='请选择还款方式' clearable >
            <el-option
              v-for="item in $dict.findDictData('Repayment')"
              :key='item.id'
              :label='item.value'
              :value='item.id'>
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <el-input class=" search-btn" v-model="parameterTemp.keyWords"  placeholder="借款主体名称/身份证/手机"  clearable>
          </el-input>
          <el-button type="primary" @click="searchFn" :loading="isLoading">查询</el-button>
        </div>
      </div>
      <el-table
        border
        class="g-table"
        :data="tableData"
        >
        <el-table-column
          prop="orderNo"
          label="项目编号"
        >
        </el-table-column>
        <el-table-column
          prop="enterpriseName"
          width="200"
          label="借款主体名称"
        >
        </el-table-column>
        <el-table-column
          prop="borrowerCardNum"
          label="身份证"
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
          label="放款金额"
        >
        </el-table-column>
        <el-table-column
          prop="borrowerCardNum"
          label="满标时间"
        >
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text">归档处理</el-button>
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
</template>
<script>
  import { orderController } from "./../../controller/common/order_controller";
  export default {
    data () {
      return {
        parameter: {
          keyWords: '',
          orderStatus: '4'
        },
        parameterTemp: {
          keyWords: '',
          orderStatus: '4'
        },
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        total: null,
        isLoading: false,
      }
    },
    methods: {
      // 搜索分页
      pageIndexChange (pageIndex) {
        this.pageIndex = pageIndex
        this.init()
      },
      pageSizeChange (pageSize) {
        this.pageSize = pageSize
        this.init()
      },
      searchFn () {
        this.isLoading = true
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
        orderController.getOrderList(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data
          }
          this.isLoading = false
          console.log(res, 8888888888888)
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
    div+label{
      margin-left: 30px;
    }
  }

</style>
