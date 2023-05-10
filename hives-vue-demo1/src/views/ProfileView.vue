<script setup>
import {ref} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { InfoFilled } from '@element-plus/icons-vue'
import routers   from "@/router";


</script>

<template>
<!--  上方头像名字板块-->
  <div style="height:350px;position: relative">
    <el-image :src="backImageUrl" :fit="'cover'" class="background-image"/>
    <el-popconfirm
        width="300px"
        confirm-button-text="OK"
        cancel-button-text="No, Thanks"
        :icon="InfoFilled"
        icon-color="#626AEF"
        @confirm="ShowProAndBackDialog"
        title="Are you sure to edit your profile and background?"
    >
      <template #reference>
        <el-image :src="userImageUrl" :fit="'cover'" class="user-image"/>
      </template>
    </el-popconfirm>
    <div class="follow-box">
      <div class="userInfo-box">
        <p class="user-name">{{userName}}</p>
        <a class="user-count">{{userCount}}</a>
        <el-icon style="margin-left: 5px"><Calendar /></el-icon>
        <a class="user-count" style="margin-left: 5px">{{birthday}}</a>
      </div>
      <div style="margin-top: 20px">
        <a class="follow-number">{{FollowingNum}}</a>
        <a style="margin-left: 5px">Following</a>
        <a class="follow-number" style="margin-left: 50px">{{FollowerNum}}</a>
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
            <el-menu-item index="/media" class="menu-item">Media</el-menu-item>
            <el-menu-item index="/replies" class="menu-item">Replies</el-menu-item>
            <el-menu-item index="/likes">Likes</el-menu-item>
          </el-menu>
        </el-header>
<!--        下方内容-->
        <el-main>
          <router-view/>
<!--          默认第一选择hives内容-->
          <div v-if="routers.currentRoute.value.path==='/profile'">
            <div v-for="(item,index) in hivesTable" :key="index">
              <p style="color: #606266">{{ item.updateTime}}</p>
              <p style="margin-bottom: 10px;font-size: 20px">{{ item.content }}</p>
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
                <SvgIcon name="edit" className="Tips-tag" @click="EditHives(index)"/>
                <SvgIcon name="delete" className="Tips-tag" @click="DeleteHives(index)"/>
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
      width="40%"
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
    <div style="margin-left: 5%;margin-top: 10px;margin-bottom: 10px">
      <HivesEdit ref="hivesImageChange"/>
    </div>

    <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px;width: 100%" @click="EditHiveButtonClick">Edit</el-button>
  </div>
  </el-dialog>

<!--  个人信息与背景编辑框-->
  <el-dialog
      v-model="ProAndBackEditDialogVisible"
      title="Edit Profile and Background"
      width="35%"
  >
    <el-form v-model="editForm" label-width="120px">
      <el-form-item label="NickName:">
        <el-input v-model="editForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="birthday:">
        <el-date-picker
            v-model="editForm.birthday"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="Pick a day"
        />
      </el-form-item>
      <el-form-item label="User Picture">
        <PictureChange ref="userImageChange"/>
      </el-form-item>
      <el-form-item label="Background Picture">
        <PictureChange ref="groundImageChange"/>
      </el-form-item>
    </el-form>
    <el-button round @click="EditProfileClick" style="margin-left: 25%;width: 50%;height: 50px;background-color:#FFD103">Save</el-button>
  </el-dialog>
</template>


<script>
import CommentDialog from "../components/CommentDialog.vue";
import {reactive, ref} from "vue";
import HivesPublish from "../components/HivesPublish.vue";
import PictureChange from "../components/PictureChange.vue";
import HivesEdit from "../components/HivesEdit.vue";
import router from "@/router";

export default {
  name: "ProfileView",
  components:{
    CommentDialog,
    HivesPublish,
    PictureChange,
    HivesEdit,
  },
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
    this.userImageUrl=this.user.header
    this.userCount=this.user.email
    this.userName = this.user.nickname
    this.FollowingNum = this.user.followCount
    this.FollowerNum = this.user.fansCount
    this.birthday = this.user.birthday
    this.backImageUrl = this.user.background

    this.initProfileHives()
  },
  data(){
    return{
      user:{},
      birthday:'',
      backImageUrl:'',
      userImageUrl:'',
      userName:'',
      userCount:'',
      FollowingNum:14,
      FollowerNum:23,
      hivesTable:[],
      commentInput:'',
      hiveContentInput:'',
      currentHiveIndex:0,
      editDialogVisible:false,
      hivesDialogImageUrl:'',
      editDialogVisibleUpload:false,
      ProAndBackEditDialogVisible:false,
      editForm:reactive({
        nickName:'',
        birthday:'',
      }),
      activeIndex: ref('/profile'),
      limit:10,
      totalCount:0,
      currentPage:1,
    }
  },
  methods: {
    initProfileHives(){
      let params={
        "page":this.currentPage,
        "limit":this.limit,
        "userId":this.user.id
      }

      this.$http.get('/api/exchange/post/own?',{params}).then(ref=>{
        console.log("profile",ref.data)
        if(ref.data.code===200){
          this.hivesTable=ref.data.page.list
          this.totalCount=ref.data.page.totalCount
          console.log('this.table',this.hivesTable)
        }
        else{
          this.$message({
            message:ref.data.msg,
            typr:'error'
          })
        }
      })
    },
    EditProfileClick(){
      //用户点击保存按钮，将用户修改信息保存到数据库
      console.log(this.$refs.userImageChange.fileList)
      let profile = {
        id:this.user.id,
        nickname:this.editForm.nickName,
        birthday:this.editForm.birthday,
        header:this.$refs.userImageChange.fileList[0].url,
        background:this.$refs.groundImageChange.fileList[0].url
      }
      this.$http.post('api/user/user/updatePersonal',profile).then(res=>{
        console.log(res)
        if(res.data.code===200){

          this.userImageUrl=this.$refs.userImageChange.fileList[0].url
          this.backImageUrl=this.$refs.groundImageChange.fileList[0].url
          this.nickname = this.editForm.nickName
          this.birthday = this.editForm.birthday

          let user = sessionStorage.getItem("user");
          if (user != null) {
            // 将JSON格式的对象解析为js对象，currentUser为一个js对象
            let currentUser= JSON.parse(user);
            sessionStorage.removeItem("user");
            currentUser.id=this.user.id
            currentUser.nickname=this.nickname
            currentUser.birthday=this.birthday
            currentUser.header=this.userImageUrl
            currentUser.background=this.backImageUrl
            console.log('user',currentUser)
            window.sessionStorage.setItem('user',JSON.stringify(currentUser))
          }
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.ProAndBackEditDialogVisible = false
        }
        else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
          this.ProAndBackEditDialogVisible = false
        }
      })
    },
    handleSelect(index){
      router.push(index)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file
      this.dialogVisibleimge = true
    },
    LoveClick(index){
      this.hivesTable[index].isLove=true
      this.hivesTable[index].likes=this.hivesTable[index].likes+1
      // toDo
      //用户点击点赞按钮，数据库点赞数+1
      let params={
        "userId":this.user.id,
        "postId":this.hivesTable[index].id
      }
      console.log(params)
      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("点赞",ref)
      })
    },
    LoveCancel(index){
      this.hivesTable[index].isLove=false
      this.hivesTable[index].likes=this.hivesTable[index].likes-1
      // toDo
      //用户再次点击点赞按钮，数据库点赞数-1
      let params={
        "userId":this.user.id,
        "postId":this.hivesTable[index].id
      }
      console.log(params)
      this.$http.post('/api/exchange/postlikes/update?',params).then(ref=>{
        console.log("点赞",ref)
      })
    },
    CollectClick(index){
      this.hivesTable[index].isCollect=true
      this.hivesTable[index].collects=this.hivesTable[index].collects+1
      // toDo
      //用户点击收藏按钮，数据库收藏数+1

      let params={
        "userId":this.user.id,
        "postId":this.hivesTable[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("收藏",ref)
      })

    },
    ClickCancel(index){
      this.hivesTable[index].isCollect=false
      this.hivesTable[index].collects=this.hivesTable[index].collects-1
      // toDo
      //用户再次点击收藏按钮，数据库收藏数-1

      let params={
        "userId":this.user.id,
        "postId":this.hivesTable[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("收藏",ref)
      })

    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
    DeleteHives(index){
      // toDo
      //根据前端返回的动态id后端删除该动态
      console.log('--index--',this.hivesTable[index].id)
      let params=[this.hivesTable[index].id]
      this.$http.post('/api/exchange/post/delete/',params).then(ref=>{
        console.log("删除",ref)
      })
      this.hivesTable.splice(index,1)

    },
    EditHives(index){
      this.currentHiveIndex=index
      this.editDialogVisible=true
      this.hiveContentInput=this.hivesTable[index].content
      let editImageList=this.hivesTable[index].urls?.map(item=>{
        return{
          name:item,
          url:item,
        }
      })
      console.log('editImagList',editImageList)
      this.$nextTick(()=>{
        this.$refs.hivesImageChange.initList(editImageList)
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
      let editImageList = this.$refs.hivesImageChange.fileList
      console.log("editImageList",editImageList)
      let currentImageList=[]
      for(let item in editImageList){
        currentImageList.push(editImageList[item].url)
      }
      console.log("currenImageList",currentImageList)
      this.hivesTable[this.currentHiveIndex].urls=currentImageList
      this.hivesTable[this.currentHiveIndex].content=this.hiveContentInput
      this.editDialogVisible=false
      //toDo
      //编辑hive
    },
    ShowProAndBackDialog(){
      this.editForm.nickName = this.userName
      this.editForm.birthday = this.birthday
      this.ProAndBackEditDialogVisible=true
      let tmpUrl=[]
      tmpUrl.push(this.userImageUrl)
      tmpUrl = tmpUrl.map(item=>{
        return{
          name:item,
          url:item,
        }
      })
      let tmpUrl2=[]
      tmpUrl2.push(this.backImageUrl)
      tmpUrl2 = tmpUrl2.map(item=>{
        return{
          name:item,
          url:item,
        }
      })
      this.$nextTick(()=>{
        this.$refs.userImageChange.initList(tmpUrl)
        this.$refs.groundImageChange.initList(tmpUrl2)
      })

    },
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
