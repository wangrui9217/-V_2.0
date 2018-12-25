<template>
  <div>
    <div class="g-listpage__style">
      <div>
        <div class="search-group">
          <div>
            <el-button type="primary" @click="addCustomer">
              <span>+ 新增</span>
            </el-button>
            <el-button  @click="remove" v-if="0">
              <i class="iconfont-remove-color"></i>
              <span>删除</span>
            </el-button>
          </div>
          <div class="right">
            <el-input class=" search-btn" v-model="parameterTemp.codeCard"  placeholder=""  clearable>
            </el-input>
            <el-button type="primary" @click="searchFn()" :loading="isLoading">查询</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          border
          class="g-table"
          row-key="id"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55">
          </el-table-column>
          <el-table-column
            prop="code"
            label="参数key"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="参数名称"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="参数值"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            :formatter="(row) => $dict.getStatusName(row.status)"
            label="状态">
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" @click="loanApply(scope.row)">编辑</el-button>
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
    <el-dialog title="新增/编辑系统参数" @close="dialog.addCar = false" :visible.sync="dialog.addCar" :close-on-click-modal="false" width="633px">
      <add-car @close="carClose" @cancel="dialog.addCar = false" ref="addCar"></add-car>
    </el-dialog>
  </div>
</template>
<script>
  import addCar from '@/components/system/add_dictionary'
  import { dictionaryController } from "./../../controller/common/dictionary_controller";
  export default {
    components: {addCar},
    data () {
      return {
        chosedIds: [],
        dialog: {
          addCar: false
        },
        parameter: {},
        parameterTemp: {},
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        total: null,
        isLoading: false,
      }
    },
    methods: {
      remove () {
        if (this.chosedIds.length === 0) {
          this.$message.info('至少选择一条数据')
          return
        }
        const ids = this.chosedIds
        dictionaryController.deleteDictionary({ids}).then(res => {
          this.$message.success('删除成功')
          this.init()
        })
      },
      handleSelectionChange (val) {
        this.chosedIds = val.map(value => value.id)
      },
      viewLoanApply (row) {
      },
      loanApply (row) {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.editInit(row)
        })
      },
      addCustomer () {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.addInit()
        })
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
      init () {
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          parameter: this.parameter
        }
        dictionaryController.queryDictionaryList(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.data
            this.total = res.data.count
          }
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      },
      carClose () {
        this.dialog.addCar = false
        this.init()
      }
    },
    mounted () {
      this.dialog.addCar = false
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
