

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
      <el-button class="message-box" v-if="this.user.id!==this.otherUser.id&&!isFollow" style="  background-color: #51a5e6;width: 70px;;color: white" round @click="messageToOtherUser">私信</el-button>
      <div class="focus-box" v-if="this.user.id!==this.otherUser.id">
        <el-button style="  background-color: #FFD103;width: 100px;height: 40px;color: white" round v-if="!isFollow" @click="focusButtonClick"><el-icon><CirclePlus /></el-icon>关注</el-button>
        <el-button style="  background-color: #EEE7E7;width: 100px;height: 40px;color: #808080" round v-if="isFollow" @click="cancelFocusButtonClick"><el-icon><CircleCheck /></el-icon>已关注</el-button>
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
                <el-menu-item index="2" class="menu-item">Media</el-menu-item>
                <el-menu-item index="3" class="menu-item">Replies</el-menu-item>
                <el-menu-item index="4" >Likes</el-menu-item>
              </el-menu>
            </el-header>
            <!--        下方内容-->
            <el-main>
<!--              Hives内容-->
              <div class="Hives-Box" v-if="activeIndex==='1'">
                <div v-for="(item,index) in hivesList" :key="index">
                  <p style="color: #606266">{{ item.time}}</p>
                  <p style="margin-bottom: 10px;font-size: 20px">{{ item.content }}</p>
                  <div v-if="item.type===0">
                    <ul class="el-upload-list el-upload-list--picture-card">
                      <li class="el-upload-list__item is-success" v-for="fit in item.urls" :key="fit">
                        <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)" alt=""/>
                      </li>
                    </ul>
                  </div>
                  <div v-if="item.type===1">
                    <div v-for="fit in item.urls">
                      <video :src=fit class="avatar" controls="controls" style="width: 100%;height: 50%"/>
                    </div>
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

                <!--            分页按钮-->
                <el-pagination
                    class="Page-Menu"
                    v-model:current-page="currentPage"
                    layout="prev, pager, next"
                    :total="totalCount"
                    @current-change="initProfileHives" />
              </div>
<!--               收藏内容-->
              <div class="Hives-Box" v-if="activeIndex==='4'">
                <div v-for="(item,index) in likesHivesList" :key="index">
                  <div v-if="item.isCollect">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <div class="grid-content ep-bg-purple">
                          <img :src="item.header" style="width: 70px; height: 70px;border-radius: 70px">
                        </div>
                      </el-col>
                      <el-col :span="20">
                        <div>
                          <div>
                            <a style="font-size: 20px;font-weight: bolder">{{item.nickname}}</a>
                            <a style="color: #BEBEBE;margin-left: 5px">{{item.email}}</a>
                            <a style="color: #BEBEBE"> . </a>
                            <a style="color: #BEBEBE">{{item.updateTime}}</a>
                          </div>
                          <p>{{item.content}}</p>
                          <div v-if="item.type===0">
                            <ul class="el-upload-list el-upload-list--picture-card">
                              <li class="el-upload-list__item is-success" v-for="fit in item.urls" :key="fit">
                                <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)"/>
                              </li>
                            </ul>
                          </div>
                          <div v-if="item.type===1">
                            <div v-for="fit in item.urls">
                              <video :src=fit class="avatar" controls="controls" style="width: 100%;height: 50%"/>
                            </div>
                          </div>
                        </div>
                        <div>
                          <SvgIcon name="love-g" className="Tips-tag" v-if="!item.isLove" />
                          <SvgIcon name="love-p" className="Tips-tag" v-if="item.isLove" />
                          <a class="tips_num">{{item.likes}}</a>
                          <SvgIcon name="comment-g" className="Tips-tag" @click="showCommentDialog(item)"/>
                          <a class="tips_num">{{item.reply}}</a>
                          <SvgIcon name="collection-y" className="Tips-tag" v-if="item.isCollect"/>
                          <a class="tips_num">{{item.collects}}</a>
                          <SvgIcon name="statistics-g" className="Tips-tag" />
                          <a class="tips_num">{{item.hot}}</a>
                          <SvgIcon name="share-g" className="Tips-tag" />
                        </div>
                      </el-col>
                    </el-row>
                    <el-divider/>
                  </div>
                </div>
              </div>
<!--              media内容-->
              <div class="Hives-Box" v-if="activeIndex==='2'">
                <div>
                  <el-divider>图片</el-divider>
                  <div>
                    <ul class="el-upload-list el-upload-list--picture-card">
                      <li class="el-upload-list__item is-success" v-for="fit in pictureTable" :key="fit">
                        <img style="width: 100%; height: 100%" :src="fit" />
                      </li>
                    </ul>
                  </div>
                  <el-divider>视频</el-divider>
                  <div>
                    <video :src=fit class="avatar" controls="controls" style="width: 100%;height: 50%" v-for="fit in videoTable"/>
                  </div>
                </div>
              </div>
            </el-main>
          </el-container>
        </div>


    </div>

  <!--  评论对话框-->
  <CommentDialog ref="commentDialog"/>

</template>

<script>

import CommentDialog from "../components/CommentDialog.vue";
import SvgIcon from "../components/svgIcon.vue";
import router from "@/router";

export default {
  name: "OtherProfileView",
  components:{
    CommentDialog,
    SvgIcon,
  },
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
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
      videoTable:[],
      pictureTable:[],
      activeIndex:'1',
      hivesList:[],
      currentPage:1,
      totalCount:0,
      isFollow:false,
      likesHivesList:[],
      likesCurrentPage:1,
      likesTotalCount:0,
    }
  },
  methods:{
    initUser(){
      var id = this.$route.query.userId;
      console.log(id);
      let params={
        "userId":this.user.id,
        "targetId":id
      }
      this.$http.get('/api/user/follow/getOtherUserInfo?',{params}).then(ref=>{
        if(ref.data.code===200){
          this.otherUser=ref.data.otherUserInfo
          this.isFollow=this.otherUser.isFollow
          console.log("otherUser",this.otherUser)
          this.initProfileHives()
        }
        else {
          this.$message({
            message:ref.data.msg,
            type:'error'
          })
          router.push('/home')
        }
      })
    },
    initProfileHives(){
      let params={
        "page":this.currentPage,
        "limit":this.limit,
        "userId":this.otherUser.id
      }
      let tempPictureTable=[]
      let tempVideoTable=[]
      this.$http.get('/api/exchange/post/own?',{params}).then(ref=>{
        console.log("profile",ref.data)
        if(ref.data.code===200){
          this.hivesList=ref.data.page.list
          this.totalCount=ref.data.page.totalCount
          for(let index in this.hivesList){
            console.log("测试",this.hivesList[index].urls)
            if(this.hivesList[index].type===0){
              tempPictureTable=tempPictureTable.concat(this.hivesList[index].urls)
            }else{
              tempVideoTable=tempVideoTable.concat(this.hivesList[index].urls)
            }
          }
          this.pictureTable=tempPictureTable
          this.videoTable=tempVideoTable
        }
        else{
          this.$message({
            message:ref.data.msg,
            typr:'erroe'
          })
        }
      })
    },
    initLikesHives(){
      let params={
        "page":this.likesCurrentPage,
        "limit":this.limit,
        "userId":this.otherUser.id
      }
      this.$http.get('/api/exchange/postcollects/list?',{params}).then(ref=>{
        console.log(ref)
        if(ref.data.code===200){
          this.likesHivesList=ref.data.page.list
        }
      })
    },
    handleSelect(index){
      this.activeIndex=index
      if(index==='1'){
        this.initProfileHives()
      }
      else if(index==='4'){
        this.initLikesHives()
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    LoveClick(index){
      this.hivesList[index].isLove=true
      this.hivesList[index].likes=this.hivesList[index].likes+1
      // toDo
      //用户点击点赞按钮，数据库点赞数+1
      let params={
        "userId":this.user.id,
        "postId":this.hivesList[index].id
      }
      console.log(params)
      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("点赞",ref)
      })
    },
    LoveCancel(index){
      this.hivesList[index].isLove=false
      this.hivesList[index].likes=this.hivesList[index].likes-1
      // toDo
      //用户再次点击点赞按钮，数据库点赞数-1
      let params={
        "userId":this.user.id,
        "postId":this.hivesList[index].id
      }
      console.log(params)
      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("点赞",ref)
      })
    },
    CollectClick(index){
      this.hivesList[index].isCollect=true
      this.hivesList[index].collects=this.hivesList[index].collects+1
      // toDo
      //用户点击收藏按钮，数据库收藏数+1

      let params={
        "userId":this.user.id,
        "postId":this.hivesList[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("收藏",ref)
      })

    },
    ClickCancel(index){
      this.hivesList[index].isCollect=false
      this.hivesList[index].collects=this.hivesList[index].collects-1
      // toDo
      //用户再次点击收藏按钮，数据库收藏数-1

      let params={
        "userId":this.user.id,
        "postId":this.hivesList[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("收藏",ref)
      })

    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
    focusButtonClick(){
      //toDo
      //关注用户
      let params={
        "userId":this.user.id,
        "targetId":this.otherUser.id
      }
      this.$http.post('/api/user/follow/save?',params).then(ref=>{
        if(ref.data.code===200){
          this.$message({
            message:"关注成功",
            type:'success'
          })
          this.isFollow=true
          this.otherUser.fansCount=this.otherUser.fansCount+1
          this.$http.get('/api/user/user/info/'+this.user.id).then(res=>{
            this.user=res.data.user
            sessionStorage.removeItem("user");
            window.sessionStorage.setItem('user',JSON.stringify(this.user))
          })
        }else{
          this.$message({
            message:"关注失败",
            type:'error'
          })
        }
      })
    },
    cancelFocusButtonClick(){

      //toDo
      //取消关注用户
      let params={
        "userId":this.user.id,
        "targetId":this.otherUser.id
      }
      this.$http.post('/api/user/follow/delete',params).then(ref=>{
        if(ref.data.code===200){
          this.$message({
            message:"取消关注成功",
            type:'success'
          })
          this.isFollow=false
          this.otherUser.fansCount=this.otherUser.fansCount-1
          this.$http.get('/api/user/user/info/'+this.user.id).then(res=>{
            this.user=res.data.user
            sessionStorage.removeItem("user");
            window.sessionStorage.setItem('user',JSON.stringify(this.user))
          })
        }else{
          this.$message({
            message:"取消关注失败",
            type:'error'
          })
        }
      })
    },

    messageToOtherUser(){
      router.push({path: '/message',query:{ otherUser:JSON.stringify(this.otherUser)}});
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
.focus-box{
  position: relative;
  bottom: 80%;
  margin-left: 90%;
}
.message-box{
  position: relative;
  bottom: 70%;
  margin-left: 80%;
}
</style>
