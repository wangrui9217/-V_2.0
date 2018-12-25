<template>
  <div v-loading.fullscreen="loading" class="g-listpage__style">
    <div class="action-btn-container space-inner">
      <div class="input-group"  >
        <el-input class="right search-btn" v-model.trim="parameter.searchName" style="width:300px" placeholder="项目编号/企业名称/客户姓名姓名">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
      <div class="right-top" >
        <el-button type="primary" @click="addFuc">
          <span>新增检查报告</span>
        </el-button>
      </div>
    </div>
    <el-table :data="tableData" border class="g-table"
     row-key="roleId" ref="table">
      <el-table-column type="index" label="序号" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="qualityNo" label="项目标号">
      </el-table-column>
      <el-table-column prop="orderNo" label="项目编号">
      </el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称/客户姓名">
      </el-table-column>
			<el-table-column prop="payment" label="还款方式">
      </el-table-column>
			<el-table-column prop="usages" label="借款用途" :formatter="(row) => $dict.findDictionaryName(row.usages)">
      </el-table-column>
			<el-table-column prop="qualityName" label="检查人">
      </el-table-column>
			<el-table-column prop="qualityTime" label="检查时间" :formatter="(row) => $formatDate(row.qualityTime, 'yyyy-MM-dd hh:mm:ss') ">
      </el-table-column>
       <!--<el-table-column label="操作" width="150">-->
        <!--<template slot-scope="scope">-->
          <!--<div class="actions">-->
            <!--<button @click="openEditbox(scope.row)" >编辑/查看</button>-->
            <!--<button @click="deleteFuc(scope.row)" >删除</button>-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
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
</template>
<script>
  import { loanInspectionController } from "./../../controller/common/loanInspection_controller";
import util from "@/util/util";
import { formatDate } from "../../util/date.js";

export default {
  data() {
    return {
      menuTreeProps: {
        label: "name"
      },
      selectedKeys: [],
      menuList: [],
      isHaveSelected: false,
      formLabelWidth: "120px",
      dialogTitle: "",
      dialogFormVisible: false, //dialog 是否显示
      date: "",


      loading: false,
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      total: 0,
      pageSize: 10,
      pageNo: 1,
      parameter:{
        searchName:''
      },
      tableData: [],



      title: "新增",
      arbFormulaInfo: null,
      // 弹框表单
      dialogForm: {
        roleName: "",
        roleId: "",
        remark: ""
      },
      searchForm: {
        roleName: "",
        inputs: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getqualityManageList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getqualityManageList();
    },
		searchFn() {
      this.pageNo = 1;
      this.getqualityManageList();
    },
    addFuc() {
      this.$router.push({
        path: "/sys/loanInspection/report"
      });
    },
    openEditbox(row) {
      this.$router.push({
        path: "/sys/system/role/edit/" + row.roleId
      });
    },

    deleteFuc(row) {
      let params = row.id;
      let msg = "确认删除已选的角色？";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          roleController.delete(params).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！");
              this.$refs.table.clearSelection();
              this.getqualityManageList();
            } else {
              // this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    getqualityManageList() {
      loanInspectionController.qualityManageList({
        pageIndex: this.pageNo,
        pageSize: this.pageSize,
        parameter: this.parameter
        })
        .then(res => {
          if(res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;  
            this.total = res.data.count;

            this.tableData = res.data.data;
          }
          // this.pageNo = res.data.currentPage;
          // this.pageSize = res.data.numsPerPage;
        });
    }
  },
  created() {
    this.getqualityManageList();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.g-listpage__style {
  padding-top: 10px;
}
.actions {
  color: #1890FF;
  button {
    color: #1890FF;
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
</style>
