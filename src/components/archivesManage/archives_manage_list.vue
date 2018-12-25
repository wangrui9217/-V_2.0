<template>
	<div class="g-listpage__style">
		<el-tabs tab-position="top">
			<div>
				<div class="action-btn-container space-inner">
					<div class="input-group">
						<el-input class="right search-btn" v-model.trim="parameter.enterpriseName" style="width:320px" placeholder="借款主体名称/身份证/手机号">
							<i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
						</el-input>
					</div>
					<div class="select-style">
						<el-select clearable v-model="parameter.state" placeholder="请选择归档状态" class="value-select" @change="changeState"
							style="margin-right: 20px">
							<el-option value=" " label="全部"></el-option>
							<el-option value="0" label="待归档"></el-option>
							<el-option value="1" label="归档中"></el-option>
							<el-option value="3" label="法务资料已归档"></el-option>
							<el-option value="4" label="风控资料已归档"></el-option>
							<el-option value="2" label="已归档"></el-option>
						</el-select>
						<el-select clearable v-model="parameter.deptName" placeholder="请选择机构名称" class="value-select" @change="changeDept"
							style="margin-right: 20px">
							<el-option
								v-for="item in $dict.getDictData('Depts')"
								:key="item.deptId"
								:label="item.name"
								:value="item.deptId">
								</el-option>
						</el-select>
					</div>
				</div>
				<el-table :data="archiveResponse" border class="g-table"
				row-key="id" ref="table">
					<el-table-column type="index" label="序号" width="60" :index="indexMethod">
					</el-table-column>
					<el-table-column prop="orderNo" label="项目编号"  width="200">
					</el-table-column>
					<el-table-column prop="targetNo" label="项目标号"  width="200">
					</el-table-column>
					<el-table-column prop="memberType" label="借款类型">
						<template slot-scope="scope">
							<span v-text="scope.row.memberType=='0' ? '自然人' : '企业'"></span>
						</template>
					</el-table-column>
					<el-table-column prop="enterpriseName" label="借款主体名称">
					</el-table-column>
					<el-table-column prop="idCard" label="统一信用代码/身份证" width="200">
					</el-table-column>
					<!--<el-table-column prop="memberNo" label="会员号">-->
					<!--</el-table-column>-->
					<el-table-column prop="loanAmount" label="放款金额（万元）">
					</el-table-column>
					<el-table-column prop="" label="档案归档状态">
						<template slot-scope="scope">
							<span v-if="scope.row.state === '2'" v-text="'已归档'"></span>
							<span v-if="scope.row.state === '0'" v-text="'未归档'"></span>
							<span v-if="scope.row.state === '1'" v-text="scope.row.windState === '2' ? '风控资料已归档' : (scope.row.legalState === '2' ? '法务资料已归档' : '归档中')"></span>
						</template>
					</el-table-column>
					<!--<el-table-column prop="salesmanId" label="业务员">-->
					<!--</el-table-column>-->
					<!--<el-table-column prop="salesmanOwnCompany" label="所属机构">-->
					<!--</el-table-column>-->
					<el-table-column prop="" label="资料类型" v-if="isAdminCheck">
						<template slot-scope="scope">
							<span v-text="scope.row.definitionKey === 'yw_tree_two' ? '法务资料' : '风控资料'"></span>
						</template>
					</el-table-column>
					<el-table-column prop="loanTime" label="放款时间" :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd hh:mm')">
					</el-table-column>
					<el-table-column prop="loanTime" label="完成归档时间" :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd hh:mm')" v-if="isAdminCheck">
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<div class="actions">
								<el-button type="text" @click="viewArchives(scope.row)">查看</el-button>
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
			</div>
		</el-tabs>
	</div>
</template>

<script>
import { archivesController } from "@/controller/syd/archives_controller";
export default {
  data() {
    return {
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      total: 0,
      pageSize: 10,
			pageNo: 1,
			parameter: {
				state: '',
				enterpriseName: '',
				deptName: ''
			},
      repaymentType: "",

			archiveResponse: [],
      orderId: this.$route.query.orderId,
      inputName: "",
    };
  },
  methods: {
    // 获取索引
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    searchFn() {
      this.pageNo = 1;
      this.getList();
    },
		changeState(rule) {
      //切换重置
      this.getList()
		},
		changeDept(rule) {
      //切换重置
      this.getList()
    },
    viewArchives(row) {
      const definitionKey = row.definitionKey; // 节点
			const node = row.name; // 节点

			const orderId = row.businessKey
			this.$router.push({
				path: "/sys/archivesDetails",
				query: { orderId }
			});

    },

    getList() {
      archivesController
        .queryArchiveInfoList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: this.parameter
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;

            this.archiveResponse = res.data.data;
            this.total = res.data.count;
          } else {
            this.archiveResponse = [];
            this.total = 0;
          }
        });
		},
  },
  created() {
		this.getList();
  },
  props: {
    isApply: {
			type: Boolean,
			default: false
		},
		isCheck: {
			type: Boolean,
			default: false
		},
		isAdminCheck: {
			type: Boolean,
			default: false
		}
  }
};
</script>

<style lang="scss" scoped>
.g-listpage__style {
  padding-top: 10px;
}
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
.select-style {
	float:right
}
</style>
