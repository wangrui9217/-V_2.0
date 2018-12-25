<template>

  <div class="org-card"
       @mouseenter="isShowActionBtn=true"
       @mouseleave="isShowActionBtn=false"
       @click="retrieve(keyOrgTemp)">
    <el-card>
      <!-- <div >     <span style="margin-right:15px">组织名称：<label class="el-dropdown-link">{{keyOrgTemp.organizationName}}</label></span>
      </div>
      <div><span style="margin-right:15px">组织编号：<label class="el-dropdown-link">{{keyOrgTemp.organizationCode}}</label></span>
      </div> -->


 <div class="edit-info-bottom" style="height: 310px;" id="edit-key-form">
   <el-scrollbar style="height: 100%;">
      <el-form label-width="80px" :model="keyOrgTemp" ref="keyOrgTemp" >
        <el-row :gutter="30" v-if="!keyOrgTemp.configId">
          <el-col :span="20">
            <el-form-item label="组织名称" prop="organizationId" :rules="rules.organizationRule">
              <el-select 
               v-model="keyOrgTemp.organizationId" placeholder="请选择" :disabled="keyOrgTemp.configId"  @change="orgChange" :clearable="true" @clear="clearSelected"
               :popper-append-to-body="false">
                <el-option
                  v-for="item in orgList"
                  :key="item.organizationId"
                  :label="item.organizationName"
                  :disabled="item.disabled"
                  :value="item.organizationId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22" v-if="keyOrgTemp.configId">
          <el-col :span="20">
            <el-form-item label="组织名称" prop="organizationName">
              {{keyOrgTemp.organizationName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22">
          <el-col :span="20">
            <el-form-item label="组织编号" prop="organizationCode">
              {{keyOrgTemp.organizationCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="22" v-if="!keyOrgTemp.isEdit">
          <el-col :span="20">
            <el-form-item label="更新时间" prop="organizationCode">
              {{keyOrgTemp.updateTime}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="keyOrgTemp.tableData" border class="g-table">
      <el-table-column label="秘钥名称" width="120">
        <template slot-scope="scope">
         <el-input v-model="scope.row.keyName" :disabled="!keyOrgTemp.isEdit"></el-input>
      </template>
       
      </el-table-column>
      <el-table-column label="秘钥值">
        <template slot-scope="scope">
         <el-input v-model="scope.row.keyValue" :disabled="!keyOrgTemp.isEdit"></el-input>
      </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
        v-if="scope.$index!=0"
          @click="deleteRow(scope.$index,scope.row)"
          type="text"
          size="small"
          :disabled="!keyOrgTemp.isEdit">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    
        </el-scrollbar>
    </div>
    
    <div style="padding-bottom: 0;padding-left: 20px;padding-top: 0;padding-right: 0;"><el-row><el-button @click="addRow" type="text"
          size="small" :disabled="!keyOrgTemp.isEdit">增加一行</el-button></el-row></div>
    <div style="padding-bottom: 0;padding-left: 20px;padding-top: 0;padding-right: 0;"><el-row><el-button type="primary" @click="submit" v-if="keyOrgTemp.isEdit"> 
          <span>保存</span>
        </el-button><el-button type="info" @click="cancel" v-if="keyOrgTemp.isEdit"> 
          <span>取消</span>
        </el-button></el-row></div>
    <div style="padding-bottom: 0;padding-left: 20px;padding-top: 0;padding-right: 0;"><el-row><el-button type="primary" @click="toEdit" v-if="!keyOrgTemp.isEdit"> 
          <span>编辑</span>
        </el-button>
        <el-button type="info" @click="deleteCard" v-if="!keyOrgTemp.isEdit"> 
          <span>删除</span>
        </el-button></el-row></div>
    
    </el-card>
  </div>
  
</template>
<script>
import Rules from "../../util/rules";
import { api } from "@/api";
export default {
  props: {
    nowIndex: "",
    keyOrg: {
      type: Object,
      default() {
        return {};
      }
    },
    orgList: []
  },
  data() {
    return {
      keyOrgTemp: {},
      rules: Rules,
      isShowActionBtn: false
    };
  },
  computed: {
    hasBoot() {
      return this.keyOrgTemp.bootState;
    },
    hasShot() {
      return this.keyOrgTemp.snapshotCount > 0;
    },
    isEngineNameTooLong() {
      return this.keyOrgTemp.name && this.keyOrgTemp.name.length >= 11;
    },
    isEngineCodeTooLong() {
      return this.keyOrgTemp.code && this.keyOrgTemp.code.length >= 18;
    },
    isEngineDescriptionTooLong() {
      return (
        this.keyOrgTemp.description && this.keyOrgTemp.description.length >= 42
      );
    }
  },
  methods: {
    orgChange(selVal) {
      var obj = this.orgList.find(function(x) {
        return x.organizationId == selVal;
      });
      this.keyOrgTemp.organizationCode = obj.organizationCode;
    },
    clearSelected() {
      this.keyOrgTemp.organizationCode = "";
    },

    deleteCard() {
      let msg = "确认删除该组织秘钥？";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteSecret({ configId: this.keyOrgTemp.configId }).then(res => {
            if (res.data.code === 0) {
              this.$message.success("删除成功！");
              this.$emit("refreshCard");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    toEdit() {
      this.keyOrgTemp.isEdit = true;
    },
    cancel() {
      if (this.keyOrgTemp.configId) {
        this.keyOrgTemp = JSON.parse(JSON.stringify(this.keyOrg));
        this.keyOrgTemp.isEdit = false;
      } else {
        this.$emit("cancelEdit", this.nowIndex);
      }
    },

    deleteRow(index, row) {
      this.keyOrgTemp.tableData.splice(index, 1);
    },

    addRow() {
      let temp = {
        keyName: "",
        keyValue: ""
      };
      this.keyOrgTemp.tableData.push(temp);
    },
    checkCanSave() {
      return temp;
    },

    submit() {
      var obj = {};
      //map循环方式
      this.keyOrgTemp.tableData.map(function(e, item) {
        if (e.keyName != "" && e.keyValue != "") {
          obj[e.keyName] = e.keyValue;
        }
      });

      let temp = true;

      let temp1 = true;
      this.keyOrgTemp.tableData.map(function(e, item) {
        if (
          e.keyName.split(" ").join("").length == 0 ||
          e.keyValue.split(" ").join("").length == 0
        ) {
          temp1 = false;
        }
      });

      if (!this.keyOrgTemp.organizationId) {
        this.$message.warning("请选择组织");
        temp = false;
      } else if (!temp1) {
        this.$message.warning("请填写完整秘钥信息");
      }

      if (temp && temp1) {
        if (this.keyOrgTemp.configId) {
          api
            .updateSecret({
              configId: this.keyOrgTemp.configId,
              secret: obj
            })
            .then(
              res => {
                if (res.data.code == 0) {
                  this.$message.success("保存成功！");
                  this.$emit("refreshCard");
                } else {
                  this.$message.console.error(res.data.msg);
                }
              },
              err => {
                console.log(err);
                //          this.$message('用户信息加载失败')
              }
            );
        } else {
          api
            .saveSecret({
              merchantId: this.keyOrgTemp.merchantId,
              organizationId: this.keyOrgTemp.organizationId,
              secret: obj
            })
            .then(
              res => {
                if (res.data.code == 0) {
                  this.$message.success("保存成功！");
                  this.$emit("refreshCard");
                } else {
                  this.$message.console.error(res.data.msg);
                }
              },
              err => {
                console.log(err);
                //          this.$message('用户信息加载失败')
              }
            );
        }
      }
    },

    copyEngine() {
      this.$emit("copyEngine", this.keyOrgTemp);
    },
    editEngine() {
      this.$emit("editEngine", this.keyOrgTemp);
    },
    retrieve(keyOrgTemp) {}
  },
  created() {
    this.keyOrgTemp = JSON.parse(JSON.stringify(this.keyOrg));
  },
  watch: {
    keyOrg(val, oldVal) {
      this.keyOrgTemp = JSON.parse(JSON.stringify(this.keyOrg));
      //普通的watch监听
      console.log("a: " + val, oldVal);
    }
  },
  filters: {
    formatDate(value) {
      if (!value) {
        return "";
      }
      return "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";
$card-height: 640px;

/deep/.el-select {
  .el-select-dropdown__wrap {
    max-height: 240px;
  }
}

/deep/.el-scrollbar {
  .el-scrollbar__wrap {
    padding-bottom: 5px;
    padding-right: 20px;
    overflow-x: hidden;
  }
}

/deep/.org-card {
  position: relative;
  text-align: left;
  .highlight-label {
    font-size: 18px;
    color: black;
    height: 30px;
    line-height: 30px;
  }
  &:hover .float {
    display: block;
  }
  .float {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  .el-card {
    cursor: pointer;
    width: 500px;
    height: 400px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 3px 9px 0 rgba(204, 204, 204, 0.5);
    // border: none;
    border-radius: 4px;
    position: relative;
    .el-card__body {
      padding: 0;
      & > div {
        padding-bottom: 0;
        padding-left: 20px;
        padding-top: 20px;
        padding-right: 0;
        font-size: 14px;
        color: #99a3b0;
      }
      .keyOrg-name {
        font-size: 18px;
        color: #0f131a;
      }
      .keyOrg-description {
        height: 85px;
        color: #475266;
        margin-bottom: 5px;
        padding-left: 30px;
        line-height: 22px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        box-sizing: border-box;
        overflow: hidden;
      }
      .keyOrg-create-user {
        margin-top: 10px;
      }
    }
  }
  .action-container {
    position: absolute;
    right: 0;
    top: 0;
    background-color: white;
    padding-top: 20px;
    span {
      margin-right: 20px;
      box-sizing: border-box;
    }
  }
  .float-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 78px;
    box-sizing: border-box;
    padding: 20px;
    background: rgba(242, 242, 242, 0.94);
    border-radius: 0 0 4px 4px;
    .gray-label {
      line-height: 14px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #475266;
    }
  }
}

.full_height {
  height: 100%;
}

.el-table-column {
  height: 20px;
}
.g-table {
  width: 100%;
  margin-right: 100px;
  margin-top: 2px;
  td,
  th {
    text-align: center;
  }
}
.el-form-item {
  height: 20px;
}

.edit-info-bottom > .el-form {
  padding: 2px 2px;
  .userTitle {
    text-align: left;
    margin-bottom: 2px;
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
</style>
