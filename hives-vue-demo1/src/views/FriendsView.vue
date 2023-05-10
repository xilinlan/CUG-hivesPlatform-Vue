<template>
  <el-row>
    <el-col :span="12">
      <el-input v-model="input" placeholder="Please input your friend's name" class="friendsName-input"/>
      <div style="border-right: #cccccc 1px solid;padding-right: 5px;margin-top: 10px">
        <a style="font-weight: bolder;font-size: 20px;margin-left: 30%;"><el-icon><User /></el-icon>My Friends</a>
        <el-divider/>
        <div>
          <div v-for="(item,index) in friendList" :key="index">
            <el-row>
              <el-col :span="8">
                <el-avatar :src="item.header"/>
              </el-col>
              <el-col :span="16">
                <a>{{item.nickname}}</a>
                <el-dropdown style="margin-left: 60%;margin-top: 10px">
                  <span class="el-dropdown-link">
                    <el-icon style="font-size: 20px;"><More /></el-icon>
                  </span>

                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="visitProfileView(item)"><el-icon><User /></el-icon>Visit Profile</el-dropdown-item>
                      <el-dropdown-item @click="startChatClick(item)"><el-icon><ChatRound /></el-icon>Start a conversation</el-dropdown-item>
                      <el-dropdown-item style="color: red" @click="deleteFriend(item,index)"><el-icon><Delete /></el-icon>Delete Friend</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
            <el-divider/>
          </div>
        </div>
      </div>

    </el-col>
    <el-col :span="12">
      <div>
        <span style="margin-left: 40%;font-size: 20px;font-weight: bolder">
          <el-icon><CirclePlus /></el-icon>
          <a>Add Friend</a>
        </span>

        <el-row style="margin-top: 10px">
          <el-col :span="20">
            <el-input style="width: 80%;margin-left: 10%;" v-model="addFriendInput" placeholder="Please input your friend's name"/>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain @click="" round>Search</el-button>
          </el-col>
        </el-row>
      </div>
      <el-divider/>
    </el-col>
  </el-row>

  <el-dialog
      v-model="chatDialogVisible"
      width="30%"
      style="background-color: white"
  >
    <div style="background-color: white;height: 650px">
      <Dialog :contact="contact" :msgList="msgList"/>
    </div>

  </el-dialog>
</template>

<script>
import SvgIcon from "../components/svgIcon.vue";
import Dialog from "../components/Dialog.vue";
import router  from "@/router";

export default {
  name: "FriendsView",
  components:{
    SvgIcon,
    Dialog,
  },
  mounted() {
    //TODO
    //获取好友列表
    this.user=JSON.parse(window.sessionStorage.getItem('user'))
    console.log(this.user)
    // 界面渲染时获取用户的好友列表并展示
    let params={
      "userId": this.user.id
    }
    this.$http.get('/api/user/follow/getFollows?',{params}).then(res => {
      console.log(res)
      for(let item in res.data.follow)
      {
        this.friendList.push(res.data.follow[item])
      }
      // this.friendList = res.data.follow
      console.log("friendList",this.friendList)
    }).catch(err => {
      console.log(err)
    })
  },
  data(){
    return{
      user:{},
      input:'',
      friendList:[],
      addFriendInput:'',
      contact: null,
      msgList: [],
      chatDialogVisible:false,
    }
  },
  methods:{
    visitProfileView(item){
      router.push({path: '/other-profile',query:{ userId:item.targetId}});
    },
    deleteFriend(item,index){
      //TODO
      //删除好友
      this.friendList.splice(index,1)
    },
    startChatClick(item){
      console.log(item)
      this.contact = item
      let params={
        "fromId":item.userId,
        "toId":item.targetId
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
      this.chatDialogVisible=true
    },
  }
}
</script>

<style scoped>
.friendsName-input{

}

</style>
<style>
.el-dropdown-link:focus {
  outline: none;
}
.in{
  font-size: 18px;
  width: 45%;
  outline: none;
  border: none;
  border-bottom: 1px solid #dcd4fe;
  color: #2b2b33;
  margin-left: 15%;
  margin-bottom: 10px;
  padding: 4px 0;
  display: inline-block;
}

</style>
