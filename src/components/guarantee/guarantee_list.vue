<template>
  <div v-loading.fullscreen="loading" :class="{'g-listpage__style' : !isDisabled}" >
    <div class="action-btn-container space-inner">
      <div class="input-group">
        <el-input class="right search-btn" v-model.trim="inputName"  placeholder="担保人\担保公司\手机号">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
      <div class="list-type">
				<el-radio-group v-model="guaranteeType" @change="chooseType">
					<el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="0">自然人担保</el-radio-button>
					<el-radio-button label="1">公司担保</el-radio-button>
					<el-radio-button label="2">家庭成员担保</el-radio-button>
				</el-radio-group>
			</div>
      <div class="right-top" v-if="!isDisabled">
				<el-dropdown trigger="click" @command="handleCommand">
					<el-button type="primary" class="el-dropdown-link">
						<span>新增担保<i class="el-icon-arrow-down el-icon--right"></i></span>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="0">自然人担保</el-dropdown-item>
						<el-dropdown-item command="1">公司担保</el-dropdown-item>
            <el-dropdown-item command="2">家庭成员担保</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
      </div>
    </div>
    <el-table :data="guaranteeData" border class="g-table"
     @selection-change="handleSelectionChange"
     row-key="id" ref="table">
      <el-table-column type="index" label="序号" width="60" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="guaranteeType" label="担保方式" width="120">
      </el-table-column>
      <el-table-column prop="name" label="担保人\担保公司名称">
      </el-table-column>
      <el-table-column prop="legalCardNum" label="身份证">
      </el-table-column>
      <el-table-column prop="legalPhone" label="手机号码" width="140">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
      </el-table-column>
      <el-table-column prop="guaranteeState" label="状态" v-if="!isDisabled" width="100">
        <template slot-scope="scope">
          <div :class="{'red': scope.row.state === 0}" >
            {{scope.row.guaranteeState}}
          </div>
        </template>
      </el-table-column>
       <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div class="actions">
            <el-button type="text" @click="viewGuaranteeInfo(scope.row)">查看</el-button>
            <el-button type="text" @click="deleteGuaranteeInfo(scope.row)" v-if="!isDisabled">删除</el-button>
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
    <div class="btn-back" v-if="!isDisabled">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
    <el-dialog :title="guaranteeType==='0'? '自然人担保' : (guaranteeType==='1' ? '公司担保' : '家庭成员担保')"
      :visible.sync="dialogVisible" width="65%"
      :before-close="handleClose">
      <div style="padding-left: 20px;" v-if="dialogVisible">
        <guarantee-person :isDisabled="isDisabled" :isCheck="isCheck" v-if="guaranteeType==='0'" :id="id"></guarantee-person>
        <guarantee-corporate :isDisabled="isDisabled" :isCheck="isCheck" v-if="guaranteeType==='1'" :id="id"></guarantee-corporate>
        <guarantee-home :isDisabled="isDisabled" :isCheck="isCheck" v-if="guaranteeType==='2'" :id="id"></guarantee-home>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { guaranteeController } from "@/controller/syd/guarantee_controller";
import guaranteePerson from './guarantee_person'
import guaranteeCorporate from './guarantee_corporate'
import guaranteeHome from './guarantee_home'
import util from "@/util/util";
import Rules from "@/util/rules";
import { formatDate } from "../../util/date.js";
export default {
  components: {guaranteePerson,guaranteeCorporate,guaranteeHome},
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
      guaranteeData: [],
      guaranteeType: "",
      orderId: "",
      inputName: "",
      multipleSelection: [],
      guarantee: {},
      dialogFormVisible: false,
      dialogVisible: false,
      orderId: "",
      id: ""
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
      this.getGuaranteeList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getGuaranteeList();
    },
    dicSelsctChange(value) {
      console.log(value);
    },

    handleCommand(command) {
      if(command === "0") {
        // 自然人担保
        this.$router.push({path: "/sys/guarantee/edit_per", query: {orderId: this.orderId, id: 'add'}})
      } else if(command === "1") {
        // 公司担保
        this.$router.push({path: "/sys/guarantee/edit_corp", query: {orderId: this.orderId, id: 'add'}})
      } else if(command === "2") {
        // 家庭成员个人担保信息
        this.$router.push({name: 'edit_home', query: {orderId: this.orderId, id: 'add'}})
      }
      this.guarantee = {};
    },
    viewGuaranteeInfo(row) {
      let id = row.id
      if(!this.isCheck) {
        if(row.type === "0") {
          this.$router.push({path: "/sys/guarantee/edit_per", query: {orderId: this.orderId, id: id}})
        } else if(row.type === "1") {
          this.$router.push({path: "/sys/guarantee/edit_corp", query: {orderId: this.orderId, id: id}})
        } else if(row.type === "2") {
          this.$router.push({name: 'edit_home', query: {orderId: this.orderId, id: id}})
        }
      } else {
        this.id = row.id
        this.dialogVisible = true
        if(row.type === "0") {
          this.guaranteeType = '0'
        } else if(row.type === "1") {
          this.guaranteeType = '1'
        } else if(row.type === "2") {
          this.guaranteeType = '2'
        }
      }
    },
    deleteGuaranteeInfo(row) {
      let id = row.id
      let msg = "确认删除？";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            guaranteeController.deleteCompanyGuarantee({ id }).then(res => {
              if (res.status === 200) {
                this.$message.success("删除成功！");
                this.$refs.table.clearSelection();
                this.getGuaranteeList();
              } else {
                // this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {});
    },
    searchFn() {
      this.pageNo = 1;
      this.getGuaranteeList();
    },
    getGuaranteeList() {
      guaranteeController
        .queryGuaranteeList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: {
            name: this.inputName,
            orderId: this.orderId,
            type: this.guaranteeType
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;
            let data = res.data.data;
            if (data) {
              data.forEach(v => {
                v.guaranteeType = v.type === "0" ? '个人担保' : (v.type==='1' ? '公司担保' : '家庭成员担保')
                v.guaranteeState = v.state === 0 ? '信息待完善' : '信息已完善'
                let updateTime = new Date(v.updateTime);
                v.updateTime = v.updateTime ? formatDate(updateTime, "yyyy-MM-dd hh:mm:ss") : "";
                let createTime = new Date(v.createTime);
                v.createTime = v.createTime ? formatDate(createTime, "yyyy-MM-dd hh:mm:ss") : "";
              });
            }

            this.guaranteeData = data;
            this.total = res.data.count;
          } else {
            this.guaranteeData = [];
            this.total = 0;
          }
        });
		},
		chooseType() {
      this.pageNo = 1;
			this.getGuaranteeList()
    },
    handleClose () {
      this.dialogVisible = false
    },
  },
  created() {
    this.orderId = this.$route.query.orderId
		this.getGuaranteeList();
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    }
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
.list-type {
	float: right;
	margin-right: 14px;
}
.red {
  color: #f00;
}
.btn-back {
  text-align: right;
}
</style>
