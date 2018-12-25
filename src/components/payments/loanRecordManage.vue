<template>
  <div class="g-listpage__style">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待归档项目" name="first" >
          <div>
            <div class="search-group">
              <div>
              </div>
              <div class="right">
                <el-select v-model='parameter.orderStatus' placeholder='请选择'>
                  <el-option
                    v-for="item in $dict.findDictData('MaritalStatus')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
                <el-select v-model='parameter.payment' placeholder='请选择'>
                  <el-option
                    v-for="item in $dict.findDictData('MaritalStatus')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
                <el-input class=" search-btn" v-model="parameter.keyWords"  placeholder="借款主体名称/身份证/手机"  >
                </el-input>
                <el-button type="primary" @click="searchFn" :loading="isLoading">查询</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="processInstanceId"
                label="项目编号"
                >
              </el-table-column>
              <el-table-column
                prop="borrowerCardNum"
                label="借款类型"
              >
              </el-table-column>
              <el-table-column
                prop="processName"
                label="借款主体名称"
                >
              </el-table-column>
              <el-table-column
                prop="companyName"
                label="统一信用代码/身份证"
                >
              </el-table-column>
              <el-table-column
                prop="borrowerName"
                label="放款金额"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="放款时间">
              </el-table-column>
              <el-table-column label="操作" width="60">
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
        </el-tab-pane>
        <el-tab-pane label="已申请放款项目" name="second" >
          <div class="search-group">
            <div></div>
            <div class="right">
              <el-select v-model='parameter.marriage' placeholder='请选择'>
                <el-option
                  v-for="item in $dict.findDictData('MaritalStatus')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
              <el-input class=" search-btn" v-model="parameter.keyWords"  placeholder="借款主体名称/身份证/手机"  >
              </el-input>
              <el-button type="primary" @click="searchFn2"   :loading="isLoading">查询</el-button>
            </div>

          </div>
          <el-table
            :data="tableData2"
            style="width: 100%">
            <el-table-column
              prop="processInstanceId"
              label="项目编号">
            </el-table-column>
            <el-table-column
              prop="processName"
              label="借款类型">
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="借款主体名称">
            </el-table-column>
            <el-table-column
              prop="borrowerName"
              label="统一信用代码\身份证">
            </el-table-column>
            <el-table-column
              prop="borrowerCardNum"
              label="放款金额">
            </el-table-column>
            <el-table-column
              prop="borrowerPhone"
              label="归档状态">
            </el-table-column>
            <el-table-column
              prop="name"
              label="放款时间">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="归档申请时间">
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button type="text">查看</el-button>
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
  </template>
<script>
import { orderController } from "./../../controller/common/order_controller";
export default {
  data () {
    return {
      activeName: 'first',
      parameter: {
        keyWords: '',
        orderStatus: '',
        payment: '',
        salesmanId: 0
      },
      tableData: [],
      tableData2: [],
      pageIndex: 1,
      pageSize: 10,
      total: null,
      pageIndex2: 1,
      pageSize2: 10,
      total2: null,
      isLoading: false
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
      this.pageIndex = 1
      this.init()
    },
    //
    pageIndexChange2 (pageIndex) {
      this.pageIndex2 = pageIndex
      this.init()
    },
    pageSizeChange2 (pageSize) {
      this.pageSize2 = pageSize
      this.init()
    },
    searchFn2 () {
      this.pageIndex2 = 1
      this.init()
    },
    //
    init () {
      orderController.getOrderList().then(res => {
        console.log(res, 8888888888888)
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
