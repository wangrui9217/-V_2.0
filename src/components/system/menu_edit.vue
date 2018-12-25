<template>
  <div id="edit-info">
    <div class="edit-info-top">
      <el-row>
        <div style="margin-left: 20px; width: 50px;float: left;">
          <span style="color:#20a0ff;cursor: pointer" @click="quit">&lt;</span>
          <el-button type="text" @click="quit">返回</el-button>
        </div>
        <div style="width: 80px;float: left;margin-left:30px;color:#48576a;">
          <span>资源{{source.isEdit}}</span>
        </div>
        <div style="float: right;margin-right: 20px;">
          <el-button size="small" @click="submitForm('source')" class="right">保存</el-button>
        </div>
      </el-row>
    </div>
    <div class="edit-info-bottom" id="edit-sourde-info">
        <el-form label-width="80px" :model="source" ref="source" >
	        <el-row :gutter="30">
	          <el-col :span="7">
	            <el-form-item label="菜单名称" prop="name" :rules="rules.menuNameRule">
	              <el-input v-model="source.name" ></el-input>
	            </el-form-item>
	          </el-col>
	          <el-col :span="7">
	            <el-form-item label="菜单类型" prop="type" :rules="rules.menuTypeRule">
                  <el-select v-model="source.type" placeholder="请选择" @change="selectChange">
                    <el-option
                      v-for="item in companies"
                      :key="item.type"
                      :label="item.name"
                      :value="item.type">
                    </el-option>
                  </el-select>
	            </el-form-item>
	          </el-col>
	       </el-row>
	       <el-row :gutter="30">
	          <el-col :span="7"  v-if="source.type=='1'||source.type=='2'">
	            <el-form-item label="上级菜单" prop="parentId" :rules="rules.parentIdRule" >
                <el-select v-model="source.parentId" placeholder="请选择上级菜单">
                  <el-option
                    v-for="item in menuList"
                    :key="item.menuId"
                    :label="item.name"
                    :value="item.menuId">
                  </el-option>
                </el-select>
            </el-form-item>
	          </el-col>
           <el-col :span="7">
             <el-form-item v-if="false" label="菜单图标" prop="icon">
               <el-input v-model="source.icon" :disabled="this.$route.params.id !== 'add'" ></el-input>
             </el-form-item>
           </el-col>
	        </el-row>
          <el-row :gutter="30">
            <el-col :span="14">
              <el-form-item label="菜单url" prop="path">
                <el-input v-model="source.url" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :row="30">
              <el-form-item label="备注" prop="remark" :rules="rules.menuRemarkRule">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="source.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
	    </el-form>
    </div>
  </div>
</template>
<script>
import { menuController } from "@/controller/common/menu_controller";
import util from "@/util/util";
import Rules from "../../util/rules";
export default {
  data() {
    return {
      rules: Rules,
      backPath: "/sys/system/menu",
      source: {
        menuId: null,
        parentId: null,
        // code: "",
        name: "",
        url: "",
        icon: "",
        type: "",
        isEdit: "",
        // path: "",
        status: 1,

        list: [],
        open: false,
        orderNum: "",
        parentName: "",
        perms: 1
      },
      checkStrictly: true,
      sourceRules: {},
      menuList: [],
      firstLevelMenuList: [],
      secondLevelMenuList: [],
      companies: [{ name: "一级菜单", type: 0 }, { name: "二级菜单", type: 1 }],
      tree: {
        node: {
          id: "menuId",
          parentId: "parentId"
        },
        treeData: [],
        defaultProps: {
          children: "children",
          label: "name"
        },
        checkedKeys: [],
        treeRef: "",
        filter: {
          radio: true
        }
      },
      nodesPromise: null,
      sourcePromise: null
    };
  },
  methods: {
    quit() {
      this.$router.push(this.backPath);
    },
    checkChange(ref) {
      this.tree.checkedKeys = [ref];
    },

    // 保存验证操作
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doneSaveOrUpdate();
        }
      });
    },
    //保存操作
    doneSaveOrUpdate() {
      if (!this.source.parentId) {
        this.source.parentId = 0;
      }
      let payload = this.source;
      if (!this.source.menuId) {
        delete payload.menuId;
        menuController.save(payload).then(
          res => {
            if (res.status === 200) {
              this.afterSuccessSave(res);
            } else {
              // this.$message.error(res.data.msg);
            }
          },
          error => {
            this.afterFailSave(error);
          }
        );
      } else {
        menuController.update(payload).then(
          res => {
            if (res.status === 200) {
              this.afterSuccessSave(res);
            } else {
              // this.$message.error(res.data.msg);
            }
          },
          error => {
            this.afterFailSave(error);
          }
        );
      }
    },
    afterSuccessSave(res) {
      if (res.status === 200) {
        this.$message.success("资源保存成功");
        this.$bus.$emit("refreshList");
      } else {
        // this.$message.error(res.data.msg);
      }

      this.$router.push(this.backPath);
    },
    afterFailSave(err) {
      console.log(err);
      this.$message.error("资源保存失败");
    },
    //下拉选择隐藏菜单path
    selectChange(data) {
      // if(data == '0'){
      //   this.resource.route.path = '';
      // }
    }
  },
  created() {
    // 根据路由信息赋值roleId
    this.source.menuId =
      this.$route.params.id !== "add" ? this.$route.params.id : "";
    this.source.isEdit = this.$route.params.id === "add" ? "新增" : "编辑";

    // if (this.$route.params.id === "add") {
    //   let existSourceItem = { validator: this.checkAccout, trigger: "blur" };
    //   this.sourceRules.name.push(existSourceItem);
    // }

    if (this.source.menuId) {
      let thisObj = this;
      menuController.info(this.source.menuId).then(
        res => {
          thisObj.source = res.data;
          thisObj.source.isEdit = "编辑";
          thisObj.tree.checkedKeys = [this.source.parentId];
        },
        err => {
          console.log(err);
        }
      );
    }

    //上级菜单初始化数据
    menuController
      .select()
      .then(res => {
        if (res.status === 200) {
          this.firstLevelMenuList = [];
          this.secondLevelMenuList = [];
          res.data.forEach(element => {
            if (element.type == 0) {
              this.firstLevelMenuList.push(element);
            }
            if (element.type == 1) {
              this.secondLevelMenuList.push(element);
            }
          });

          this.menuList = this.firstLevelMenuList;

          //去掉默认选择 展示请选择
          //this.source.parentId = this.menuList[0].menuId;
          // if (thisObj.source.isEdit !== "编辑") {
          //   this.source.parentId = "";
          // }
        }
      });
  }
};
</script>
<style lang="scss">
#edit-sourde-info {
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
