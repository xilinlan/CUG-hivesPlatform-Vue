<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { InfoFilled } from '@element-plus/icons-vue'
</script>

<template>
    <!--  上方头像名字板块-->
    <div style="height:350px;position: relative">
      <el-image :src="this.otherUser.background" :fit="'cover'" class="background-image"/>
      <el-image :src="this.otherUser.header" :fit="'cover'" class="user-image"/>
      <div class="follow-box">
        <div class="userInfo-box">
          <p class="user-name">{{this.otherUser.nickname}}</p>
          <a class="user-count">{{this.otherUser.email}}</a>
          <el-icon style="margin-left: 5px"><Calendar /></el-icon>
          <a class="user-count" style="margin-left: 5px">{{this.otherUser.birthday}}</a>
        </div>
        <div style="margin-top: 20px">
          <a class="follow-number">{{this.otherUser.followCount}}</a>
          <a style="margin-left: 5px">Following</a>
          <a class="follow-number" style="margin-left: 50px">{{this.otherUser.fansCount}}</a>
          <a style="margin-left: 5px">Followers</a>
        </div>
      </div>
    </div>
      <!--  下方导航栏与内容-->
      <div class="other-box">
        <div class="menu-box">
          <el-container>
            <el-header>
              <!--          导航栏-->
              <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
              >
                <el-menu-item index="1" class="menu-item">Hives</el-menu-item>
                <el-menu-item index="2" class="menu-item">Replies</el-menu-item>
                <el-menu-item index="3" class="menu-item">Media</el-menu-item>
                <el-menu-item index="4">Likes</el-menu-item>
              </el-menu>
            </el-header>
            <!--        下方内容-->
            <el-main>
<!--              Hives内容-->
              <div class="Hives-Box" v-if="activeIndex==='1'">
                <div v-for="(item,index) in hivesList" :key="index">
                  <p style="color: #606266">{{ item.time}}</p>
                  <p style="margin-bottom: 10px;font-size: 20px">{{ item.content }}</p>
                  <div>
                    <ul class="el-upload-list el-upload-list--picture-card">
                      <li class="el-upload-list__item is-success" v-for="fit in item.urls" :key="fit">
                        <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)" alt=""/>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <SvgIcon name="love-g" className="Tips-tag" v-if="!item.isLove" @click="LoveClick(index)"/>
                    <SvgIcon name="love-p" className="Tips-tag" v-if="item.isLove" @click="LoveCancel(index)"/>
                    <a class="tips_num">{{item.likes}}</a>
                    <SvgIcon name="comment-g" className="Tips-tag" @click="showCommentDialog(item)"/>
                    <a class="tips_num">{{item.reply}}</a>
                    <SvgIcon name="collection-g" className="Tips-tag" v-if="!item.isCollect" @click="CollectClick(index)"/>
                    <SvgIcon name="collection-y" className="Tips-tag" v-if="item.isCollect" @click="ClickCancel(index)"/>
                    <a class="tips_num">{{item.collects}}</a>
                    <SvgIcon name="statistics-g" className="Tips-tag" />
                    <a class="tips_num">{{item.hot}}</a>
                    <SvgIcon name="share-g" className="Tips-tag" />
                  </div>
                  <el-divider/>
                </div>
              </div>

            </el-main>
          </el-container>
        </div>


    </div>
</template>

<script>

export default {
  name: "OtherProfileView",
  mounted() {
    this.initUser()
  },
  data(){
    return{
      user:{},
      otherUser:{
        nickname:'',
        email:'',
        birthday:'',
        followCount:'',
        fansCount:'',
        background:'',
        header:'',
      },
      activeIndex:'1',
      hivesList:[],
    }
  },
  methods:{
    initUser(){
      var id = this.$route.query.userId;
      console.log(id);
      this.$http.get('/api/user/user/info/'+id).then(ref=>{
        if(ref.data.code===200){
          this.otherUser=ref.data.user
          console.log("otherUser",this.otherUser)
          this.initHivesList()
        }
        else {
          this.$message({
            message:ref.data.msg,
            type:'error'
          })
          this.$router.push('/home')
        }
      })
    },
    initHivesList(){
      console.log('success')
      let params={
        "page":1,
        "limit":10,
        "userId":this.otherUser.id
      }
      this.$http.get('/api/exchange/post/list?',{params}).then(ref=>{
        console.log(ref)
        if(ref.data.code===200){
          this.hivesList=ref.data.page.list
          console.log("用户界面",ref.data.page.list)
        }
      })
    },
    handleSelect(index){
      this.activeIndex=index
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.background-image{
  height: 200px;
  width: 100%;
}
.user-image{
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border-width: 10px;
  border-color: white;
  border-style:solid;
  bottom: 20%;
  left: 5%;
}
.follow-box{
  color: #606266;
  font-weight: lighter;
  font-size: 15px;
  position: relative;
  bottom: 60%;
  margin-left: 33%;
}
.user-name{
  font-size: 30px;
  font-weight: bolder;
  color: black;
}
.user-count{
  color: #606266;
  font-size: 15px;
}
.follow-number{
  color: black;
  font-weight: bolder;
}
.menu-item{
  width: 25%;
}
.menu-item2{
  width: 20px;
}
.Tips-tag{
  width: 25px;
  height: 25px;
  margin-left: 50px;
}
.tips_num{
  margin-left: 5px;
  position: relative;
  bottom: 5px
}
</style>