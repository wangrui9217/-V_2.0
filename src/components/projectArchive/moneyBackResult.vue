<template>
  <div>
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
      <el-form-item label="审核结果" prop="state" class="in-line" :rules='$rules.requiredInputValue'>
        <el-radio-group v-model="ruleForm2.state">
          <el-radio label="1">同意垫付</el-radio>
          <el-radio label="2">垫付驳回</el-radio>
          <!--<el-radio label="REFUSE" v-if="stopShow">终止</el-radio>-->
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template v-if="ruleForm2.state === '1'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见"  class="in-line">
          <el-input  v-model="pass.reviewOpinion" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>

    </template>
    <template v-if="ruleForm2.state === '2'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见" class="in-line">
          <el-input  v-model="back.reviewOpinion" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="ruleForm2.state === 'REFUSE'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见" class="in-line">
          <el-input  v-model="refuse.reviewOpinion" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <div class="pl">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
  import { planController } from "./../../controller/common/plan_controller";
  export default {
    data () {
      return {
        pass: {
          reviewOpinion: ''
        },
        back: {
          reviewOpinion: ''
        },
        refuse: {
          reviewOpinion: ''
        },
        ruleForm2: {
          id: this.id,
          reviewOpinion: '',
          state: '1'
        }
      }
    },
    methods: {
      submitForm () {
        let params = {}
        if (this.ruleForm2.state === '1') {
          params = {...this.ruleForm2, ...this.pass}
        }
        if (this.ruleForm2.state === '2') {
          params = {...this.ruleForm2, ...this.back}
        }
        console.log(params)
        planController.confirmPlanOrder(params).then(res => {
          if (res.status === 200) {
            this.$message.success('提交成功')
            this.$emit('cancel')
            this.$router.go(-1)
          }
        })
      },
      getState (id) {
      },
      initState () {
      },
      clearValidate () {
        this.$nextTick(() => {
          this.$refs['ruleForm2'].clearValidate()
        })
      }
    },
    props: {
      id: {
      }
    },
    mounted () {
    },
    components: {},
    filters: {},
    computed: {
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  .box{
    display: flex;
    .el-input + .el-select{
      margin-left: 10px;
    }
    .el-select + .el-input{
      margin-left: 10px;
    }
  }
  .demo-ruleForm{
    display: flex;
    flex-wrap: wrap;
    .in-line{
      width: 100%;
    }
    &>div{
      width: 50%;
    }
  }
  .pl{
    padding-left: 140px;
  }
</style>
