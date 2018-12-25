<template>
  <div>
    <div class="tab-container" @click="handleClick">
      <div :class="{'active': activeName === 'first'}" name="first" >第一步：企业基本信息完善</div>
      <div :class="{'active': activeName === 'second'}" name="second">第二步：企业采购存货信息完善</div>
      <div :class="{'active': activeName === 'third'}" name="third">第三步：企业银行流水信息完善</div>
    </div>
    <div v-if="activeName === 'first'">
      <p class="common-title">企业基本信息</p>
      <common-box :data="detail"></common-box>
    </div>
    <div v-else-if="activeName === 'second'">
      <p class="common-title">企业经营信息</p>
      <common-box :data="detail"></common-box>
      <p class="common-title">企业存货统计</p>
      <p class="common-title">企业应收账款统计</p>
    </div>
    <div v-else-if="activeName === 'third'">
      <p class="common-title">银行流水录入</p>
      <p class="common-title">银行流水与经营收入匹配</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      activeName2: 'first',
      activeName3: 'first',
      detail: [{label: '公司名称', value: '五河鑫成生态养殖有限公司'}, {label: '社会统一代码', value: '91340322MA2T3WKAX'}, {}, {label: '法人姓名', value: '张三'}, {
        label: '身份证', value: '310256199201020345'}, {label: '法人手机号码', value: '13186532523'}, {label: '借款人姓名', value: '张三'}, {
          label: '身份证', value: '310256199201020345'}, {label: '手机号码', value: '13186532523', important: true}]
    }
  },
  methods: {
    handleClick (e) {
      this.activeName = e.target.attributes.name.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-container{
    display: flex;
    justify-content: center;
    &>div{
      margin: 0 10px;
      background-color: #dde4ea;
      cursor: pointer;
      display: flex;
      width: 220px;
      height: 40px;
      justify-content: center;
      align-items: center;
    }
    .active{
      background-color: #199ed8;
      color: #fff;
    }
  }

</style>
