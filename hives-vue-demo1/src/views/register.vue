<template>
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
        <el-button class="shou" @click="sendCode" v-show="!this.is_sendCode&&!this.next">发送验证码</el-button>
        <el-button class="shou" @click="validate" v-show="this.is_sendCode&&!this.next">确定</el-button>
        <el-button class="shou" @click="register" v-show="this.next">注册</el-button>
     </div>
    </div>
  </div>
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
           { required: true, message: "请再次输入密码", trigger: "blur" },
           { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ]
      },
      next: false,
      is_sendCode:false,
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
      this.$http.get("/api/user/user/sendCode",{params}).then(res=>{
        if(res.data.code===1){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.is_sendCode=true
        }else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
      })
    },
    validate(){
      let params = {
        "email":this.form.email,
        "code":this.form.code
      }
      this.$http.get("/api/user/user/validate?",{params}).then(res=>{
        console.log(res)
        if(res.data.code===1){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.next=!this.next
        }else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
      })
    },
    register() {
      this.$http.post("/api/user/user/register",this.form).then(res=>{
        if(res.data.regStatus===1){
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.$router.push("/")
        }else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }
      })
    },
  },
};
</script>
