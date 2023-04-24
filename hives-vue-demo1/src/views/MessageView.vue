<template>
  <el-row>
    <el-col :span="8" style="height: 100%">
<!--      <span class="Message-Tittle-Txt">Messages</span>-->
<!--      <div class="MessageFrom-Zero-Box" v-if="!messageNum">-->
<!--        <span class="Message-Zero-Tittle-Txt">Welcome to your inbox!</span>-->
<!--        <div class="Message-Zero-Content-Txt">Drop a line,share Hives and more with private conversations between you and others on Hives</div>-->
<!--        <el-button round class="Message-Write-Button" @click="writeMessageButtonClick">Write a message</el-button>-->
<!--      </div>-->
      <Contact @set-contact="set"/>
    </el-col>
    <el-col :span="16">
<!--      <div class="Message-Zero-Content-Box" v-if="messageIndex!==-1">-->
<!--        <span class="Message-Zero-Tittle-Txt" style="position: relative;margin-left: 10%">Select a message</span>-->
<!--        <div class="Message-Zero-Content-Txt">Choose from your existing conversations,start a new one,or just keep swimming</div>-->
<!--        <el-button round class="Message-New-Button">New message</el-button>-->
<!--      </div>-->
      <Dialog :contact="contact" :msgList="msgList"/>
    </el-col>
  </el-row>

<!--  选择好友窗口-->
  <el-dialog
      v-model="choseFriendDialogVisible"
      title="Following"
      width="30%"
      class="Chose-Friend-Dialog">
    <Contact @set-contact="set"/>
    <Dialog :contact="contact" :msgList="msgList"/>
  </el-dialog>
</template>

<script>
import Contact from "../components/Contact.vue";
import Dialog from "../components/Dialog.vue";

export default {
  name: "MessageView",
  components: {Contact,Dialog,},
  data(){
    return{
      user:{},
      messageNum:0,
      messageIndex:-1,
      choseFriendDialogVisible:false,
      contact: null,
      msgList: [],
    }
  },
  mounted() {
    this.user=JSON.parse(window.sessionStorage.getItem('user'))
  },
  methods:{
    writeMessageButtonClick(){
      this.choseFriendDialogVisible=true
    },
    // 点击指定用户后，就获取两人之间的所有信息
    // 并将当前联系人保存在 localStorage
    set(user) {
      this.contact = user
      console.log("contact",user)
      let params={
        "fromId":this.user.id,
        "toId":this.contact.targetId
      }
      this.$http.get('/api/chat/pullMsg?', {params}).then(res => {
        console.log("res",res)
        this.msgList=[]
        for(let item in res.data){
          this.msgList.push(JSON.parse(res.data[item]))
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.Message-Tittle-Txt{
  font-size: 20px;
  font-weight: bolder;
}
.Message-Zero-Tittle-Txt{
  font-size: 30px;
  font-weight: bolder;
}
.MessageFrom-Zero-Box{
  margin-top: 20px;
  margin-left: 5%;
}
.Message-Zero-Content-Txt{
  font-size: 15px;
  margin-top: 10px;
  color: #606266;
}
.Message-Write-Button{
  font-size: 20px;
  width: 80%;
  height: 45px;
  margin-left: 5%;
  background-color: #FFD103;
  color: white;
  font-weight: bolder;
  margin-top: 10%;
}
.Message-Zero-Content-Box{
  position: relative;
  margin-top:50%;
  margin-left: 20%;
}
.Message-New-Button{
  background-color: #FFD103;
  color: white;
  margin-top: 10%;
  margin-left: 5%;
  width: 80%;
  height: 45px;
}
.Chose-Friend-Dialog{

}
</style>