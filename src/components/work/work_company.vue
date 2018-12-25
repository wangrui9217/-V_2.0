<template>
  <div :class="{'g-listpage__style' : !isDisabled}">
      <el-row style="margin-bottom:0;" v-if="!isDisabled && !isCheck">
        <el-col :span="2" :offset="22">
          <el-button type="primary" @click="letsSubmit">提交</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName">

        <el-tab-pane
          label="企业基本信息完善"
          name="first">
          <div>
            <div>
              <p
                class="common-title"
                style="line-height:20px;padding-bottom: 20px;">企业基本信息</p>
              <div class="common-group">
                <el-form
                  ref="companyform"
                  :model="companyform"
                  label-position="left">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="公司名称：">
                        <span>{{ companyUpdateRequest.name }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="社会统一代码：">
                        <span>{{ companyUpdateRequest.credit }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" >
                      <el-form-item label="法人姓名：">
                        <span>{{ companyUpdateRequest.legalName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="法人身份证：">
                        <span>{{ companyUpdateRequest.legalCardNum }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="法人手机号：">
                        <span>{{ companyUpdateRequest.legalPhone }}</span>
                      </el-form-item>
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="实际控制人信息">
                     <el-checkbox :disabled="isDisabled" v-model="isSame" @change="setSame">同法人</el-checkbox>
                    </el-form-item>
                  </el-row>
                </el-form>
                  <el-form
                  ref="companyform"
                  :model="companyform"
                  label-position="top">
                  <el-row>
                    <!--rules.realnameRule-->
                    <el-col :span="8">
                      <el-form-item
                      :rules="$rules.realnameRule"
                      :show-message="!isSame"
                      label="实际控制人姓名"
                      prop="companyUpdateRequest.actualControllerName">
                      <el-input
                        v-model="companyform.companyUpdateRequest.actualControllerName"
                        :disabled="isSame || isDisabled"/>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :rules="$rules.idCardRule" label="身份证" :show-message="!isSame"
                      prop="companyUpdateRequest.actualControllerCardNum">
                      <el-input
                        v-model="companyform.companyUpdateRequest.actualControllerCardNum"
                        :disabled="isSame || isDisabled"/>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="电话/手机号码" prop="companyUpdateRequest.actualControllerPhone" :rules="$rules.phoneRule">
                      <el-input
                        v-model="companyform.companyUpdateRequest.actualControllerPhone"
                        type="number"
                        :disabled="isSame || isDisabled"/>
                    </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="注册资本金(万元)" prop="companyUpdateRequest.registerMoney" :rules="$rules.requiredInputFigure">
                        <el-input type="number" v-model="companyform.companyUpdateRequest.registerMoney" :disabled="isDisabled"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="实缴注册资本金(万元)" prop="companyUpdateRequest.capital" :rules="$rules.requiredInputFigure">
                      <el-input type="number" v-model="companyform.companyUpdateRequest.capital" :disabled="isDisabled"/>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="注册日期" prop="companyUpdateRequest.registerTime" :rules="$rules.requiredSelectValue">
                        <el-date-picker :disabled="isDisabled"
                        v-model="companyform.companyUpdateRequest.registerTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                         :picker-options="pickerOptions0"
                        placeholder="选择日期"/>
                    </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                       <el-form-item label="注册地址" prop="companyUpdateRequest.addressList" :rules="$rules.requiredSelectValue">
                      <el-cascader :disabled="isDisabled"
                        :props="{value: 'id',label: 'name'}"
                        :options="$dict.getDictData('Area')"
                        v-model="companyform.companyUpdateRequest.addressList" />
                    </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="详细地址" prop="companyUpdateRequest.registerAddressDetail" :rules="$rules.requiredInputValue">
                        <el-input :disabled="isDisabled" v-model="companyform.companyUpdateRequest.registerAddressDetail" placeholder="详细地址" style="width:90%;"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="实际经营地址" prop="companyUpdateRequest.censusAddressList" :rules="$rules.requiredInputDate">
                      <el-cascader :disabled="isDisabled"
                        :props="{value: 'id',label: 'name'}"
                        :options="$dict.getDictData('Area')"
                        v-model="companyform.companyUpdateRequest.censusAddressList"/>
                    </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="详细地址" :rules="$rules.requiredInputValue" prop="companyUpdateRequest.actualOperatingAddressDetail">
                      <el-input :disabled="isDisabled" v-model="companyform.companyUpdateRequest.actualOperatingAddressDetail" placeholder="详细地址" style="width:90%;"/>
                    </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="经营范围" :rules="$rules.requiredInputValue" prop="companyUpdateRequest.businessScope">
                        <el-input :disabled="isDisabled" :rows="2" v-model="companyform.companyUpdateRequest.businessScope"
                          type="textarea" placeholder="请输入内容" style="width: 93%"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="其他情况说明" >
                        <el-input :disabled="isDisabled" :rows="2" v-model="companyform.companyUpdateRequest.otherInformation"
                          type="textarea" placeholder="请输入内容" style="width: 93%"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div style="padding-bottom:20px;">
              <p class="common-title">企业股东信息</p>
              <el-table
                ref="table"
                :data="companyform.companyShareholderInfoList"
                border>
                <el-table-column
                  label="编号"
                  type="index"
                  align="center"
                  width="120"/>
                <el-table-column label="股东名称" align="center" prop="name">
                </el-table-column>
                <el-table-column label="持股比率(%)" align="center" prop="holdingRatio">
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remark">
                </el-table-column>
                <el-table-column v-if="!isDisabled"
                  prop="roleName"
                  label="操作"
                  width="160"
                  align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click.native.prevent="editRow(scope.row, scope.$index)">
                      编辑
                    </el-button>
                    <el-button type="text" @click.native.prevent="deleteRow(scope.$index,companyform.companyShareholderInfoList)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button v-if="!isDisabled"
                class="common-button"
                @click="addShareholder('shareholder')"><i
                class="el-icon-plus"/>新增一行
              </el-button>
            </div>
            <el-row style="margin-top: 50px" v-if="!isDisabled && !isCheck">
              <el-button
                type="primary"
                @click="updateCompany" :disabled="hasSubmit">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="企业经营信息完善"
          name="second">
          <corpManagementInfo :isDisabled="isDisabled" :isCheck="isCheck" :hasSubmit="hasSubmit" ref="companyOperationInfo"/>
        </el-tab-pane>

        <el-tab-pane
          label="企业银行流水信息完善"
          name="third">
          <div>
            <p class="common-title" style="line-height:20px;padding-bottom: 20px;">银行流水录入</p>
            <el-form
              ref="hank"
              :model="hank"
              size="small"
              style="padding-left: 32px">
              <el-form-item>
                <template>
                  <el-table :data="hank.list" border style="width: 100%">
                    <el-table-column prop="accountType" label="账户类型">
                      <template slot-scope="scope">
                        <el-select v-model='hank.list[scope.$index].accountType' placeholder='请选择' style="width: 99%;margin-top:0;" :disabled="isDisabled">
                          <el-option
                            v-for="item in $dict.findDictData('AccountType')"
                            :key='item.id'
                            :label='item.value'
                            :value='item.id'>
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="bankName" label="银行名称">
                      <template slot-scope="scope">
                        <el-input :disabled="isDisabled"
                          v-model="scope.row.bankName"
                          class="ratio"/>
                      </template>
                    </el-table-column>
                    <el-table-column prop="flowInterval" label="流水期间(近几个月)">
                      <template slot-scope="scope">
                        <el-select v-model='hank.list[scope.$index].flowInterval' placeholder='请选择' style="width: 99%;margin-top:0;" :disabled="isDisabled">
                          <el-option
                            v-for="item in $dict.findDictData('FlowInterval')"
                            :key='item.id'
                            :label='item.value'
                            :value='item.id'>
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalInflow" label="总流入(万元)">
                      <template slot-scope="scope">
                        <el-input :disabled="isDisabled"
                          v-model="scope.row.totalInflow"
                          type="number"
                          class="ratio"/>
                      </template>
                    </el-table-column>
                    <el-table-column prop="netInflow" label="净流入(万元)">
                      <template slot-scope="scope">
                        <el-input :disabled="isDisabled"
                          v-model="scope.row.netInflow"
                          type="number"
                          class="ratio"/>
                      </template>
                    </el-table-column>
                    <el-table-column prop="exceptionalDescribe" label="异常情况说明">
                      <template slot-scope="scope">
                        <el-input :disabled="isDisabled"
                          v-model="scope.row.exceptionalDescribe"
                          class="ratio"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" v-if="!isDisabled">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          @click.native.prevent="deleteRow(scope.$index, hank.list)"> 移除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-form-item>
              <el-button v-if="!isDisabled"
                class="common-button"
                @click="addRow(hank.list)"> + 新增一行
              </el-button>
            </el-form>
            <p class="common-title" style="padding:20px 0 10px;">银行流水与经营收入匹配</p>
            <div style="padding-left: 32px;padding-bottom:20px;">
              <el-row style="padding-bottom: 16px;">
                <el-col :span="8">
                  <div style="padding-bottom: 10px">是否与经营情况匹配</div>
                  <el-select :disabled="isDisabled" v-model="hank.bankFlowMatchesOperations" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in $dict.findDictData('BankFlowMatchesOperations')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <div v-if="hank.bankFlowMatchesOperations !== '完全匹配'" class="grid-content bg-purple-light" >
                    <div style="padding-bottom: 16px">情况说明 </div>
                    <el-input :disabled="isDisabled"
                      :rows="4"
                      v-model="hank.noMatchInstructions"
                      type="textarea"
                      style="width: 88%"
                      placeholder="请输入内容"
                    />
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <el-row style="margin-top: 20px" v-if="!isDisabled && !isCheck">
            <el-button
              type="primary"
              @click="saveOrUpdateCompanyBankFlow" :disabled="hasSubmit">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    <el-dialog title="新增/编辑股东信息" :visible.sync="dialogFormVisible">
			<el-form :model="shareholderData" label-width="124px" ref="shareholder">
				<el-row :gutter="10">
					<el-col :span="8">
						<el-form-item label="股东名称：" :rules='$rules.requiredInputValue' prop='name'>
							<el-input v-model="shareholderData.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="持股比率（%）" :rules='$rules.requiredInputValue' prop='holdingRatio'>
              <el-input v-model="shareholderData.holdingRatio" type="number"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label='备注：'>
						<el-input v-model='shareholderData.remark' type="textarea" :rows='4'></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveInfo('shareholder')" :disabled="disabled_btn">确 定</el-button>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import { companyController } from "@/controller/common/company_controller";
import { customerController } from "./../../controller/common/customer_controller";
import corpManagementInfo from "../corporation/corp_management_info";
import { formatDate } from "../../util/date.js";
import { notEqual } from "assert";

export default {
  components: {
    corpManagementInfo
  },
  data: function() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      hasSubmit: false,
      carList: [{}],
      dialog: {
        addCar: false
      },
      checkList: "",
      radio: "1",
      value: "",
      infiledList: [],
      shareholderList: [],
      addinfiled: [],
      name: "",
      companyform: {
        companyShareholderInfoList: [],
        companyUpdateRequest: {
          name: "",
          legalName: "",
          credit: "",
          controllerCardNum: "",
          controllerPhone: ""
        },
        companyList: {
          actualControllerName: "",
          actualControllerPhone: "",
          actualControllerCardNum: "",
          registerMoney: "",
          registerTime: "",
          capital: "",
          id: "",
          registerAddressDetail: "",
          actualOperatingAddressDetail: "",
          businessScope: "",
          otherInformation: ""
        },
        percent: true,
        save: {},
        listIndex_pageSize: 1, // 数据列表使用的 pageNum
        listIndex_pageNo: 1, // 数据列表使用的 pageNo
        activeName: "first",
        NameList: "first",
        isSame: false,
        activeName_first: false,
        activeName_second: false,
        activeName_third: false,
        companyId: "",
        companyBankRequest: [],
        companyBaseRequest: [],
        companyOperationRequest: []
      },
      hank: {
        bankFlowMatchesOperations: "",
        noMatchInstructions: "",
        list: [
          {
            accountType: "",
            bankName: "",
            companyId: "",
            exceptionalDescribe: "",
            flowInterval: "",
            netInflow: "",
            remark: "",
            totalInflow: ""
          }
        ]
      },
      companyInventoryList: [],
      companyUpdateRequest: {
        name: "",
        legalName: "",
        credit: "",
        controllerCardNum: "",
        controllerPhone: "",
        addressList: []
      },
      companyList: {
        actualControllerName: "",
        actualControllerPhone: "",
        actualControllerCardNum: "",
        registerMoney: "",
        registerTime: "",
        capital: "",
        id: "",
        registerAddressDetail: "",
        actualOperatingAddressDetail: "",
        businessScope: "",
        otherInformation: ""
      },

      percent: true,
      save: {},
      listIndex_pageSize: 1, // 数据列表使用的 pageNum
      listIndex_pageNo: 1, // 数据列表使用的 pageNo
      activeName: "first",
      NameList: "first",
      isSame: false,
      activeName_first: false,
      activeName_second: false,
      activeName_third: false,
      companyId: "",
      companyBankRequest: [],
      companyBaseRequest: [],
      companyOperationRequest: [],
      shareholderData: {},
      dialogFormVisible: false,
      disabled_btn: false,
      reEdit: false
    };
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
  },
  created() {
    if (!this.isDisabled && !this.isCheck) {
      this.companyId = this.$route.query.companyId;
      this.companyBankFlow(this.companyId);
      this.company(this.companyId);
    }
  },
  mounted() {
    this.commitSave();
    console.log(this.$dict.findDictData('FlowInterval'),5656565656565)
  },
  methods: {
    clearValidate (formName) {
			this.$nextTick(() => {
				this.$refs[formName].clearValidate()
			})
		},
    addShareholder(formName) {
      this.dialogFormVisible = true
      this.disabled_btn = false
      this.reEdit = false
      this.clearValidate(formName)
      this.shareholderData = {}
    },
    editRow(row, $index) {
    	this.dialogFormVisible = true
      this.disabled_btn = false
      this.reEdit = true
      this.shareholderData = this.companyform.companyShareholderInfoList[$index];
    },
    saveInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.disabled_btn = true
          this.addInfo_ensure()
        } else {
          return false
        }
      })
    },
    addInfo_ensure() {
      if(this.reEdit) {
				this.dialogFormVisible = false
			} else {
				this.companyform.companyShareholderInfoList.push(this.shareholderData)
				this.dialogFormVisible = false
			}      
		},
    checkBeforeSubmit() {
      return new Promise((resolve, reject) => {
        this.$refs.hank.validate(flag => {
          if (flag) {
            this.$refs.companyform.validate(flag => {
              if (flag) {
                this.$refs.companyOperationInfo.formRef.validate(flag => {
                  if (flag) {
                    if(this.companyform.companyShareholderInfoList.length > 0) {
                      const companyOperationInfo = this.$refs.companyOperationInfo;
                      let newVar = {
                        ...this.hank,
                        ...this.companyform,

                        ...companyOperationInfo.companyInventoryList,
                        ...companyOperationInfo.companyLeaseInfoList,
                        ...companyOperationInfo.companyPrepanmentList,
                        ...companyOperationInfo.companyPurchaseInfoRequest,
                        ...companyOperationInfo.companyReceiveAdvanceList,
                        ...companyOperationInfo.companySaleRequest,
                        ...companyOperationInfo.companydueReceiveList,
                        ...companyOperationInfo.companyOperationInfo
                      };
                      const params = newVar;
                      companyOperationInfo.initData();
                      let param = {
                        companyBankRequest: {
                          bankFlowMatchesOperations: this.hank
                            .bankFlowMatchesOperations,
                          companyId: this.companyId,
                          list: this.hank.list.map(v => ({
                            ...v,
                            companyId: this.companyId
                          })),
                          noMatchInstructions: this.hank.noMatchInstructions
                        },
                        companyBaseRequest: {
                          companyShareholderInfoList: this.companyform
                            .companyShareholderInfoList,
                          companyUpdateRequest: {
                            ...this.companyform.companyUpdateRequest,
                            ...this.commitvalue().companyUpdateRequest
                          }
                        },
                        companyOperationRequest: {
                          ...companyOperationInfo.data,
                          companyOperationInfo:
                            companyOperationInfo.companyOperationInfo
                        }
                      };
                      this.hasSubmit = true;
                      resolve(param);
                    } else {
                      this.activeName = 'first'
                      this.$message.info('请完善企业股东信息！')
                    }
                    
                  } else {
                    reject("second");
                    this.$message.info('请完善相关信息')
                    this.activeName = "second";
                  }
                });
              } else {
                reject("first");
                this.$message.info('请完善相关信息')
                this.activeName = "first";
              }
            });
          } else {
            reject("third");
            this.$message.info('请完善相关信息')
            this.activeName = "third";
          }
        });
      });
    },
    letsSubmit() {
      this.checkBeforeSubmit().then(param => {
        companyController.commit(param).then(res => {
          if (res.status === 200) {
            this.hasSubmit = false;
            this.$message.success("提交成功");
            this.$router.go(-1);
          }
        });
      }).catch(() => {
      });
    },
    //提交
    submit() {
      this.$refs.hank.validate(flag => {
        if (flag) {
          this.$refs.companyform.validate(flag => {
            if (flag) {
              this.$refs.companyOperationInfo.formRef.validate(flag => {
                if (flag) {
                  const companyOperationInfo = this.$refs.companyOperationInfo;
                  let newVar = {
                    ...this.hank,
                    ...this.companyform,

                    ...companyOperationInfo.companyInventoryList,
                    ...companyOperationInfo.companyLeaseInfoList,
                    ...companyOperationInfo.companyPrepanmentList,
                    ...companyOperationInfo.companyPurchaseInfoRequest,
                    ...companyOperationInfo.companyReceiveAdvanceList,
                    ...companyOperationInfo.companySaleRequest,
                    ...companyOperationInfo.companydueReceiveList,
                    ...companyOperationInfo.companyOperationInfo
                  };
                  const params = newVar;
                  companyOperationInfo.initData();
                  let param = {
                    companyBankRequest: {
                      bankFlowMatchesOperations: this.hank
                        .bankFlowMatchesOperations,
                      companyId: this.companyId,
                      list: this.hank.list.map(v => ({
                        ...v,
                        companyId: this.companyId
                      })),
                      noMatchInstructions: this.hank.noMatchInstructions
                    },
                    companyBaseRequest: {
                      companyShareholderInfoList: this.companyform
                        .companyShareholderInfoList,
                      companyUpdateRequest: {
                        ...this.companyform.companyUpdateRequest,
                        ...this.commitvalue().companyUpdateRequest
                      }
                    },
                    companyOperationRequest: {
                      ...companyOperationInfo.data,
                      companyOperationInfo:
                        companyOperationInfo.companyOperationInfo
                    }
                  };
                  this.hasSubmit = true;
                  companyController.commit(param).then(res => {
                    if (res.status === 200) {
                      this.hasSubmit = false;
                      this.$message.success("提交成功");
                      this.$router.go(-1);
                    }
                  });
                } else {
                  this.activeName = "second";
                }
              });
            } else {
              this.activeName = "first";
            }
          });
        } else {
          this.activeName = "third";
        }
      });
    },
    //提交保存禁用接口
    commitSave() {
      let orderId;
      orderId = this.$route.query.orderId;
      customerController.queryCustomerInfo({ orderId }).then(res => {
        if (res.data.customer.enterpriseEntryState == "1") {
          this.hasSubmit = true;
          this.$refs.companyOperationInfo.getCompanyOperation(
            res.data.order.companyId
          );
        }
      });
    },
    indexMethod(index) {
      return (
        this.listIndex_pageSize * (this.listIndex_pageIndex - 1) + index + 1
      );
    },
    removecompany(row, $index) {
      this.companyInfo.list.splice($index, 1);
    },
    setSame() {
      if (this.isSame) {
        this.companyform.companyUpdateRequest.actualControllerName = this.companyUpdateRequest.legalName;
        this.companyform.companyUpdateRequest.actualControllerCardNum = this.companyUpdateRequest.legalCardNum;
        this.companyform.companyUpdateRequest.actualControllerPhone = this.companyUpdateRequest.legalPhone;
      } else {
        this.companyform.companyUpdateRequest.actualControllerName = "";
        this.companyform.companyUpdateRequest.actualControllerCardNum = "";
        this.companyform.companyUpdateRequest.actualControllerPhone = "";
      }
    },
    cancel() {
      this.$router.back(-1);
    },
    // 基本完善保存接口
    updateCompany() {
      this.hasSubmit = true;
      companyController.updateCompany(this.commitvalue()).then(res => {
        [
          this.companyform.companyUpdateRequest.registeredAddressProvince,
          this.companyform.companyUpdateRequest.registeredAddressCity,
          this.companyform.companyUpdateRequest.registeredAddressDistrict
        ] = this.companyform.companyUpdateRequest.addressList;
        [
          this.companyform.companyUpdateRequest.actualOperatingAddressProvince,
          this.companyform.companyUpdateRequest.actualOperatingAddressCity,
          this.companyform.companyUpdateRequest.actualOperatingAddressDistrict
        ] = this.companyform.companyUpdateRequest.censusAddressList;
        if (res.status == 200) {
          this.hasSubmit = false;
          this.$message.success("保存成功");
        }
      });
    },
    //保存提交的赋值
    commitvalue() {
      this.$refs.companyOperationInfo.deleteEmptyData(this.companyform.companyShareholderInfoList)
      const companyform = {
        companyShareholderInfoList: this.companyform.companyShareholderInfoList,
        companyUpdateRequest: {
          ...this.companyform.companyUpdateRequest,
          actualControllerName: this.companyform.companyUpdateRequest
            .actualControllerName,
          actualControllerCardNum: this.companyform.companyUpdateRequest
            .actualControllerCardNum,
          actualControllerPhone: this.companyform.companyUpdateRequest
            .actualControllerPhone,
          registeredAddressCity: this.companyform.companyUpdateRequest.addressList.length === 3 ? this.companyform.companyUpdateRequest.addressList[1] : '',
          registeredAddressDistrict: this.companyform.companyUpdateRequest.addressList.length === 3 ? this.companyform.companyUpdateRequest.addressList[2] : '',
          registeredAddressProvince: this.companyform.companyUpdateRequest.addressList.length === 3 ? this.companyform.companyUpdateRequest.addressList[0] : '',

          actualOperatingAddressCity: this.companyform.companyUpdateRequest
            .censusAddressList[1],
          actualOperatingAddressProvince: this.companyform.companyUpdateRequest
            .censusAddressList[0],
          actualOperatingAddressDistrict: this.companyform.companyUpdateRequest
            .censusAddressList[2]
        }
      };
      return companyform;
    },
    // 获取企业基本信息
    company(companyId) {
      companyController
        .company({
          companyId: companyId
        })
        .then(res => {
          // console.log('==========>',res)
          this.companyUpdateRequest = {
            ...this.companyUpdateRequest,
            ...res.data.companyEntity
          };
          if (
            this.companyUpdateRequest.legalCardNum ===
            this.companyUpdateRequest.actualControllerCardNum
          ) {
            this.isSame = true;
          }
          const list = res.data.companyEntity;
          this.companyform = {
            companyShareholderInfoList: res.data.companyShareholderInfoList,
            companyUpdateRequest: {
              ...list,
              registerTime:
                list.registerTime > 0
                  ? formatDate(list.registerTime, "yyyy-MM-dd")
                  : null,
              actualControllerName: list.actualControllerName,
              actualControllerName: list.actualControllerName,
              actualControllerName: list.actualControllerName,
              addressList: [
                list.registeredAddressProvince - 0,
                list.registeredAddressCity - 0,
                list.registeredAddressDistrict - 0
              ],

              censusAddressList: [
                list.actualOperatingAddressProvince - 0,
                list.actualOperatingAddressCity - 0,
                list.actualOperatingAddressDistrict - 0
              ]
            }
          };
          this.hank.bankFlowMatchesOperations = list.bankFlowMatchesOperations;
          this.hank.noMatchInstructions = list.noMatchInstructions;
          setTimeout(() => {
            this.$refs.companyform.clearValidate();
          }, 10);
        });
    },
    // 银行流水信息接口
    saveOrUpdateCompanyBankFlow() {
      this.$refs.companyOperationInfo.deleteEmptyData(this.hank.list)
      const hank = {
        ...this.hank,
        companyId: this.companyId,
        list: this.hank.list
      };
      companyController.saveOrUpdateCompanyBankFlow(hank).then(res => {
        if (res.status == 200) {
          this.$message.success("保存成功");
        }
      });
    },
    // 银行流水查询接口
    companyBankFlow(companyId) {
      this.companyId = companyId
      companyController
        .companyBankFlow({
          companyId: companyId
        })
        .then(res => {
          this.hank.list = res.data.map(v => {
            return {
              ...v,
              flowInterval: v.flowInterval ? parseInt(v.flowInterval) : "",
              accountType: v.accountType ? parseInt(v.accountType) : ""
            };
          });
        });
    },
    deleteRow(index, rows) {
      // 删除改行
      rows.splice(index, 1);
    },
    addRow(tableData) {
      this.$refs.companyOperationInfo.addOneData(tableData)
      // tableData.push({
      //   fildna: "",
      //   fildtp: "",
      //   remark: ""
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.formula-form {
  width: 200px;
  margin-right: 20px;
}

.el-input_input {
  width: 200px !important;
}

.el-tabs {
  border-bottom: none !important;
}

.sech {
  float: right;
}

.workedit-scheme {
  // background: rgb(240, 242, 245);
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
  padding-bottom: 32px;
  // padding-left: 32px;
}

.common-title {
  border: none;
}

.mall {
  display: inline-block;
  width: 73px;
  height: 32px;
  background: rgba(247, 247, 247, 1);
  border-radius: 4px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #c0c4cc;
  position: absolute;
  top: 59px;
}

.el-tabs {
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.el-tabs--top {
  // padding-left: 32px;
  background: white;
}

h1 {
  padding-left: 32px;
  margin-top: 16px;
  font-weight: 600;
  font-family: "PingFangSC-Medium";
}

/*.el-table th{*/
/*text-align: center;*/
/*}*/
.rowMoney {
  padding: 32px 32px 32px 32px;
}

.rowMoneys {
  padding: 0 32px 32px 32px;
}

.work-footer {
  background: white;
  height: 56px;
  line-height: 56px;
}

.rowmode {
  padding: 0 32px 48px 32px;
}

.clearfix {
  clear: both;
}

.iconfont-search {
  width: 32px;
  height: 32px;
  display: inline-block;
}

.el-icon-info {
  color: #1890ff;
  margin-right: 10px;
}

.el-select {
  width: 300px;
  margin-top: 8px;
}

.input__pos {
  position: relative;
}

.mall_input {
  height: 30px;
  line-height: 30px;
}

.Percentage {
  color: #606266;
  position: absolute;
  z-index: 999;
  left: 180px;
  top: 13px;
  font-style: normal;
}

.rowpaddding {
  padding: 0 32px 32px 32px;
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
  // margin-bottom: 16px;
}

.workedit {
  // width: 1720px;
  // height: 900px;
  background: rgb(240, 242, 245);
}

.workedit-loan {
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
.name-box {
  display: inline-block;
  width: 100px;
}
.check-text {
  display: inline-block;
  width: 110px;
}
</style>
