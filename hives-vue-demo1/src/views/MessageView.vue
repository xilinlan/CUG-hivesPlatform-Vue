<template>
  <el-row>
    <el-col :span="9" style="height: 100%">
      <span class="Message-Tittle-Txt">Messages</span>
      <div class="MessageFrom-Zero-Box" v-if="!messageNum">
        <span class="Message-Zero-Tittle-Txt">Welcome to your inbox!</span>
        <div class="Message-Zero-Content-Txt">Drop a line,share Hives and more with private conversations between you and others on Hives</div>
        <el-button round class="Message-Write-Button">Write a message</el-button>
      </div>
    </el-col>
    <el-col :span="1"><el-divider direction="vertical" style="height: 650px"/></el-col>
    <el-col :span="14">
      <div class="Message-Zero-Content-Box" v-if="messageIndex!==-1">
        <span class="Message-Zero-Tittle-Txt" style="position: relative;margin-left: 10%">Select a message</span>
        <div class="Message-Zero-Content-Txt">Choose from your existing conversations,start a new one,or just keep swimming</div>
        <el-button round class="Message-New-Button">New message</el-button>
      </div>
    </el-col>
  </el-row>

<!--  选择好友窗口-->
  <el-dialog
      v-model="ChoseFriendDialogVisible"
      title="Following"
      width="30%"
      class="Chose-Friend-Dialog">

  </el-dialog>
</template>

<script>
export default {
  name: "MessageView",
  data(){
    return{
      messageNum:0,
      messageIndex:-1,
      ChoseFriendDialogVisible:false
    }
  },
  methods:{

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