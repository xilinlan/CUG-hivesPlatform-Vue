<template>
<!--  登录窗口-->
  <div class="login-background">

    <div class="login-box">
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          status-icon
          class="login-Form"
      >
        <img src="../assets/image/doglogo.png" class="login-logo" alt=""/>
        <el-form-item>
          <a class="tittle-txt">邮箱</a>
          <el-input v-model="form.email" placeholder="请输入邮箱"  style="width: 80%;margin-left: 10px"/>
        </el-form-item>
        <el-form-item>
          <a class="tittle-txt">密码</a>
          <el-input v-model="form.password" placeholder="请输入密码" type="password" style="width: 80%;margin-left: 10px"/>
          <el-checkbox v-model="rememberPassword" class="remember-password">记住密码</el-checkbox>
          <a class="forget-password" @click="forgetPasswordDialog">忘记密码</a>
        </el-form-item>
          <button class="login-sure-button" @click="login" type="button">登录</button>
        <a class="register-button" @click="register">注册账号</a>
        <el-divider style="position: relative;top:10px"><a style="font-size: 10px;color: #606266">使用第三方登录</a></el-divider>
        <div>
          <SvgIcon name="QQ" class-name="third-way-login" style="margin-left: 35%"/>
          <SvgIcon name="WeChat" class-name="third-way-login"/>
        </div>
      </el-form>
    </div>

  </div>
<!--  注册窗口-->
  <RegisterDialog ref="registerDialog"/>
<!--  忘记密码窗口-->
  <ForgetPasswordPage ref="forgetPasswordDialog"/>
</template>

<script>
import SvgIcon from "../components/svgIcon.vue";
import {Right} from "@element-plus/icons-vue";
import RegisterDialog from "../components/RegisterDialog.vue";
import ForgetPasswordPage from "../components/ForgetPasswordPage.vue";

export default {
  name: "LoginPage",
  inject:['reload'],
  components:{
    Right,
    SvgIcon,
    RegisterDialog,
    ForgetPasswordPage,
  },
  data(){
    return{
      timer: null,
      form: {
        password: "",
        email: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
      },
      rememberPassword:false,
    }
  },
  methods:{
    login(){
      if(this.form.email===''||this.form.password==='')
      {
        console.log("error")
        return this.$message({
          message: '请输入邮箱或密码',
          type: 'error'
        })
      }
      this.$http.post('/api/user/user/login',this.form).then(res=>{
        console.log(res)
        if(res.data.loginStatus === 1){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          let user = res.data.user
          window.sessionStorage.setItem('user',JSON.stringify(user))
          this.$router.push('/home')
        }else{
          this.$message({
            message: '登录失败',
            type: 'error'
          })
        }
      })
    },
    register(){
      this.$refs.registerDialog.registerDialogVisible=true
    },
    forgetPasswordDialog(){
      this.$refs.forgetPasswordDialog.forgetPasswordDialogVisible=true
    }
  },
}
</script>

<style scoped>
.login-background{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../assets/image/VCG41N691750694.webp");
  /*background-size: 100% 100%;*/
  background-size: 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}
.login-Form{
  width: 400px;
  height: 600px;
  border-radius: 15px;
  transform: translate(-50%);
  margin-left: 50%;
  background-color: white;
  opacity: 0.85;
}
.login-logo{
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border-width: 10px;
  border-color: white;
  border-style:solid;
  margin-left: 31%;
  bottom: 50px;
  position: relative;
}
.tittle-txt{
  margin-left: 10px;
  font-weight: bolder;
}
.login-sure-button{
  margin-top: 30px;
  font-weight: bolder;
  width: 55%;
  margin-left: 23%;
}
.remember-password{
  margin-left: 11.6%;
}
.forget-password{
  margin-left: 45%;
  color: rgba(136, 133, 133, 0.78);
}
.forget-password:hover{
  margin-left: 45%;
  color: rgba(16, 156, 225, 0.78);
}
.login-sure-button{
  border-radius: 10px;
  height: 7%;
  background-color: #FFD103;
  opacity: 0.6;
}
.login-sure-button:hover.login-sure-button:focus{
  opacity: 1;
}
.register-button{
  margin-top: 20px;
  margin-left:44%;
  font-size: 10px;
  color: rgba(136, 133, 133, 0.78);
  position: relative;
  top:10px
}
.register-button:hover{
  color: rgba(16, 156, 225, 0.78);
}
.third-way-login{
  margin-top: 10px;
  margin-left: 20px;
  width: 50px;
  height: 50px;
}
</style>