<template>
  <div class="workedit-scheme pb100">
    <div>
      <div class='common-group box'>
        <div style="background: white" class="bosy">
          <h4>借款基本信息</h4>
          <el-tabs v-model="activeName">
            <el-row style="margin-bottom: 13px;">
              <el-col :span="8">
                <div class="grid-content bg-purple">公司名称 : {{form.commitDeptName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">社会统一代码 : {{form.credit}}</div>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 13px;">
              <el-col :span="8">
                <div class="grid-content bg-purple">法人姓名 : {{form.legalName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">法人身份证 : {{form.legalCardNum}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
                法人手机号 : {{form.legalPhone}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 13px;">
              <el-col :span="8">
                <div class="grid-content bg-purple">借款人姓名 : {{form.borrowerName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">借款人身份证 : {{form.borrowerCardNum}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
                借款人手机号 : {{form.borrowerPhone}}
              </el-col>
            </el-row>
          </el-tabs>
        </div>
        <el-form label-position='top' :model='save' :inline='true' ref='save' class="container">
          <el-row>
            <el-form-item label='贷款金额（万元）'  :rules='$rules.requiredInputFigure' prop='projectAmount'>
              <el-input v-model='save.projectAmount'  type="number"></el-input>
            </el-form-item>
            <div class="validate-box">
              <el-form-item label='期限' :rules='$rules.requiredInputFigure' prop='projectTerm'>
                <el-input type="number" v-model='save.projectTerm' class="input__pos"></el-input>
              </el-form-item>
              <el-form-item label='' :rules='$rules.requiredSelectValue' prop='projectTermUnit'>
                <el-select v-model='save.projectTermUnit' placeholder='请选择'  class="input__">
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="validate-box">
              <el-form-item label='最短收息期' :rules='$rules.requiredInputFigure' prop='minday'>
                <el-input v-model='save.minday' class="input__pos" type="number"></el-input>
              </el-form-item>
              <el-form-item label='' :rules='$rules.requiredSelectValue' prop='mindayUnit'>
                <el-select v-model='save.mindayUnit' placeholder='请选择'  class="input__">
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <el-form-item label='费用方案'  :rules='$rules.requiredInputFigure'>
              <el-radio-group v-model="save.feeplanId">
                <el-radio :label="1">默认方案</el-radio>
                <el-radio :label="2">技术服务费方案</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="validate-box" v-if="save.feeplanId == 1 " >
              <el-form-item label='费率（%）'  prop='projectRate'  :rules='$rules.requiredInputFigure'>
                <el-input v-model='save.projectRate' class="input__pos" type="number"></el-input>
              </el-form-item>
              <el-form-item label=''  prop='projectrateUnit' :rules='$rules.requiredSelectValue'>
                <el-select v-model='save.projectrateUnit' placeholder='请选择' class="input__">
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label='费率（%/月）'  prop='projectRate' v-if="save.feeplanId == 2" :rules='$rules.requiredInputFigure'>
              <el-input v-model='save.projectRate' type="number"></el-input>
            </el-form-item>
            <div v-if="save.feeplanId == 2" class="validate-box">
              <el-form-item label='平台利率（%）'  prop='managementRate'  :rules='$rules.requiredInputFigure'>
                <el-input v-model='save.managementRate' class="input__pos" type="number"></el-input>
              </el-form-item>
              <el-form-item label=''  prop='projectrateUnit'  :rules='$rules.requiredSelectValue'>
                <el-select v-model='save.projectrateUnit' placeholder='请选择' class="input__">
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <el-form-item label='还款方式' :rules='$rules.requiredSelectValue' prop='paymentplanId'>
              <el-select v-model='save.paymentplanId' placeholder='请选择' >
                <el-option
                  v-for="item in $dict.findDictData('Repayment')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='担保方式'  :rules='$rules.requiredInputValue' >
              <el-radio-group v-model="save.guaranteeCode"  @change="handlerGuaranteeType">
                <el-radio label="5">有担保</el-radio>
                <el-radio label="0">无担保</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label='放款手续费（%）'  prop='lendfee'  :rules='$rules.requiredInputFigure'>
              <el-input v-model='save.lendfee' type="number"></el-input>
            </el-form-item>
            <el-form-item label='贷款用途' >
              <el-select v-model='save.usage' placeholder='请选择'>
                <el-option
                  v-for="item in $dict.findDictData('LoanUseType')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content-footer" v-show="save.feeplanId == 2">
      <add-repayment ref="addRepayment" @refresh="getqueryCustomerInfo(true)"></add-repayment>
    </div>

    <div class="content-footer box">
      <h4>贷款信息完善</h4>
      <el-row>
        <el-col></el-col>
      </el-row>
      <el-table
        :data="tableData2"
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
          prop="state"
          label="录入状态"
          width="250">
          <template slot-scope="scope">
            <div :class="{'red': scope.row.state !=='已录入'&& scope.row.state !=='已上传'}">
              {{scope.row.state}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          prop="remark">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state=='已录入'" type="text" @click="get_detail(scope.row)">查看</el-button>
            <el-button v-if="scope.row.state=='待录入'" type="text" @click="get_detail(scope.row)">录入</el-button>
            <el-button v-if="scope.row.state=='已上传'" type="text" @click="get_detail(scope.row)">查看</el-button>
            <el-button v-if="scope.row.state=='待上传'" type="text" @click="get_detail(scope.row)">资料上传</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="common-bottom-btn">
      <el-button @click="back">取消</el-button>
      <el-button @click="getpreservation">保存</el-button>
      <el-button type="primary" @click="getsumint('submit')">提交</el-button>
    </div>
  </div>
</template>
<script>
  import addRepayment from '@/components/work/addRepayment'
  import {customerController} from '@/controller/syd/customer_controller';
  import {managementsaveController} from '@/controller/common/managementsave_controller';

  export default {
    components: {addRepayment},
    data() {
      return {
        tableData3: [],
        orderId: '',
        companyId: '',
        customerId: '',
        memberType: '',
        id: '',
        value: '',
        form: {
          commitDeptName: '',
          credit: '',
          legalCardNum: '',
          legalName: '',
          legalPhone: '',
          borrowerCardNum: '',
          borrowerName: '',
          borrowerPhone: '',
          enterpriseEntryState: '',
          borrowerEntryState: '',
          guarantorEntryState: '',
          uploadPictureState: '',
          uploadTime: '',
        },
        percent: true,
        save: {
          projectTermUnit: '',
          usage: '',
          mindayUnit: '',
          paymentplanId:'',
          projectrateUnit:'',
          projectAmount: '',
          minday: '',
          projectRate: '',
          id: '',
          name:'',
          projectTerm: '',
          feeplanId: 1,
          guaranteeCode:'5',
          managementRate: '',
          definitionKey:'',
          lendfee: ''
        },
        state: {
          borrowerEntryState: '',
          enterpriseEntryState: '',
          guarantorEntryState: '',
          uploadPictureState: '',
          uploadTime: '',
        },
        saveOrSubmit:'save',
        data: '',
        tableData: [{
          date: '借款人信息录入',
          name: '包含借款人基本信息、借款人财产信息、借款人负债信息的录入',
          state: '',
          type: 1,
          uodateTime: '',
          remark: ''
        }, {
          date: '企业信息录入',
          name: '包含企业基本信息、企业经营情况、企业银行流水信息录入',
          state: '',
          type: 2,
          updateTime: '',
          remark: ''
        }, {
          date: '担保人信息录入',
          name: '目前借款担保人、第三方担保公司的信息录入',
          state: '',
          type: 5,
          updateTime: '',
          remark: ''
        }, {
          date: '借款人&企业图片上传',
          name: '借款人&企业证件、结婚证、房产等资料的图片上传',
          state: '',
          type: 4,
          updateTime: '',
          remark: ''
        }],
        activeName: 'first',
        parameter: {
          ids: []
        }
      };
    },
    computed: {
      tableData2 () {
        if (this.save.guaranteeCode === '0') {
          return this.tableData.filter(val => val.type !== 5)
        } else {
          return this.tableData
        }
      }
    },
    watch: {},
    methods: {
      back() {
        this.$router.back(-1)
      },
      handlerGuaranteeType (date) {
      },
      resetForm () {
        this.$refs['save'].resetFields()
      },
      //项目完善保存接口
      getpreservation() {
        this.save.feeplan = this.save.feeplanId == 1 ? 0 : 1
        managementsaveController
          .saveOrderInfo({
            ...this.save,
            id : this.orderId,
            payment:this.$dict.findDictionaryName(this.save.paymentplanId),

          }).then(res => {
          if(res.status == 200){
            this.$message.success('保存成功')
          }
        })


      },
      //提交
      getsumint(parameter){
        this.save.feeplan = this.save.feeplanId == 1 ? 0 : 1
        if(!this.tableData2.every(v=>v.state === '已录入'|| v.state ==='已上传')){
          this.$message.error('请完善信息');
          return;
        }
        this.$refs['save'].validate((valid) => {
          if (valid) {
            managementsaveController
              .saveOrderInfo({
                ...this.save,
                id : this.orderId,
                saveOrSubmit:parameter
              }).then(res => {
               if(res.status === 200){
                this.$message.success('提交成功');
                this.$router.go(-1);
              }

            })
          } else {

            return false
          }
        })

      },
      percnter() {
        if (this.percent === true) {
          this.percent = !this.percent;
        }
      },
      //企业信息
      getqueryCustomerInfo(flag) {
        this.save.feeplan = this.save.feeplanId == 1 ? 0 : 1
        customerController
          .queryCustomerInfo({
            orderId: this.orderId
          })
          .then(res => {
            this.memberType = res.data.order.memberType
            this.tableData3 = res.data.order.list.map(val => {
              val.durationUnit = parseInt(val.durationUnit)
              return val
            })
            this.$refs.addRepayment.initState(this.tableData3)
            if (!flag) {
              this.form = {...this.form, ...res.data.customer};
              this.companyId = res.data.order.companyId;
              this.customerId = res.data.customer.id;
              let data = res.data.customer;
              this.tableData.forEach(v => {
                if (v.type === 1) {
                  v.flog = data.borrowerEntryState;
                  v.state = data.borrowerEntryState === "0" ? "待录入" : "已录入";
                  v.remark = data.borrowerEntryState === "0" ? "录入" : "查看";
                  v.updateTime = this.$formatDate(data.borrowerTime,'yyyy-MM-dd hh:mm:ss')
                }else if (v.type === 2) {
                  v.flog = data.enterpriseEntryState;
                  v.state = data.enterpriseEntryState === "0" ? "待录入" : "已录入";
                  v.remark = data.enterpriseEntryState === "0" ? "录入" : "查看";
                  v.updateTime = this.$formatDate(data.enterpriseTime,'yyyy-MM-dd hh:mm:ss')
                }else if (v.type === 5) {
                  v.flog = data.guarantorEntryState;
                  v.state = data.guarantorEntryState === "0" ? "待录入" : "已录入";
                  v.remark = data.guarantorEntryState === "0" ? "录入" : "查看";
                  v.updateTime = this.$formatDate(data.guarantorTime,'yyyy-MM-dd hh:mm:ss')
                }else if (v.type === 4) {
                  v.flog = data.uploadPictureState;
                  v.state = data.uploadPictureState === "0" ? "待上传" : "已上传";
                  v.remark = data.uploadPictureState === "0" ? "资料上传" : "查看";
                  v.updateTime = this.$formatDate(data.uploadTime, "yyyy-MM-dd hh:mm:ss");
                }else  if(!v.updateTime){
                  v.updateTime = this.$formatDate(data.updateTime, "yyyy-MM-dd hh:mm:ss");
                }
              })
              this.save ={
                ...this.save,
                ...res.data.order,
                ...this.$route.query,
                feeplanId:res.data.order.feeplanId || 1,
                usage:res.data.order.usage? parseInt(res.data.order.usage):'',
              }
              this.$nextTick(() => {
                this.$refs.save.clearValidate()
              })
            }
          });

      },

      get_detail(row) {
        if (row.type === 1) {
          this.$router.push({path: '/sys/system/borrowerInfo', query: {orderId: this.orderId}})
        } else if (row.type === 2) {
          this.$router.push({path: '/sys/work/workcompany', query: {companyId: this.companyId ,orderId: this.orderId,state:row.state}})
        } else if (row.type === 5) {
          this.$router.push({path: '/sys/guarantee/list', query: {orderId: this.orderId}})
        } else if (row.type === 4) {
          this.$router.push({path: '/sys/upload',query: {orderId: this.orderId, customerId: this.customerId, memberType: this.memberType}})
        }
      }


    },
    created() {
      this.orderId = this.$route.query.orderId
      this.getqueryCustomerInfo();
    },
    updated(){
    },
    mounted() {
      //console.log($dict.findDictData('DateUnit'))
    }
  };
</script>
<style lang="scss" scoped>
  .pb100{
    padding-bottom: 100px;
  }
  .container{
    .el-row{
      display: flex;
      flex-wrap: wrap;
    }

  }
  /deep/.validate-box{
    /*display: inline-block;*/
    width: 30%;
    display: flex;
    &>div{
      flex: 1;
      .input__pos{
        width: 100%;
      }
    }
    &>div:nth-last-child(1){
      .el-form-item__content{
        margin-top: 50px;
      }
    }
  }

  .formula-form {
    width: 200px;
    margin-right: 20px;
  }
.red{
  color: red;
}
.input__pos{
  width: 59%;
}
.input__{
  width: 100px;
}
  .sech {
    float: right;
  }
.common-group{
  margin:0px 24px 20px 24px  ;
  background: white;
}
.el-form{
  padding-left: 24px;
}
  .workedit-scheme {
    background: rgb(240, 242, 245);
  }

  .content {
    background: white;
    margin: 24px;
  }

  .content-footer {
    background: white;
    margin: 24px;
  }

  .el-tabs__content {
    padding-left: 32px;
  }

  .el-tabs--top {
    padding-left: 32px;
    background: white;
  }

  h4 {
    height: 55px;
    line-height: 55px;
    font-weight: 600;
    padding-left: 32px;
    margin-bottom: 16px;
    /*margin-top: 16px;*/
    font-family: "PingFangSC-Medium";
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }

  h1 {
    margin-bottom: 16px;
    margin-top: 16px;
    font-weight: 600;
    font-family: "PingFangSC-Medium";

  }

  .box{
    .el-table {
      padding: 24px 32px 32px 32px;
    }
  }


  .rowMoney {
    padding: 24px 32px 32px 32px;
  }

  .rowMoneys {
    padding: 0 32px 32px 32px;
  }

  .work-footer {
    background: white;
    height: 56px;
    line-height: 56px;
  }
.el-col{
  color: #606266;
  font-family: "Microsoft YaHei";
}
  .rowmode {
    padding: 0 32px 48px 32px;
  }

  .clearfix {
    clear: both
  }

  .iconfont-search {
    width: 32px;
    height: 32px;
    display: inline-block;
  }

  .el-icon-info {
    color: #1890FF;
    margin-right: 10px;
  }

.bosy{
  margin-bottom: 12px;
}
  .input__pos {
    position: relative;
  }

  .Percentage {
    color: #606266;
    position: absolute;
    z-index: 999;
    left: 180px;
    top: 13px;
    font-style: normal;
  }

  .right-top {
    float: right;
  }

  .el-tabs__nav-wrap {
    background: red;
  }

  #pane-first {
    background: white;
  }

  .el-button + .el-button {
    margin-left: 0px;
  }

  .el-tag {
    width: 100%;
    margin-bottom: 16px;
  }

  .workedit {
    width: 1720px;
    height: 900px;
    background: rgb(240, 242, 245);
  }

  .workedit-loan {
    background: white;
    padding: 30px;
    margin-bottom: 30px;
  }

  /*.actions {*/
    /*color: #0000ff;*/
    /*button {*/
      /*color: #0000ff;*/
      /*border: none;*/
      /*background: none;*/
      /*cursor: pointer;*/
      /*outline: none;*/
      /*&[disabled] {*/
        /*cursor: no-drop;*/
        /*color: #999;*/
      /*}*/
    /*}*/
  /*}*/

</style>
