<template>
  <div>
    <el-row>
      <el-input class="search-btn2"  v-model="parameter.enterName" placeholder="企业名称" size="small"> </el-input>
      <el-button type="primary"  size="small" @click="searchproject">查询</el-button>
    </el-row>
    <template >
      <el-table :data="tableData" border class="g-table" ref="tableData" >
        <el-table-column prop="id" label="项目编号" width="100">
        </el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称">
        </el-table-column>
        <el-table-column prop="credit" label="统一信用代码" >
        </el-table-column>
        <el-table-column prop="legalName" label="法人姓名" >
        </el-table-column>
        <el-table-column prop="legalCardNum" label="身份证" >
        </el-table-column>
        <el-table-column prop="legalPhone" label="手机号码" >
        </el-table-column>
        <el-table-column prop="orderNode" label="订单状态"  :formatter="(row) => $dict.findDictionaryId('OrderStatus',row.orderStatus)">
        </el-table-column>
        <el-table-column prop="projectAmount" label="授信金额" width="100">
        </el-table-column>
        <el-table-column prop="projectTermUnit" label="授信期限" >
          <template slot-scope="scope">
            <span v-text="scope.row.projectTerm"></span>
            <span v-text="$dict.findDictionaryName(scope.row.projectTermUnit)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :formatter="(row) => $formatDate(row.createTime, 'yyyy-MM-dd hh:mm:ss')" label="申请时间">
        </el-table-column>
        <el-table-column prop="roleName" label="操作" width="100">
          <template slot-scope="scope">
            <div class="actions">
              <el-button type="text" @click="projectlock(scope.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>

    </template>

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
</template>

<script>
  import {projectController} from '@/controller/syd/project_controller';
export default {
    data () {
      return {
        pageIndex: 1,
        pageSize: 10,
        parameter:{
          enterName:''
        },
        total: 0,
        listIndex_pageSize: 1, //数据列表使用的 pageNum
        listIndex_pageIndex: 1, //数据列表使用的 pageIndex
        tableData:[
          {
            orderNode: '',
            OrderStatus: []
          }
        ]
      }
    },

    mounted () {
      this.projectlist();
    },
    methods: {
      indexMethod(index) {
        return this.listIndex_pageSize * (this.listIndex_pageIndex - 1) + index + 1;
      },
      pageSizeChange(size) {
        this.pageSize = size;
        this.projectlist();
      },
      pageIndexChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.projectlist();
      },

      //项目管理列表接口
      projectlist() {
        projectController
          .projectList({
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            parameter:this.parameter
          }).then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
          this.pageIndex = res.data.currentPage;
          this.pageSize = res.data.numsPerPage;


        })
      },

      //条件查询
      searchproject() {
        this.pageIndex = 1;
        this.projectlist();
      },

    //  查看跳转页面
      projectlock(row){
        this.$router.push({path:'/sys/projectDetails/index',query:{
            orderId:row.id,
          }})
      },
    }
}
</script>

<style lang="scss" scoped>
  .radio{
    padding: 20px 0;
  }
.el-input{
  width: 300px;
}
  .el-row{
    float: right;
    padding: 24px 24px 24px 0;
  }
</style>
