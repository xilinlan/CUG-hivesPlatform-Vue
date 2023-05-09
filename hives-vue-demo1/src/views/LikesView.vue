<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<template>
<!--  hives动态区域-->
  <div v-for="(item,index) in HivesData" :key="index">
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
            <SvgIcon name="love-g" className="Tips-tag" v-if="!item.isLove" @click="LoveClick(index)"/>
            <SvgIcon name="love-p" className="Tips-tag" v-if="item.isLove" @click="LoveCancel(index)"/>
            <a class="tips_num">{{item.likes}}</a>
            <SvgIcon name="comment-g" className="Tips-tag" @click="showCommentDialog(item)"/>
            <a class="tips_num">{{item.reply}}</a>
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

<!--  评论区域-->
  <CommentDialog ref="commentDialog"/>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>
import CommentDialog from "../components/CommentDialog.vue";
export default {
  name: "LikesView",
  components:{
    CommentDialog
  },
  mounted() {
    this.initLikesHivesData()
  },
  data(){
    return{
      user:'',
      HivesData : [],
      currentIndex:1,
      limit:10,
      dialogVisible:false,
      dialogImageUrl:''
    }
  },
  methods:{
    initLikesHivesData(){
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
      let params={
        "page":this.currentIndex,
        "limit":this.limit,
        "userId":this.user.id
      }
      this.$http.get('/api/exchange/postcollects/list?',{params}).then(ref=>{
        console.log(ref)
        if(ref.data.code===200){
          this.HivesData=ref.data.page.list
          console.log("likesView",this.HivesData)
        }
      })
    },
    LoveClick(index){
      this.HivesData[index].isLove=true
      this.HivesData[index].likes=this.HivesData[index].likes+1
      //toDo
      //点赞
      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }

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
    ClickCancel(index){
      this.HivesData[index].isCollect=false
      this.HivesData[index].collects=this.HivesData[index].collects-1
      //toDo
      //取消收藏

      let params={
        "userId":this.user.id,
        "postId":this.HivesData[index].id
      }

      this.$http.post('/api/exchange/postcollects/update?',params).then(ref=>{
        console.log("取消收藏",ref)
      })
    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file;
      this.dialogVisible = true;
    },
  }
}
</script>

<style scoped>
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