<template>
	<div>
    <el-form label-position='left'>
      <p class='common-title management-title'>业务网点信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户经理名称:">
            <span >陈淸玉</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式:">
            <span >1523123456789</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属网点:">
            <span >上海</span>
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>基础资料</p>
      <span style="padding-left: 48px">分类 : 自然人</span>
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身份证地址:" size="small">
            <el-input class="input__pos"  >身份证上原户籍详细地址</el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现居住地址:" size="small">
            <el-input class="input__pos"  >现实际居住详细地址</el-input>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="性别:" size="small">
            <el-input class="input__pos"  >现实际居住详细地址</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="年龄:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最高学历:" size="small">
            <el-select v-model="Education.value" placeholder="请选择" size="small" style="width: 200px">
              <el-option
                v-for="item in Education"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚姻状况:" size="small">
            <el-select v-model="Marriage.value" placeholder="请选择" size="small" style="width: 200px">
              <el-option
                v-for="item in Marriage"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
         <el-col :span="8">
          <el-form-item label="备注:" size="small">
            <el-input  type="textarea" placeholder="请输入内容"  :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label=" 自然人：企业名称全称" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码号码 " size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <span style="padding-left: 48px"> 分类:企业</span>
      <el-row>
        <el-col :span="8">
          <el-form-item label="成立时间:" size="small">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="注册资本:" size="small">
              <el-input class="input__pos" placeholder="请输入内容" >
                <template slot="append" >万</template>
              </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业注册资本:" size="small">
            <el-input class="input__pos" placeholder="请输入内容" >
              <template slot="append" >万</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业实缴资本:" size="small">
            <el-input class="input__pos" placeholder="请输入内容" >
              <template slot="append" >万</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主体注册地址:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主体现地址:" size="small">
            <el-input class="input__pos"  ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注:" size="small">
            <el-input  type="textarea" placeholder="请输入内容"  :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>项目信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品类型: " size="small">
            <el-select v-model="project.value" placeholder="请选择" size="small" style="width: 200px">
              <el-option
                v-for="item in project"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款金额:" size="small">
            <el-input class="input__pos" placeholder="请输入内容" >
              <template slot="append" >元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行费率%:" size="small">
            <el-input class="input__pos" type="number" ></el-input>
            <el-select  v-model="Company.value " placeholder='请选择' class="input__" >
              <el-option
               v-for="item in Company"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="借款期限:" size="small">
            <el-input class="input__pos" type="number" ></el-input>
            <el-select  v-model="LoanUnit.value" placeholder='请选择' class="input__" >
              <el-option
                v-for="item in LoanUnit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="费用方案:" >
            <el-radio v-model="radio" label="1">默认方案</el-radio>
            <el-radio v-model="radio" label="2">技术服务费方案</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款用途:" size="small">
            <el-select  placeholder='请选择' v-model="purpose.value" >
              <el-option
                v-for="item in purpose"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="还款方式:" size="small">
            <el-select  placeholder='请选择'  v-model="LendingMethod.value">
              <el-option
                v-for="item in LendingMethod"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最短收息期:" size="small">
            <el-input class="input__pos" type="number" ></el-input>
            <el-select  placeholder='请选择' class="input__"  v-model="minimum.value">
              <el-option
                v-for="item in opt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="费用收取方式:" size="small">
            <el-select  placeholder='请选择' v-model="Collect.value">
              <el-option
                v-for="item in Collect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="放款手续费%:" size="small">
            <el-input class="input__pos" placeholder="请输入内容" >
              <template slot="append" >%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款总费用:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="还款保障措施:">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="第三方担保 "></el-checkbox>
              <el-checkbox label="账户监管"></el-checkbox>
              <el-checkbox label="家庭成员连带责任担保"></el-checkbox>
            </el-checkbox-group>

          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>线上借款信息-基础信息</p>
      <span>自然人</span>
      <el-row>
        <el-col :span="8">
          <el-form-item label="借款人说明:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款人收入/负债情况:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作性质:" size="small">
            <el-select  placeholder='请选择' >
              <el-option
                v-for="item in opt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作性质:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <span>企业</span>
      <el-row>
        <el-col :span="8">
          <el-form-item label="借款人说明:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借款人收入/负债情况:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属行业:" size="small">
            <el-select  placeholder='请选择' >
              <el-option
                v-for="item in opt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="还款来源:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人信用信息:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营区域:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="股东信息:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>线上借款信息-详细信息</p>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="产品类型:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small" style="width: 200px">
              <el-option
                v-for="item in opt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="担保机构信息:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="担保机构信息:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in optionvalue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="8">
          <el-form-item label="主营业务:" size="small">
            <el-input   class="input__pos" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="从业年限:" size="small">
            <el-input  class="input__pos"  placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营概况:" size="small">
            <el-input   class="input__pos" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>线上借款信息-征信信息</p>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="近六个月逾期金额（元）:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="近六个月逾期笔数（笔）:" size="small">
            <el-input  placeholder="请输入内容" class="input__pos"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他平台借款情况:" size="small">
            <el-input  type="textarea" placeholder="请输入内容" class="input__pos" :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>线上借款信息-联合担保信息</p>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="自然人担保信息:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="担保机构信息:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭成员个人担保信息:" size="small">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in optionvalue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p class='common-title management-title'>影像信息</p>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="标题">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in optionvalue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-col>
      </el-row>
      <p class='common-title management-title'>其他信息</p>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="借款合同其他条约:">
            <el-input  type="textarea" placeholder="请输入内容"  :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
	</div>
</template>

<script>

export default {

  data() {
    return {
      value1: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogImageUrl: '',
      dialogVisible: false,
      radio: '1',
      value: '',
      options: [{value: "担保方名称", lable: "1"}, {value: "担保类型", lable: "2"}, {value: "与申请人关系", lable: "3"}],
      option: [{value: "担保方名称", lable: "1"}, {value: "担保类型", lable: "2"}, {value: "与申请人关系", lable: "3"}],
      optionvalue: [{value: "担保方名称", lable: "1"}, {value: "担保类型", lable: "2"}, {value: "与申请人关系", lable: "3"}],
      opt: [{value: "农户贷", lable: "1"}, {value: "兴隆贷", lable: "2"}, {value: "货押贷", lable: "2"}],
      Education:[{value: "初中", lable: "1"}, {value: "高中", lable: "2"}, {value: "大专", lable: "3"},{value: "本科", lable: "4"},{value: "研究生", lable: "5"}],
      Marriage:[{value: "未婚", lable: "1"}, {value: "已婚", lable: "2"}],
      project:[{value: "产品A", lable: "1"},{value: "产品B", lable: "2"}],
      Company:[{value: "周", lable: "1"},{value: "天", lable: "2"},{value: "季", lable: "3"},{value: "年", lable: "4"}],
      LoanUnit:[{value: "周", lable: "1"},{value: "天", lable: "2"},{value: "季", lable: "3"},{value: "年", lable: "4"}],
      purpose:[{value: "买车", lable: "1"},{value: "买房", lable: "2"},{value: "开公司", lable: "3"}],
      LendingMethod:[{value: "一次性还本付息", lable: "1"},{value: "按期等额本金", lable: "2"},{value: "按期付息到期还本", lable: "3"}],
      minimum:[{value: "日", lable: "1"},{value: "月", lable: "2"},{value: "季", lable: "3"},{value: "年", lable: "4"}],
      Collect:[],

      checkList: [],
    }
  },
	methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }

  },
	mounted() {}
};
</script>

<style lang="scss" scoped>
.common-title.management-title {
  border: none;
}
.el-row{
  padding-left: 70px;
}
.input__{
  width: 100px;
}
p{
  padding-left: 24px;
}

.p-input {
	border:1px solid #dcdfe6;
	border-radius: 4px;
	line-height:40px;
	height:42px;
	padding-left: 16px;
}
.el-checkbox+.el-checkbox {
	margin-left: 22px;
}
.input__pos{
  width: 200px;
}
.el-form-item__label{
  width: 200px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
