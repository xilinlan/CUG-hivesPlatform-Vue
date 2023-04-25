<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SvgIcon from "@/components/SvgIcon.vue";
const activeIndex = ref('/home')
</script>

<template>
<!--  左侧导航栏-->
  <el-row :gutter="0">
    <el-col :span="this.$router.currentRoute.value.path==='/message'?24:19"><div class="grid-content ep-bg-purple">
      <el-container class="layout-container-demo" >
        <el-aside :width="this.$router.currentRoute.value.path==='/message'?'23.5%':'30%'">
          <el-scrollbar>
            <el-menu @select="MeanClick" class="el-menu-home">
              <SvgIcon name="beeDog" class="logo"/>
              <a class="logoTittle">Hives Platform</a>
              <el-menu-item class="main-menu-item" index="/home"><el-icon><Monitor /></el-icon>Home</el-menu-item>
              <el-menu-item class="main-menu-item" index="/explore"><el-icon><Search /></el-icon>Explore</el-menu-item>
              <el-menu-item class="main-menu-item" index="/notifications"><el-icon><Bell /></el-icon>Notifications</el-menu-item>
              <el-menu-item class="main-menu-item" index="/message"><el-icon><Message /></el-icon>Message</el-menu-item>
              <el-menu-item class="main-menu-item" index="/likes"><el-icon><Star /></el-icon>Bookmarks</el-menu-item>
              <el-menu-item class="main-menu-item" index="6"><el-icon><Promotion /></el-icon>Hive Pro+</el-menu-item>
              <el-menu-item class="main-menu-item" index="/profile"><el-icon><UserFilled /></el-icon>Profile</el-menu-item>
              <el-menu-item class="main-menu-item" index="8"><el-icon><CirclePlus /></el-icon>More Function</el-menu-item>
<!--              <el-menu-item class="main-menu-item" index="9"><SvgIcon name="bee" class="bee"/>Hive</el-menu-item>-->
              <el-sub-menu index="9">
                <template #title class="main-menu-item">
                  <SvgIcon name="bee" class="bee"/>
                  <span>Hive</span>
                </template>
                <el-menu-item class="main-menu-item" index="9-1"><el-icon><Picture /></el-icon>Primary Hive</el-menu-item>
                <el-menu-item class="main-menu-item" index="9-2"><el-icon><VideoPlay /></el-icon>Video Hive</el-menu-item>
              </el-sub-menu>
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
                <el-menu-item index="/following" style="width: 40%">Following</el-menu-item>
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

<!--              hives内容导航栏-->
              <div style="margin-bottom: 40px;color: #E0E0E0">
                <span v-if="hivesType===0" style="color: #4682B4">Primary Hives</span>
                <span v-if="hivesType!==0" @click="changeToPrimaryHives">Primary Hives</span>
                <el-divider direction="vertical" />
                <span v-if="hivesType===1" style="color: #4682B4">Video Hives</span>
                <span v-if="hivesType!==1" @click="changeToVideoHives">Video Hives</span>
              </div>
<!--              hive文字图片内容区-->
              <div v-if="hivesType===0">

                <div v-for="(item,index) in HivesData" :key="index">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <div class="grid-content ep-bg-purple">
                        <el-popconfirm title="Are you sure to visit profile?" @confirm="visitOtherProfile(item)">
                          <template #reference>
                            <img :src="item.header" style="width: 70px; height: 70px;border-radius: 70px">
                          </template>
                        </el-popconfirm>
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
                              <img style="width: 100%; height: 100%" :src="fit"/>
                            </li>
                          </ul>
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
                    </el-col>
                  </el-row>
                  <el-divider/>
                </div>

              </div>

<!--              hives视频内容区-->
              <div v-if="hivesType===1">

                <div v-for="(item,index) in HivesData" :key="index">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <div class="grid-content ep-bg-purple">
                        <el-popconfirm title="Are you sure to visit profile?" @confirm="visitOtherProfile(item)">
                          <template #reference>
                            <img :src="item.header" style="width: 70px; height: 70px;border-radius: 70px">
                          </template>
                        </el-popconfirm>
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
                              hhh
                            </li>
                          </ul>
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
                    </el-col>
                  </el-row>
                  <el-divider/>
                </div>

              </div>
<!--              更多内容按钮-->
              <el-pagination
                  class="Hives-Type-Menu"
                  v-model:current-page="currentPage"
                  layout="prev, pager, next"
                  :total="totalCount"
                  @current-change="initHivesShow" />
            </div>



          </el-main>
        </el-container>
      </el-container>
    </div>
    </el-col>


<!--    右侧搜索栏-->
    <el-col :span="5" v-if="this.$router.currentRoute.value.path!=='/message'">
      <div class="grid-content ep-bg-purple" id="search_div">
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
      title="Hives"
      width="37%"
      @close="handleDialogClose"
  >
    <el-input v-model="contentInput" placeholder="Please input" :type="'textarea'" :rows="10"/>
    <div style="margin-top: 10px;margin-left: 10px">
      <HivesPublish ref="hivesMenuPublish"/>
    </div>
    <el-button round class="Hive-button" @click="HiveButtonClick">Hive</el-button>
  </el-dialog>

<!--  videoHive发布对话框-->
  <el-dialog
      v-model="videoDialogVisible"
      title="Hives"
      width="37%"
      @close="handleVideoDialogClose"
  >
    <el-input v-model="videoContentInput" placeholder="Please input" :type="'textarea'" :rows="10"/>
    <div style="margin-top: 10px;margin-left: 10px">
      <VideoPublish ref="hivesMenuVideoUpload"/>
    </div>
    <el-button round class="Hive-button" @click="HiveVideoButtonClick">Hive</el-button>
  </el-dialog>
  <!--  评论对话框-->
  <CommentDialog ref="commentDialog" @updateComment="updatePage"/>

<!--  hive会员选择框-->
  <el-dialog
      v-model="hiveProDialogVisible"
      width="37%"
      class="Hive-Pro-Dialog"
      :destroy-on-close="true"
      :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header" style="font-weight: bolder;font-size: 50px;height: 50px;width: 100%;">
        <el-icon @click="closeHiveProDialog"><CloseBold /></el-icon>
        <a style="position: relative;left: 25%;bottom: 10%">Hive Pro+</a>
      </div>
    </template>
    <el-divider style="position: relative;bottom: 30px"/>
    <div>
      <el-row>
        <el-col :span="16"><a style="font-size: 30px;font-weight: bolder;color: black">Hive subscribers with a verified phone number will get a yellow checkmark once approved</a></el-col>
        <el-col :span="8"> <SvgIcon name="rocket" /></el-col>
      </el-row>
    </div>
    <div style="margin-top: 50px">
      <el-row>
        <el-col :span="5"><SvgIcon name="gift" style="position: relative;right: 60%;bottom: 10%"/></el-col>
        <el-col :span="19">
          <div style="font-size: 30px;font-weight: bolder;color: black">All the existing Yellow features</div>
          <a style="font-size: 20px">Edit Hive,1080p video uploads,Reader,custom navigation,Bookmark Folders,Top Articles and more</a>
        </el-col>
      </el-row>
    </div>
    <div style="margin-left: 11%;margin-top: 50px">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="Pro-chose-box" :style="annualPlanChosen?'border-color:#FFD103;  border-style: solid;' : 'border-color:#8e9292;'" @click="AnnualPlanClick">
            <div style="position: relative;top:10%;left:10%">
              <div>Annual Plan</div>
              <div style="font-size: 20px;font-weight: bolder">￥25/month</div>
              <div style="width: 80%;">￥300 per year billed annually</div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Pro-chose-box" :style="!annualPlanChosen?'border-color:#FFD103;  border-style: solid;' : 'border-color:#8e9292;'" @click="MonthlyPlanClick">
            <div style="position: relative;top:10%;left:10%">
              <div>Monthly Plan</div>
              <div style="font-size: 20px;font-weight: bolder">￥30/month</div>
              <div style="width: 80%;">￥360 per year billed annually</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-button class="Subscribe-Button" @click="subscribeButtonClick">Subscribe</el-button>
  </el-dialog>
</template>

<script>

import {ref} from "vue";
import CommentDialog from "../components/CommentDialog.vue";
import HivesPublish from "../components/HivesPublish.vue";
import '../assets/font/font.css'
import emotion from "../components/emotion.vue";
import VideoPublish from "../components/VideoPublish.vue";

export default {
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
    this.userImageUrl = this.user.header
    this.initHivesShow()
    window.addEventListener('scroll', this.scrollToTop)
  },
  inject:['reload'],
  components:{
    CommentDialog,
    HivesPublish,
    emotion,
    VideoPublish,
  },
  data(){
    return{
      span:19,
      asideWidth:'30%',
      emojiHowVisible:false,
      user:{},
      userImageUrl:'',
      contentInput:'',
      contentInput2:'',
      videoContentInput:'',
      dialogVisible : false,
      videoDialogVisible:false,
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
      totalCount:0,
      currentPage:1,
      hivesType:0,
      hiveProDialogVisible:false,
      annualPlanChosen:true
    }
  },
  methods: {
    updatePage(page){
      this.initHivesShow()
    },
    initHivesShow(){
      let params={
        page:this.currentPage,
        limit:10,
        userId:this.user.id
      }
      this.$http.get('/api/exchange/post/list?',{params}).then(res=>{
        console.log(res)
        if(res.data.code===200){
          this.HivesData=res.data.page.list
          this.totalCount=res.data.page.totalCount
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    MeanClick(index){
      if(index!=="9"&&index!=="9-1"&&index!=="9-2"){
        if(index==="6"){
          this.hiveProDialogVisible=true
          return
        }
        this.$router.push(index);
      }
      else{
        if(index==="9-1"){
          this.dialogVisible=true;
        }else{
          this.videoDialogVisible=true
        }

      }
    },
    HiveButtonClick(){
      // 用户上传的图片
      let urlList = []
      if(this.$refs.hivesMenuPublish!==undefined){
        let pictureUplod = this.$refs.hivesMenuPublish
        console.log(pictureUplod)
        for( let item in pictureUplod.fileList){
          urlList.push(pictureUplod.fileList[item].url)
        }
      }
      //用户输入的内容
      let params = {
        "content": this.contentInput.toString(),
        "userId": this.user.id,
        "nickname": this.user.nickname,
        "type":0,
        "urls": urlList
      }
      console.log('params',params)
      console.log('urlList',urlList)
      //发布新的hive
      this.$http.post("/api/exchange/post/save",params).then(res=>{
        console.log("result",res.msg)
        this.initHivesShow()
      })
      this.$refs.hivesMenuPublish.initHiveList([])
      this.contentInput=''
      this.dialogVisible=false

    },
    HiveButtonClick2(){
      // 用户上传的图片
      let urlList = []
      if(this.$refs.hiveForYouPublish!==undefined){
        let pictureUplod = this.$refs.hiveForYouPublish
        for( let item in pictureUplod.fileList){
          urlList.push(pictureUplod.fileList[item].url)
        }
      }
      // 用户输入的内容
      let params = {
        "content": this.contentInput2.toString(),
        "userId": this.user.id,
        "nickname": this.user.nickname,
        "type":0,
        urls: urlList
      }
      // console.log('content:'+hivetmp.content)
      //发布新的hive
      this.$http.post("/api/exchange/post/save",params).then(res=>{
        console.log("result",res.msg)
        this.initHivesShow()
      })
      this.contentInput2=''
      this.$refs.hiveForYouPublish.initHiveList([])
      this.dialogVisibleForYouUpload=false
    },
    LoveClick(index){
      this.HivesData[index].isLove=true
      this.HivesData[index].likes=this.HivesData[index].likes+1
      //点赞
      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }
      console.log(params)
      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("点赞",ref)
      })
    },
    LoveCancel(index){
      this.HivesData[index].isLove=false
      this.HivesData[index].likes=this.HivesData[index].likes-1
      //toDo
      //取消点赞
      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }

      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("取消点赞",ref)
      })
    },
    CollectClick(index){
      this.HivesData[index].isCollect=true
      this.HivesData[index].collects=this.HivesData[index].collects+1
      //toDo
      //收藏

      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("收藏",ref)
      })

    },
    ClickCancel(index){
      this.HivesData[index].isCollect=false
      this.HivesData[index].collects=this.HivesData[index].collects-1
      //toDO
      //取消收藏

      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("取消收藏",ref)
      })

    },
    showCommentDialog(hive){
      this.$refs.commentDialog.showDialog(hive)
    },
    PictureClick(){
      this.dialogVisibleForYouUpload=!this.dialogVisibleForYouUpload
    },
    chooseEmojiDefault(e){
      this.contentInput2 += e
    },
    emojiShow(){
      this.emojiHowVisible = !this.emojiHowVisible
    },
    visitOtherProfile(item){
      console.log(item)
      this.$router.push({path: '/other-profile',query:{ userId:item.userId}});
    },
    handleDialogClose(){
      this.contentInput=''
      this.$refs.hivesMenuPublish.initHiveList([])
    },
    handleVideoDialogClose(){
      this.videoContentInput=''
      this.$refs.hivesMenuVideoUpload.initFileList([])
    },
    changeToPrimaryHives(){
      this.hivesType=0
    },
    changeToVideoHives(){
      this.hivesType=1
    },
    HiveVideoButtonClick(){
      //toDo
      //上传视频
    },
    AnnualPlanClick(){
      this.annualPlanChosen=true
      console.log("ceshi1ceshi1")
    },
    MonthlyPlanClick(){
      this.annualPlanChosen=false
    },
    closeHiveProDialog(){
      this.hiveProDialogVisible=false
    },
    subscribeButtonClick(){
      this.hiveProDialogVisible=false
      //TODO
      //订阅会员服务
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
.Page-Menu{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.Pro-chose-box{
  width: 200px;
  height: 100px;
  border-radius: 30px;
  box-shadow: 0 5px 10px #606060;
  border-color: #FFD103;
  border-width: 2px;
}
.Subscribe-Button{
  width: 40%;
  margin-top: 5%;
  margin-left: 29%;
  border-radius: 50px;
  height: 50px;
  color: white;
  font-weight: bolder;
  font-size: 20px;
  background-color: black;
}
</style>

