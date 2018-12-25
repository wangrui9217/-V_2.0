<template>
  <div v-loading.fullscreen="loading" class="g-listpage__style">
    <ul class="box">
      <li>
        <tree-list :data="treeData" v-if="1" @refresh="getDeptList"></tree-list>
      </li>
      <li>
        <div class="action-btn-container space-inner">
          <div class="input-group"  >
            <el-input class="right search-btn" v-model.trim="searchForm.inputs"  placeholder="请输入关键词">
              <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
            </el-input>
          </div>
          <div class="right-top" >
            <el-button type="primary" @click="addDept">
              <span>+ 新增机构</span>
            </el-button>
            <el-button  @click="deleteFuc()" :disabled="!this.isHaveSelected">
              <i class="iconfont-remove-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
              <span style="vertical-align: middle">删除</span>
            </el-button>
            <el-button  @click="updateStatus(1)" :disabled="!this.isHaveSelected">
              <i class="iconfont-start-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
              <span>启用</span>
            </el-button>
            <el-button  @click="updateStatus(0)" :disabled="!this.isHaveSelected">
              <i class="iconfont-stop-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
              <span style="vertical-align: middle">停用</span>
            </el-button>
          </div>
        </div>
        <el-table :data="tableData" border class="g-table"
                  @selection-change="handleSelectionChange"
                  row-key="deptId" ref="table">
          <el-table-column type="selection" width="37" :reserve-selection="true">
          </el-table-column>
          <el-table-column type="index" label="序号" width="50" :index="indexMethod">
          </el-table-column>
          <el-table-column prop="name" label="机构名称">
          </el-table-column>
          <el-table-column prop="code" label="机构代码">
          </el-table-column>
          <el-table-column prop="tokenKey" label="TOKEN-KEY">
          </el-table-column>
          <el-table-column prop="parentName" label="上级部门">
          </el-table-column>
          <el-table-column prop="status" label="启用状态" width="100">
          </el-table-column>
          <!-- <el-table-column prop="updateBy" label="更新人">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" >
          </el-table-column> -->
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="actions">
                <button @click="editDeptInfo(scope.row)" >修改</button>
              </div>
            </template>
          </el-table-column>
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
      </li>
    </ul>
  </div>
</template>
<script>
import  treeList from './tree'
import { deptController } from '@/controller/common/dept_controller';
import util from "@/util/util";
import { formatDate } from "../../util/date.js";
export default {
  data() {
    return {
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      isHaveSelected: false,
      formLabelWidth: "120px",
      dialogTitle: "",
      loading: false,
      date: "",
      total: 0,
      pageSize: 10,
      pageNo: 1,
      treeData: [],
      tableData: [],
      title: "新增",
      arbFormulaInfo: null,

      searchForm: {
        inputs: ""
      },
      multipleSelection: [],
      selectDicValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  methods: {
    // 获取索引
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    handleSelectionChange(val) {
      // console.log(val);
      let that = this;
      if (val.length == 0) {
        that.isHaveSelected = false;
      } else {
        that.isHaveSelected = true;
      }
      this.multipleSelection = val;
    },

    pageSizeChange(size) {
      this.pageSize = size;
      this.getDeptList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getDeptList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },

    addDept() {
      this.$router.push({
        path: "/sys/system/dept/edit/add"
      });
    },

    editDeptInfo(row) {
      this.$router.push({
        path: "/sys/system/dept/edit/" + row.deptId
      });
    },
    deleteFuc() {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.deptId;
      });
      let msg = "确认删除已选的组织？";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deptController.delete(params).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！");
              this.$refs.table.clearSelection();
              this.getDeptList();
            } else {
              // this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    },

    updateStatus(status) {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.deptId;
      });

      let msg = status == 1 ? "确认启用已选的组织？" : "确认停用已选的组织";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deptController.updateStatus({
              ids: params.join(","),
              status: status
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success(
                  status == 1 ? "启用成功！" : "停用成功！"
                );
                this.$refs.table.clearSelection();
                this.getDeptList();
              } else {
                // this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {});
    },

    getDeptList() {
     deptController.list({
          page: this.pageNo,
          size: this.pageSize,
          name: this.searchForm.inputs
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;
            let data = res.data.list;
            if (data) {
              data.forEach(v => {
                v.status = v.status == 1 ? "启用" : "停用";
                var date = new Date(v.updateTime);
                v.updateTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
              });
// props赋值
              this.treeData = [...data]
            }
            this.tableData = data;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
    },

    searchFn() {
      this.pageNo = 1;
      this.getDeptList();
    }
  },
  created() {
    this.getDeptList();
  },
  components: {treeList},
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .box{
    display: flex;
    &>li:nth-child(1){
      width: 20%;
    }
    &>li:nth-child(2){
      width: 80%;
    }
  }
action-btn-container {
  background: #fff;
  height: 60px;
  line-height: 60px;
  width: 100%;
  border-bottom: 1px solid #dedede;
  .right-top {
    text-align: left;
    height: 60px;
    //height: $action-btn-container-height;
    line-height: 60px;
    .right {
      //margin-top: 20px!important;
      .el-input__inner {
        border-top-width: 1px !important;
        border-bottom-width: 1px !important;
        border-radius: 4px !important;
      }
    }
  }
}
.formula-form {
  width: 200px;
  margin-right: 20px;
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
