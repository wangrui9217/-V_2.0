<template>
  <div v-loading.fullscreen="loading" class="g-listpage__style">
    <div class="action-btn-container space-inner">
      <div class="input-group"  style="width:50%">
      <el-select clearable v-model="searchForm.deptId" placeholder="请选择部门" class="value-select"
        @change="changeDept" style="margin-right: 20px" >
        <el-option
            v-for="item in $dict.getDictData('Depts')"
            :key="item.deptId"
            :label="item.name"
            :value="item.deptId">
          </el-option>
      </el-select>
      <el-select clearable v-model="searchForm.roleId" placeholder="请选择角色" class="value-select" @change="changeRole"
        style="margin-right: 20px">
        <el-option
            v-for="item in $dict.getDictData('Roles')"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
      </el-select>
        <el-input class="right search-btn" v-model.trim="searchForm.inputs"  placeholder="请输入关键词" style="width:60%">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
      <div class="right-top" >
        <el-button type="primary" @click="addFuc">
          <span>+ 新增</span>
        </el-button>
        <el-button  @click="deleteFuc()" :disabled="!this.isHaveSelected">
          <i class="iconfont-remove-color" style="vertical-align: middle" :class="{'icon-disable':!this.isHaveSelected}"></i>
          <span style="vertical-align: middle">删除</span>
        </el-button>
        <el-button  @click="updateStatus(1)" :disabled="!this.isHaveSelected">
          <i class="iconfont-start-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
          <span>启用</span>
        </el-button>
        <el-button  @click="updateStatus(0)" :disabled="!this.isHaveSelected">
          <i class="iconfont-stop-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
          <span>停用</span>
        </el-button>
      </div>
    </div>
    <el-table :data="tableData" border class="g-table"
     @selection-change="handleSelectionChange"
     row-key="userId" ref="table">
      <el-table-column type="selection" width="37" :reserve-selection="true" :selectable="checkSelectable">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" :index="indexMethod">
      </el-table-column>
      <!-- <el-table-column prop="userId" label="用户id">
      </el-table-column> -->
      <el-table-column prop="realname" label="姓名">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column prop="username" label="账号">
      </el-table-column>
      <el-table-column prop="deptName" label="机构名称">
      </el-table-column>
      <el-table-column prop="roleNames" label="角色名称">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" >
      </el-table-column>
      <el-table-column prop="state" label="启用状态" >
      </el-table-column>
      <!-- <el-table-column prop="updateName" label="更新人" >
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" >
      </el-table-column> -->
       <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div class="actions">
            <button @click="editOrgInfo(scope.row)" :disabled="scope.row.username == username">修改</button>
            <button @click="getresetPassword(scope.row.userId)" >重置密码</button>
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
  </div>
</template>
<script>
import { userController } from "@/controller/common/user_controller";
import { formatDate } from "../../util/date.js";
export default {
  data() {
    return {
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      username: "",
      isHaveSelected: false,
      formLabelWidth: "120px",
      dialogTitle: "",
      loading: false,
      date: "",
      total: 0,
      pageSize: 10,
      pageNo: 1,
      tableData: [],
      title: "新增",
      arbFormulaInfo: null,

      searchForm: {
        inputs: "",
        deptId: "",
        roleId: ""
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
    handleSelectionChange(val) {
      let that = this;
      if (val.length == 0) {
        that.isHaveSelected = false;
      } else {
        that.isHaveSelected = true;
      }
      this.multipleSelection = val;
    },
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getUserList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getUserList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },

    checkSelectable(row, index) {
      if (row.username == localStorage.getItem("adminName")) {
        return false;
      } else {
        return true;
      }
    },
    //重置密码接口
    getresetPassword(userid) {
      userController.resetPassword({ userId: userid }).then(res => {
        if (res.status === 200) {
          this.$message.success("重置密码成功，新密码为：888888");
        }
      });
    },
    changeRole(rule) {
      //切换重置角色
      this.searchForm.roleId = rule
      this.getUserList()
    },
    changeDept(rule) {
      this.searchForm.deptId = rule
      this.getUserList()
    },

    addFuc() {
      this.$router.push({
        path: "/sys/system/user/edit/add"
      });
    },

    editOrgInfo(row) {
      this.$router.push({
        path: "/sys/system/user/edit/" + row.userId
      });
    },
    deleteFuc() {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.userId;
      });
      let msg = "确认删除已选的用户？";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userController.delete(params).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！");
              this.$refs.table.clearSelection();
              this.getUserList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },

    updateStatus(state) {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.userId;
      });

      let msg = state == 1 ? "确认启用已选的用户？" : "确认停用已选的用户";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userController
            .updateStatus({
              ids: params.join(","),
              status: state
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success(state == 1 ? "启用成功！" : "停用成功！");
                this.$refs.table.clearSelection();
                this.getUserList();
              } else {
                // this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {});
    },

    getUserList() {
      userController
        .list({
          page: this.pageNo,
          size: this.pageSize,
          realName: this.searchForm.inputs,
          deptId: this.searchForm.deptId,
          roleId: this.searchForm.roleId
        })
        .then(res => {
          if (res.data.count > 0) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;
            let data = res.data.data;
            if (data) {
              data.forEach(v => {
                v.state = v.state == 1 ? "启用" : "停用";
                v.updateTime = this.$formatDate(v.updateTime, "yyyy-MM-dd hh:mm:ss");
              });
            }
            this.tableData = data;
            this.total = res.data.count;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
    },

    searchFn() {
      this.pageNo = 1;
      this.getUserList();
    }
  },
  created() {
    this.username = localStorage.getItem("adminName");
    this.getUserList();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
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
</style>
