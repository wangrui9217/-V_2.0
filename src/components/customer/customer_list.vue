 <template>
    <div v-loading.fullscreen="loading" class="g-listpage__style">
    <div class="action-btn-container space-inner">
      <div class="input-group"  >
        <el-input class="right search-btn" v-model.trim="inputName"  placeholder="请输入企业名称">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
      <div class="right-top" >
        <el-button type="primary" @click="addCustomer">
          <span>+ 新增</span>
        </el-button>
        <el-button  @click="deleteFuc()" :disabled="!this.isHaveSelected">
          <i class="iconfont-remove-color" :class="{'icon-disable':!this.isHaveSelected}"></i>
          <span style="vertical-align: middle">删除</span>
        </el-button>
      </div>
    </div>
    <el-table :data="customerData" border class="g-table"
     @selection-change="handleSelectionChange"
     row-key="id" ref="table">
     <el-table-column type="selection" width="37" :reserve-selection="true" :selectable="setSelection">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="name" label="企业名称">
      </el-table-column>
      <el-table-column prop="credit" label="统一信用代码">
      </el-table-column>
      <el-table-column prop="borrowerName" label="申请人">
      </el-table-column>
      <el-table-column prop="borrowerCardNum" label="身份证" width="180px">
      </el-table-column>
      <el-table-column prop="borrowerPhone" label="手机号码">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="(row) => $formatDate(row.createTime, 'yyyy-MM-dd hh:mm:ss')">
      </el-table-column>
       <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <div class="actions">
            <button @click="viewCustomerInfo(scope.row)" >查看</button>
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

    <div v-if="dialogFormVisible">
      <el-dialog title="客户登记" :visible.sync="dialogFormVisible" :before-close="handleClose" class="customer-info">
        <el-form label-width="124px" :model="customer" ref="customer">
          <el-row class="info-type">企业信息</el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="企业名称" prop="name" :rules="rules.merchantNameRule">
                <el-input v-model="customer.name" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="统一信用代码" prop="credit" :rules="rules.requiredCreditCode">
                <el-input v-model="customer.credit" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="过滤内容" prop="nameMask" :rules="rules.requiredFilterValue">
                <el-input v-model="customer.nameMask" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-type">法人信息</el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="法人姓名" prop="legalName" :rules="rules.realnameRule">
                <el-input v-model="customer.legalName" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="法人身份证号码" prop="legalCardNum" :rules="rules.idCardRule">
                <el-input v-model="customer.legalCardNum" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="法人手机号码" prop="legalPhone" :rules="rules.phoneRule">
                <el-input v-model="customer.legalPhone" :disabled="!saveInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-type">申请人信息</el-row>
          <el-row>
            <el-col :span="11" class="info-select">
              <el-checkbox v-model="isSame" @change="setSame" :disabled="!saveInfo">申请人同法人信息</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="申请人姓名" prop="borrowerName" :rules="rules.realnameRule" :show-message="!isSame">
                <el-input v-model="customer.borrowerName" :disabled="!saveInfo || isSame"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="身份证号码" prop="borrowerCardNum" :rules="rules.idCardRule" :show-message="!isSame">
                <el-input v-model="customer.borrowerCardNum" :disabled="!saveInfo || isSame"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号码" prop="borrowerPhone" :rules="rules.phoneRule" :show-message="!isSame">
                <el-input v-model="customer.borrowerPhone" :disabled="!saveInfo || isSame"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注">
              <el-input v-model="customer.remark" :disabled="!saveInfo" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-row>
          <el-row class="info-type">展业合影</el-row>
          <el-row class="view-pic" v-if="!saveInfo">
            <img  v-for="(item,index) in imgList" :key="index" :src="item" alt="">
          </el-row>
          <el-row v-if="saveInfo">
            <el-form-item :rules="rules.file"  prop="exhibitionPhoto" :show-message="showMessage">
              <el-upload ref="upload"
                :action="picAddress"
                :auto-upload="autoUpload"
                list-type="picture-card"
                :limit="imgLimit"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload"
                :http-request="fileUpload"
                :multiple="isMultiple"
                :file-list="fileList"
                :on-exceed="handleExceed">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">至少上传1张，最多上传三张。每张不超过2MB，系统支持图片格式为:png、jpg、jpeg、bmp</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-row>
          <el-row class="info-type">业务员信息</el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="业务员姓名：">
                <div v-text="saveInfo ? commitName : customer.commitName"></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="1">
              <el-form-item label="所属部门：">
                <div v-text="saveInfo ? commitDeptName : customer.commitDeptName"></div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitForm('customer')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { customerController } from "@/controller/syd/customer_controller";
import { fileController } from "@/controller/common/file_controller";

import util from "@/util/util";
import Rules from "@/util/rules";
import { formatDate } from "../../util/date.js";
export default {
  data() {
    return {
      rules: Rules,
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      isHaveSelected: false,
      loading: false,
      total: 0,
      pageSize: 10,
      pageNo: 1,
      customerData: [],
      inputName: "",
      multipleSelection: [],
      dialogFormVisible: false,
      customer: {
        exhibitionPhoto: ""
      },
      isSame: false,
      picAddress: "",
      dialogVisible: false,
      dialogImageUrl: "",
      imgLimit: 3,
      autoUpload: true,
      imgInfo: [],
      imgList: [],
      userInfo: {},
      commitName: "",
      commitDeptName: "",
      saveInfo: "",
      isMultiple: true,
      fileList: [],
      showMessage: true
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
      this.getCustomerList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getCustomerList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },

    setSelection(row) {
      // 只有orderStatus为0时，不可删除
      if (row.orderStatus === 0) {
        return false;
      } else {
        return true;
      }
    },
    addCustomer() {
      this.saveInfo = true;
      this.dialogFormVisible = true;
      this.customer = {};
      this.isSame = false
      this.showMessage = true
    },

    viewCustomerInfo(row) {
      this.saveInfo = false;
      this.dialogFormVisible = true;
      this.imgList = []
      this.customerData.forEach(v => {
        if (v.id === row.id) {
          this.customer = v;
          if (v.borrowerCardNum === v.legalCardNum && v.borrowerName === v.legalName && v.borrowerPhone === v.legalPhone) {
            this.isSame = true;
          }
        }
      });
      if(!Array.isArray(this.customer.exhibitionPhoto)) {
        this.customer.exhibitionPhoto = this.customer.exhibitionPhoto.split(",")
      }
      if(this.customer.exhibitionPhoto.length > 0) {
        this.customer.exhibitionPhoto.forEach(v => {
          this.imgList.push(fileController.view() + v)
        })
      }
    },
    deleteFuc() {
      let params = [];
      params = this.multipleSelection.map(item => {
        return item.id;
      });
      let msg = "确认删除？";

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          customerController.deleteCustomer({ ids: params }).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！");
              this.$refs.table.clearSelection();
              this.getCustomerList();
            } else {
              // this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    },
    setSame() {
      if (this.isSame) {
        this.customer.borrowerName = this.customer.legalName;
        this.customer.borrowerCardNum = this.customer.legalCardNum;
        this.customer.borrowerPhone = this.customer.legalPhone;
      } else {
        this.customer.borrowerName = "";
        this.customer.borrowerCardNum = "";
        this.customer.borrowerPhone = "";
      }
    },
    searchFn() {
      this.pageNo = 1;
      this.getCustomerList();
    },
    handleRemove(file, fileList) {
      if(fileList.length <= 0) {
        this.showMessage = true
      }
      for(var i = 0; i < this.imgInfo.length; i++) {
        if(this.imgInfo[i].uid === file.uid) {
          var imgId = this.imgInfo[i].id
          this.imgInfo.splice(i, 1)
        }
      }
      fileController.delete(imgId).then(res => {
      });
    },
    handleError(err,file,fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      const imgType =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!imgType) {
        this.$message.error("图片只能是 png、jpg、jpeg、bmp 格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return imgType && isLt2M;
    },
    fileUpload(param) {
      var imgObj = param.file;
      var file = new FormData();
      file.append("file", imgObj);
      fileController.upload(file).then(res => {
        if (res.status === 200) {
          imgObj.id = res.data.id
          this.imgInfo.push(imgObj)
          this.showMessage = false
          // this.$message.success("上传成功！");
        } else {
          this.$message.error("文件上传失败！");
          this.$refs.upload.clearFiles()
        }
      });

    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.imgLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    getCustomerList() {
      customerController
        .queryCustomerList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: {
            name: this.inputName
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;
            let data = res.data.data;

            this.customerData = data;
            this.total = res.data.count;
          } else {
            this.customerData = [];
            this.total = 0;
          }
        });
    },
    doneSave(payload) {
      customerController.saveCustomer(payload).then(
        res => {
          if (res.status === 200) {
            this.dialogFormVisible = false;
            this.$message.success("保存成功！");
            this.getCustomerList();
            this.$refs.upload.clearFiles();
          } else {
            // this.$message.error(res.data.message);
          }
        },
        error => {
          ResponseUtils.showErrorMessage(error, "保存失败");
        }
      );
    },
    submitForm(formName) {
      if(this.saveInfo) {
        this.customer.exhibitionPhoto = []
        this.imgInfo.forEach(v => {
          this.customer.exhibitionPhoto.push(v.id)
        })
        this.customer.exhibitionPhoto = this.customer.exhibitionPhoto.join(",")
        let payload = Object.assign({}, this.customer);

        this.$refs[formName].validate(valid => {
          if (valid) {
            this.doneSave(payload);
          } else {
            this.$message.warning("请完善信息！");
          }
        });
      } else {
        this.dialogFormVisible = false
      }
    },
    handleClose() {
      this.dialogFormVisible = false
      this.fileList = []
      this.imgInfo.length = 0
    },
  },
  created() {
    this.userInfo = JSON.parse( localStorage.getItem('sysUser'))
    this.commitName = this.userInfo.realname;
    this.commitDeptName = this.userInfo.deptName;
    this.getCustomerList();
  }
};
</script>

<style lang="scss" scoped>
.action-btn-container {
  background: #fff;
  height: 60px;
  line-height: 60px;
  width: 100%;
  .right-top {
    text-align: left;
    height: 60px;
    line-height: 60px;
  }
}
.actions {
  color: #1890ff;
  button {
    color: #1890ff;
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
.info-type {
  font-weight: 600;
  line-height: 30px;
}
.info-select {
  margin-bottom: 20px;
  margin-left: 124px;
}
.info-pic {
  margin-left: 124px;
}
.view-pic {
  margin-left: 124px;
  img {
    margin-right: 15px;
    width: 148px;
    height: 148px;
    border-radius: 6px;
    background-color: #fbfdff;
    border: none;
    // border: 1px dashed #c0ccda;
  }
}
</style>
