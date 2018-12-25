const validator = (rule, value, callback) => {
  value.map(val => {
    if (!val) {
      callback('必填项不能为空')
    }
  })
  callback()
}
const validator2 = (rule, value, callback) => {
  if (isNaN((value))) {
    callback('请输入数字')
  }
  if (value.length > 8) {
    callback('数据超过指定长度')
  }
  callback()
}
const rules = {
  requiredInputValue: {required: true, trigger: 'blur', message: '必填项不能为空'},
  requiredSelectValue: {required: true, trigger: 'change', message: '必填项不能为空'},
  requiredInputNumber: [
    { required: true, trigger: 'blur', message: '必填项不能为空' },
    {pattern: /^\d+(\.{0,1}\d+){0,1}$/, message: '数据格式不正确', trigger: 'blur'},
    {validator: validator2, trigger: 'blur'}
  ],
  requiredInputPhone: [
    {pattern: /^((0\d{2,3})-)(\d{7,8})$/, message: '电话格式不正确', trigger: 'blur'}
  ],
  requiredInputFigure: [
    {required: true, trigger: 'blur', message: '必填项不能为空'},
    {pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '请填写正确的数据', trigger: 'blur'}
  ],
  inputFigure: [
    {required: false, trigger: 'blur', message: ''},
    {pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '请填写正确的数据', trigger: 'blur'}
  ],
  requiredCreditCode: [ // 统一信用代码
    {required: true, trigger: 'blur', message: '必填项不能为空'},
    {max: 64, message: '64个字符以内', trigger: 'blur'}
  ],
  requiredFilterValue: [
    {required: true, trigger: 'blur', message: '必填项不能为空'},
    {max: 20, message: '20个字符以内', trigger: 'blur'}
  ],
  requiredInputDate: [{required: true, trigger: 'change', message: '必填项不能为空'}, {
    validator: validator, trigger: 'change'
  }],
  phoneRule: [
    {required: true, trigger: 'blur', message: '请填写手机号'},
    {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, trigger: 'blur', message: '手机号码错误'}
  ],
  phoneNumberRule: [
    {required: false, trigger: 'blur', message: ''},
    {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, trigger: 'blur', message: '手机号码错误'}
  ],
  passwordRule: {required: true, trigger: 'blur', message: '请填写密码'},
  deptRule: {required: true, trigger: 'blur', message: '请选择部门'},
  roleIdRule: {required: true, trigger: 'blur', message: '请选择角色'},
  menuTypeRule: {required: true, trigger: 'blur', message: '请选择菜单类型'},
  parentIdRule: {required: true, trigger: 'blur', message: '请选择父级菜单'},
  realnameRule: [
    {required: true, trigger: 'blur', message: '请填写姓名'},
    {max: 20, message: '20个字符以内', trigger: 'blur'}
  ],
  emailRule: [
    {required: false, trigger: 'blur', message: '请填写邮箱'},
    {type: 'email', message: '邮箱格式错误，请录入正确的邮箱', trigger: 'blur'},
    {max: 100, message: '100个字符以内', trigger: 'blur'}
  ],
  deptRemarkRule: [
    {required: false, trigger: 'blur', message: '请填写备注'},
    {max: 500, message: '500个字符以内', trigger: 'blur'}
  ],
  roleRemarkRule: [
    {required: false, trigger: 'blur', message: '请填写备注'},
    {max: 500, message: '500个字符以内', trigger: 'blur'}
  ],
  menuRemarkRule: [
    {required: false, trigger: 'blur', message: '请填写备注'},
    {max: 500, message: '500个字符以内', trigger: 'blur'}
  ],
  menuNameRule: [
    {required: true, trigger: 'blur', message: '请填菜单名称'},
    {max: 20, message: '20个字符以内', trigger: 'blur'}
  ],
  roleNameRule: [
    {required: true, trigger: 'blur', message: '请填角色名称'},
    {max: 40, message: '40个字符以内', trigger: 'blur'}
  ],
  deptNameRule: [
    {required: true, trigger: 'blur', message: '请填部门名称'},
    {max: 40, message: '40个字符以内', trigger: 'blur'}
  ],
  deptCodeRule: [
    {required: true, trigger: 'blur', message: '请填部门代码'},
    {max: 20, message: '20个字符以内', trigger: 'blur'}
  ],
  merchantContactNameRule: [
    {required: true, trigger: 'blur', message: '请填写对接人'},
    {max: 50, message: '50个字符以内', trigger: 'blur'}
  ],
  merchantShortened: [
    {required: false, trigger: 'blur', message: '请填写商户简称'},
    {max: 50, message: '50个字符以内', trigger: 'blur'}
  ],
  merchantContactQq: [
    {required: false, trigger: 'blur', message: '请填Qq'},
    {max: 50, message: '50个字符以内', trigger: 'blur'}
  ],
  merchantContactWechat: [
    {required: false, trigger: 'blur', message: ''},
    {max: 100, message: '100个字符以内', trigger: 'blur'}
  ],
  merchantUrl: [
    {required: false, trigger: 'blur', message: '请填写商户网址'},
    {max: 300, message: '300个字符以内', trigger: 'blur'}
  ],
  usernameRule: {required: true},
  userTypeRule: {required: true, trigger: 'blur', message: '请选择用户类型'},
  merchantNameRule: [
    {required: true, trigger: 'blur', message: '请填企业名称'},
    {max: 64, message: '64个字符以内', trigger: 'blur'}
  ],
  idCardRule: [
    {required: true, trigger: 'blur', message: '请填写身份证号'},
    {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, trigger: 'blur', message: '身份证号错误'}
  ],
  // { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/, trigger: 'blur', message: '身份证号错误' }
  file: { required: true, message: '请上传图片' }
}
export default rules
