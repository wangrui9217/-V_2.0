<template>
  <div class="g-listpage__style">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待办工作" name="first" >
          <div>
            <div class="search-group">
              <div>
                <el-button type="primary"   v-if="showPrise" @click="getblindClaim();">领取任务</el-button>
                <el-button type="primary"    @click="hangUp">挂起</el-button>
              </div>
              <div>
                <el-input class=" search-btn" v-model="parameter.companyName"  placeholder="企业名称"  >
                </el-input>
                <el-input class=" search-btn" v-model="parameter.borrowerName"  placeholder="借款人姓名"  >
                </el-input>
                <el-button type="primary" @click="searchFn"   :loading="isLoading">查询</el-button>
              </div>
            </div>
            <el-tag v-if="showPrise">
              <i class="el-icon-info" ></i>
              <span class="spanCl">待处理任务总数<span class="spanClass"> {{todoTotal}} </span>个</span>
              <span class="spanCl" style="margin-left: 24px;">可领取任务总数<span class="spanClass"> {{task}} </span>个</span>
            </el-tag>
            <el-table
              @selection-change="selectionChange"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="36">
              </el-table-column>
              <el-table-column align="center"
                prop="processInstanceId"
                label="流程编号"
                >
              </el-table-column>
              <el-table-column align="center"
                prop="companyName"
                label="企业名称"
                >
              </el-table-column>
              <el-table-column align="center"
                prop="borrowerName"
                label="借款人姓名"
                >
              </el-table-column>
              <el-table-column align="center"
              prop="borrowerPhone"
              label="手机"
              >
            </el-table-column>
              <el-table-column align="center"
                prop="name"
                label="环节名称">
              </el-table-column>
              <el-table-column align="center"
                prop="createTime"
                label="创建时间" :formatter="initDate">
              </el-table-column>
              <el-table-column align="center"
                prop="state"
                label="是否挂起">
                <template slot-scope="scope">
                  <p v-if="scope.row.state === ''">
                    否
                  </p>
                  <p v-else>
                    是
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140" align="center">
                <template slot-scope="scope">
                  <div class="actions">
                    <button @click="editOrgInfo(scope.row, true)" style="color: #1890FF;">处理</button>
                  </div>
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
        <el-tab-pane label="已办工作" name="second" >
          <div class="search-group">
            <div></div>
            <div class="right">
              <el-select class="search-btn2" v-model="parameter2.state" placeholder="流程状态"  >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in $dict.getProcessState()"
                  :key="item.code"
                  :label="item.label"
                  :value="item.code">
                </el-option>
              </el-select>
              <el-input class="search-btn2" v-model="parameter2.companyName"  placeholder="企业名称"  > </el-input>
              <el-input class=" search-btn2" v-model="parameter2.borrowerName"  placeholder="借款人姓名"   ></el-input>
              <el-button type="primary" @click="searchAlready"   :loading="isLoading2">查询</el-button>
            </div>

          </div>
          <el-table
            :data="tableData2"
            style="width: 100%">
            <el-table-column align="center"
              prop="processInstanceId"
              label="流程编号">
            </el-table-column>
            <el-table-column align="center"
              prop="processName"
              label="流程名称">
            </el-table-column>
            <el-table-column align="center"
              prop="companyName"
              label="企业名称">
            </el-table-column>
            <el-table-column align="center"
              prop="borrowerName"
              label="借款人姓名">
            </el-table-column>
            <!--<el-table-column align="center"-->
              <!--prop="borrowerPhone"-->
              <!--label="手机">-->
            <!--</el-table-column>-->
            <el-table-column align="center"
              prop="name"
              label="环节名称">
            </el-table-column>
            <el-table-column align="center"
              prop="startTime"
              label="任务开始时间" :formatter="initDate">
            </el-table-column>
            <el-table-column align="center"
              prop="endTime"
              label="任务办结时间" :formatter="initDate">
            </el-table-column>
            <el-table-column align="center"
              prop="state"
              label="状态">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div class="actions">
                  <button @click="editOrgInfo(scope.row, false)" style="color: #1890FF;padding-right: 10px;">查看</button>
                  <template>
                    <button v-if="scope.row.processEndTime != null" disabled="disabled" >查看流程图</button>
                    <button v-else @click="open(scope.row)" style="color: #1890FF"> 查看流程图</button>
                  </template>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float:middle"
            @size-change="pageSizeChange2"
            @current-change="pageIndexChange2"
            :current-page="pageIndex"
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
import { formatDate } from "../../util/date.js";
import { workController } from '@/controller/common/work_controller';
export default {
  data() {
    return {
      showPrise:true,
      sysUser:[
        {
          realname:"",
          userId:""
        }
      ],
      roleNames:"",
      activeName: 'first',
      flag:1,
      tabsIndex:"0",
      // second:false,
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageIndex: 1, //数据列表使用的 pageIndex
      username: "",
      companies: [],
      // isShow:'',
      isHaveSelected: false,
      formLabelWidth: "120px",
      dialogTitle: "",
      tableData:[],
      tableData2:[],
      task:'',
      loading: false,
      date: "",
      todoTotal:0,
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      total2: 0,
      pageIndex2: 1,
      pageSize2: 10,
      isLoading2: false,
      isLoading: false,
      multipleSelection: [],
      parameter:{
        companyName:'',
        borrowerName: '',
        borrowerPhone:'',
        borrowerCardNum:'',
        state:''
      },
      parameter2:{
        companyName:'',
        borrowerName: '',
        borrowerPhone:'',
        borrowerCardNum:'',
        state:''
      },
      selectedList: [],
      title: "新增",
      arbFormulaInfo: null,
      row:''
    };
  },
  methods: {
    // 挂起
    hangUp () {
      if (this.selectedList.length !== 1) {
        this.$message.warning('只能选择一条数据')
        return
      }
      const orderId = this.selectedList[0].businessKey
      workController.hangTask({orderId}).then(res => {
        if (res.status === 200) {
          this.$message.success('挂起成功')
          this.work()
        }
      })
    },
    selectionChange (val) {
      this.selectedList = val
    },
    handleSelectionChange(val) {
      let that = this;
      if (val.length === 0) {
        that.isHaveSelected = false;
      } else {
        that.isHaveSelected = true;
      }
      this.multipleSelection = val;
    },
    //table切换
    handleClick(tab, event) {
      this.initParameter();
      (this.tabsIndex = tab.index) === "0" ? this.work() :this.alreadyList();
    },
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageIndex - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.work()
    },
    pageIndexChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.work()
    },
    pageSizeChange2(size) {
      this.pageSize2 = size;
      this.alreadyList();
    },
    pageIndexChange2(pageIndex) {
      this.pageIndex2 = pageIndex;
      this.alreadyList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },
    //待办查询
    searchFn() {
      this.pageIndex = 1;
      this.isLoading = true
      this.work();
    },
    //已办查询
    searchAlready(){
      this.pageIndex2 = 1;
      this.isLoading2 = true
      this.alreadyList();
    },

    //---------------工作台列表-------------->>>>>>>>>>>>>>>
    work() {
      workController
        .work({//代办
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          parameter:this.parameter
        })
        .then(res => {
          if (res.status === 200) {
            this.todoTotal = res.data.count;
            this.tableData = res.data.data;
            this.total = res.data.count;
            this.isLoading = false
          }
        });
    },

    alreadyList() {
      workController
        .alreadyList({//已办
          pageSize: this.pageSize2,
          pageIndex: this.pageIndex2,
          parameter:this.parameter2
        })
        .then(res => {
          this.tableData2 = res.data.data;
          this.total2 = res.data.count;
          this.isLoading2 = false
        });
    },
//---------------工作台列表-------------->>>>>>>>>>>>>>>
//------------------领取接口
    getblindClaim () {
      workController
        .blindClaim().then(res => {
            this.work();
            this.getclaimCount();
        });
    },
    //--------------------领取数据
    getclaimCount () {
      workController
        .claimCount().then(res => {
          if (res.status === 200) {
            this.task = res.data;
          }
      });
    },
    open(row){
      let newPage = this.$router.resolve({
        path:'/processImg',
        query:{
          processInstanceId:row.processInstanceId,
          }
      });
      window.open(newPage.href,'_blank')
    },
    //业务员的列表接口
    editOrgInfo(row, flag) {
      if (!flag) {
        //如果是业务员录入的话
        this.$router.push({
          path: '/sys/approve/already', query: {
            orderId: row.businessKey
          }
        });
        return;
      }
      //如果是业务员录入的话
      if('salesman_first' === row.definitionKey || 'replenish' === row.definitionKey){
        this.$router.push({ name: 'workinformationList' ,query:{
            orderId:row.businessKey,
            definitionKey:row.definitionKey,
            node:row.name
          }});
      }else{
        this.$router.push({ path: '/sys/approve/index' ,query:{
            orderId:row.businessKey,
            definitionKey:row.definitionKey,
            node:row.name
          }});
      }
    },
    initParameter(){
      this.pageIndex = 1;
      this.pageSize = 10;
      this.parameter.companyName = '';
      this.parameter.borrowerName = '';
      this.parameter.borrowerPhone = '';
      this.parameter.borrowerCardNum = '';
      this.parameter.state = '';
    },
    //时间格式化
    initDate(row,column){
     let rowElement = row[column.property];
     return rowElement ? formatDate(new Date(rowElement), "yyyy-MM-dd hh:mm") : "";
    },
    },
  created() {
    this.sysUser = JSON.parse(localStorage.getItem("sysUser"));
    if(this.sysUser != null && this.sysUser.roleNames === '业务员'){
      this.showPrise = !this.showPrise;
    }
    this.work();
    this.getclaimCount();
   // this.alreadyList()
  },
  mounted() {},
  computed:{
  },
};
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
