<template>
  <el-container>
    <el-container>
      <el-menu :default-active="activePath" class="el-menu-vertical-demo"
               active-text-color="#fff" :collapse-transition="false"
               :unique-opened="true"
               :router="true" :collapse="isCollapse" text-color="#fff" background-color="#22345E">
          <el-menu-item  index="/sys">
            <!--<i class="fa fa-file-text-o"></i>-->
            <i class="fa fa-wheelchair"></i>
            <span slot="title">杉汇通-企业金融信贷平台</span>
          </el-menu-item>
        <div v-for="b in menulist" :key="b.menuId">
          <el-submenu v-if="b.list && b.list.length" :index="'' + b.menuId"  >
            <template slot="title">
              <i :class="b.icon || 'fa fa-th-large'"></i>
              <span slot="title">{{b.name}}</span>
            </template>
            <span v-for="c in b.list" :key="c.menuId">
              <el-submenu v-if="c.list && c.list.length" :index="'' + c.menuId" >
                <i :class="c.icon || 'fa fa-file-text-o'"></i>
                  <span slot="title">{{c.name}}</span>
              </el-submenu>
              <el-menu-item v-if="!c.list || !c.list.length" :index="c.url" :key="c.menuId" >
                <i :class="c.icon || 'fa fa-file-text-o'"></i>
                <span slot="title">{{c.name}}</span>
              </el-menu-item>
            </span>
          </el-submenu>
          <el-menu-item v-if="!b.list || !b.list.length" :index="b.url">
            <i :class="b.icon || 'fa fa-file-text-o'"></i>
            <span slot="title">{{b.name}}</span>
          </el-menu-item>
        </div>
      </el-menu>
      <el-main class="admin_main">
        <el-scrollbar style="height:100%" class="admin_mian_scrollbar">
          <ul class="head-group">
            <li>
              <div class="title-text">
                <i class="fa fa-bars" @click="isCollapse = !isCollapse" :class="{'rotage': isCollapse}"></i>
              </div>
            </li>
            <li>
              <div class="btnwork">
                <el-dropdown trigger="hover" @command="handleCommand">
                  <span style="margin-right:15px;cursor:pointer;">欢迎您：<label class="el-dropdown-link" style="cursor:pointer;">{{user_fullname}}</label></span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>最近登录时间</el-dropdown-item>
                    <el-dropdown-item>{{last_login_time}}</el-dropdown-item> -->
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                  <div class="icon">
                    <i class="fa fa-arrows-alt" aria-hidden="true" @click="click"></i>
                  </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
                  <router-link :to="{name: 'messageList'}" class="info">
                    <i class="fa fa-commenting-o">
                      <div class="info-count" v-if="$store.state.countUnread">{{$store.state.countUnread}}</div>
                    </i>
                  </router-link>
                </el-tooltip>

                <a style="cursor:pointer" @click="dialogLogoutVisible = true"><i class="fa fa-power-off" aria-hidden="true"></i>退出</a>
              </div>
            </li>
          </ul>
          <div>
            <breadcrumb></breadcrumb>
            <transition name="fade-transform" mode="out-in">
              <keep-alive v-if="$route.meta.keepAlive">
                <router-view  @upup="change" @refreshList="onRefresList"></router-view>
                </keep-alive>
              <router-view  @upup="change" @refreshList="onRefresList" v-if="!$route.meta.keepAlive"></router-view>
            </transition>

          </div>
        </el-scrollbar>
      </el-main>
      <el-dialog  title="修改密码" :visible.sync="dialogFormVisible" @close="dialogClose" width="650px">
        <el-form :model="dialogForm" ref="dialogForm">
          <el-form-item label="原 密 码" :label-width="formLabelWidth" prop="password" :rules="rules.passwordRule">
            <el-input v-model="dialogForm.password"  :type="showPwd[0]?'text':'password'">
              <el-button slot="append" :icon="showPwd[0]?'fa fa-eye':'fa fa-eye-slash'" @click="changeType(0)"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="新 密 码" :label-width="formLabelWidth" prop="newPassword" :rules="rules.passwordRule" >
            <el-input v-model="dialogForm.newPassword"  :type="showPwd[1]?'text':'password'">
              <el-button slot="append" :icon="showPwd[1]?'fa fa-eye':'fa fa-eye-slash'" @click="changeType(1)"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newPassword1" :rules="rules.passwordRule">
            <el-input v-model="dialogForm.newPassword1"  :type="showPwd[2]?'text':'password'">
              <el-button slot="append" :icon="showPwd[2]?'fa fa-eye':'fa fa-eye-slash'" @click="changeType(2)"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitPassword('dialogForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="温馨提示"
        :visible.sync="dialogLogoutVisible"
        width="30%"
        class="logout-tip-dialog"
        :before-close="handleLogoutClose">
        <span>确定退出登录吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogLogoutVisible = false">取 消</el-button>
          <el-button type="primary" @click.prevent="logout">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>

</template>
<script>
import { loginController } from '@/controller/common/login_controller';
import { userController } from '@/controller/common/user_controller';
import { menuController } from '@/controller/common/menu_controller';
import screenfull from 'screenfull'
import { formatDate } from "../util/date.js";
import Rules from "../util/rules";
import breadcrumb from "@/components/common/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {
      showPwd: [false, false, false],
      isCollapse: false,
      isRefresh: false,
      rules: Rules,
      dialogForm: {
        newPassword: "",
        newPassword1: "",
        password: "",
      },
      formLabelWidth: "80px",
      dialogFormVisible: false,
      last_login_time: "",
      visible: false,
      menulist: [],
      menuDataList: [],
      msgNum: 0,
      msgRedShow: false,
      user_fullname: "", //登陆名字
      dialogLogoutVisible: false
    };
  },
  created() {
    // 此处获取字典信息
    this.$dict.getAll()
    // this.$store.dispatch('getCountUnread')
    this.user_fullname = JSON.parse( localStorage.getItem('sysUser')).realname
    this.$bus.$on("refreshList", () => {
      this.getMenu();
    });
  },
  methods: {
    handleLogoutClose(done) {
      done();
    },
    changeType (index) {
      this.$set(this.showPwd, index, !this.showPwd[index])
    },
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    dialogClose() {
      this.dialogForm.password = "";
      this.dialogForm.newPassword = "";
      this.dialogForm.newPassword1 = "";
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          this.dialogFormVisible = true;
          break;
      }
    },
    msgUnread() {
      var params = {
        pageSize: 10,
        type: 2,
        pageNo: 1
      };

    },
    change(msg) {
      this.msgRedShow = msg;
    },

    onRefresList() {
      this.isRefresh = true;
      this.getMenu();
    },

    logout() {
      this.dialogLogoutVisible = false
      this.$router.push({
        path: '/'
      })
      localStorage.removeItem('userAccessToken')
      // loginController.logout().then(res => {
      //   if (res.status === 200) {
      //     this.$router.push({
      //       path: "/"
      //     });
      //   }
      // });
    },
    submitPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatePwd();
        }
      });
    },

    updatePwd() {
      if (this.dialogForm.newPassword == this.dialogForm.newPassword1) {
          userController.password({
            newPassword: this.dialogForm.newPassword,
            password: this.dialogForm.password,
          })
          .then(res => {
            if (res.status === 200) {
              this.$message.success("修改成功，请重新登录！");
              this.logout();
            } else {
              this.$message.error(res.data.message);
            }
          });
      } else {
        this.$message.warning("两次密码输入不一致！");
      }
    },
    getMenu() {
      menuController.userMenuList().then(res => {
        if(res.status === 200) {
          // console.log(res.data)
          this.menulist = res.data
          this.getMenuList(res.data)
        }
      });
    },
    // 将树形结构扁平化
    getMenuList (array) {
      array.map(val => {
        if (val.url) {
          this.menuDataList.push(val)
        }
        if (val.list && val.list instanceof Array && val.list.length !== 0) {
          this.getMenuList(val.list)
        }
      })
    }
  },
  mounted() {
    this.getMenu();

    // this.msgUnread();
  },
  computed: {
    // 子路由高亮处理
    activePath () {
      let url = ''
      this.menuDataList.map(val => {
        if (this.$route.path.indexOf(val.url) !== -1) {
          url = val.url
        }
      })
      return url
    }
  }
};
</script>
<style scoped lang="scss" >
  .icon{
    font-size: 16px;
    height: 100%;
    display: inline-block;
    cursor: pointer;
    margin: 0 4px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 257px;
    min-height: 400px;
  }
  /deep/.el-menu-vertical-demo{
    z-index: 9;
    &>li:nth-child(1){
      font-size: 16px;
      height: 64px;
      line-height: 64px;
    }
    .el-menu-item.is-active{
      background-color: #1890FF !important;
    }
    .el-submenu .el-menu-item{
      background-color: #172850 !important;
    }
    .el-submenu .el-menu-item.is-active{
      background-color: #1890FF !important;
    }
  }
  .el-menu--collapse>div>.el-menu-item span, .el-menu--collapse>div>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  /deep/.el-menu--collapse .el-submenu__icon-arrow{
    visibility: hidden;
  }



  .info{
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 0 10px;
    font-size: 20px;
    &>i{
      position: relative;
    }
    .info-count{
      font-size: 12px;
      right: -30%;
      top: -30%;
      line-height: 15px;
      height: 15px;
      position: absolute;
      padding: 0 3px;
      background-color: #d92323;
      color: #fff;
      text-align: center;
      border-radius: 50%;
    }
  }

/deep/.el-scrollbar {
  .el-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
}
/deep/.el-message {
  .el-message--success {
    z-index: 3012;
  }
}

.full_height {
  height: 100%;
}
.admin_main {
  min-width: 1160px;
  background: #fff;
  padding: 0;
}
.el-header {
  min-width: 1360px;
  border-bottom: solid 1px #dce3e9;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1;
}
.logo {
  line-height: 60px;
  font-size: 20px;
  color: #363d4d;
  img {
    height: 35px;
    width: auto;
    vertical-align: middle;
    margin-right: 5px;
  }
}
.btnwork {
  line-height: 60px;
  span {
    display: inline-block;
  }
  label {
    margin: 0 5px;
  }
  a {
    margin: 0 5px;
  }
  i {
    margin-right: 5px;
  }
}
.title-text {
  line-height: 60px;
  font-size: 18px;
  color: #363d4d;
  i{
    color: #000000;
    cursor: pointer;
    transition: all 0.3s;
  }
  .rotage{
    transform: rotate(90deg);
  }
}
  .head-group{
    height: 64px;
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    padding: 0 24px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #f0f2f5;
  }
</style>
<style lang="scss">
  .logout-tip-dialog {
    .el-dialog__body{
      padding: 20px 20px 0  20px;
    }
  }
</style>
