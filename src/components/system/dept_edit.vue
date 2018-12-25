<template>
  <div id="edit-info">
    <div class="edit-info-top">
      <el-row>
        <div style="margin-left: 20px; width: 50px;float: left;">
          <span style="color:#20a0ff;cursor: pointer;" @click="quit">&lt;</span>
          <el-button type="text" @click="quit">返回</el-button>
        </div>
        <div style="width: 80px;float: left;margin-left:30px;color:#48576a;">
          <span>部门管理</span>
        </div>
        <div style="float: right;margin-right: 20px;">
          <el-button size="small" @click="submitForm('dept')" class="right">保存</el-button>
        </div>
      </el-row>
    </div>
    <div class="edit-info-bottom" id="edit-dept">
      <el-form label-width="80px" :model="dept" ref="dept" >
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="名称" prop="name" :rules="rules.deptNameRule">
              <el-input v-model="dept.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="代号" prop="code" :rules="rules.deptCodeRule">
              <el-input v-model="dept.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="上级部门" prop="parentId" :rules="rules.parentIdRule" >
              <el-select v-model="dept.parentId" placeholder="请选择上级部门">
                <el-option
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.name"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14" :row="30">
            <el-form-item label="备注:" prop="remark" :rules="rules.deptRemarkRule">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="dept.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { deptController } from "@/controller/common/dept_controller";
import util from "@/util/util";
import Rules from "@/util/rules";
export default {
  data() {
    return {
      rules: Rules,
      backPath: "/sys/system/dept",
      dept: {
        deptId: "",
        name: "",
        code: "",
        tokenKey: "",
        isDelete: "",
        // email: "",
        status: 1,
        // telephone: "",
        // token: "",
        remark: ""
      },
      copiedDeptName: "",
      copiedDeptCode: "",
      deptRules: {},
      timeout: null,
      deptList: []

    };
  },
  methods: {
    quit() {
      this.$router.push(this.backPath);
    },
    // 保存验证操作
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doneSave();
        }
      });
    },
    doneSave() {
      let payload = Object.assign({}, this.dept);
      if (this.dept.deptId) {
        deptController
          .update({
            name: this.dept.name,
            deptId: this.dept.deptId,
            code: this.dept.code,
            remark: this.dept.remark,
            parentId: this.dept.parentId
          })
          .then(
            res => {
              if (res.status === 200) {
                this.$message.success("保存成功！");
                this.$router.push(this.backPath);
              } else {
                // this.$message.error(res.data.message);
              }
            },
            error => {
              ResponseUtils.showErrorMessage(error, "部门保存失败");
            }
          );
      } else {
        delete payload.deptId;
        deptController.save(payload).then(
          res => {
            if (res.status === 200) {
              this.$message.success("保存成功！");
              this.$router.push(this.backPath);
            } else {
              // this.$message.error(res.data.message);
            }
          },
          error => {
            ResponseUtils.showErrorMessage(error, "部门保存失败");
          }
        );
      }
    },
    checkDept(rule, value, callback) {
      let self = this;
      if (self.dept.deptId && value === self.copiedDeptName) {
        callback();
        return;
      }
      api
        .exitName(
          value,
          self.$route.params.id !== "add" ? self.$route.params.id : ""
        )
        .then(
          res => {
            if (res.data && value !== self.copiedDeptName) {
              callback(new Error("该部门名称已经存在，请重新输入"));
            } else {
              callback();
            }
          },
          err => {
            console.log(err);
            callback();
          }
        );
    },
    checkDeptCode(rule, value, callback) {
      let self = this;
      if (self.dept.deptId && value === self.copiedDeptCode) {
        callback();
        return;
      }
      api
        .isHasDeptCode(
          value,
          self.$route.params.id === "add" ? "" : self.$route.params.id
        )
        .then(
          res => {
            if (res.data) {
              callback(new Error("该部门代号已经存在，请重新输入"));
            } else {
              callback();
            }
          },
          err => {
            console.log(err);
            callback();
          }
        );
    }
  },
  created() {
    // 根据路由信息赋值roleId
    this.dept.deptId =
      this.$route.params.id !== "add" ? this.$route.params.id : "";
    // this.deptRules = DeptsManageMock.deptRules();
    // this.deptRules.code.push({
    //   validator: this.checkDeptCode,
    //   trigger: "change"
    // });
    // this.deptRules.name.push({
    //   validator: this.checkDept,
    //   trigger: "change"
    // });
    if (this.dept.deptId) {
      deptController.currentInfo(this.dept.deptId).then(
        res => {
          if (res.status === 200) {
            this.dept = res.data;
            this.dept.deptId = this.dept.deptId.toString();
            this.copiedDeptName = this.dept.name;
            this.copiedDeptCode = this.dept.code;
          }
        },
        err => {
          this.$message.error("部门信息加载失败");
        }
      );
    }
    //上级部门初始化数据
    deptController.select().then(res => {
      if (res.status === 200) {
        this.deptList = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";

$container-left: 78px;
$container-bottom: 50px;
$btn-container-bottom: 8px;
#edit-info {
  height: 100%;
  .edit-info-top {
    border-bottom: 1px solid $split-color;
    height: $action-btn-container-height;
    line-height: $action-btn-container-height;
    .el-button--small {
      margin-top: 3px;
    }
    span {
      font-size: 14px;
    }
  }
  .el-tabs__header .el-tabs__nav-wrap {
    right: 0px;
  }

  .edit-info-bottom > .el-form {
    padding: 20px 20px;
    .userTitle {
      text-align: left;
      margin-bottom: 10px;
    }
    .el-form-item.is-required .el-form-item__label:before {
      content: none;
    }
    .el-form-item.is-required .el-form-item__label:after {
      content: "*";
      color: $require-text-color;
      margin-right: 4px;
      font-size: 12px;
    }

    .el-form-item__label {
      text-align: left;
    }
  }
  .edit-info-bottom {
    margin: 0px 0px;
    height: calc(100% - 38px);
    overflow-y: auto;
    overflow-x: hidden;

    #condition-region .el-form {
      padding: 0px 0px;
    }
    .equals-container {
      text-align: center;
      position: relative;
      top: 5px;
    }
    .el-select {
      width: 100%;
      .el-input .el-input__inner {
        border: 0 !important;
        border-radius: 4px !important;
        height: 34px !important;
        line-height: 34px !important;
      }
    }
    .condition-container {
      position: relative;
      left: $container-left;
      bottom: $container-bottom;
      .btn-container {
        position: relative;
        bottom: $btn-container-bottom;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .el-form {
        padding: 0;
      }
    }
  }
}
</style>
