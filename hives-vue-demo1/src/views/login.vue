<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>欢迎登录</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="email">
            <el-input
              v-model="form.email"
              clearable
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @change="remenber"
            >记住密码</el-checkbox
          >
        </div>
        <div>
          <span class="shou" @click="forgetpas">忘记密码？</span>
        </div>
      </div>
      <div class="butt">
        <el-button type="primary" @click="login()"
          >登录</el-button
        >
        <el-button class="shou" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      form: {
        password: "",
        email: "",
      },
      checked: false,
      rules: {
        email: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    logintest(){

      this.$router.push('/home')

    },
    login() {
        console.log(this.form.password)
        console.log(this.form.email)
        if(this.form.email===''||this.form.password==='')
        {
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
                this.$router.push('/home')
            }else{
                this.$message({
                    message: '登录失败',
                    type: 'error'
                })
            }
      })
    },
    remenber(data){
    },
    forgetpas() {
    },
    register() {
        this.$router.push("/register")
    },
  },
};
</script>
