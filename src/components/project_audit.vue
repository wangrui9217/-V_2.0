<template>
  <div>
    <!--<p>{{$dict.getDictData('Roles')}}</p>-->
    <p class="common-title">借款基本信息</p>
    <common-box :data="detail"></common-box>
    <p class="common-title">贷款方案</p>
    <common-box :data="detail2"></common-box>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借款人信息" name="first">
        <borrower-information></borrower-information>
      </el-tab-pane>
      <el-tab-pane label="企业信息" name="second">
        <enterprise-information></enterprise-information>
      </el-tab-pane>
      <el-tab-pane label="担保信息" name="third">
        <guarantee-information></guarantee-information>
      </el-tab-pane>
      <el-tab-pane label="项目资料" name="fourth">项目资料</el-tab-pane>
      <el-tab-pane label="审批历史" name="fifth">
        <approval-history></approval-history>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import borrowerInformation from './borrower_information'
  import enterpriseInformation from './enterprise_information'
  import approvalHistory from './approval_history'
  import guaranteeInformation from './guarantee_information'
export default {
    components: {
      borrowerInformation,
      enterpriseInformation,
      approvalHistory,
      guaranteeInformation
    },
    data () {
      return {
        detail: [{label: '公司名称', value: '五河鑫成生态养殖有限公司'}, {label: '社会统一代码', value: '91340322MA2T3WKAX'}, {}, {label: '法人姓名', value: '张三'}, {
          label: '身份证', value: '310256199201020345'}, {label: '法人手机号码', value: '13186532523'}, {label: '借款人姓名', value: '张三'}, {
            label: '身份证', value: '310256199201020345'}, {label: '手机号码', value: '13186532523', important: true}],
        detail2: [{label: '贷款金额', value: '五河鑫成生态养殖有限公司'}, {label: '期限', value: '91340322MA2T3WKAX'}, {label: '最短收息期', value: '张三'}, {
          label: '还款方式', value: '310256199201020345'}, {label: '费用方案', value: '13186532523'}, {label: '费率', value: '张三'}, {
            label: '担保方式', value: '310256199201020345'}, {label: '贷款用途', value: '13186532523', important: true}],
        activeName: 'first'
      }
    },
    computed: {
      state () {
        return this.$store.state
      }
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
      },
    }
}
</script>

<style lang="scss" scoped>
</style>
