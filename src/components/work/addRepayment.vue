<template>
  <div class="line">
    <el-table
      :data="tableData3"
      border
      class="g-table"
      style="width: 100%">
      <el-table-column
        prop="terms"
        :formatter="(row) => `第${row.terms}期`"
        label="还款期次"
      >
      </el-table-column>
      <el-table-column
        prop="amount"
        label="还款金额(万元)"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="还款时长"
        :formatter="(row) => row.terms === 1 ? '放款后次日' : row.duration + $dict.findDictionaryName(row.durationUnit)"
      >
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="loanApply(scope.row)">编辑</el-button>
          <el-button type="text" @click="removeRow(scope.row, scope.$index)" :disabled="scope.$index !== tableData3.length - 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="common-button" @click="addRow"><i class="el-icon-plus"/>新增一行</el-button>
    <el-dialog title="新增/编辑还款期次" @close="dialog.addCar = false" :visible.sync="dialog.addCar" :close-on-click-modal="false" width="633px" append-to-body>
      <add-car @close="carClose" @cancel="dialog.addCar = false" ref="addCar"></add-car>
    </el-dialog>
  </div>
</template>

<script>
  import addCar from './add_payment'
  import {orderController} from '@/controller/common/order_controller'
  export default {
    components: {addCar},
    data () {
      return {
        tableData3: [],
        dialog: {
          addCar: false
        },
      }
    },
    methods: {
      initState (array) {
        this.tableData3 = [...array]
      },
      carClose () {
        this.dialog.addCar = false
        this.$emit('refresh')
      },
      removeRow (row, index) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (index !== this.tableData3.length - 1) {
            this.$message.info('只能删除最后一条数据')
            return
          }
          const id = row.id
          orderController.deleteServiceFee({id}).then(res => {
            this.$message.success('删除成功')
            this.$emit('refresh')
          })
        }).catch(() => {})
      },
      loanApply (row) {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.editInit(row)
        })
      },
      addRow () {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.addInit(this.tableData3.length)
        })
      },
    },
    props: {
    },
    mounted () {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .line{
    width: 100%;
  }
</style>
