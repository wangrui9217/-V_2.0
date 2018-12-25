<template>
	<div>
		<div>
			<p class='common-title management-title'>企业经营信息</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companyOperationInfo' label-width="165px">
					<el-row>
						<el-col :span="20">
							<el-form-item label="主要经营品种" :rules='rules.requiredSelectValue' prop='mainBussinessArr'>
								<el-checkbox-group v-model="companyOperationInfo.mainBussinessArr" @change="change">
									<el-checkbox v-for="item in $dict.findDictData('MainBussiness')" :disabled="isDisabled"
										:key='item.id'
										:label='item.id'>
                    {{item.value}}
										</el-checkbox>
									</el-checkbox-group>
							</el-form-item>
						</el-col>
						<el-col :span="4" v-if="companyOperationInfo.mainBussinessArr.indexOf(otherId) != -1">
							<el-form-item label-width="20px" label=" " :rules='rules.requiredInputValue' prop='mainBussinessOther'>
								<el-input v-model="companyOperationInfo.mainBussinessOther" :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item label="经营模式" :rules='rules.requiredSelectValue' prop='businessModelArr'>
							<el-checkbox-group v-model="companyOperationInfo.businessModelArr">
								<el-checkbox v-for="item in $dict.findDictData('BusinessModel')" :disabled="isDisabled"
									:key='item.id'
									:label='item.id'>{{item.value}}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-row>
					<el-row :gutter="30">
						<el-col :span="10">
							<el-form-item label="是否有淡旺季" :rules="rules.requiredSelectValue" prop='haveHignSeason'>
								<el-radio-group v-model="companyOperationInfo.haveHignSeason" :disabled="isDisabled">
									<el-radio label="0">无淡旺季</el-radio>
									<el-radio label="1">有淡旺季</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="6" v-if="companyOperationInfo.haveHignSeason==='1'">
							<el-form-item label="淡季" label-width="60px" :rules="companyOperationInfo.haveHignSeason === '1' ? rules.requiredInputValue : {}" prop='lowSeason'>
								<el-input v-model='companyOperationInfo.lowSeason' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6" :offset="1" v-if="companyOperationInfo.haveHignSeason==='1'">
							<el-form-item label="旺季" label-width="60px" :rules="companyOperationInfo.haveHignSeason === '1' ? rules.requiredInputValue : {}" prop='highSeason'>
								<el-input v-model='companyOperationInfo.highSeason' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="月均营业收入（万元）" :rules='rules.requiredInputFigure' prop='monthlyOperatingIncome'>
								<el-input v-model='companyOperationInfo.monthlyOperatingIncome' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="年均营业收入（万元）">
								<p :class="{'p-input' : !isDisabled}">{{companyOperationInfo.annualRevenue = companyOperationInfo.monthlyOperatingIncome ? companyOperationInfo.monthlyOperatingIncome * 12 : ""}}</p>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="毛利率（%）" :rules='rules.requiredInputFigure' prop='grossGargin'>
								<el-input v-model='companyOperationInfo.grossGargin' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="净利率（%）" :rules='rules.requiredInputFigure' prop='netMargin'>
								<el-input v-model='companyOperationInfo.netMargin' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="月均运输费用（万元）" :rules='rules.inputFigure' prop='monthlyShippingCosts'>
								<el-input v-model='companyOperationInfo.monthlyShippingCosts' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="员工人数" :rules='rules.requiredInputFigure' prop='staffAmount'>
								<el-input v-model='companyOperationInfo.staffAmount' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="月均工资支出（万元）" :rules='rules.requiredInputFigure' prop='monthlyWagesDisburse'>
								<el-input v-model='companyOperationInfo.monthlyWagesDisburse' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="经营情况说明">
							<el-input v-model='companyOperationInfo.businessDescription' type='textarea' :rows='2' :disabled="isDisabled"></el-input>
						</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>档口信息</p>
			<div>
				<el-table :data="companyLeaseInfoList" border class="g-table" ref="table" style="margin-top:0;">
					<el-table-column prop="leaseMode" label="租赁方式" :formatter="(row) => $dict.findDictionaryName(row.leaseMode)">
					</el-table-column>
					<el-table-column prop="monthlyRent" label="月租金（元）">
					</el-table-column>
					<el-table-column prop="leaseTerm" label="档口租赁期限">
					</el-table-column>
					<el-table-column prop="acreage" label="面积">
					</el-table-column>
					<el-table-column prop="deposit" label="押金（元）">
					</el-table-column>
					<el-table-column prop="isOneHand" label="是否是一手档口">
					</el-table-column>
					<el-table-column prop="leaseAddressList" label="档口地址" :formatter="(row) => $dict.findAreaName(row.leaseAddressProvince) + '/' + $dict.findAreaName(row.leaseAddressCity) + $dict.findAreaName(row.leaseAddressDistrict)">
					</el-table-column>
					<el-table-column prop="leaseAddressDetail" label="详细地址">
					</el-table-column>
					<el-table-column label="操作" width="120" v-if="!isDisabled">
						<template slot-scope="scope">
							<div class="actions">
								<el-button type="text" @click="editLeaseInfo(scope.row, scope.$index)">编辑</el-button>
								<el-button type="text" @click="removeLeaseInfo(scope.row, scope.$index)">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<el-button class="common-button" @click="addLeaseInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增档口信息</el-button>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>企业采购信息</p>
			<div>
				<el-form label-position='left' :model='companyPurchaseInfoRequest' ref='companyPurchaseInfoRequest' label-width="165px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="货物采购地区">
								<el-input v-model='companyPurchaseInfoRequest.purchaseArea' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="采购结算方式">
								<el-select v-model="companyPurchaseInfoRequest.purchaseSettlementMode" placeholder="请选择" :disabled="isDisabled" style="width:100%;">
									<el-option
										v-for="item in $dict.findDictData('PurchaseSettlementMode')"
										:key='item.id'
										:label='item.value'
										:value='item.id'>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="月采购金额（万元）" :rules='rules.inputFigure' prop='montylyPurchaseMoney'>
								<el-input v-model='companyPurchaseInfoRequest.montylyPurchaseMoney' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="其他信息补充">
								<el-input v-model='companyPurchaseInfoRequest.purchaseOtherInfo' type='textarea' :rows='2' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>应付信息</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companyAmountDueList' label-width="170px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="应付总金额（万元）" :rules='rules.inputFigure' prop='amountDue'>
								<el-input v-model='companyOperationInfo.amountDue' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="其他应付总金额（万元）" label-width="170px" :rules='rules.inputFigure' prop='otherAmountDue'>
								<el-input v-model='companyOperationInfo.otherAmountDue' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="明细">
								<el-table :data="companyAmountDueList" border class="g-table" ref="table" style="width: 100%">
									<el-table-column label="客户名称">
										<template slot-scope="scope">
											<el-input v-model="scope.row.custName" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="金额（万元）">
										<template slot-scope="scope">
											<el-input v-model="scope.row.money" type="number" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="备注">
										<template slot-scope="scope">
											<el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="80" v-if="!isDisabled">
										<template slot-scope="scope">
											<div class="actions">
												<el-button type="text" @click="removeAmountDueInfo(scope.row, scope.$index)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<el-button class="common-button" @click="addAmountDueInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>企业预收信息</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companyReceiveAdvanceList' label-width="170px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="预收总金额（万元）" :rules='rules.inputFigure' prop='amountReceivedAdvance'>
								<el-input v-model='companyOperationInfo.amountReceivedAdvance' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="明细">
								<el-table :data="companyReceiveAdvanceList" border class="g-table" ref="table" style="width: 100%">
									<el-table-column label="客户名称">
										<template slot-scope="scope">
											<el-input v-model="scope.row.custName" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="金额（万元）">
										<template slot-scope="scope">
											<el-input v-model="scope.row.money" type="number" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="备注">
										<template slot-scope="scope">
											<el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="80" v-if="!isDisabled">
										<template slot-scope="scope">
											<div class="actions">
												<el-button type="text" @click="removeAdvanceReceiveInfo(scope.row, scope.$index)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<el-button class="common-button" @click="addAdvanceReceiveInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>企业存货统计</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companyInventoryList' label-width="170px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="存货总额（万元）" :rules='rules.inputFigure' prop='inventoryAmount'>
								<el-input v-model='companyOperationInfo.inventoryAmount' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="明细">
								<el-table :data="companyInventoryList" border class="g-table" ref="table" style="width: 100%">
									<el-table-column label="存货名称">
										<template slot-scope="scope">
											<el-input v-model="scope.row.inventoryName" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="存货金额（万元）">
										<template slot-scope="scope">
											<el-input v-model="scope.row.money" type="number" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="数量">
										<template slot-scope="scope">
											<el-col :span="12">
												<el-input v-model="scope.row.quantity	" :disabled="isDisabled"></el-input>
											</el-col>
											<el-col :span="11" :offset="1">
												<el-select v-model="companyInventoryList[scope.$index].quantityUnit" placeholder="请选择" :disabled="isDisabled">
													<el-option
														v-for="item in $dict.findDictData('QuantityUnit')"
														:key='item.id'
														:label='item.value'
														:value='item.id'>
													</el-option>
												</el-select>
											</el-col>
										</template>
									</el-table-column>
									<el-table-column label="存货备注">
										<template slot-scope="scope">
											<el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="80" v-if="!isDisabled">
										<template slot-scope="scope">
											<div class="actions">
												<el-button type="text" @click="removeInventoryInfo(scope.row, scope.$index)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<el-button class="common-button" @click="addInventoryInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>企业销售信息</p>
			<div>
				<el-form label-position='left' :model='companySaleRequest' ref='companySaleRequest' label-width="165px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="销售结算方式">
								<el-select v-model="companySaleRequest.saleSettlementMode" placeholder="请选择" :disabled="isDisabled" style="width:100%;">
									<el-option
										v-for="item in $dict.findDictData('saleSettlementMode')"
										:key='item.id'
										:label='item.value'
										:value='item.id'>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="销售账期" :rules='rules.inputFigure' prop='saleSettlementPeriod'>
								<el-col :span="15">
									<el-input v-model='companySaleRequest.saleSettlementPeriod' :disabled="isDisabled"></el-input>
								</el-col>
								<el-col :span="9">
									<el-select v-model="companySaleRequest.saleSettlementIntervalUnit" placeholder="请选择" :disabled="isDisabled">
										<el-option
											v-for="item in $dict.findDictData('SaleSettlementIntervalUnit')"
											:key='item.id'
											:label='item.value'
											:value='item.id'>
										</el-option>
									</el-select>
								</el-col>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="主要下游客户">
								<el-input v-model='companySaleRequest.mainDownstreamCustomer' type='textarea' :rows='2' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>企业应收</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companydueReceiveList' label-width="170px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="应收总金额（万元）" :rules='rules.inputFigure' prop='amountReceivable'>
								<el-input v-model='companyOperationInfo.amountReceivable' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="其他应收总金额（万元）" label-width="170px" :rules='rules.inputFigure' prop='otherAmountReceivable'>
								<el-input v-model='companyOperationInfo.otherAmountReceivable' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="明细">
								<el-table :data="companydueReceiveList" border class="g-table" ref="table" style="width: 100%">
									<el-table-column label="客户名称">
										<template slot-scope="scope">
											<el-input v-model="scope.row.custName" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="金额（万元）">
										<template slot-scope="scope">
											<el-input v-model="scope.row.money" type="number" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="备注">
										<template slot-scope="scope">
											<el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="80" v-if="!isDisabled">
										<template slot-scope="scope">
											<div class="actions">
												<el-button type="text" @click="removeReceivableInfo(scope.row, scope.$index)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<el-button class="common-button" @click="addReceivableInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<div>
			<p class='common-title management-title'>预付信息</p>
			<div>
				<el-form label-position='left' :model='companyOperationInfo' ref='companyPrepanmentList' label-width="170px">
					<el-row :gutter="30">
						<el-col :span="8">
							<el-form-item label="预付总金额（万元）" :rules='rules.inputFigure' prop='amountDueAdvance'>
								<el-input v-model='companyOperationInfo.amountDueAdvance' :disabled="isDisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item label="明细">
								<el-table :data="companyPrepanmentList" border class="g-table" ref="table" style="width: 100%">
									<el-table-column label="客户名称">
										<template slot-scope="scope">
											<el-input v-model="scope.row.custName" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="金额（万元）">
										<template slot-scope="scope">
											<el-input v-model="scope.row.money" type="number" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="备注">
										<template slot-scope="scope">
											<el-input v-model="scope.row.remark" :disabled="isDisabled"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="80" v-if="!isDisabled">
										<template slot-scope="scope">
											<div class="actions">
												<el-button type="text" @click="removePrepanmentList(scope.row, scope.$index)">删除</el-button>
											</div>
										</template>
									</el-table-column>
								</el-table>
								<el-button class="common-button" @click="addPrepanmentList" v-if="!isDisabled"><i class="el-icon-plus"></i>新增一行</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<el-row v-if="!isDisabled && !isCheck">
			<el-button type='primary' @click="saveInfo" :disabled="hasSubmit">保存</el-button>
			<el-button @click='cancel'>取消</el-button>
		</el-row>
		<el-dialog title="档口信息" :visible.sync="dialogFormVisible">
			<el-form :model="leaseInfo" label-width="124px" :rules='rules.requiredSelectValue' prop='leaseMode' ref="leaseInfo">
				<el-row :gutter="30">
					<el-col :span="8">
						<el-form-item label="租赁方式" :rules='rules.requiredSelectValue' prop='leaseMode'>
							<el-select v-model="leaseInfo.leaseMode" placeholder="请选择">
								<el-option v-for="item in $dict.findDictData('LeaseMode')"
                :key='item.id'
                :label='item.value'
                :value='item.id'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="月租金（元）" :rules='rules.requiredInputFigure' prop='monthlyRent'>
							<el-input v-model="leaseInfo.monthlyRent"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="档口租赁期限" :rules='rules.requiredInputValue' prop='leaseTerm'>
							<el-input v-model="leaseInfo.leaseTerm"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="8">
						<el-form-item label="面积（m²）" :rules='rules.requiredInputFigure' prop='acreage'>
							<el-input v-model="leaseInfo.acreage"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="押金（元）" :rules='rules.requiredInputFigure' prop='deposit'>
							<el-input v-model="leaseInfo.deposit"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否是一手档口" :rules='rules.requiredSelectValue' prop='isOneHand'>
							<el-select v-model="leaseInfo.isOneHand" placeholder="请选择">
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="30">
					<el-col :span="12">
						<el-form-item label='档口地址' :rules='rules.requiredSelectValue' prop='leaseAddressList'>
							<el-cascader
								:props="{value: 'id',label: 'name'}"
								:options="$dict.getDictData('Area')"
								v-model='leaseInfo.leaseAddressList'
							></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label='详细地址' :rules='rules.requiredInputValue' prop='leaseAddressDetail'>
							<el-input v-model='leaseInfo.leaseAddressDetail'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label='备注'>
						<el-input v-model='leaseInfo.remark' type="textarea" :rows='4'></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('leaseInfo')" :disabled="disabled">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { companyController } from "@/controller/syd/company_controller";
import Rules from "@/util/rules";
export default {
  data() {
    return {
			rules: Rules,
			leaseInfo: {
				leaseAddressList: [],
				companyId: ""
			},	// 档口信息
			companyId: "",
			companyOperationInfo: {		// 企业经营信息
				companyId: "",
				mainBussinessArr: [], // 选中的经营品种
				mainBussiness: "",		// 选中的经营品种-提交数据
				businessModelArr: [], // 选中的经营模式
				businessModel: "", // 选中的经营模式-提交数据
				haveHignSeason: "", // 淡旺季
			},
			companyLeaseInfoList: [],	// 档口信息列表
			companyPurchaseInfoRequest: {
				companyId: "",
			}, 	// 企业采购信息
			companyAmountDueList: [],	// 应付信息
			companyReceiveAdvanceList: [],	// 企业预收信息
			companyInventoryList: [],	// 企业存货统计
			companySaleRequest: {
				companyId: "",
			},	// 企业销售信息
			companydueReceiveList: [],	// 企业应收
			companyPrepanmentList: [],	// 预付信息
      data: {},
			dialogFormVisible: false,
			otherId: "",
			isEdit: false,
			disabled: false
    };
	},
	props: {
		isDisabled: {
			type: Boolean,
			default: false
		},
		hasSubmit: {
			type: Boolean,
			default: false
		},
		isCheck: {
      type: Boolean,
      default: false
    },
	},
	methods: {
		// 新增一行-禁止添加多条空数据
		addOneData(list) {
			let data = {};
			let hasEmpty
			if(list.length > 0) {
				list.forEach(v => {
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
				list.push(data);
			} else {
				this.$message.warning('请勿添加多条空数据')
			}
		},
		// 新增一行-保存时排除空数据
		deleteEmptyData(list,strToNum1,strToNum2,strToNum3) {
			list.forEach((v,i) => {
				for(let key in v) {
						if(v[key] === '') {
							delete v[key]
						}
					}
				let arr = Object.keys(v)
				if(!arr.length) {
					list.splice(i,1);
				} else {
					if(strToNum1) {
						v[strToNum1] = v[strToNum1] ? v[strToNum1] - 0 : "";
					}
					if(strToNum2) {
						v[strToNum2] = v[strToNum2] ? v[strToNum2] - 0 : "";
					}
					if(strToNum3) {
						v[strToNum3] = v[strToNum3] ? v[strToNum3] - 0 : "";
					}
					v.companyId = this.companyId;
				}
      });
		},
		// 编辑档口信息
		editLeaseInfo(row, $index) {
			this.disabled = false
			this.isEdit = true
			this.dialogFormVisible = true
			this.leaseInfo = this.companyLeaseInfoList[$index];
		},
		// 删除档口信息
		removeLeaseInfo(row, $index) {
			this.companyLeaseInfoList.splice($index, 1);
		},

		// 新增档口信息
		addLeaseInfo() {
			this.disabled = false
			this.dialogFormVisible = true
			this.leaseInfo = {
				companyId : this.companyId,
				leaseAddressList: []
			}
		},
		// 新增档口信息-确认
		addInfo() {
			this.disabled = true
			if(this.isEdit) {
				this.dialogFormVisible = false
				if(this.leaseInfo.leaseAddressList.length > 0) {
					[
						this.leaseInfo.leaseAddressProvince,
						this.leaseInfo.leaseAddressCity,
						this.leaseInfo.leaseAddressDistrict
					] = this.leaseInfo.leaseAddressList
				}
			} else {
				this.leaseInfo.companyId = this.companyId
				if(this.leaseInfo.leaseAddressList.length > 0) {
					[
						this.leaseInfo.leaseAddressProvince,
						this.leaseInfo.leaseAddressCity,
						this.leaseInfo.leaseAddressDistrict
					] = this.leaseInfo.leaseAddressList
				}
				this.companyLeaseInfoList.push(this.leaseInfo)
				this.dialogFormVisible = false
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.addInfo()
				} else {
					return false
				}
			})
		},
		// 删除应付信息
		removeAmountDueInfo(row, $index) {
			this.companyAmountDueList.splice($index, 1);
		},
		// 新增应付信息
		addAmountDueInfo() {
			this.addOneData(this.companyAmountDueList)
		},
		// 删除预收信息
		removeAdvanceReceiveInfo(row, $index) {
			this.companyReceiveAdvanceList.splice($index, 1);
		},
		// 新增预收信息
		addAdvanceReceiveInfo() {
			this.addOneData(this.companyReceiveAdvanceList)
		},
		// 删除企业存货
		removeInventoryInfo(row, $index) {
			this.companyInventoryList.splice($index, 1);
		},
		// 新增企业存货
		addInventoryInfo() {
			this.addOneData(this.companyInventoryList)
		},
		// 删除企业应收
		removeReceivableInfo(row, $index) {
			this.companydueReceiveList.splice($index, 1);
		},
		// 新增企业应收
		addReceivableInfo() {
			this.addOneData(this.companydueReceiveList)

		},
		// 删除预付信息
		removePrepanmentList(row, $index) {
			this.companyPrepanmentList.splice($index, 1);
		},
		// 新增预付信息
		addPrepanmentList() {
			this.addOneData(this.companyPrepanmentList)
		},
		initData() {
			this.companyOperationInfo.companyId = this.companyId
			this.companyPurchaseInfoRequest.companyId = this.companyId
			this.companySaleRequest.companyId = this.companyId
			// 处理数据
			this.companyOperationInfo.mainBussiness = this.companyOperationInfo.mainBussinessArr.join(',')
			this.companyOperationInfo.businessModel = this.companyOperationInfo.businessModelArr.join(',')

			this.deleteEmptyData(this.companyAmountDueList,'money')
			this.deleteEmptyData(this.companyReceiveAdvanceList,'money')
			this.deleteEmptyData(this.companydueReceiveList,'money')
			this.deleteEmptyData(this.companyInventoryList,'money','quantity','quantityUnit')
			this.deleteEmptyData(this.companyPrepanmentList,'money')
			this.companyOperationInfo.grossGargin = this.companyOperationInfo.grossGargin ? this.companyOperationInfo.grossGargin - 0 : ""
			this.companyOperationInfo.inventoryAmount = this.companyOperationInfo.inventoryAmount ? this.companyOperationInfo.inventoryAmount - 0 : ""
			this.companyOperationInfo.monthlyOperatingIncome = this.companyOperationInfo.monthlyOperatingIncome ? this.companyOperationInfo.monthlyOperatingIncome - 0 : ""
			this.companyOperationInfo.monthlyShippingCosts = this.companyOperationInfo.monthlyShippingCosts ? this.companyOperationInfo.monthlyShippingCosts - 0 : ""
			this.companyOperationInfo.monthlyWagesDisburse = this.companyOperationInfo.monthlyWagesDisburse ? this.companyOperationInfo.monthlyWagesDisburse - 0 : ""
			this.companyOperationInfo.netMargin = this.companyOperationInfo.netMargin ? this.companyOperationInfo.netMargin - 0 : ""
			this.companyOperationInfo.otherAmountDue = this.companyOperationInfo.otherAmountDue ? this.companyOperationInfo.otherAmountDue - 0 : ""
			this.companyOperationInfo.otherAmountReceivable = this.companyOperationInfo.otherAmountReceivable ? this.companyOperationInfo.otherAmountReceivable - 0 : ""
			this.companyOperationInfo.staffAmount =  this.companyOperationInfo.staffAmount ? this.companyOperationInfo.staffAmount - 0 : ""
			this.companyPurchaseInfoRequest.montylyPurchaseMoney = this.companyPurchaseInfoRequest.montylyPurchaseMoney ? this.companyPurchaseInfoRequest.montylyPurchaseMoney - 0 : ""
			this.companySaleRequest.saleSettlementPeriod = this.companySaleRequest.saleSettlementPeriod ? this.companySaleRequest.saleSettlementPeriod - 0 : ""

			if(this.leaseInfo.leaseAddressList.length > 0) {
				[
					this.leaseInfo.leaseAddressProvince,
					this.leaseInfo.leaseAddressCity,
					this.leaseInfo.leaseAddressDistrict
				] = this.leaseInfo.leaseAddressList
			}

			this.data.companyOperationInfo = this.companyOperationInfo
			this.data.companyLeaseInfoList = this.companyLeaseInfoList
			this.data.companyPurchaseInfoRequest = this.companyPurchaseInfoRequest
			this.data.companyAmountDueList = this.companyAmountDueList
			this.data.companyReceiveAdvanceList = this.companyReceiveAdvanceList
			this.data.companyInventoryList = this.companyInventoryList
			this.data.companySaleRequest = this.companySaleRequest
			this.data.companydueReceiveList = this.companydueReceiveList
			this.data.companyPrepanmentList = this.companyPrepanmentList
			},
		saveInfo() {
			this.initData()
			companyController.saveOrUpdateCompanyOperation(this.data).then(res => {
        if (res.status === 200) {
					this.$message.success("保存成功！");
					this.getCompanyOperation(this.companyId)
        }
      });
		},
		cancel() {
			this.$router.back(-1)
		},
    getCompanyOperation(params) {
      this.companyId = params
			companyController.companyOperation(params).then(res => {
        if (res.status === 200) {
					let data = res.data
					if(data.companyOperationInfo) {
						this.companyOperationInfo = {...this.companyOperationInfo, ...data.companyOperationInfo}		// 企业经营信息

						let mainBussinessArr = this.companyOperationInfo.mainBussiness.split(",")
            this.companyOperationInfo.mainBussinessArr = mainBussinessArr.map(val => parseInt(val))
						let businessModelArr = this.companyOperationInfo.businessModel.split(",")
            this.companyOperationInfo.businessModelArr = businessModelArr.map(val => parseInt(val))
					}

					this.companyLeaseInfoList = data.companyLeaseInfoEntityList	// 档口信息列表
					this.companyLeaseInfoList.forEach( v=> {
						v.leaseAddressProvince = v.leaseAddressProvince - 0
						v.leaseAddressCity = v.leaseAddressCity - 0
						v.leaseAddressDistrict = v.leaseAddressDistrict - 0
						v.leaseAddressList = [
							v.leaseAddressProvince, v.leaseAddressCity, v.leaseAddressDistrict
						]
					})
					this.companyAmountDueList.length = 0
					this.companyReceiveAdvanceList.length = 0
					this.companyInventoryList.length = 0
					this.companydueReceiveList.length = 0
					this.companyPrepanmentList.length = 0
					this.companyPurchaseInfoRequest.length = 0
					this.companySaleRequest.length = 0
					data.otherInfoEntityList.forEach(v => {
						if(v.type === 1) {
							this.companyAmountDueList.push(v) 	// 应付信息
						} else if(v.type === 2) {
							this.companyReceiveAdvanceList.push(v) 	// 企业预收信息
						} else if(v.type === 3) {
							this.companyInventoryList.push(v)  	// 企业存货统计
						} else if(v.type === 4) {
							this.companydueReceiveList.push(v)  	// 企业应收
						} else if(v.type === 5) {
							this.companyPrepanmentList.push(v)  	// 预付信息
						} else if(v.type === 6) {
							v.purchaseSettlementMode = v.purchaseSettlementMode ? v.purchaseSettlementMode - 0 : ''
							this.companyPurchaseInfoRequest = v  	// 企业采购信息
						} else if(v.type === 7) {
							v.saleSettlementMode = v.saleSettlementMode ? v.saleSettlementMode - 0 : ''
							v.saleSettlementIntervalUnit = v.saleSettlementIntervalUnit ? v.saleSettlementIntervalUnit - 0 : ''
							this.companySaleRequest = v  	// 企业销售信息
						}
					})
					this.companyInventoryList.forEach(v => {
						v.quantityUnit = v.quantityUnit - 0
					})
					

        }
      });
		},
		change() {
			this.getOtherId()
		},
		getOtherId() {
			this.$dict.findDictData('MainBussiness').forEach(v => {
				if(v.value === '其他') {
					this.otherId = v.id
				}
			})
		}
	},
	created() {
    //FIXME 修改
    this.hasSubmit = this.$route.query.state == 1 ?true : false;
		this.getOtherId()
		if(!this.isDisabled && !this.isCheck) {
			this.companyId = this.$route.query.companyId - 0
			this.leaseInfo.companyId = this.companyId
			this.getCompanyOperation(this.companyId)
		}


	},
	mounted() {
    this.formRef = this.$refs.companyOperationInfo;
  }
};
</script>

<style lang="scss" scoped>
.common-title.management-title {
  border: none;
}
.p-input {
	border:1px solid #dcdfe6;
	border-radius: 4px;
	line-height:40px;
	height:42px;
	padding-left: 16px;
}
.el-checkbox+.el-checkbox {
	margin-left: 22px;
}
</style>
