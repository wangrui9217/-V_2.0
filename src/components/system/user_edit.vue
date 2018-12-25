<template>
  <div id="edit-info">
    <div class="edit-info-top">
      <el-row>
        <div style="margin-left: 20px; width: 50px;float: left;">
          <span @click="quit" style="color:#20a0ff;cursor: pointer">&lt;</span>
          <el-button type="text" @click="quit">返回</el-button>
        </div>
        <div style="width: 80px;float: left;margin-left:30px;color:#48576a;">
          <span>用户管理</span>
        </div>
        <div style="float: right;margin-right: 20px;">
          <el-button size="small" @click="submitForm('userInfo')" class="right">保存</el-button>
        </div>
      </el-row>
    </div>
    <div class="edit-info-bottom" id="edit-user-form">
      <el-form label-width="80px" :model="userInfo" ref="userInfo" >
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="姓名" prop="realname" :rules="rules.realnameRule">
              <el-input v-model="userInfo.realname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="手 机 号" prop="mobile" :rules="rules.phoneRule" >
              <el-input v-model="userInfo.mobile" @input="phoneChange" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="用户类型" prop="isMerchant" :rules="rules.userTypeRule">
              <el-select v-model="userInfo.isMerchant" @change="userType">
                <el-option v-for="item in userTypeList"
                  :label="item.label"
                  :key="item.id"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="企业名称" prop="merchantname" :rules="isDisabled ? noRules.merchantNameRule :rules.merchantNameRule">
              <el-input v-model="userInfo.merchantname" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="工 号" prop="jobNumber" :rules="rules.jobNumberRule ">
              <el-input v-model="userInfo.jobNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="邮箱" prop="email" :rules="rules.emailRule ">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="所属部门" prop="deptId" :rules="rules.deptRule">
              <el-select v-model="userInfo.deptId" placeholder="请选择" @change="changeDept">
                <el-option
                v-for="item in companies"
                :key="item.deptId"
                :label="item.name"
                :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="7">
            <el-form-item label="所属角色" prop="roleIdList" :rules="rules.roleIdListdRule ">
              <el-select multiple  v-model="userInfo.roleIdList" placeholder="请选择" height="36px" @change="changeRole">
                <el-option
                  v-for="item in roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="用 户 名" prop="username" :rules="rules.usernameRule ">
              <el-input v-model="userInfo.username" :disabled="currentPath==='editUser'"></el-input>
            </el-form-item>
          </el-col>
           <!-- <el-col :span="7" v-if="this.userInfo.userId ===''? false : true">
            <el-form-item label="密 码" prop="password" :rules="rules.passwordRule"  >
              <el-input v-model="userInfo.password"  ></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- <el-row :gutter="30">
          <el-col :span="14" :row="30">
            <el-form-item label="备注" prop="remark">
              <el-input  type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="userInfo.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { userController } from "@/controller/common/user_controller";
import { deptController } from "@/controller/common/dept_controller";
import { roleController } from "@/controller/common/role_controller";
import Rules from "../../util/rules";

export default {
  data() {
    return {
      isDisabled: false,
      rules: Rules,
      noRules: {
        merchantNameRule: {require: false}
      },
      backPath: "/sys/system/user",
      // formularExpress: [],
      userInfo: {
        // realname: "",
        mobile: "",
        jobNumber: "",
        password: "",
        username: "",
        isMerchant: "",
        merchantname: "",
        // type:"",
        email: "",
        // remark: "",
        // state: "",
        roleIdList: [],
        deptId: "",
        userId: ""
      },
      roles: [],
      userTypeList: [{ label: "个人", id: 0 }, { label: "企业", id: 1 }],
      // userRules: {},
      // existRuleItem: {},
      // userInitAccount: "",
      companies: [],
      currentPath: "",
      // timeout: null
      tempName : ""
    };
  },
  methods: {
    getDeptList() {
      deptController.select().then(res => {
        this.companies = res.data
      });
    },
    getRoleList() {
      roleController.select().then(res => {
        this.roles = res.data
      });
    },
    userType() {
      this.isDisabled = this.userInfo.isMerchant === 0 ? true : false
      this.userInfo.merchantname = this.userInfo.isMerchant === 0 ? "" : this.tempName
    },
    phoneChange(value) {
      if (this.$route.params.id === "add") {
        this.userInfo.username = value;
      }
    },
    changeDept(rule) {
      this.userInfo.deptId = rule ? rule : "";
    },
    changeRole(rule) {
      this.userInfo.roleIdList = rule ? rule : "";
    },
    quit() {
      this.$router.push(this.backPath);
    },
    // 保存验证操作
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doneSaveOrUpdate();
        }
      });
    },
    doneSaveOrUpdate() {
      let payload = Object.assign({}, this.userInfo);
      if (this.userInfo.userId) {
        userController.update(payload).then(
          res => {
            if (res.status === 200) {
              this.afterSuccessSave();
              return;
            }
            this.afterFailSave(res.data.message);
          },
          error => {
            this.afterFailSave(error);
            ``;
          }
        );
      } else {
        delete payload.userId;
        payload.deptId = this.userInfo.deptId;
        payload.roleIdList = this.userInfo.roleIdList;
        userController.save(payload).then(
          res => {
            if (res.status === 200) {
              this.afterSuccessSave();
              return;
            }
            this.afterFailSave(res.data.message);
          },
          error => {
            this.afterFailSave(error);
          }
        );
      }
    },
    afterSuccessSave() {
      this.$message.success("用户保存成功");
      if (!this.userInfo.userId) {
        this.$message.success("用户默认密码为：888888");
      }
      this.$router.push(this.backPath);
    },
    afterFailSave(err) {
      this.$message.error(err);
    }
  },

  created() {
    this.getDeptList()
    this.getRoleList()
    if (this.$route.params.id !== "add") {
      this.currentPath = "editUser";
    }
    // 根据路由信息赋值userId
    this.userInfo.userId = this.$route.params.id !== "add" ? this.$route.params.id : "";
    if (this.userInfo.userId) {
      userController.info(this.userInfo.userId).then(
        res => {
          this.userInfo = res.data;
          this.isDisabled = this.userInfo.isMerchant === 0 ? true : false;
          this.tempName = this.userInfo.merchantname
        },
        err => {}
      );
    } else {
      
    }
  }
};
</script>
<style lang="scss">
#edit-user-form {
  .el-form-item__content {
    .el-input,
    .el-select {
      width: 100%;
    }
  }
}
</style>
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
