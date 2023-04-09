<script setup>
import {ref} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
const activeIndex = ref('/profile')
</script>

<template>
<!--  上方头像名字板块-->
  <div style="height:350px;position: relative">
    <el-image :src="this.profileImageUrl" :fit="'cover'" class="background-image"/>
    <el-image :src="this.userImageUrl" :fit="'cover'" class="user-image"/>
    <el-button round class="edit-background-button">Edit profile</el-button>
    <div class="follow-box">
      <div class="userInfo-box">
        <p class="user-name">{{this.userName}}</p>
        <a class="user-count">{{this.userCount}}</a>
      </div>
      <div style="margin-top: 20px">
        <a class="follow-number">{{this.FollowingNum}}</a>
        <a style="margin-left: 5px">Following</a>
        <a class="follow-number" style="margin-left: 50px">{{this.FollowerNum}}</a>
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
            <el-menu-item index="/profile" class="menu-item">Hives</el-menu-item>
            <el-menu-item index="/replies" class="menu-item">Replies</el-menu-item>
            <el-menu-item index="/media" class="menu-item">Media</el-menu-item>
            <el-menu-item index="/likes">Likes</el-menu-item>
          </el-menu>
        </el-header>
<!--        下方内容-->
        <el-main>
          <router-view/>
<!--          默认第一选择hives内容-->
          <div v-if="this.$router.currentRoute.value.path==='/profile'">
            <div v-for="(item,index) in hivesTable" :key="index">
              <p style="color: #606266">{{ item.time}}</p>
              <p style="margin-bottom: 10px;font-size: 20px">{{ item.content }}</p>
              <div>
                <ul class="el-upload-list el-upload-list--picture-card">
                  <li class="el-upload-list__item is-success" v-for="fit in item.url" :key="fit">
                    <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)"/>
                  </li>
                </ul>
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
                <SvgIcon name="edit" className="Tips-tag" @click="EditHives(index)"/>
                <SvgIcon name="delete" className="Tips-tag" @click="DeleteHives(index)"/>
              </div>
              <el-divider/>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>

<!--  评论对话框-->
  <CommentDialog ref="commentDialog"/>

<!--  hives编辑框-->
  <el-dialog
      v-model="editDialogVisible"
      title="Reply"
      width="33.7%"
  >
  <div class="edit-hive-box">
    <el-input
        class="hive-content-input"
        v-model="hiveContentInput"
        placeholder="Please input your content"
        :type="'textarea'"
        :rows="10"
        style="width:100%;"
    >
    </el-input>
    <el-upload
        v-model:file-list="editImageList"
        accept="#"
        :auto-upload='false'
        list-type="picture-card"
        :on-preview="UploadHandlePictureCardPreview"
        :on-remove="handleRemove"
        style="margin-top: 5px"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="editDialogVisibleUpload">
      <img w-full :src="hivesDialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px;width: 100%" @click="EditHiveButtonClick">Edit</el-button>
  </div>
  </el-dialog>
</template>

<script>
import CommentDialog from "../components/CommentDialog.vue";
export default {
  name: "ProfileView",
  components:{
    CommentDialog
  },
  data(){
    return{
      profileImageUrl:'https://ts1.cn.mm.bing.net/th/id/R-C.b233cea1db287ea1ca3e1888da90e6f4?rik=iYNZ47%2bCO2FY1g&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f4%2f6a%2f1f9bd1c552.jpg&ehk=CXpqivABe8%2bwJCsTp0cfer%2fiZCSuRYGXfLGmLH6kKlk%3d&risl=&pid=ImgRaw&r=0',
      userImageUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      userName:'TestName',
      userCount:'XXXX@testEmail',
      FollowingNum:14,
      FollowerNum:23,
      hivesTable:[
        {
          id:1,
          time:'2023年4月6日 16:16',
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
          isLove:false,
          isDelete:false,
        },
        {
          id:2,
          time:'2023年4月6日 16:16',
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
          time:'2023年4月6日 16:16',
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
      commentInput:'',
      hiveContentInput:'',
      editImageList:[],
      currentHiveIndex:0,
      editDialogVisible:false,
      hivesDialogImageUrl:'',
      editDialogVisibleUpload:false
    }
  },
  methods: {
    handleSelect(index){
      this.$router.push(index)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file
      this.dialogVisibleimge = true
    },
    LoveClick(index){
      this.hivesTable[index].isLove=true
      this.hivesTable[index].love=this.hivesTable[index].love+1
      // toDo
      //用户点击点赞按钮，数据库点赞数+1
    },
    LoveCancel(index){
      this.hivesTable[index].isLove=false
      this.hivesTable[index].love=this.hivesTable[index].love-1
      // toDo
      //用户再次点击点赞按钮，数据库点赞数-1
    },
    CollectClick(index){
      this.hivesTable[index].isCollect=true
      this.hivesTable[index].collection=this.hivesTable[index].collection+1
      // toDo
      //用户点击收藏按钮，数据库收藏数+1
    },
    ClickCancel(index){
      this.hivesTable[index].isCollect=false
      this.hivesTable[index].collection=this.hivesTable[index].collection-1
      // toDo
      //用户再次点击收藏按钮，数据库收藏数-1
    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
    DeleteHives(index){
      // toDo
      //根据前端返回的动态id后端删除该动态
      console.log(this.hivesTable[index])
      this.hivesTable.splice(index,1)
    },
    EditHives(index){
      this.currentHiveIndex=index
      this.editDialogVisible=true
      this.hiveContentInput=this.hivesTable[index].content
      this.editImageList=this.hivesTable[index].url.map(item=>{
        return{
          name:item,
          url:item
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    UploadHandlePictureCardPreview(file) {
      this.HivesdialogImageUrl = file.url;
      this.editDialogVisibleUpload = true;
    },
    EditHiveButtonClick(){
      console.log("editImageList",this.editImageList)
      let currentImageList=[]
      for(let item in this.editImageList){
        currentImageList.push(this.editImageList[item].url)
      }
      console.log("currenImageList",currentImageList)
      this.hivesTable[this.currentHiveIndex].url=currentImageList
      this.hivesTable[this.currentHiveIndex].content=this.hiveContentInput
      this.editDialogVisible=false
    }
    //toDo
    //编辑hive
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
  bottom: 20%;
  left: 5%;
  border-width: 10px;
  border-color: white;
  border-style:solid;
}
.follow-box{
  color: #606266;
  font-weight: lighter;
  font-size: 15px;
  position: relative;
  bottom: 60%;
  margin-left: 33%;
}
.menu-box{;
}
.other-box{

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
.edit-background-button{
  margin-left: 80%;
  width: 150px;
  bottom: 50%;
  background: #FFD103;
  font-weight: bolder;
  height: 35px;
  position: relative
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