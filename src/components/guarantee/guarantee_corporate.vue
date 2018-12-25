<template>
	<div :class="{'g-listpage__style' : !isDisabled}">
		<div>
			<p class='common-title' style="line-height:20px;padding-bottom: 20px;">企业经营信息</p>
			<div class='common-group'>
				<el-form label-position='top' :model='corporationInfo' ref='corporationInfo'>
					<el-row>
						<el-col :span="8">
							<el-form-item label='公司名称' :rules="rules.merchantNameRule" prop='name'>
								<el-input v-model='corporationInfo.name' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='公司名称过滤' :rules="rules.merchantNameRule" prop='name'>
								<el-input v-model='corporationInfo.nameMask' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='社会统一代码' :rules='rules.requiredInputValue' prop='credit'>
								<el-input v-model='corporationInfo.credit' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='法人姓名' :rules='rules.realnameRule' prop='legalName'>
								<el-input v-model='corporationInfo.legalName' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='法人身份证' :rules='rules.idCardRule' prop='legalCardNum'>
								<el-input v-model='corporationInfo.legalCardNum' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='法人电话/手机号码' :rules='rules.phoneRule' prop='legalPhone'>
								<el-input v-model='corporationInfo.legalPhone' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" style="margin-bottom:10px;">
							<!-- <el-form-item label='实际控制人信息'> -->
								实际控制人信息：<el-checkbox v-model="isSame" @change="setSame" :disabled="isDisabled">同法人</el-checkbox>
							<!-- </el-form-item> -->
						</el-col>
						
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='实际控制人姓名' :rules='rules.realnameRule' prop='controllerName' :show-message="!isSame">
								<el-input v-model='corporationInfo.controllerName' :disabled="isDisabled || isSame"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='实际控制人身份证' :rules='rules.idCardRule' prop='controllerCardNum' :show-message="!isSame">
								<el-input v-model='corporationInfo.controllerCardNum' :disabled="isDisabled || isSame"></el-input>
							</el-form-item>
						</el-col>		
						<el-col :span="8">
							<el-form-item label='实际控制人电话/手机号码' :rules='rules.phoneRule' prop='controllerPhone' :show-message="!isSame">
								<el-input v-model='corporationInfo.controllerPhone' :disabled="isDisabled || isSame"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='与借款人关系' prop='relationships' :rules='rules.requiredSelectValue'>
								<el-select v-model='corporationInfo.relationships' placeholder='请选择' :disabled="isDisabled">
									<el-option
										v-for="item in $dict.findDictData('ApplicantRelationship')"
										:key='item.id'
										:label='item.value'
										:value='item.id'>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='注册资本金(万元)' prop='registermoney' :rules='rules.requiredInputFigure'>
								<el-input v-model='corporationInfo.registermoney' type="number" :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label='实缴注册资本金(万元)' prop='capital' :rules='rules.requiredInputFigure'>
								<el-input v-model='corporationInfo.capital' type="number" :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>	
					</el-row>
					<el-row :gutter="0">
						<el-col :span="8">
							<el-form-item label='注册地址'  prop='addressList' :rules='rules.requiredSelectValue'>
								<el-cascader :disabled="isDisabled"
									:props="{value: 'id',label: 'name'}"
									:options="$dict.getDictData('Area')"
									v-model='corporationInfo.addressList'
								></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item label='详细地址'  prop='address' :rules='rules.requiredInputValue'>
								<el-input v-model='corporationInfo.address' placeholder="详细地址" :disabled="isDisabled" style="width:90%;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label='实际经营地址'>
								<el-cascader :disabled="isDisabled"
									:props="{value: 'id',label: 'name'}"
									:options="$dict.getDictData('Area')"
									v-model='corporationInfo.censusAddressList'
								></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item label='详细地址'>
								<el-input v-model='corporationInfo.censusAddress' placeholder="详细地址" :disabled="isDisabled" style="width:90%;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label='备注'  prop='remark'>
								<el-input v-model='corporationInfo.remark' placeholder="备注" :disabled="isDisabled" style="width:93%;" type="textarea"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title'>企业股东信息</p>
			<el-table :data="corporationInfo.list" border class="g-table" ref="table">
				<el-table-column label="股东名称">
					<template slot-scope="scope">
            <el-input v-model="scope.row.name" :disabled="isDisabled"></el-input>
          </template>
				</el-table-column>
        <el-table-column label="持股比率(%)">
					<template slot-scope="scope">
            <el-input v-model="scope.row.holdingRatio" :disabled="isDisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
					<template slot-scope="scope">
            <el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="操作" width="80" v-if="!isDisabled">
          <template slot-scope="scope">
            <div class="actions">
              <el-button type="text" @click="removeShareholder(scope.row, scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
			<el-button class="common-button" @click="addShareholder" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
		</div>
		<div>
			<p class='common-title'>企业经营情况</p>
			<el-form :inline='true'>
				<el-row>
					<el-col :span="16">
						<el-form-item label='征信情况' >
							<el-input v-model='corporationInfo.creditInfo' type='textarea' :rows='4' style="width: 680px;" :disabled="isDisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label='资产情况'>
							<el-input v-model='corporationInfo.assetSituation' type='textarea' :rows='4' style="width: 680px;" :disabled="isDisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label='负债情况'>
							<el-input v-model='corporationInfo.liabilities' type='textarea' :rows='4' style="width: 680px;" :disabled="isDisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label='运营情况'>
							<el-input v-model='corporationInfo.operationStatus' type='textarea' :rows='4' style="width: 680px;" :disabled="isDisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>	
			</el-form>	
		</div>	
		<el-row v-if="!isDisabled">
			<el-button type='primary' @click="submitForm('corporationInfo')">提交</el-button>
			<el-button @click='cancel'>取消</el-button>
		</el-row>
	</div>
</template>

<script>
import { guaranteeController } from "@/controller/syd/guarantee_controller";
import Rules from "@/util/rules";
export default {
  data() {
    return {
			rules: Rules,
      corporationInfo: {
        addressList: [],
        censusAddressList: [],
        list: []
      },
			isSame: false
    };
  },
  created() {
		this.corporationInfo.orderId = this.$route.query.orderId
		if(!this.isCheck) {
			this.corporationInfo.id = this.$route.query.id === 'add' ? "" : this.$route.query.id
		} else {
			this.corporationInfo.id = this.id
		}
		
    if (this.corporationInfo.id) {
      this.getCompanyGuarantee();
		}
  },
  methods: {
    setSame() {
      if (this.isSame) {
        this.corporationInfo.controllerName = this.corporationInfo.legalName;
        this.corporationInfo.controllerCardNum = this.corporationInfo.legalCardNum;
        this.corporationInfo.controllerPhone = this.corporationInfo.legalPhone;
      } else {
        this.corporationInfo.controllerName = "";
        this.corporationInfo.controllerCardNum = "";
        this.corporationInfo.controllerPhone = "";
      }
    },
    addShareholder() {
			let data = {};
			let hasEmpty
			if(this.corporationInfo.list.length > 0) {
				this.corporationInfo.list.forEach(v => {
					for(let key in v) {
						if(v[key] === '') {
							delete v[key]
						}
					}
					let arr = Object.keys(v)
					if(!arr.length) {
						hasEmpty = true
						this.$message.warning('请勿添加多条空数据')
						return false
					}
				})
			} else {
				hasEmpty = false
			}
      if(!hasEmpty) {
				this.corporationInfo.list.push(data);
			} else {
				this.$message.warning('请勿添加多条空数据')
			}
      
    },
    removeShareholder(row, $index) {
      this.corporationInfo.list.splice($index, 1);
    },
    saveInfo() {
      [
        this.corporationInfo.addressProvince,
        this.corporationInfo.addressCity,
        this.corporationInfo.addressCounty
      ] = this.corporationInfo.addressList;
      [
        this.corporationInfo.censusAddressProvince,
        this.corporationInfo.censusAddressCity,
        this.corporationInfo.censusAddressCounty
      ] = this.corporationInfo.censusAddressList;
      this.corporationInfo.capital = this.corporationInfo.capital - 0;
      this.corporationInfo.registermoney =
      this.corporationInfo.registermoney - 0;
      this.corporationInfo.list.forEach((v,i) => {
				for(let key in v) {
						if(v[key] === '') {
							delete v[key]
						}
					}
				let arr = Object.keys(v)
				if(!arr.length) {
					this.corporationInfo.list.splice(i,1);
				} else {
					v.holdingRatio = v.holdingRatio ? v.holdingRatio - 0 : "";
					v.companyId = "";
					v.type = 2
				}
      });
      let payload = Object.assign({}, this.corporationInfo);
      guaranteeController.saveCompanyGuarantee(payload).then(res => {
        if (res.status === 200) {
					this.$message.success("保存成功！");
					if(!this.isCheck) {
						this.$router.back(-1);
					} else {
						
					}
        }
      });
		},
		submitForm(formName) {  
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.saveInfo();
				} else {
					this.$message.warning("请完善信息！");
				}
			});
    },
    cancel() {
      this.$router.back(-1);
    },
    getCompanyGuarantee() {
      guaranteeController
        .queryCompanyGuarantee({ id: this.corporationInfo.id })
        .then(res => {
          if (res.status === 200) {
						this.corporationInfo = res.data;
						if(this.corporationInfo.legalCardNum === this.corporationInfo.controllerCardNum) {
							this.isSame = true
						}
            this.corporationInfo.addressList = [
              this.corporationInfo.addressProvince,
              this.corporationInfo.addressCity,
              this.corporationInfo.addressCounty
            ];
            this.corporationInfo.censusAddressList = [
              this.corporationInfo.censusAddressProvince,
              this.corporationInfo.censusAddressCity,
              this.corporationInfo.censusAddressCounty
            ];
          }
        });
    }
	},
	props: {
    isDisabled: {
      type: Boolean,
      default: false
		},
		id: {
			type: Number,
      required: false
		},
		isCheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.common-title {
  border: none;
}
</style>
