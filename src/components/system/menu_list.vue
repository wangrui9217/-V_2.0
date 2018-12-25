<template>
  <div v-loading.fullscreen="loading" class="g-listpage__style">
    <div class="action-btn-container space-inner">
      <div class="input-group"  >
        <el-input class="right search-btn" v-model.trim="searchForm.inputs"  placeholder="请输入关键词">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
      <div class="right-top" >
        <el-button type="primary" @click="addFuc">
          <span>+ 新增</span>
        </el-button>
        <el-button  @click="deleteFuc()" :disabled="!this.isHaveSelected">
          <i class="iconfont-remove-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
          <span>删除</span>
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
     row-key="menuId" ref="table">
      <el-table-column type="selection" width="37" :reserve-selection="true">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="name" label="菜单名称">
      </el-table-column>
      <el-table-column prop="parentName" label="所属菜单">
      </el-table-column>
      <el-table-column prop="type" label="菜单类型">
      </el-table-column>
      <el-table-column prop="url" label="菜单URL">
      </el-table-column>
      <el-table-column prop="status" label="启用状态">
      </el-table-column>
      <!-- <el-table-column prop="updateName" label="更新人">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
      </el-table-column> -->
       <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div class="actions">
            <button @click="openEditbox(scope.row)" >修改</button>
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
import { menuController } from '@/controller/common/menu_controller';
import util from "@/util/util";
import { formatDate } from "../../util/date.js";
//import arrayToTree from "array-to-tree";

export default {
  data() {
    return {
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      menuTreeProps: {
        label: "name"
      },
      selectedKeys: [],
      menuList: [],
      isHaveSelected: false,
      formLabelWidth: "120px",
      dialogTitle: "",
      dialogFormVisible: false, //dialog 是否显示
      loading: false,
      date: "",
      total: 0,
      pageSize: 10,
      pageNo: 1,
      tableData: [],
      title: "新增",
      arbFormulaInfo: null,
      //弹框表单
      dialogForm: {
        roleName: "",
        roleId: "",
        remark: ""
      },
      searchForm: {
        inputs: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },

    handleSelectionChange(val) {
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
      this.getMenuList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getMenuList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },

    offTree() {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = false;
      }
    },

    dialogClose() {
      this.selectedKeys = [];

      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(this.selectedKeys);
        this.offTree();
      }
    },

    addFuc() {
      this.$router.push({
        path: "/sys/system/menu/edit/add"
      });
    },
    openEditbox(row) {
      this.$router.push({
        path: "/sys/system/menu/edit/" + row.menuId
      });
    },

    deleteFuc() {
      var qs = require("qs");
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.menuId;
      });
      let msg = "确认删除已选的菜单？";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          menuController.delete(params).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！");
              this.$refs.table.clearSelection();
              this.getMenuList();
              console.log(this.$bus);

              this.$bus.$emit("refreshList");
            } else {
              // this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },

    updateStatus(status) {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.menuId;
      });

      let msg = status == 1 ? "确认启用已选的菜单？" : "确认停用已选的菜单";
      let payload = {
        menuIds: params.join(","),
        status: status
      };
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          menuController.updateStatus(payload).then(res => {
            if (res.status === 200) {
              this.$message.success(status == 1 ? "启用成功！" : "停用成功！");
              this.$refs.table.clearSelection();
              this.getMenuList();
            } else {
              // this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },

    getMenuList() {
        menuController.list({
          page: this.pageNo,
          size: this.pageSize,
          name: this.searchForm.inputs
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;
            let data = res.data.data;
            if (res.data.data) {
              data.forEach(v => {
                v.status = v.status == 1 ? "启用" : "停用";
                v.type = v.type === 0 ? "一级菜单" : "二级菜单";
                // v.isAssignAutho = v.isAssignAutho == 1 ? "已分配" : "未分配";
                // var date = new Date(v.updateTime);
                // v.updateTime = formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
      this.getMenuList();
    }
  },
  created() {
    this.getMenuList();
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
