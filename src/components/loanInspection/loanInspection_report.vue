<template>
  <div class="common-box">
    <div class="common-container pb80">
      <div class="step-style">
        <el-steps :active="active" space="80%" align-center>
          <el-step title="项目选择和确认"></el-step>
          <el-step title="贷后检查基本信息填写"></el-step>
          <el-step title="客户面谈填写"></el-step>
        </el-steps>
      </div>
      <div class="first" v-show = "active === 1"><first ref="firstInfo" @enabled="changeBtn"></first></div>
      <div class="Second" v-show = "active === 2"><second ref="Baseinfo"></second></div>
      <div class="third" v-show = "active === 3"> <third ref="Finalinfo"></third></div>
    </div>
    <div class="common-bottom-btn">
      <el-button type="primary" @click="prev" v-if=" active == 2 || active == 3">上一步</el-button>
      <el-button type="primary" @click="next" v-if="active == 1 || active == 2 " :disabled="disabled">下一步</el-button>
      <el-button type="primary"  v-if="active == 3" @click="submitInfo">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { loanInspectionController } from "./../../controller/common/loanInspection_controller";
import first from './first'
import Second from './second';
import third from './third';

export default {
  components: {Second, first, third},
  data() {
    return {
      active: 1,
      disabled: true,
    };
  },

  methods: {
		changeBtn(data) {
      this.disabled = data
		},
    prev(){
      --this.active
      if (this.active < 1) this.active = 1;
    },
    next() {
      if(this.active === 2 ) {
        this.$refs.Baseinfo.judgeValidate().then(res => {
          if (this.active++ > 3) {
            this.active = 1;
          }
        }).catch((err) => {
          
        })
      } else if( this.active === 1 ) {
        if (this.active++ > 3) {
          this.active = 1;
        }
      }
    },
  // 步骤条的提交
    judgeValidate () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const Baseinfo = this.$refs.Baseinfo
          const Finalinfo = this.$refs.Finalinfo
          const tempObj = {
            orderNo: this.$refs.firstInfo.tableData[0].orderNo,
          }
          const params = {
            qualityBaseinfoRequest: {...Baseinfo.qualityBaseinfoRequest, ...tempObj},
            qualityFinalinfoRequest:{...Finalinfo.qualityFinalinfoRequest, ...tempObj},
          }
              resolve(params)
            })
          })
    },
    //提交
    submitInfo () {
      this.$refs.Finalinfo.judgeValidate().then(res => {
        this.judgeValidate().then(res => {
          loanInspectionController.saveQualityInfo(res).then(res => {
            if (res.status === 200) {
              this.$message.success('提交成功')
              this.$router.go(-1)
            }
          })
        })
      }).catch((err) => {
      })
      
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.pb80 {
	padding-bottom: 80px;
}
.step-style {
  margin-bottom: 20px;
  padding: 30px;
}
</style>
