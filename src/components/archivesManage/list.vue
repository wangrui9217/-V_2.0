<template>
	<div>
		<el-tabs   v-model="activeName" tab-position="top">
			<el-tab-pane :label="isApply ? '待归档项目' : '待确认归档项目'" name="first">
				<div>
					<div class="action-btn-container space-inner">
						<div class="input-group">
							<el-input class="right search-btn" v-model.trim="enterpriseName" style="width:320px" placeholder="借款主体名称/身份证/手机号">
								<i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
							</el-input>
						</div>
					</div>
					<el-table :data="todoList" border class="g-table"
					row-key="id" ref="table">
						<el-table-column type="index" label="序号" width="60" :index="indexMethod">
						</el-table-column>
						<el-table-column prop="orderNo" label="项目编号">
						</el-table-column>
						<el-table-column prop="targetNo" label="项目标号">
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
						<el-table-column prop="memberNo" label="会员号">
						</el-table-column>
						<el-table-column prop="loanAmount" label="放款金额（万元）">
						</el-table-column>
						<el-table-column prop="" label="资料类型" v-if="isAdminCheck">
							<template slot-scope="scope">
								<span v-text="scope.row.definitionKey === 'yw_tree_two' ? '法务资料' : '风控资料'"></span>
							</template>
						</el-table-column>
						<el-table-column prop="loanTime" label="放款时间" width="180" :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd hh:mm')">
						</el-table-column>
						<el-table-column prop="archiveApplyTime" label="归档申请时间" width="180" :formatter="(row) => $formatDate(row.archiveApplyTime, 'yyyy-MM-dd hh:mm')" v-if="isAdminCheck">
						</el-table-column>
						<el-table-column label="操作" width="100">
							<template slot-scope="scope">
								<div class="actions">
									<el-button type="text" @click="handleArchives(scope.row)">归档处理</el-button>
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
			</el-tab-pane>
			<el-tab-pane :label="isApply ? '已归档项目' : '已确认归档项目'" name="second">
				<div>
					<div class="action-btn-container space-inner">
						<div class="input-group">
							<el-input class="right search-btn" v-model.trim="enterpriseName" style="width:320px" placeholder="借款主体名称/身份证/手机号">
								<i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
							</el-input>
						</div>
					</div>
					<el-table :data="alreadyList" border class="g-table" ref="table">
						<el-table-column type="index" label="序号" width="60" :index="indexMethod">
						</el-table-column>
						<el-table-column prop="orderNo" label="项目编号" width="200">
						</el-table-column>
						<el-table-column prop="memberType" label="借款类型">
							<template slot-scope="scope">
								<span v-text="scope.row.memberType=='0' ? '自然人' : '企业'"></span>
							</template>
						</el-table-column>
						<el-table-column prop="enterpriseName" label="借款主体名称">
						</el-table-column>
						<el-table-column prop="idCard" label="统一信用代码\身份证" width="200">
						</el-table-column>

						<el-table-column prop="loanAmount" label="放款金额">
						</el-table-column>
						<el-table-column prop="" label="资料类型">
							<template slot-scope="scope">
								<span v-text="scope.row.definitionKey === 'yw_tree_two' ? '法务资料' : '风控资料'"></span>
							</template>
						</el-table-column>
						<el-table-column prop="state" label="归档状态">
							<template slot-scope="scope">
								<span v-text="scope.row.scope === '0' ? '归档中' : '已归档'"></span>
							</template>
						</el-table-column>
						<el-table-column prop="loanTime" label="放款时间" width="180" :formatter="(row) => $formatDate(row.loanTime, 'yyyy-MM-dd hh:mm')">
						</el-table-column>
						<el-table-column prop="archiveApplyTime" label="归档申请时间" width="180" :formatter="(row) => $formatDate(row.archiveApplyTime, 'yyyy-MM-dd hh:mm')">
						</el-table-column>
						<el-table-column label="操作" width="60">
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
			</el-tab-pane>
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
      activeName: "first",
      repaymentType: "",

			todoList: [],
			alreadyList: [],
      enterpriseName: "",
    };
  },
  methods: {
    // 获取索引
    indexMethod(index) {
      return this.listIndex_pageSize * (this.listIndex_pageNo - 1) + index + 1;
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getTodoList();
    },
    pageNoChange(pageNo) {
      this.pageNo = pageNo;
      this.getTodoList();
    },
    searchFn() {
      this.pageNo = 1;
      this.getTodoList();
    },

    handleArchives(row) {
      const definitionKey = row.definitionKey; // 节点
			const node = row.name; // 节点
			const orderId = row.businessKey
			if(this.isApply) {
				this.$router.push({
					path: "/sys/archivesApply/apply",
					query: { definitionKey, node, orderId }
				});
			} else if(this.isCheck) {
				this.$router.push({
					path: "/sys/archivesCheck/check",
					query: { definitionKey, node, orderId }
				});
			} else if(this.isAdminCheck) {
				this.$router.push({
					path: "/sys/archivesAdminCheck/check",
					query: { definitionKey, node, orderId }
				});
			}

    },
    viewArchives(row) {
			const orderId = row.businessKey
			this.$router.push({
				path: "/sys/archivesDetails",query: { orderId }
			});
		},

    getTodoList() {
      archivesController
        .todoList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: {
            enterpriseName: this.enterpriseName,
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;

						this.todoList = res.data.data;
            this.total = res.data.count;
          } else {
            this.todoList = [];
            this.total = 0;
          }
        });
		},
		getAlreadyList() {
			archivesController
        .already({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: {
            enterpriseName: this.enterpriseName,
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.listIndex_pageSize = this.pageSize;
            this.listIndex_pageNo = this.pageNo;

            this.alreadyList = res.data.data;
            this.total = res.data.count;
          } else {
            this.alreadyList = [];
            this.total = 0;
          }
        });
		},
  },
  created() {
		this.getTodoList();
		this.getAlreadyList()
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
// .list-type {
// 	float: right;
// 	margin-right: 14px;
// }
</style>
