<template>
  <el-row class="main-content" type="flex" justify="center" align="middle">
    <el-row :gutter="20" type="flex" justify="center" align="middle" class="login-box">
      <el-col :span="24">
        <p class="g-logo">企业金融管理平台</p>
        <!-- <p class="g-logo"><img src="../../assets/zhiwang.png">北海国际仲裁院</p> -->
        <el-card>
          <p class="logo-center">欢迎登录</p>
          <el-form :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <el-input v-model.trim="loginForm.username" placeholder="用户名">
                <i slot="prefix" class="fa fa-user-o login_icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password" v-model="loginForm.pwd" auto-complete="off" placeholder="密码">
                <i slot="prefix" class="fa fa-lock fa-lg login_icon"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-input v-model.trim="loginForm.verificationCode" @keydown.enter.native="submitForm()" auto-complete="off" placeholder="验证码">
                <i slot="prefix" class="fa fa-unlock-alt fa-lg login_icon2 login_icon"></i>
                <template slot="append">
                  <img :src="captchaUrl" class="codeImg" v-if="captchaUrl" alt="图形验证码" @click="refreshCode()">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="remember">
              <el-row>
                <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
              </el-row>
              <el-row>
                <el-col align="middle">
                  <el-button type="primary" size="medium" :class={loginbtn:true} :loading="buttonLoading" @click="submitForm()" class="form-button">登录</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import { loginController } from "@/controller/common/login_controller";
import { menuController } from "@/controller/common/menu_controller";
import util from "@/util/util";
export default {
  data() {
    return {
      imgAuthCodeToken: util.uuidfn(),
      loginForm: {
        username: "",
        pwd: "",
        verificationCode: "",
        remember: true
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      buttonLoading: false,
      captchaUrl: "",
      uuid: ""
    };
  },
  created() {
    this.refreshCode();
  },
  methods: {
    refreshCode() {
      this.imgAuthCodeToken =  util.uuidfn()
      this.captchaUrl = loginController.imgAuthCode() + "?imgAuthCodeToken=" + this.imgAuthCodeToken;
    },
    submitForm() {
      //   var publicKey = this.PublicKey;
      //   this.$JSEncrypt.setPublicKey(publicKey);
      //   var loginForm_pwd = this.$JSEncrypt.encrypt(this.loginForm.pwd)
      if (this.loginForm.username == "") {
        this.$message.error("请填写用户名");
      } else if (this.loginForm.pwd == "") {
        this.$message.error("请填写密码");
      } else if (this.loginForm.verificationCode == "") {
        this.$message.error("请填写验证码");
      } else {
        this.buttonLoading = true;
        loginController.login({
            username: this.loginForm.username,
            password: this.loginForm.pwd,
            imgAuthCodeToken: this.imgAuthCodeToken,
            imgAuthCode: this.loginForm.verificationCode
          }).then(res => {
            this.buttonLoading = false;
            if (res.status === 200) {
               if (res.data.code === '500') {
                  this.$message.error(res.data.errorMsg);
                  return;
               }
              //登录成功
              localStorage.setItem("sysUser", JSON.stringify(res.data.sysUser));
              localStorage.setItem("userAccessToken", res.data.token);
              this.savePwd()
              this.$router.push({
                path: "sys/work/work"
              });
              // api.userInfo().then(res => {
              //   localStorage.setItem("adminMobile", res.data.user.mobile);
              //   localStorage.setItem("adminName", res.data.user.username);
              //   localStorage.setItem("organizationId", res.data.user.organizationId);
              //   localStorage.setItem("recentLoginTime", res.data.user.recentLoginTime);
              //   localStorage.setItem("realname", res.data.user.realname);
              //   this.$router.push({
              //     path: "admin/home"
              //   });
              // });
            } else {
              this.buttonLoading = true;
              this.refreshCode();
              // this.$message.error(res.data.msg);
            }
          });
      }
    },
    // 保存帐号到cookie，有效期XX天
    setCookie (name, value, day) {
      var date = new Date()
      date.setDate(date.getDate() + day)
      document.cookie = name + '=' + value + ';expires=' + date
    },
    // 获取cookie
    getCookie (name) {
      const reg = RegExp(name + '=([^;]+)')
      const arr = document.cookie.match(reg)
      if (arr) {
        return arr[1]
      } else {
        return ''
      }
    },
    // 删除账号
    delCookie (name) {
      this.setCookie(name, null, -1)
    },
    // 保存7天
    savePwd () {
      if (this.loginForm.remember) {
        this.setCookie('user', this.loginForm.username, 7)
        this.setCookie('pwd', this.loginForm.pwd, 7)
      } else {
        this.delCookie('user')
        this.delCookie('pwd')
      }
    },
    initPwd () {
      this.loginForm.username = this.getCookie('user')
      this.loginForm.pwd = this.getCookie('pwd')
    }
  },

  getMenu() {
    menuController.userMenuList().then(res => {
      if (res.data.code === 0) {
        this.menulist = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    });
  },
  mounted() {
    this.initPwd()
  }
};
</script>
<style lang="scss">
.main-content {
  color: red;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-image: url(../assets/login_bg.jpg);
  background-size: cover;
  div.el-input-group__append {
    line-height: 0;
    font-size: 0;
    padding: 0;
  }
}

.page-container {
  margin-top: 150px;
}

.logo-center {
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
  font-weight: 700;
  color: #0054a7;
}

.loginbtn {
  width: 100%;
}

.codeImg {
  cursor: pointer;
  height: 38px;
  width: 140px;
}

.center {
  img {
    width: 100%;
    margin-bottom: 20px;
  }
}

.login_icon {
  padding-left: 3px;
}

.login_icon2 {
  padding-top: 15px;
}
</style>
