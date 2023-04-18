<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SvgIcon from "@/components/SvgIcon.vue";
const activeIndex = ref('/home')
</script>

<template>
<!--  左侧导航栏-->
  <el-row :gutter="0">
    <el-col :span="19"><div class="grid-content ep-bg-purple">
      <el-container class="layout-container-demo" >
        <el-aside width="30%">
          <el-scrollbar>
            <el-menu @select="MeanClick" class="el-menu-home">
              <SvgIcon name="beeDog" class="logo"/>
              <a class="logoTittle">Hives Platform</a>
              <el-menu-item class="main-menu-item" index="/home"><el-icon><Monitor /></el-icon>Home</el-menu-item>
              <el-menu-item class="main-menu-item" index="/explore"><el-icon><Search /></el-icon>Explore</el-menu-item>
              <el-menu-item class="main-menu-item" index="/notifications"><el-icon><Bell /></el-icon>Notifications</el-menu-item>
              <el-menu-item class="main-menu-item" index="4"><el-icon><Message /></el-icon>Message</el-menu-item>
              <el-menu-item class="main-menu-item" index="5"><el-icon><Star /></el-icon>Bookmarks</el-menu-item>
              <el-menu-item class="main-menu-item" index="6"><el-icon><Promotion /></el-icon>Hive Yellow</el-menu-item>
              <el-menu-item class="main-menu-item" index="/profile"><el-icon><UserFilled /></el-icon>Profile</el-menu-item>
              <el-menu-item class="main-menu-item" index="8"><el-icon><CirclePlus /></el-icon>More</el-menu-item>
              <el-menu-item class="main-menu-item" index="9"><SvgIcon name="bee" class="bee"/>Hive</el-menu-item>
              <el-menu-item class="main-menu-item" index="10"><el-icon><Tools /></el-icon>Set</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>

<!--        中间内容界面-->
        <el-container>
          <el-header style="text-align: left; font-size: 20px" v-if="this.$router.currentRoute.value.path==='/home'||this.$router.currentRoute.value.path==='/following'">
            <div class="toolbar">
              <div>Home</div>
              <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="MeanClick"
              >
                <el-menu-item index="/home" style="width: 50%">For you</el-menu-item>
                <el-menu-item index="/following" style="width: 50%">Following</el-menu-item>
              </el-menu>
            </div>
          </el-header>
          <el-main class="el-main-content">
            <router-view/>

<!--            广场默认第一选项内容-->
            <div class="foryou-content-box" v-if="this.$router.currentRoute.value.path==='/home'">
<!--              输入框-->
              <div class="comment-input-box">
                <el-form-item :inline="true">
                  <el-avatar :src="userImageUrl" :size="'large'"/>
                  <el-input
                      class="comment-input"
                      v-model="contentInput2"
                      placeholder="What's happening?"
                      :type="'textarea'"
                      :rows="5"
                      style="width:90%;margin-left: 10px;margin-top: 2%"
                  >
                  </el-input>
<!--                  图片上传-->
                  <div class="hives-picture-box"  style="margin-left: 10%;margin-top: 1%" v-if="dialogVisibleForYouUpload">
                    <HivesPublish ref="hiveForYouPublish"/>
                  </div>
<!--                  图标-->
                </el-form-item>
                <el-form-item :inline="true" style="margin-left: 5%">
                  <SvgIcon name="picture" className="picture" @click="PictureClick"/>
                  <SvgIcon name="emoji" className="emoji" @click="emojiShow"/>
                  <SvgIcon name="file" className="file"/>
                  <SvgIcon name="location" className="location"/>
                  <SvgIcon name="tag" className="tag"/>
                  <el-button round style="
                    margin-left: 40%;
                    font-weight: bolder;
                    font-size: 20px;
                    width: 150px;
                    background: #FFD103;"
                   @click="HiveButtonClick2"
                  >Hive</el-button>
                </el-form-item>
                <div class="emoji-container" v-show="emojiHowVisible">
                  <emotion @chooseEmojiDefault="chooseEmojiDefault"/>
                </div>
                <el-divider/>
              </div>
<!--              hive内容区-->
              <div v-for="(item,index) in HivesData" :key="index">

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
                      <div>
                        <ul class="el-upload-list el-upload-list--picture-card">
                          <li class="el-upload-list__item is-success" v-for="fit in item.urls" :key="fit">
                            <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <SvgIcon name="love-g" className="Tips-tag" v-if="!item.isLove" @click="LoveClick(index)"/>
                      <SvgIcon name="love-p" className="Tips-tag" v-if="item.isLove" @click="LoveCancel(index)"/>
                      <a class="tips_num">{{item.likes}}</a>
                      <SvgIcon name="comment-g" className="Tips-tag" @click="showCommentDialog(item.id)"/>
                      <a class="tips_num">{{item.reply}}</a>
                      <SvgIcon name="collection-g" className="Tips-tag" v-if="!item.isCollect" @click="CollectClick(index)"/>
                      <SvgIcon name="collection-y" className="Tips-tag" v-if="item.isCollect" @click="ClickCancel(index)"/>
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


          </el-main>
        </el-container>
      </el-container>
    </div>
    </el-col>


<!--    右侧搜索栏-->
    <el-col :span="5"><div class="grid-content ep-bg-purple" id="search_div">
      <el-aside width="100%" style="text-align: center">
        <el-scrollbar>
          <div>
            <el-input
                class="explore-input"
                v-model="searchInput"
                placeholder="Search Hives"
            />
            </div>
          <div>
            <el-table :data="tableData" style="width: 100%;margin-top: 10px" class="table_trends">
              <el-table-column  label="Trends for you" :header-cell-style="{fontSize: '14px',fontWeight:'bolder',color:'black'}">
                <template  #default="scope">
                  <p style="color: #D3D3D3;font-size: 10px">{{scope.row.place}}</p>
                  <h1 style="color: #696969;font-size: 15px;font-weight: bolder;text-overflow: ellipsis">{{scope.row.trendsname}}</h1>
                  <p style="color: #D3D3D3;font-size: 10px">{{scope.row.num}}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </el-aside>
    </div>
    </el-col>


  </el-row>

<!--  hives发布对话框-->
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="37%"
  >
    <el-input v-model="contentInput" placeholder="Please input" :type="'textarea'" :rows="10"/>
    <div style="margin-top: 10px;margin-left: 10px">
      <HivesPublish ref="hivesMenuPublish"/>
    </div>
    <el-button round class="Hive-button" @click="HiveButtonClick">Hive</el-button>
  </el-dialog>

  <!--  评论对话框-->
  <CommentDialog ref="commentDialog"/>
</template>

<script>

import {ref} from "vue";
import CommentDialog from "../components/CommentDialog.vue";
import HivesPublish from "../components/HivesPublish.vue";
import '../assets/font/font.css'
import emotion from "../components/emotion.vue";

export default {
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
    this.userImageUrl = this.user.header
    this.initHivesShow()
  },
  inject:['reload'],
  components:{
    CommentDialog,
    HivesPublish,
    emotion
  },
  data(){
    return{
      emojiHowVisible:false,
      user:{},
      userImageUrl:'',
      contentInput:'',
      contentInput2:'',
      dialogVisible : false,
      searchInput:'',
      hivesUpload:false,
      dialogVisibleForYouUpload:false,
      tableData : [
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        },
        {
          place:'Trending in Philippines',
          trendsname:'#LADJOAWDQWELADNASSD',
          num:'23,23M Hives'
        }
      ],
      HivesData : [],
    }
  },
  methods: {
    initHivesShow(){
      let params={
        page:1,
        limit:10,
        userId:this.user.id
      }
      this.$http.get('/api/exchange/post/list?',{params}).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.HivesData=res.data.page.list
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    MeanClick(index){
      if(index!=="9"){
        this.$router.push(index);
      }
      else{
        this.dialogVisible=true;
      }
    },
    HiveButtonClick(){
      let pictureUplod = this.$refs.hivesMenuPublish
      //用户上传的图片
      let urlList = []
      for( let item in pictureUplod.fileList){
        urlList.push(pictureUplod.fileList[item].url)
      }
      console.log(urlList)
      //用户输入的内容
      let hivetmp = {
        content: this.contentInput.toString(),
        userId: this.user.id,
        nickname: this.user.nickname,
        type:'',
        urls: urlList
      }
      //发布新的hive
      this.$http.post("/api/exchange/post/save",hivetmp).then(res=>{
        console.log("result",res.msg)
      })
      this.dialogVisible=false
      this.reload()

    },
    HiveButtonClick2(){
      let pictureUplod = this.$refs.hiveForYouPublish
      //用户上传的图片
      let urlList = []
      for( let item in pictureUplod.fileList){
        urlList.push(pictureUplod.fileList[item].url)
      }
      console.log(urlList)
      //用户输入的内容
      let hivetmp = {
        content: this.contentInput2.toString(),
        userId: this.user.id,
        nickname: this.user.nickname,
        type:'',
        urls: urlList
      }
      //发布新的hive
      this.$http.post("/api/exchange/post/save",hivetmp).then(res=>{
        console.log("result",res)
      })
      this.contentInput2=''
      this.hivesUpload=false
      this.reload()
    },
    LoveClick(index){
      this.HivesData[index].isLove=true
      this.HivesData[index].love=this.HivesData[index].love+1
      //toDo
      //点赞
    },
    LoveCancel(index){
      this.HivesData[index].isLove=false
      this.HivesData[index].love=this.HivesData[index].love-1
      //toDo
      //取消点赞
    },
    CollectClick(index){
      this.HivesData[index].isCollect=true
      this.HivesData[index].collection=this.HivesData[index].collection+1
      //toDo
      //收藏
    },
    ClickCancel(index){
      this.HivesData[index].isCollect=false
      this.HivesData[index].collection=this.HivesData[index].collection-1
      //toDO
      //取消收藏
    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
    PictureClick(){
      this.dialogVisibleForYouUpload=true
    },
    chooseEmojiDefault(e){
      this.contentInput += e
      this.contentInput2 += e
    },
    emojiShow(){
      this.emojiHowVisible = !this.emojiHowVisible
    }
  }
}
</script>
<style scoped>
.main-menu-item:hover{
  border-left:none !important;
  background-color:white;
  color: #FFD103 !important;
  font-size: 25px;
}
.main-menu-item.is-active{
  border-left:none !important;
  background-color: rgba(166, 163, 163, 0.99);
  color: #FFD103 !important;
  font-size: 20px;
}
.el-menu-home{
  margin-left: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-main-content{
  width: 800px;
}
#search_div{
  margin-top: 15px;
}
.explore-input{
  width: 250px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
}
.Hive-button{
  margin-top: 20px;
  margin-left: 55%;
  font-weight: bolder;
  font-size: 20px;
  background: #FFD103;
  width: 180px;
  height: 60px;
}
.explore-input{
  width: 80%;
  margin-right: 20%;
  border-radius: 95px;
}
:deep(.el-input__wrapper) {
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
.emoji{
  width: 25px;
  height: 25px;
  margin-left: 30px;
}
.picture{
  width: 25px;
  height: 25px;
  margin-left: 30px;
}
.file{
  width: 25px;
  height: 25px;
  margin-left: 30px;
}
.location{
  width: 25px;
  height: 25px;
  margin-left: 30px;
}
.tag{
  width: 25px;
  height: 25px;
  margin-left: 30px;
}
.Tips-tag{
  width: 25px;
  height: 25px;
  margin-left: 50px;
}
.logo{
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
.logoTittle{
  position: relative;
  bottom: 40px;
  margin-left: 10px;
  font-weight: bolder;
  font-family: 'cocacola';
  font-size: 30px;
}
.tips_num{
  margin-left: 5px;
  position: relative;
  bottom: 5px
}
.bee{
  width: 25px;
  height: 25px;
  margin-left: 50px;
}
.emoji-container {
  background-color: white;
  width: 400px;
  height: 210px;
  position: fixed;
  z-index: 10;
  transition: all 0.2s;
}
</style>

