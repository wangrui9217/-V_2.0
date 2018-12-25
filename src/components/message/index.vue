<template>
  <div v-loading.fullscreen="loading" class="g-listpage__style" style="width:100%">
      <div class="input-group"  >
        <el-input class="right search-btn" v-model.trim="searchForm.inputs"  placeholder="请输入站内信内容">
          <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
        </el-input>
      </div>
    <el-table :data="tableData" border class="g-table"
              @selection-change="handleSelectionChange"
              ref="table">
      <el-table-column type="selection" width="37" :reserve-selection="true">
      </el-table-column>
      <el-table-column type="index" label="编号" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="400">
      </el-table-column>
      <el-table-column prop="status" label="已读状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state === '0'">未读</span>
          <span v-if="scope.row.state === '1'">已读</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="发送时间" :formatter="(row) => $formatDate(row.updateTime, 'yyyy-MM-dd hh:mm:ss')">
      </el-table-column>
      <el-table-column prop="remark" label="备注字段">
      </el-table-column>
      <el-table-column prop="roleName" label="操作">
        <template slot-scope="scope">
          <div class="actions">
            <el-button @click="openEditbox(scope.row)" type="text">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:middle"
      @size-change="searchFn"
      @current-change="searchFn"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper,total, sizes"
      :total="total">
    </el-pagination>
    <el-dialog title="站内信详情" @close="dialog.applyFlow = false" :visible.sync="dialog.applyFlow" :close-on-click-modal="false" class="message-box">
      <common-box :data="detail"></common-box>
    </el-dialog>
    </div>
</template>

<script>
  import { messageController } from '@/controller/common/message_controller'
  export default {
    name: 'messageList',
    data () {
      return {
        selectList: [],
        pageNo: 1,
        pageSize: 10,
        total: null,
        dialog: {
          applyFlow: false
        },
        loading: false,
        searchForm: {
          'inputs': ''
        },
        tableData: [],
        detail: []
      }
    },
    mounted () {
      this.searchFn()
    },
    methods: {
      handleSelectionChange (val) {
        this.selectList = val
      },
      searchFn () {
        let params = {
          'pageIndex': this.pageNo,
          'pageSize': this.pageSize,
          'parameter': {
            'content': this.searchForm.inputs
          }
        }
        messageController.getMessageList(params).then(res => {
          this.tableData = res.data.data
          this.total = res.count
        })
      },
      indexMethod (index) {
        return this.pageSize * (this.pageNo - 1) + index + 1
      },
      // 阅读信息
      readMessage (id) {
        let params = id
        return new Promise(resolve => {
          messageController.readMessage(params).then(res => {
            resolve()
          })
        })
      },
      openEditbox (val) {
        this.readMessage(val.id).then(res => {
          this.dialog.applyFlow = true
          this.detail = [{label: '标题：', value: val.title, span: 24}, {label: '内容：', value: val.content, span: 24}, {
            label: '发送时间：', value: this.$formatDate(val.updateTime, 'yyyy-MM-dd hh:mm:ss'), span: 24}]
          this.searchFn()
          this.$store.dispatch('getCountUnread')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
  .message-box {
    .el-dialog__body{
      padding: 0;
      padding-bottom: 20px;
    }
  }
</style>
