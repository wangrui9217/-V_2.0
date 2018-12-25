<template>
  <div>
    <div class="tab-container" @click="handleClick">
      <div :class="{'active': activeName === 'first'}" name="first" >借款人信息完善</div>
      <div :class="{'active': activeName === 'second'}" name="second">借款人资产信息</div>
      <div :class="{'active': activeName === 'third'}" name="third">借款人负债完善</div>
    </div>
    <div v-if="activeName === 'first'">
      <p class="common-title">借款人基本情况</p>
      <common-box :data="detail"></common-box>
      <p class="common-title">申请人配偶情况</p>
      <common-box :data="detail"></common-box>
    </div>
    <div v-else-if="activeName === 'second'">
      <p class="common-title">借款人资产情况</p>
      <el-tabs v-model="activeName2" @tab-click="handleClick">
        <el-tab-pane label="房产信息" name="first">
          <p>是否有房：有房</p>
          <common-box :data="detail"></common-box>
        </el-tab-pane>
        <el-tab-pane label="车辆信息" name="second">
          <p>是否有车：有车</p>
          <common-box :data="detail"></common-box>
        </el-tab-pane>
        <el-tab-pane label="其他资产" name="third">
          <common-box :data="detail"></common-box>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else-if="activeName === 'third'">
      <el-tabs v-model="activeName3" @tab-click="handleClick">
        <el-tab-pane label="借款信息" name="first">
          <common-box :data="detail"></common-box>
        </el-tab-pane>
        <el-tab-pane label="信用卡信息" name="second">
          <common-box :data="detail"></common-box>
        </el-tab-pane>
        <el-tab-pane label="征信资信息" name="third">
          <common-box :data="detail"></common-box>
        </el-tab-pane>
        <el-tab-pane label="续贷信息" name="forth">
          <common-box :data="detail"></common-box>
        </el-tab-pane>
      </el-tabs>
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
      width: 200px;
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
