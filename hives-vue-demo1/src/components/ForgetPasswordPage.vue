<template>
  <el-dialog
      style="border-radius: 20px"
      v-model="forgetPasswordDialogVisible"
      title="Register"
      width="30%"
  >
    <el-steps :active="forgetPasswordActive">
      <el-step title="Step 1" :icon="'Message'"/>
      <el-step title="Step 2" :icon="'Lock'" />
    </el-steps>
    <!--    步骤一验证邮箱-->
    <div class="emailVerification-Form" v-if="forgetPasswordActive===1">
      <P class="register-step-tittle">验证你的邮箱</P>
      <el-form
          ref="ruleFormRef"
          :model="emailVerificationForm"
          :rules="emailVerificationRules"
          status-icon
          style="margin-top: 20px"
      >
        <el-form-item>
          <a class="tittle-txt">邮箱</a>
          <el-input v-model="emailVerificationForm.email" placeholder="请输入邮箱"  style="width: 80%;margin-left: 10px"/>
        </el-form-item>
        <el-form-item>
          <a class="tittle-txt">验证码</a>
          <el-input v-model="emailVerificationForm.code" placeholder="请输入验证码"  style="width: 59%;margin-left: 10px"/>
          <el-button :disabled="countdown > 0" @click="startCountdown" style="width: 18%">
            {{ countdown > 0 ? countdown + '秒' : '发送验证码' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--    步骤二设置密码-->
    <div class="passwordSet-Form" v-if="forgetPasswordActive===2">
      <P class="register-step-tittle">设置你的密码</P>
      <el-form
          ref="ruleFormRef"
          :model="passwordSetForm"
          :rules="passwordSetRules"
          status-icon
          style="margin-top: 20px"
      >
        <el-form-item>
          <a class="tittle-txt">密码</a>
          <el-input v-model="passwordSetForm.password" placeholder="请输入密码" show-password style="width: 80%;margin-left: 10px"/>
        </el-form-item>
        <el-form-item>
          <a class="tittle-txt">密码验证</a>
          <el-input v-model="passwordSetForm.password2" placeholder="请再次输入密码" show-password style="width: 74.5%;margin-left: 10px;"/>
        </el-form-item>
      </el-form>
    </div>

    <!--    步骤控制按钮-->
    <div>
      <el-row>
        <el-col :span="8"><el-icon v-if="forgetPasswordActive!==1" @click="beforeForgetPasswordStep" class="backRegister-Button"><Back /></el-icon></el-col>
        <el-col :span="8"><el-icon v-if="forgetPasswordActive===2" class="finishRegister-Button" @click="finishForgetPasswordStep"><CircleCheckFilled /></el-icon></el-col>
        <el-col :span="8"><el-icon v-if="forgetPasswordActive!==2" @click="nextForgetPasswordStep" class="nextRegister-Button"><Right /></el-icon></el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {Right} from "@element-plus/icons-vue";
import SvgIcon from "./svgIcon.vue";

export default {
  name: "ForgetPasswordPage",
  inject:['reload'],
  components:{
    Right,
    SvgIcon,
  },
  data(){
    return{
      user:{},
      countdown: 0,
      forgetPasswordDialogVisible:false,
      forgetPasswordActive:1,
      emailVerificationForm:{
        email:'',
        code:'',
      },
      emailVerificationRules:{
        email: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      passwordSetForm:{
        password:'',
        password2:'',
      },
      passwordSetRules:{
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
      },
      infoSetForm:{
        nickname:'',
        birthday:'',
      },
      infoSetRules:{
        nickname: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "不能大于20个字符", trigger: "blur" },
        ],
      }
    }
  },
  methods:{
    nextForgetPasswordStep(){
      if(this.registerActive===1){
        //验证码对比验证
        console.log(1)
        let params = {
          "email": this.emailVerificationForm.email,
          "code":this.emailVerificationForm.code
        }
        this.$http.get("/api/user/user/validate", {params}).then(ref=>{
          console.log(ref)
          if(ref.data.correct===0){
            this.$message({
              message:'验证码无效',
              type:'error'
            })
          }
          else
            this.registerActive=this.registerActive+1
        })
      }
    },
    beforeForgetPasswordStep(){
      this.registerActive=this.registerActive-1
    },
    startCountdown() {
      this.countdown = 59;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
      //发送邮件验证码
      let params = {
        "email": this.emailVerificationForm.email
      }
      this.$http.get("/api/user/user/sendCode", {params}).then(res=>{
        this.next=!this.next
        this.$message({
          message: '验证码已发送',
          type: 'success'
        })
      })
    },
    finishForgetPasswordStep(){
      //toDo
      //完成修改密码
      let params = {
        "email": this.emailVerificationForm.email,
        "password":this.passwordSetForm.password,
      }
      this.$http.get("/api/user/user/updatePassword", {params}).then(res=>{
        if (res.data.udpwStatus === 1)
        {
          this.$message({
            message: '密码修改成功',
            type: 'success'
          })
          this.forgetPasswordDialogVisible=false
          this.reload()
        }else if(res.data.udpwStatus === 0){
          this.$message({
            message: '密码修改失败',
            type: 'error'
          })
        }else if(res.data.udpwStatus === 2){
          this.$message({
            message: '邮箱不存在',
            type: 'error'
          })
        }else{
          this.$message({
            message: '与旧密码相同',
            type: 'error'
          })
        }

      })
    }
  }
}
</script>

<style scoped>
.emailVerification-Form{
  margin-top: 20px;
}
.register-step-tittle{
  font-size: 20px;
  font-weight: bolder;
}
.passwordSet-Form{
  margin-top: 20px;
}
.infoSet-Form{
  margin-top: 20px;
}
.backRegister-Button{
  font-size: 30px;
  margin-top: 10px;
}
.nextRegister-Button{
  font-size: 30px;
  margin-top: 10px;
  margin-left: 60%;
}
.finishRegister-Button{
  font-size: 60px;
  color: #FFD103;
  margin-left: 25%;
}
</style>
