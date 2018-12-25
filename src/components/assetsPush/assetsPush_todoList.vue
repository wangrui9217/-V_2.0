<template>
	<div>
		<div class="action-btn-container space-inner">
			<div class="input-group">
				<el-input class="right search-btn" v-model.trim="parameter.enterpriseName" style="width:220px;margin-right:16px;" placeholder="借款主体名称">
					<i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
				</el-input>
				<el-input class="right search-btn" v-model.trim="parameter.codeCard" style="width:220px" placeholder="统一信用代码/身份证">
					<i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
				</el-input>
			</div>
			<div class="list-type">
				<el-radio-group v-model="parameter.orderStatus" @change="searchFn">
					<el-radio-button :label=null>全部</el-radio-button>
					<el-radio-button label="examination_passed">待推送</el-radio-button>
					<el-radio-button label="push_faild">推送失败</el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<el-table :data="todoList" border class="g-table" ref="todoList_table">
			<el-table-column type="index" label="序号" width="60" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="orderNo" label="项目编号" width="200">
			</el-table-column>
			<el-table-column prop="enterpriseName" label="借款主体名称">
			</el-table-column>
			<el-table-column prop="codeCard" label="统一信用代码/身份证" width="200">
			</el-table-column>
			<el-table-column prop="projectAmount" label="授信金额（万元）">
			</el-table-column>
			<el-table-column prop="projectTerm" label="授信期限">
				<template slot-scope="scope">
					<span v-text="scope.row.projectTerm"></span>
					<span v-text="$dict.findDictionaryName(scope.row.projectTermUnit)"></span>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="还款方式">
			</el-table-column>
			<el-table-column prop="assetPushStatus" label="募集状态">
			</el-table-column>
			<el-table-column prop="checkPassTime" label="审批时间" :formatter="(row) => $formatDate(row.checkPassTime, 'yyyy-MM-dd hh:mm')">
			</el-table-column>
			<el-table-column prop="submitApplyTime" label="申请时间" :formatter="(row) => $formatDate(row.submitApplyTime, 'yyyy-MM-dd hh:mm')">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<div class="actions">
						<el-button type="text" @click="handle(scope.row)">处理</el-button>
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
</template>

<script>
import { assetsPushController } from "@/controller/syd/assetsPush_controller";
export default {
  data() {
    return {
      listIndex_pageSize: 1, //数据列表使用的 pageNum
      listIndex_pageNo: 1, //数据列表使用的 pageNo
      total: 0,
      pageSize: 10,
      pageNo: 1,
			parameter: {
				orderStatus: null,
				enterpriseName: "",
				codeCard: ""
			},
			todoList: [],
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
    handle(row) {
			let id = row.businessKey
			this.$router.push({path: '/sys/assetsPush/supplement', query: {id}})
    },
    getTodoList() {
      assetsPushController
        .todoList({
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
          parameter: this.parameter
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
		chooseType() {
			this.pageNo = 1;
			this.getTodoList()
    },
  },
  created() {
		this.getTodoList();
  },
  props: {}
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

</style>
