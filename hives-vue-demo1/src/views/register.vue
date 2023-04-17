<template>
<!--  登录窗口-->
    <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>用户注册</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="email" v-show="!this.next">
            <el-input
              v-model="form.email"
              clearable
              placeholder="请输入注册邮箱"
              
            ></el-input>
          </el-form-item>
          <el-form-item prop="nickname" v-show="this.next">
            <el-input
              v-model="form.nickname"
              clearable
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code" v-show="!this.next">
            <el-input
              v-model="form.code"
              clearable
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password" v-show="this.next">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item prop="determine" v-show="this.next">
            <el-input
              v-model="form.determine"
              clearable
              placeholder="请确定密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="butt">
        <el-button type="primary" @click="login()"
          >返回登录</el-button
        >
        <el-button class="shou" @click="sendCode">发送验证码</el-button>
      </div>
    </div>
  </div>
<!--  注册窗口-->
  <el-dialog
      v-model="registerDialogVisible"
      title="Register"
      width="30%"
  >
  </el-dialog>
</template>

<script>

export default {
  name: "register",
  data() {
    return {
      form: {
        password: "",
        email: "",
        nickname: "",
        determine: "",
        code: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
        determine: [
           { required: true, message: "请输入密码", trigger: "blur" },
           { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ]
      },
      next: false,
      registerDialogVisible:false
    };
  },
  mounted() {
  },
  methods: {
    login(form) {
        this.$router.push("/")
    },
    remenber(data){    
    },
    forgetpas() {
    },
    sendCode(){
        let params = {
              "email": this.form.email
        }
        this.$http.get("/api/user/user/sendCode", {params}).then(res=>{
            this.next=!this.next
              alert("已发送验证码!")
          })
    },
    validate(){

    },
    register() {
    },
  },
};
</script>
