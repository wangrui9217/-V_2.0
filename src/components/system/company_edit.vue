<template>
    <div class="workedit-scheme" >
      <div style="background: white">
        <h4>企业信息完善</h4>
        <el-tabs v-model="activeName">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">公司名称 : {{form.commitDeptName}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">社会统一代码 : {{form.credit}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">法人姓名 : {{form.legalName}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">法人身份证 : {{form.legalCardNum}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div>法人手机号 : {{form.legalPhone}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">借款人姓名 : {{form.borrowerName}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">借款人身份证 : {{form.borrowerCardNum}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div>借款人手机号 : {{form.borrowerPhone}}</el-col>
          </el-row>
        </el-tabs>
      </div>

      <div class="content">
        <h4>贷款方案</h4>
        <el-row class="rowMoney">
          <el-col :span="8"><div class="grid-content bg-purple" >
            <p>贷款金额</p>
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="save.projectAmount"
              clearable>
            </el-input>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p>期限 </p>
            <el-select v-model="save.projectTerm" placeholder="请选择" size="small" >
              <el-option
                v-for="item in $dict.findDictData('DateUnit')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p>最短收息期 </p>
            <el-input
              size="small"
              class="el-input_input"
              v-model="save.minday"
              clearable>
            </el-input>
            <el-select v-model="save.mindayUnit" placeholder="请选择" size="small" style="width: 100px">
              <el-option
                v-for="item in $dict.findDictData('DateUnit')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </div>
          </el-col>
        </el-row >
        <el-row class="rowMoneys">
          <el-col :span="8"><div class="grid-content bg-purple" >
            <p>还款方式</p>
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="save.payment"
              width="250"
              clearable>
            </el-input>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p style="margin-bottom: 13px;">费用方案 </p>
            <el-radio v-model="save.feeplanId" label="1">默认方案</el-radio>
            <el-radio v-model="save.feeplanId" label="2">技术服务费方案</el-radio>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p>费率（%） </p>
            <div class="input__pos">
              <i class="Percentage">%</i>
              <el-input
                size="small"
                class="el-input_input"
                v-model="save.projectRate"
                clearable
                style="position: relative">
              </el-input>
              <el-select v-model="save.projectTermUnit" placeholder="请选择" size="small" style="width: 100px">
                <el-option
                  v-for="item in $dict.findDictData('DateUnit')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </div>
          </div>
          </el-col>
        </el-row>
        <el-row class="rowmode">
          <el-col :span="8"><div class="grid-content bg-purple" >
            <p>担保方式</p>
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="save.guaranteeType"
              width="250"
              clearable>
            </el-input>
          </div>
          </el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <p>贷款用途 </p>
            <el-select v-model="save.usage" placeholder="请选择" size="small" >
              <el-option
                v-for="item in $dict.findDictData('LoanUseType')"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          </el-col>
        </el-row>
      </div>
      <div class="content-footer">
        <h4>信息完善</h4>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="信息名称"
          width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="信息描述"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="录入状态"
          width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            label="更新时间">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="actions">
                <button>查看</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="work-footer">
        <el-row style="float: right;margin-bottom: 0;padding-right: 24px">
          <el-button @click="back">返回</el-button>
          <el-button @click="getpreservation">保存</el-button>
          <el-button type="primary">提交</el-button>
        </el-row>
      </div>
    </div>
</template>
<script>
  import { managementController } from '@/controller/common/management_controller';
  import { managementsaveController } from '@/controller/common/managementsave_controller';
  export default {
    data() {
      return {
        orderId:'',

        id:'',
        value:'',
        form: {
          commitDeptName:'',
          credit:'',
          legalCardNum:'',
          legalName:'',
          legalPhone:'',
          borrowerCardNum:'',
          borrowerName:'',
          borrowerPhone:''
        },
        save:{
          projectTermUnit:'',
          usage:'',
          mindayUnit:'',
          guaranteeType:'',
          payment:'',
          projectAmount:'',
          minday:'',
          projectRate:'',
          id:'',
          projectTerm:'',
          feeplanId:'1',
        },


          usageList:[{
          lable:'11111111',
          value:'2222222222'
        }],
        projectrateList:[{
          lable:'11111111',
          value:'2222222'
        }],
        mindayUnitList:[{
          lable:'11111111',
          value:'2222222'
        }],
        projectList:[{
          lable:'11111111',
          value:'2222222'
        }],
        tableData: [{
          date: '借款人信息录入',
          name: '包含借款人基本信息、借款人财产信息、借款人负债信息的录入',
          address: '录入完成'
        }, {
          date: '企业信息录入',
          name: '包含企业基本信息、企业经营情况、企业银行流水信息录入',
          address: '待录入'
        },{
          date: '担保人信息录入',
          name: '目前借款担保人、第三方担保公司的信息录入',
          address: '待录入'
          }, {
          date: '借款人&企业图片上传',
          name: '借款人&企业证件、结婚证、房产等资料的图片上传',
          address: '待上传'
        }],

        activeName: 'first',

      };
    },
    computed: {
    },
    watch: {
    },
    methods: {
      //table切换
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
      addFuc() {
        this.$router.push({
          path: "/admin/sys/editUser/add"
        });
      },
      editOrgInfo(row) {
        this.$router.push({
          path: "/sys/system/workedit"
        });
      },
      back(){
        this.$router.back(-1)
      },
      //保存
      getpreservation(){
        this.save.feeplan = this.save.feeplanId == 1 ? 0 : 1
        managementsaveController
          .saveOrderInfo(this.save).then(res=>{
              console.info(res)
        })
      },
      //企业信息
      getqueryCustomerInfo() {
        managementController
          .queryCustomerInfo({
            orderId:this.$route.query.orderId

          })
          .then(res => {
            this.form = res.data.customer;
          });
      },

      searchFn() {
        this.pageNo = 1;
        this.getUserList();
      },


    },
    created() {
      this.getqueryCustomerInfo();
      this.getpreservation()
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  .formula-form {
    width: 200px;
    margin-right: 20px;
  }
  .el-input_input{
    width: 200px !important;
  }
  .sech{
    float: right;
  }
  .workedit-scheme{
    background: rgb(240, 242, 245);
  }
  .content{
    background: white;
    margin: 24px;
  }
  .content-footer{
    background: white;
    margin: 24px;
  }
  .el-tabs__content{
    padding-left: 32px;
  }
  .el-tabs--top{
    padding-left: 32px;
    background: white;
  }
  h4{
    height: 55px;
    line-height: 55px;
    font-weight: 600;
    padding-left: 32px;
    margin-bottom: 16px;
    margin-top: 16px;
    font-family: PingFangSC-Medium;
    border-bottom: 1px solid rgba(230,230,230,1);
  }
  h1{
    margin-bottom: 16px;
    margin-top: 16px;
    font-weight: 600;
    font-family: PingFangSC-Medium;

  }
  .el-table{
    padding: 24px 32px 32px 32px ;
  }
.rowMoney{
   padding: 24px 32px 32px 32px;
 }
  .rowMoneys{
    padding: 0 32px 32px 32px;
  }
  .work-footer{
    background: white;
    height: 56px;
    line-height: 56px;
  }
  .rowmode{
    padding: 0 32px 48px 32px;
  }
  .clearfix{ clear:both}
  /*.el-tabs__nav-scroll{*/
  /*float: right;*/
  /*}*/
  .iconfont-search{
    width: 32px;
    height: 32px;
    display: inline-block;
  }
  .el-icon-info{
    color: #1890FF;
    margin-right: 10px;
  }
  .el-input{
    width: 300px;
    margin-top: 8px;
  }
  .el-select{
    width: 300px;
    margin-top: 8px;
  }
  .el-row{
    margin-bottom: 7px;
  }
  .input__pos{
    position: relative;
  }
.Percentage{
  color: #606266;
  position: absolute;
  z-index: 999;
  left: 180px;
  top: 13px;
  font-style: normal;
}
  .right-top{
    float: right;
  }
  .el-tabs__nav-wrap{
    background: red;
  }
  #pane-first{
    background: white;
  }
  .el-button+.el-button{
    margin-left: 0px;
  }

  .el-tag{
    width: 100%;
    margin-bottom: 16px;
  }
  .workedit{
    width: 1720px;
    height: 900px;
    background:rgb(240, 242, 245);
  }
  .workedit-loan{
    background: white;
    padding: 30px;
    margin-bottom: 30px;
  }
  .actions {
    color: #0000ff;
    button {
      color: #0000ff;
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
