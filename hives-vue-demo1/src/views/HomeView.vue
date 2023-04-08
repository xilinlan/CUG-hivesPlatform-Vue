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
              <el-menu-item class="main-menu-item" index="/home"><el-icon><Monitor /></el-icon>Home</el-menu-item>
              <el-menu-item class="main-menu-item" index="/explore"><el-icon><Search /></el-icon>Explore</el-menu-item>
              <el-menu-item class="main-menu-item" index="/notifications"><el-icon><Bell /></el-icon>Notifications</el-menu-item>
              <el-menu-item class="main-menu-item" index="4"><el-icon><Message /></el-icon>Message</el-menu-item>
              <el-menu-item class="main-menu-item" index="5"><el-icon><Star /></el-icon>Bookmarks</el-menu-item>
              <el-menu-item class="main-menu-item" index="6"><el-icon><Promotion /></el-icon>Hive Yellow</el-menu-item>
              <el-menu-item class="main-menu-item" index="/profile"><el-icon><UserFilled /></el-icon>Profile</el-menu-item>
              <el-menu-item class="main-menu-item" index="8"><el-icon><CirclePlus /></el-icon>More</el-menu-item>
              <el-menu-item class="main-menu-item" index="9">Hive</el-menu-item>
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
                      v-model="commentInput"
                      placeholder="What's happening?"
                      :type="'textarea'"
                      :rows="5"
                      style="width:90%;margin-left: 10px;margin-top: 2%"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item :inline="true" style="margin-left: 5%">
                  <SvgIcon name="picture" className="picture" @click="PictureClick"/>
                  <SvgIcon name="emoji" className="emoji"/>
                  <SvgIcon name="file" className="file"/>
                  <SvgIcon name="location" className="location"/>
                  <SvgIcon name="tag" className="tag"/>
                  <el-button round style="
                    margin-left: 40%;
                    font-weight: bolder;
                    font-size: 20px;
                    width: 150px;
                    background: #FFD103;"
                  >Hive</el-button>
                </el-form-item>
                <el-divider/>
              </div>

<!--              hive内容区-->
              <div v-for="(item,index) in HivesData" :key="index">

                <el-row :gutter="20">
                  <el-col :span="4">
                    <div class="grid-content ep-bg-purple">
                      <img :src="item.user_image" style="width: 70px; height: 70px;border-radius: 70px">
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div>
                      <div>
                        <a style="font-size: 20px;font-weight: bolder">{{item.nickname}}</a>
                        <a style="color: #BEBEBE;margin-left: 5px">{{item.user_email}}</a>
                        <a style="color: #BEBEBE"> . </a>
                        <a style="color: #BEBEBE">{{item.time}}</a>
                      </div>
                      <p>{{item.content}}</p>
                      <div>
                        <ul class="el-upload-list el-upload-list--picture-card">
                          <li class="el-upload-list__item is-success" v-for="fit in item.url" :key="fit">
                            <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <SvgIcon name="love-g" className="Tips-tag" v-if="!item.isLove" @click="LoveClick(index)"/>
                      <SvgIcon name="love-p" className="Tips-tag" v-if="item.isLove" @click="LoveCancel(index)"/>
                      <a class="tips_num">{{item.love}}</a>
                      <SvgIcon name="comment-g" className="Tips-tag" @click="showCommentDialog(item.id)"/>
                      <a class="tips_num">{{item.comment_tips}}</a>
                      <SvgIcon name="collection-g" className="Tips-tag" v-if="!item.isCollect" @click="CollectClick(index)"/>
                      <SvgIcon name="collection-y" className="Tips-tag" v-if="item.isCollect" @click="ClickCancel(index)"/>
                      <a class="tips_num">{{item.collection}}</a>
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
    <el-input v-model="content_input" placeholder="Please input" :type="'textarea'" :rows="10"/>
    <div style="margin-top: 10px;margin-left: 10px">
      <el-upload
          v-model:file-list="fileList"
          accept="#"
          :auto-upload='false'
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible_upload">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <el-button round class="Hive-button" @click="HiveButtonClick">Hive</el-button>
  </el-dialog>

  <!--  评论对话框-->
  <CommentDialog ref="commentDialog"/>
</template>

<script>

import {ref} from "vue";
import CommentDialog from "../components/CommentDialog.vue";

export default {
  inject:['reload'],
  components:{
    CommentDialog
  },
  data(){
    return{
      userImageUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      content_input:'',
      dialogVisible : false,
      dialogVisible_upload:false,
      dialogImageUrl:'',
      searchInput:'',
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
      fileList:[],
      HivesData : [
        {
          id:1,
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          user_email:'#Retuers@XXXXX.com',
          nickname:"Retuers",
          time:'1h',
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          url:['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',],
          love:102,
          comment_tips:67,
          collection:88,
          hot:9895,
          isCollect:false,
          isLove:false
        },
        {
          id:2,
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          user_email:'#Retuers@XXXXX.com',
          nickname:"Retuers",
          time:'1h',
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          url:['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',],
          love:102,
          comment_tips:67,
          collection:88,
          hot:9895,
          isCollect:false,
          isLove:false
        },
        {
          id:3,
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          user_email:'#Retuers@XXXXX.com',
          nickname:"Retuers",
          time:'1h',
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          url:['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',],
          love:102,
          comment_tips:67,
          collection:88,
          hot:9895,
          isCollect:false,
          isLove:false
        },
      ],
    }
  },
  methods: {
    testget(){
      console.log("file", this.fileList);
    },
    MeanClick(index){
      if(index!=="9"){
        this.$router.push(index);
      }
      else{
        this.dialogVisible=true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    HiveButtonClick(){
      this.dialogVisible=false;
      this.reload()
    },
    LoveClick(index){
      this.HivesData[index].isLove=true
      this.HivesData[index].love=this.HivesData[index].love+1
    },
    LoveCancel(index){
      this.HivesData[index].isLove=false
      this.HivesData[index].love=this.HivesData[index].love-1
    },
    CollectClick(index){
      this.HivesData[index].isCollect=true
      this.HivesData[index].collection=this.HivesData[index].collection+1
    },
    ClickCancel(index){
      this.HivesData[index].isCollect=false
      this.HivesData[index].collection=this.HivesData[index].collection-1
    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
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
  margin-left: 460px;
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
.tips_num{
  margin-left: 5px;
  position: relative;
  bottom: 5px
}
</style>

