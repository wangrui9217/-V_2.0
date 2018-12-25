<template>
  <div class="common-box">
    <div class="common-container pb80">
      <div>
        <p class='common-title management-title'>项目基本信息</p>
        <el-form label-position='left' :model='response' label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目编号：">
                <span v-text="response.orderNo"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款类型：">
                <span v-text="response.memberType=='0' ? '自然人' : '企业'"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款主体名称：">
                <span v-text="response.enterpriseName"> </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="放款金额（万元）：">
                <span v-text="response.loanAmount"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款时间：">
                <span v-text="$formatDate(response.loanTime, 'yyyy-MM-dd hh:mm:ss')"></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会统一编码/身份证：">
                <span v-text="response.idCard"></span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <p class='common-title management-title'>项目资料清单</p>
        <el-table :data="list" border class="g-table" ref="table" style="width: 100%">
          <el-table-column label="资料类型" width="160">
            <template slot-scope="scope">
              <el-form ref="ruleForm1" :model="list[scope.$index]">
                <el-form-item :rules='rules.requiredSelectValue' prop='categoryId' label=" ">
                  <el-select v-model="list[scope.$index].categoryId" placeholder="请选择" @change="changeType(scope.$index)" :disabled="list[scope.$index].isdisabled" style="width:110px;">
                    <el-option
                      v-for="item in $dict.findResData(-1)"
                      :key='item.id'
                      :label='item.value'
                      :value='item.id'
                      :disabled="(legalPatch && item.code!=='1') || (firstReviewPatch && item.code==='1')">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="资料名称" width="330">
            <template slot-scope="scope">
              <el-form ref="ruleForm2" :model="list[scope.$index]">
                <el-form-item :rules='rules.requiredSelectValue' prop='nameId' label=" ">
                  <el-select v-model="list[scope.$index].nameId" placeholder="请选择" style="width:280px;" :disabled="list[scope.$index].isdisabled">
                    <el-option
                      v-for="item in $dict.findResData(list[scope.$index].categoryId)"
                      :key='item.id'
                      :label='item.value'
                      :value='item.id'>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="资料形式" width="150">
            <template slot-scope="scope">
              <el-form ref="ruleForm3" :model="list[scope.$index]">
                <el-form-item :rules='rules.requiredSelectValue' prop='form' label=" ">
                  <el-select v-model="list[scope.$index].form" placeholder="请选择" :disabled="list[scope.$index].isdisabled" style="width:100px;">
                    <el-option value='原件'></el-option>
                    <el-option value='复印件'></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="数量（份数）" width="140">
            <template slot-scope="scope">
              <el-form ref="ruleForm4" :model="list[scope.$index]">
                <el-form-item :rules='rules.requiredInputValue' prop='number' label=" ">
                  <el-input v-model="scope.row.number" type="number" :disabled="list[scope.$index].isdisabled" style="width:80px;"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" :disabled="list[scope.$index].isdisabled"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="actions">
                <el-button type="text" @click="removeData(scope.row, scope.$index)" :disabled="list[scope.$index].isdisabled">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="common-button" @click="addData"><i class="el-icon-plus"></i>新增一行</el-button>
        <el-form ref="ruleForm5" :model="projectInfoListRequest">
          <el-form-item :rules='rules.requiredInputValue' prop='content' label="资料确认备注：">
            <el-col :span="21">
              <el-input type="textarea" :rows="4" v-model="projectInfoListRequest.content"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
		<div class="common-bottom-btn">
			<el-button @click='$router.back(-1)'>取 消</el-button>
      <el-button type='primary' @click="submitForm">提交申请</el-button>
		</div>
  </div>
</template>

<script>
import { archivesController } from "@/controller/syd/archives_controller";
import { resourceController } from "@/controller/syd/resource_controller";
export default {
  data() {
    return {
      rules: {
        requiredInputValue: { required: true, trigger: "blur", message: " " },
        requiredSelectValue: { required: true, trigger: "change", message: " " }
      },
      projectInfoListRequest: {
        definitionKey: this.$route.query.definitionKey,
        archiveId: "",
        content: "",
        node: this.$route.query.node,
        state: "PASS"
      },
      legalPatch: "",
      firstReviewPatch: "",
      list: [],
      response: {},
      typeList: this.$dict.findResData(-1),
      // nameList: {},

      orderId: this.$route.query.orderId
    };
  },
  methods: {
    // 新增一行-禁止添加多条空数据
    addOneData(list) {
      let data = {
        categoryId: "",
        nameId: ""
      };
      let hasEmpty;
      if (list.length > 0) {
        list.forEach(v => {
          for (let key in v) {
            if (v[key] === "") {
              delete v[key];
            }
          }
          let arr = Object.keys(v);
          if (!arr.length) {
            hasEmpty = true;
            this.$message.warning("请勿添加多条空数据");
            return false;
          }
        });
      } else {
        hasEmpty = false;
      }
      if (!hasEmpty) {
        list.push(data);
      } else {
        this.$message.warning("请勿添加多条空数据");
      }
    },
    // 新增一行-保存时排除空数据
    initList() {
      this.list.forEach(v => {
        v.number = v.number ? v.number - 0 : "";
        this.typeList.forEach(value => {
          if (v.categoryId === value.id) {
            v.type = value.code === "1" ? 2 : 1; // code是1，为法务资料，否则为风控资料
          }
        });
        v.archiveId = this.projectInfoListRequest.archiveId;
      });
    },
    removeData(row, $index) {
      this.list.splice($index, 1);
    },
    addData() {
      this.addOneData(this.list);
    },
    submitForm(formName) {
      this.initList();
      let isRepeat = false;
      let nameIds = [];
      this.list.forEach(v => {
        if (v.nameId) {
          nameIds.push(v.nameId);
        }
      });
      nameIds = nameIds.sort();
      for (var i = 0; i < nameIds.length; i++) {
        if (nameIds[i] == nameIds[i + 1]) {
          isRepeat = true;
          this.$message.info("项目资料重复！");
        }
      }
      if (!isRepeat) {
        let noEmpty = true;
        this.$refs.ruleForm1.validate(valid => {
          if (valid) {
          } else {
            noEmpty = false;
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
        this.$refs.ruleForm2.validate(valid => {
          if (valid) {
          } else {
            noEmpty = false;
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
        this.$refs.ruleForm3.validate(valid => {
          if (valid) {
          } else {
            noEmpty = false;
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
        this.$refs.ruleForm4.validate(valid => {
          if (valid) {
          } else {
            noEmpty = false;
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
        this.$refs.ruleForm5.validate(valid => {
          if (valid) {
          } else {
            noEmpty = false;
            this.$message.info("必填项不能为空！");
            return false;
          }
        });
        if (noEmpty) {
          this.projectInfoListRequest.list = this.list;
          archivesController
            .confirmProjectInfo(this.projectInfoListRequest)
            .then(res => {
              if (res.status === 200) {
                this.$message.success("提交成功！");
                this.$router.back(-1);
              }
            });
        }
      }
    },
    getProjectInfo() {
      const orderId = this.orderId;
      let type;
      archivesController.queryProjectInfo({ orderId }).then(res => {
        if (res.status === 200) {
          this.response = res.data.response;
          this.projectInfoListRequest.archiveId = this.response.id;
          if (res.data.list.length > 0) {
            this.list = res.data.list;
            if (this.firstReviewPatch) {
              // 风控补件，禁用法务资料 type:1 风控资料，type:2 法务资料
              this.list.forEach(v => {
                if (v.type === "2") {
                  v.isdisabled = true;
                } else {
                  v.isdisabled = false;
                }
              });
            }
            if (this.legalPatch) {
              this.list.forEach(v => {
                // 法务补件，禁用风控资料
                if (v.type === "1") {
                  v.isdisabled = true;
                } else {
                  v.isdisabled = false;
                }
              });
            }
          }
        }
      });
    },
    changeType(index) {
      this.list[index].nameId = "";
    }
  },
  props: {},
  created() {
    this.legalPatch =
      this.$route.query.definitionKey === "yw_one1" ? true : false; // 法务补件
    this.firstReviewPatch =
      this.$route.query.definitionKey === "yw_one2" ? true : false; // 初审补件
    this.getProjectInfo();
  },
  mounted() {},
  components: {},
  filters: {},
  computed: {},
  watch: {
    // list: {
    //   handler(newValue, oldValue) {
    //     this.list.map((v, index) => {
    //       if (v.categoryId) {
    //         resourceController
    //           .queryAll({ parentId: v.categoryId })
    //           .then(res => {
    //             if (res.status === 200) {
    //               this.$set(this.nameList, index, res.data);
    //             }
    //           });
    //       }
    //     });
    //   },
    //   deep: true
    // }
  }
};
</script>

<style lang="scss" scoped>
.pb80 {
	padding-bottom: 80px;
}
.common-title.management-title {
  border: none;
}
.el-form-item {
  margin-bottom: 10px;
}
.common-button {
  margin-bottom: 30px;
}
</style>
