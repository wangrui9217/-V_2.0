<template>
  <div>
    <el-dialog
      width="800px"
      :visible.sync="innerVisible"
      append-to-body>
      <ul class="btn-box">
        <li v-for="(item, index) in icons" :key="index">
          <i :class="item" @click="choseIcon(item)" :title="item"></i>
          <!--<el-tooltip :content="item" placement="top">-->
            <!--<i :class="item" @click="choseIcon(item)"></i>-->
          <!--</el-tooltip>-->
        </li>
      </ul>
    </el-dialog>
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name"  :rules='$rules.requiredInputValue'>
        <el-input  v-model="ruleForm2.name" ></el-input>
      </el-form-item>
      <el-form-item label="代号" prop="code">
        <el-input  v-model="ruleForm2.code" ></el-input>
      </el-form-item>
      <!--<el-form-item label="部门图标" prop="icon">-->
        <!--<div class="group">-->
          <!--<el-input  v-model="ruleForm2.icon" disabled></el-input>-->
          <!--<el-button @click="choseLogo">选择图标</el-button>-->
        <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input  v-model="ruleForm2.remark" type="textarea"
                   :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { deptController } from "@/controller/common/dept_controller";
    import icons from './../../util/icons'
    export default {
      data () {
        return {
          icons: icons,
          innerVisible: false,
          ruleForm2: {
            name: '',
            deptId: '',
            code: '',
            remark: '',
            parentId: '',
            icon: ''
          }
        }
      },
      props: {
      },
      methods: {
        choseLogo () {
          this.innerVisible = true
        },
        choseIcon (icon) {
          this.innerVisible = false
          this.ruleForm2.icon = icon
        },
        editInit (obj) {
          console.log(obj, 'edit')
          this.ruleForm2 = {...this.ruleForm2, ...obj}
          this.$nextTick(() => {
            this.$refs['ruleForm2'].clearValidate()
          })
        },
        addInit (obj) {
          console.log(obj, 'add')
          this.ruleForm2 = {
            name: '',
            deptId: '',
            code: '',
            remark: '',
            parentId: obj.deptId,
            icon: ''
          }
          this.$refs['ruleForm2'].resetFields()
        },
        submitForm (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addCar()
            } else {
              return false
            }
          })
        },
        dataFormat () {
        },
        addCar () {
          if (this.ruleForm2.deptId) {
            deptController.update(this.ruleForm2).then(res => {
              if (res.status === 200) {
                this.$message.success('编辑成功')
                this.$nextTick(() => { this.$emit('close') })
              }
            })
          } else {
            deptController.save(this.ruleForm2).then(res => {
              if (res.status === 200) {
                this.$message.success('新增成功')
                this.$nextTick(() => { this.$emit('close') })
              }
            })
          }
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
          this.$emit('cancel')
        }
      }
    }
</script>

<style lang="scss" scoped>
.group{
  display: flex;
}
.btn-box{
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  &>li{
    cursor: pointer;
    margin: 0 10px;
  }
  &>li:hover{
    transition: 0.5s;
    transform: scale(1.5);
  }
}
</style>
