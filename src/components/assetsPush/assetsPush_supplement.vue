<template>
	<div class="common-box assetsPush_supplement">
		<el-form label-position='left' class="common-container pb80" :model="allInfo" label-width="150px" ref="ruleForm" :hide-required-asterisk="isDetails">
			<div>
				<div>
					<p class='common-title management-title'>业务网点信息</p>
					<div class="pl20">
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="客户经理名称:">
									<span v-text="allInfo.cusname"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="联系方式:">
									<span v-text="allInfo.contactinfo"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="所属网点:">
									<span v-text="allInfo.depart"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>基础资料</p>
					<!-- 自然人 -->
					<div class="pl20" v-if="allInfo.membertype == 0">
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体类型：">
									<span v-text="$dict.findDictionaryId('BorrowerType',allInfo.membertype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体名称：">
									<span v-text="allInfo.membername"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="性别：">
									<span v-text="allInfo.sex"></span>
									<span v-text="$dict.findDictionaryId('Sex',allInfo.sex)"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体证件类型：">
									<span v-text="allInfo.idtype"></span>
									<span v-text="$dict.findDictionaryId('CertificateType',allInfo.idtype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体证件号码：">
									<span v-text="allInfo.paperid"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="最高学历：">
									<span v-text="$dict.findDictionaryId('Education',allInfo.educations)"></span>
									<span v-text="allInfo.educations"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体注册地址：">
									<span v-text="allInfo.registeraddress"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体现地址：">
									<span v-text="allInfo.nowaddress"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="婚姻状况：">
									<span v-text="$dict.findDictionaryId('MaritalStatus',allInfo.marriage)"></span>
									<span v-text="allInfo.marriage"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="备注：">
									<span v-text="allInfo.ps"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!-- 企业 -->
					<div class="pl20" v-if="allInfo.membertype == 1">
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体类型：">
									<span v-text="$dict.findDictionaryId('BorrowerType',allInfo.membertype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体名称：">
									<span v-text="allInfo.membername"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体证件类型：">
									<span v-text="$dict.findDictionaryId('CertificateType',allInfo.idtype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款主体证件号码：">
									<span v-text="allInfo.paperid"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="企业注册资本：">
									<span v-text="allInfo.registermoney"></span>
									<span v-text="allInfo.registermoney ? '万元' : ''"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="企业实缴资本：">
									<span v-text="allInfo.actualmoney"></span>
									<span v-text="allInfo.actualmoney ? '万元' : ''"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="企业成立时间：">
									<span v-text="$formatDate(allInfo.registertime, 'yyyy-MM-dd hh:mm:ss')"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体注册地址：">
									<span v-text="allInfo.registeraddress"></span>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item label="借款主体注册地址过滤内容：" label-width="210px" prop="registeraddresscontent" :rules='allInfo.membertype == 1 ? rules.requiredInputValue : {}'>
									<el-input v-if="!isDetails" v-model="allInfo.registeraddresscontent"></el-input>
									<span v-if="isDetails" v-text="allInfo.registeraddresscontent"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款主体现地址：">
									<span v-text="allInfo.nowaddress"></span>
								</el-form-item>
							</el-col>
							<el-col :span="16">
								<el-form-item label="借款主体现地址过滤内容：" label-width="210px" prop="nowaddresscontent" :rules='allInfo.membertype == 1 ? rules.requiredInputValue : {}'>
									<el-input v-if="!isDetails" v-model="allInfo.nowaddresscontent"></el-input>
									<span v-if="isDetails" v-text="allInfo.nowaddresscontent"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="备注:">
									<span v-text="allInfo.ps"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>项目信息</p>
					<div class="pl20">
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="借款金额：">
									<span v-text="allInfo.amount"></span>
									<span v-text="allInfo.amount ? '元' : ''"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款期限：">
									<span v-text="allInfo.terms"></span>
									<span v-text="$dict.findDictionaryId('DateUnit',allInfo.projectterm)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款用途：">
									<span v-text="$dict.findDictionaryId('LoanUseType',allInfo.projectusage)"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="还款方式：">
									<span v-text="$dict.findDictionaryId('Repayment',allInfo.projectrepayment)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="最短收息期：">
									<span v-text="allInfo.minday"></span>
									<span v-text="$dict.findDictionaryId('DateUnit',allInfo.mindaysterm)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="放款手续费（%）：" prop="lendfee" :rules='rules.requiredInputFigure'>
									<!-- <el-input v-if="!isDetails" v-model="allInfo.lendfee" type="number"></el-input> -->
									<span v-text="allInfo.lendfee"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="产品类型：" prop="projecttype" :rules='rules.requiredSelectValue'>
									<el-select v-if="!isDetails" v-model="allInfo.projecttype" style="width:100%;">
										<el-option
											v-for="item in $dict.findDictData('ProductType')"
											:key="item.id"
											:label="item.value"
											:value="item.name">
										</el-option>
									</el-select>
									<span v-if="isDetails" v-text="$dict.findDictionaryId('ProductType',allInfo.projecttype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="借款总费用：" prop="totalfee" :rules='rules.requiredInputFigure'>
									<el-input v-if="!isDetails" v-model="allInfo.totalfee" type="number"></el-input>
									<span v-if="isDetails" v-text="allInfo.totalfee"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="费用收取方式：" prop="feeway" :rules='rules.requiredSelectValue'>
									<el-select v-if="!isDetails" v-model="allInfo.feeway" style="width:100%;">
										<el-option
											v-for="item in $dict.findDictData('feeway')"
											:key="item.id"
											:label="item.value"
											:value="item.name">
										</el-option>
									</el-select>
									<span v-if="isDetails" v-text="$dict.findDictionaryId('feeway',allInfo.feeway)"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8"
							v-if="allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2 || allInfo.projecttype==3 || allInfo.projecttype==4 || allInfo.projecttype==5">
								<el-form-item label="主营业务：" prop="mainbussiness" :rules="(allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2 || allInfo.projecttype==3 || allInfo.projecttype==4 || allInfo.projecttype==5) ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.mainbussiness"></el-input>
									<span v-if="isDetails" v-text="allInfo.mainbussiness"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8"	v-if="allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2">
								<el-form-item label="从业年限：" prop="operationperiod" :rules="(allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2) ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.operationperiod"></el-input>
									<span v-if="isDetails" v-text="allInfo.operationperiod"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8"
							v-if="allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2 || allInfo.projecttype==3 || allInfo.projecttype==4 || allInfo.projecttype==5">
								<el-form-item label="经营概况：" prop="operationsum" :rules="(allInfo.projecttype==0 || allInfo.projecttype==1 || allInfo.projecttype==2 || allInfo.projecttype==3 || allInfo.projecttype==4 || allInfo.projecttype==5) ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.operationsum"></el-input>
									<span v-if="isDetails" v-text="allInfo.operationsum"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="费用方案：" >
									<span v-text="$dict.findDictionaryId('projectfeetype',allInfo.projectfeetype)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="执行费率：">
									<span v-text="allInfo.rate + ' % / ' + $dict.findDictionaryId('DateUnit',allInfo.rateterm)"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8" v-if="allInfo.projectfeetype==1">
								<el-form-item label="平台利率：">
									<span v-text="allInfo.platformrate + ' % / ' + $dict.findDictionaryId('DateUnit',allInfo.platformrateunit)"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="allInfo.projectfeetype==1 && allInfo.techfeerepay && allInfo.techfeerepay.length>0">
							<el-table :data="allInfo.techfeerepay" border class="g-table" width="100%" style="margin-top:0;">
								<el-table-column  prop="terms" label="还款期次">
									<template slot-scope="scope">
										<span v-text="'第 ' + scope.row.terms + ' 期'"></span>
									</template>
								</el-table-column>
									<el-table-column  prop="techfee" label="还款金额">
								</el-table-column>
									<el-table-column  prop="period" label="还款时长" 
									:formatter="(row) => row.terms === 1 ? '放款后次日' : row.period + $dict.findDictionaryId('DateUnit',row.periodunit)">
								</el-table-column>
							</el-table>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="16">
								<el-form-item label="还款保障措施">
									<el-checkbox v-model="allInfo.isaccountsup" :disabled="isDetails">账户监管</el-checkbox>
									<el-checkbox v-model="allInfo.isassetassure" :disabled="isDetails">家庭财产保证</el-checkbox>
									<el-checkbox v-model="allInfo.isthirdassure" disabled>第三方担保</el-checkbox>
									<el-checkbox v-model="allInfo.isfamilyassure" disabled>家庭成员连带责任担保</el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8" v-if="allInfo.isaccountsup">
								<el-form-item label="账户监管描述：" prop="accountsup" :rules="allInfo.isaccountsup ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.accountsup"></el-input>
									<span v-if="isDetails" v-text="allInfo.accountsup"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8" v-if="allInfo.isassetassure">
								<el-form-item label="家庭财产保证描述：" prop="familyasset" :rules="allInfo.isassetassure ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.familyasset"></el-input>
									<span v-if="isDetails" v-text="allInfo.familyasset"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
				<div v-if="allInfo.isthirdassure || allInfo.isfamilyassure">
					<p class='common-title management-title'>还款保障措施-担保信息</p>
					<div class="pl20">
						<div v-if="allInfo.personalguaranteearr && allInfo.personalguaranteearr.length > 0">
							<p class='common-title management-title'>个人担保信息</p>
							<el-table :data="allInfo.personalguaranteearr" border class="g-table" ref="table" style="margin-top:0px;">
								<el-table-column prop="name" label="担保方名称">
								</el-table-column>
								<el-table-column prop="relationdesc" label="与申请人关系" :formatter="(row) => $dict.findDictionaryId('ApplicantRelationship',row.relationdesc)">
								</el-table-column>
								<el-table-column prop="idtypedesc" label="证件类型" :formatter="(row) => $dict.findDictionaryId('CertificateType',row.idtypedesc)">
								</el-table-column>
								<el-table-column prop="idnumber" label="证件号码">
								</el-table-column>
								<el-table-column prop="phone" label="手机号码">
								</el-table-column>
								<el-table-column prop="address2" label="联系地址">
								</el-table-column>
								<el-table-column prop="rmk" label="备注">
								</el-table-column>
							</el-table>
						</div>
						<div v-if="allInfo.mechanismguaranteearr && allInfo.mechanismguaranteearr.length > 0">
							<p class='common-title management-title'>机构担保信息</p>
							<el-table :data="allInfo.mechanismguaranteearr" border class="g-table" ref="table" style="margin-top:0px;">
								<el-table-column prop="name" label="担保方名称">
								</el-table-column>
								<el-table-column prop="relationdesc" label="与申请人关系" :formatter="(row) => $dict.findDictionaryId('ApplicantRelationship',row.relationdesc)">
								</el-table-column>
								<el-table-column prop="idtypedesc" label="证件类型" :formatter="(row) => $dict.findDictionaryId('CertificateType',row.idtypedesc)">
								</el-table-column>
								<el-table-column prop="idnumber" label="证件号码">
								</el-table-column>
								<el-table-column prop="phone" label="手机号码">
								</el-table-column>
								<el-table-column prop="address2" label="联系地址">
								</el-table-column>
								<!-- <el-table-column prop="rmk" label="备注">
								</el-table-column> -->
								<el-table-column label="操作" width="60">
									<template slot-scope="scope">
										<div class="actions">
											<el-button type="text" @click="viewInfo(scope.row, scope.$index)">查看</el-button>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div v-if="allInfo.familyguaranteearr && allInfo.familyguaranteearr.length > 0">
							<p class='common-title management-title'>家庭担保信息</p>
							<el-table :data="allInfo.familyguaranteearr" border class="g-table" ref="table" style="margin-top:0px;">
								<el-table-column prop="name" label="担保方名称">
								</el-table-column>
								<el-table-column prop="relationdesc" label="与申请人关系" :formatter="(row) => $dict.findDictionaryId('ApplicantRelationship',row.relationdesc)">
								</el-table-column>
								<el-table-column prop="idtypedesc" label="证件类型" :formatter="(row) => $dict.findDictionaryId('CertificateType',row.idtypedesc)">
								</el-table-column>
								<el-table-column prop="idnumber" label="证件号码">
								</el-table-column>
								<el-table-column prop="phone" label="手机号码">
								</el-table-column>
								<el-table-column prop="address2" label="联系地址">
								</el-table-column>
								<el-table-column prop="rmk" label="备注">
								</el-table-column>
								<!-- <el-table-column label="操作" width="120">
									<template slot-scope="scope">
										<div class="actions">
											<el-button v-if="!isDetails" type="text" @click="editInfo(scope.row, scope.$index)">编辑</el-button>
											<el-button v-if="!isDetails" type="text" @click="removeInfo(scope.row, scope.$index)">删除</el-button>
											<el-button v-if="isDetails" type="text" @click="editInfo(scope.row, scope.$index)">查看</el-button>
										</div>
									</template>
								</el-table-column> -->
							</el-table>
							<!-- <el-button v-if="!isDetails" class="common-button" @click="addInfo('familyrule')"><i class="el-icon-plus"></i>新增家庭担保信息</el-button> -->
						</div>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>基础信息</p>
					<!-- 自然人 -->
					<div class="pl20" v-if="allInfo.membertype == 0">
						<el-row :gutter="30">
							<el-col>
								<el-form-item label="借款人说明：" label-width="200px" prop="details" :rules="allInfo.membertype == 0 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.details" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.details"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col>
								<el-form-item label="借款人收入/负债情况：" label-width="200px" prop="incomedebt" :rules="allInfo.membertype == 0 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.incomedebt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.incomedebt"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="借款人收入/负债情况过滤：" label-width="200px" prop="incomedebtcnt" :rules="allInfo.membertype == 0 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.incomedebtcnt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.incomedebtcnt"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="工作性质：" label-width="200px" prop="worktype" :rules="allInfo.membertype == 0 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.worktype"></el-input>
									<span v-if="isDetails" v-text="allInfo.worktype"></span>
									<!-- <el-select v-model="allInfo.worktype">
										<el-option
											v-for="item in list"
											:key="item.id"
											:label="item.label"
											:value="item.name">
										</el-option>
									</el-select> -->
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="还款来源：" label-width="200px" prop="paymentincome" :rules="allInfo.membertype == 0 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.paymentincome"></el-input>
									<span v-if="isDetails" v-text="allInfo.paymentincome"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<!-- 企业 -->
					<div class="pl20" v-if="allInfo.membertype == 1">
						<el-row :gutter="30">
							<el-col>
								<el-form-item label="借款人说明：" label-width="200px" prop="details" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.details" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.details"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="借款人收入/负债情况：" label-width="200px" prop="incomedebt" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.incomedebt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.incomedebt"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="借款人收入/负债情况过滤：" label-width="200px" prop="incomedebtcnt" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.incomedebtcnt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.incomedebtcnt"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="所属行业：" prop="industry" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.industry"></el-input>
									<span v-if="isDetails" v-text="allInfo.industry"></span>
									<!-- <el-select v-model="allInfo.industry">
										<el-option
											v-for="item in list"
											:key="item.id"
											:label="item.label"
											:value="item.name">
										</el-option>
									</el-select> -->
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="还款来源：" prop="paymentincome" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.paymentincome"></el-input>
									<span v-if="isDetails" v-text="allInfo.paymentincome"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="8">
								<el-form-item label="法人信用信息：" prop="legalinfo" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.legalinfo"></el-input>
									<span v-if="isDetails" v-text="allInfo.legalinfo"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="法人信用信息过滤：" prop="legalinfocnt" :rules="allInfo.membertype == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.legalinfocnt"></el-input>
									<span v-if="isDetails" v-text="allInfo.legalinfocnt"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col>
								<el-form-item label="经营区域：">
									<!-- <el-input v-if="!isDetails" v-model="allInfo.operatingarea" type="textarea" :rows="2"></el-input> -->
									<span v-text="allInfo.operatingarea"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="经营区域过滤内容：" prop="operatingareacnt" :rules="allInfo.operatingareacnt == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.operatingareacnt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.operatingareacnt"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="股东信息：">
									<!-- <el-input v-if="!isDetails" v-model="allInfo.holderinfo" type="textarea" :rows="2"></el-input> -->
									<span v-text="allInfo.holderinfo"></span>
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="股东信息过滤内容：" prop="holderinfocnt" :rules="allInfo.holderinfocnt == 1 ? rules.requiredInputValue : {}">
									<el-input v-if="!isDetails" v-model="allInfo.holderinfocnt" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.holderinfocnt"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>征信信息</p>
					<div class="pl20">
						<el-row :gutter="30">
							<el-col :span="8" >
								<el-form-item label="近六个月逾期金额（元）：" label-width="200px" :rules='rules.requiredInputFigure' prop='creditamount'>
									<el-input v-if="!isDetails" v-model="allInfo.creditamount" type="number"></el-input>
									<span v-if="isDetails" v-text="allInfo.creditamount"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="近六个月逾期笔数（笔）:" label-width="200px" :rules='rules.requiredInputFigure' prop='countnum'>
									<el-input v-if="!isDetails" v-model="allInfo.countnum" type="number"></el-input>
									<span v-if="isDetails" v-text="allInfo.countnum"></span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="30">
							<el-col :span="16">
								<el-form-item label="其他平台借款情况:" label-width="200px" :rules='allInfo.otherloan_no ? {} :rules.requiredInputValue' prop='otherloan' :show-message="!allInfo.otherloan_no">
									<el-input v-if="!isDetails" v-model="allInfo.otherloan" :disabled="!!allInfo.otherloan_no"></el-input>
									<span v-if="isDetails" v-text="allInfo.otherloan"></span>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-checkbox v-if="!isDetails" v-model="allInfo.otherloan_no" @change="changeOtherloan">经承诺核实无其他平台借款记录</el-checkbox>
							</el-col>
						</el-row>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>影像信息</p>
					<el-alert v-if="!isDetails"
						:title="allInfo.membertype == 1 ? '请至少上传一张身份证及营业执照信息，每张不超过2MB。系统支持图片格式为：png、jpg、jpeg、bmp。' : ''"
						type="info"
						show-icon :closable="false">
					</el-alert>
					<div class="pl20">
						<el-row v-for="item in $dict.findDictData('atttypid')" :key="item.id">
							<el-form-item :label="item.value" label-width="100px">
								<el-upload :ref="item.name" v-if="!isDetails"
									class="upload-demo"
									:action="picAddress"
									:on-remove="handleRemove"
									:before-upload="beforeAvatarUpload"
									:on-preview="handlePictureCardPreview"
									list-type="picture"
									:data="{'atttypid': item.name, 'type': 2}"
									:http-request="fileUpload"
									:multiple="isMultiple">
									<el-button size="small"><i class="el-icon-upload2"></i> 上传文件</el-button>
								</el-upload>
								<div v-for="(v,index) in attinfo" :key="v.id">
									<div v-if="v.type === 2 && item.name == v.atttypid" class="view-img" @click="handlePictureCardPreview(v)">
										<img :src="v.url" alt="">
										<span v-text="v.resourceName"></span>
										<i v-if="!isDetails" class="el-icon-close" @click.stop="removeImg(v,index,attinfo)"></i>
									</div>
								</div>
							</el-form-item>
						</el-row>
					</div>
				</div>
				<div>
					<p class='common-title management-title'>其他信息</p>
					<div class="pl20">
						<el-row :gutter="30">
							<el-col>
								<el-form-item label="借款合同其他条款:">
									<el-input v-if="!isDetails" v-model="allInfo.cont_ext_cond" type="textarea" :rows="2"></el-input>
									<span v-if="isDetails" v-text="allInfo.cont_ext_cond"></span>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
    </el-form>
		<div class="common-bottom-btn">
			<el-button @click='$router.back(-1)'>取消</el-button>
			<el-button v-if="!isDetails" type='primary' @click="submitForm('ruleForm')">项目推送</el-button>
		</div>
		<el-dialog title="机构担保信息" :visible.sync="dialogTableVisible" width='60%'>
			<el-form :model="mechanismGuaranteeData" label-width="124px">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="担保方名称：">
							<span v-text="mechanismGuaranteeData.name"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="担保方名称过滤：">
							<span v-text="mechanismGuaranteeData.namemask"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="与申请人关系：">
							<span v-text="$dict.findDictionaryId('ApplicantRelationship',mechanismGuaranteeData.relationdesc)"></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="证件类型：">
							<span v-text="$dict.findDictionaryId('CertificateType',mechanismGuaranteeData.idtypedesc)"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件号码：">
							<span v-text="mechanismGuaranteeData.idnumber"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="法定代表人：">
							<span v-text="mechanismGuaranteeData.legalname"></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="法人证件类型：">
							<span v-text="$dict.findDictionaryId('CertificateType',mechanismGuaranteeData.legaltypedesc)"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="法人证件号码：">
							<span v-text="mechanismGuaranteeData.legal_id_number"></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号码：">
							<span v-text="mechanismGuaranteeData.phone"></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="注册地址：">
							<span v-text="mechanismGuaranteeData.address1"></span>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="经营地址：">
							<span v-text="mechanismGuaranteeData.address2"></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label='备注：'>
						<span v-text="mechanismGuaranteeData.rmk"></span>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- <el-dialog title="新增家庭担保信息" :visible.sync="dialogFormVisible">
			<el-form :model="familyGuaranteeData" label-width="124px" ref="familyrule">
				<el-row :gutter="10">
					<el-col :span="8">
						<el-form-item label="担保方名称：" :rules='rules.realnameRule' prop='name'>
							<el-input v-model="familyGuaranteeData.name" :disabled="isDetails"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="与申请人关系：" :rules='rules.requiredSelectValue' prop='relationdesc'>
							<el-select v-model="familyGuaranteeData.relationdesc" :disabled="isDetails">
								<el-option v-for="item in $dict.findDictData('ApplicantRelationship')"
                :key='item.id'
                :label='item.value'
                :value='item.name'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件类型：">
							<span v-text="$dict.findDictionaryId('CertificateType',familyGuaranteeData.idtypedesc)"></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="证件号码：" :rules='rules.idCardRule' prop='idnumber'>
							<el-input v-model="familyGuaranteeData.idnumber" :disabled="isDetails"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号码：" :rules='rules.phoneRule' prop='phone'>
							<el-input v-model="familyGuaranteeData.phone" :disabled="isDetails"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="联系地址：">
							<el-input v-model="familyGuaranteeData.address2" :disabled="isDetails"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label='备注：'>
						<el-input v-model='familyGuaranteeData.rmk' type="textarea" :rows='4' :disabled="isDetails"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveInfo('familyrule')" :disabled="disabled_btn">确 定</el-button>
			</div>
		</el-dialog> -->
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
import { assetsPushController } from "@/controller/syd/assetsPush_controller";
import { ftpFileController } from "@/controller/common/file_controller";
import { resourceController } from "@/controller/common/resource_controller";
import Rules from "@/util/rules";
export default {
  data() {
    return {
      rules: Rules,
			id: this.$route.query.id,
			allInfo: {
				isthirdassure: false,
				isaccountsup: false,
				isfamilyassure: false,
				isassetassure: false
			},
			list: [],
			// familyguaranteearr: [],
			// familyGuaranteeData: {},
			attinfo: [],
			imgInfo: [],
			picAddress: "",
			isMultiple: true,
			// dialogFormVisible: false,
			dialogVisible: false,
			dialogImageUrl: "",
			// imgNum: 0,
			disabled_btn: false,
			reEdit: false,
			uploadState: true,
			dialogTableVisible: false,
			mechanismGuaranteeData: {}
    };
  },
  props: {
		isDetails: {
			type: Boolean,
			required: false,
			default: false
		}
	},
  methods: {
		// clearValidate (formName) {
		// 	this.$nextTick(() => {
		// 		this.$refs[formName].clearValidate()
		// 	})
		// },
		// addInfo(formName) {
		// 	this.dialogFormVisible = true
		// 	this.reEdit = false
		// 	this.disabled_btn = false
		// 	this.familyGuaranteeData = {
		// 		idtypedesc: 0
		// 	}
		// 	this.clearValidate(formName)
		// },
		// editInfo(row, $index) {
		// 	this.dialogFormVisible = true
		// 	this.disabled_btn = false
		// 	this.familyGuaranteeData = this.familyguaranteearr[$index];
		// 	if(!this.isDetails) {
		// 		this.reEdit = true
		// 	}
		// },
		// removeInfo(row, $index) {
		// 	this.familyguaranteearr.splice($index, 1);
		// },
		// addInfo_ensure() {
		// 	if(this.reEdit) {
		// 		this.dialogFormVisible = false
		// 	} else {
		// 		this.familyguaranteearr.push(this.familyGuaranteeData)
		// 		this.dialogFormVisible = false
		// 	}
		// },
		// saveInfo(formName) {
		// 	if(!this.isDetails) {
		// 		this.$refs[formName].validate((valid) => {
		// 			if (valid) {
		// 				this.disabled_btn = true
		// 				this.addInfo_ensure()
		// 			} else {
		// 				return false
		// 			}
		// 		})
		// 	} else {
		// 		this.dialogFormVisible = false
		// 	}
		// },
		changeOtherloan() {
			this.allInfo.otherloan = ""
		},
		viewInfo(row, $index) {
			this.dialogTableVisible = true
			this.mechanismGuaranteeData = this.allInfo.mechanismguaranteearr[$index];
		},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
					this.projectPush()
        } else {
          return false;
        }
      });
    },
		getPushData() {
			assetsPushController.getPushData(this.id).then(res => {
				if(res.status === 200) {
					this.allInfo = {...this.allInfo, ...res.data}
					this.allInfo.feeway = this.allInfo.feeway == 'null' ? "" : this.allInfo.feeway
					// this.familyguaranteearr = res.data.familyguaranteearr
					if(this.allInfo.projecttype) {
						this.allInfo.projecttype = this.allInfo.projecttype + ""
					}
				}
			})
		},
		beforeAvatarUpload(file) {
      const imgType =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!imgType) {
				this.uploadState = false
        this.$message.error("图片只能是 png、jpg、jpeg、bmp 格式!");
      }
      if (!isLt2M) {
				this.uploadState = false
        this.$message.error("图片大小不能超过 2MB!");
      }
      return imgType && isLt2M;
    },
		handleRemove(file, fileList) {
			if(this.uploadState) {
				let index
				for (var i = 0; i < this.imgInfo.length; i++) {
					if (this.imgInfo[i].uid === file.uid) {
						var resourceId = this.imgInfo[i].resourceId;
						var id = this.imgInfo[i].id;
						index = i
					}
				}
				this.delete(resourceId,id,index,this.imgInfo)
			}
		},
		removeImg(item,index,list) {
			this.delete(item.resourceUrl, item.id,index,list)
		},
		delete(resourceUrl, id,index,list) {
			ftpFileController.delete(resourceUrl).then(res => {
				if(res.status === 200) {
					resourceController.deleteResource({id: id}).then(res =>{
						if(res.status === 200) {
							this.$message.success("删除成功！");
							// this.imgNum--
							list.splice(index, 1);
						}
					})
				}
			});
		},
		handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
		},
		fileUpload(param) {
			this.uploadState = true
			let data = {}
			data.atttypid = param.data.atttypid
			data.ownerId = this.id
			data.type = 2

      var imgObj = param.file;
      var file = new FormData();
			file.append("file", imgObj);

      ftpFileController.upload(file).then(res => {
        if (res.status === 200) {
					data.resourceId = res.data.newName
					data.resourceName = res.data.oldName
					data.resourceUrl = res.data.url

					imgObj.attname = res.data.oldName
					imgObj.atttypid = data.atttypid
					imgObj.imgurl = res.data.url
					resourceController.saveResource(data).then(res =>{
						if(res.status === 200) {
							imgObj.id = res.data
							this.imgInfo.push(imgObj);
							// this.imgNum++
							this.$message.success("上传成功！");
						} else {
							this.$message.error("文件上传失败！2222");
							this.$refs[data.atttypid].clearFiles()
						}
					})
				} else {
					this.$message.error("文件上传失败！1111");
					this.$refs[data.atttypid].clearFiles()
				}
      });
		},
		queryResource() {
			let data = {
				ownerId: this.id,
				type: 2,
			}
			resourceController.queryResource(data).then(res => {
				this.attinfo = res.data
				// this.imgNum = res.data.length
				this.attinfo.forEach(v => {
					v.url = ftpFileController.view()+ v.resourceUrl
					v.attname = v.resourceName
					v.imgurl = v.resourceUrl
				})
			})
		},
		projectPush() {
			this.allInfo.businessKey = this.$route.query.id
			if(this.allInfo.otherloan_no) {
				this.allInfo.otherloan = '暂无数据'
			}
			// this.allInfo.familyguaranteearr = this.familyguaranteearr
			this.allInfo.attinfo = this.imgInfo.concat(this.attinfo)
			// 判断是否上传必填影像信息
			let atttypidList = []
			this.allInfo.attinfo.forEach(v => {
				atttypidList.push(v.atttypid)
			})
			if(atttypidList.indexOf('2') == -1 || atttypidList.indexOf('4') == -1) {
				this.$message.info('请完善影像信息！')
			} else {
				assetsPushController.projectPush(this.allInfo).then(res => {
					if(res.status === 200) {
						if (res.data.code == 0) {
							this.$message.error(res.data.msg)
						} else {
							this.$message.success("推送成功！");
							this.$router.back(-1)
						}
					}
				})
			}
		}
			
  },
  created() {
		this.getPushData()
		this.queryResource()
	},
	mounted() {},
	computed: {}
};
</script>

<style lang="scss">
.assetsPush_supplement {
	.pb80 {
		padding-bottom: 80px;
	}
	.pl20 {
		padding-left:20px;
	}
	.common-title.management-title {
		border: none;
	}
	.el-alert.el-alert--info {
		margin-bottom: 14px;
		background-color: #E6F7FF;
		border: 1px solid #BAE7FF;
		.el-icon-info {
			color: #1890FF;
		}
	}
	.el-upload-list--picture {
		overflow: hidden;
		.el-upload-list__item {
			float: left;
			width: 230px;
			margin-right: 10px;
		}
	}
	.view-img {
		float: left;
    width: 230px;
    margin-right: 10px;
		color: #606266;
		border: 1px solid #c0ccda;
    border-radius: 6px;
		margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 92px;
		position: relative;
		img {
			width: 70px;
			height: 70px;
			vertical-align: middle;
			float: left;
			position: relative;
			z-index: 1;
			margin-left: -80px;
		}
		span {
			display: block;
    	margin-top: 20px;
			margin-right: 40px;
			overflow: hidden;
			padding-left: 4px;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.el-icon-close {
			display: none;
			width: 14px;
			height: 14px;
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
			opacity: .75;
		}
	}
	.view-img:hover {
		.el-icon-close {
			display: block;
		}
	}
	.el-form-item__label {
		text-align: left;
	}
}
</style>
