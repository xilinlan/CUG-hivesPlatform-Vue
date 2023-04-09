<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<template>
<!--  hives动态区域-->
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

<!--  评论区域-->
  <CommentDialog ref="commentDialog"/>
</template>

<script>
import CommentDialog from "../components/CommentDialog.vue";
export default {
  name: "LikesView",
  components:{
    CommentDialog
  },
  data(){
    return{
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
          isCollect:true,
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
          isCollect:true,
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
          isCollect:true,
          isLove:false
        },
      ],
    }
  },
  methods:{
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
    ClickCancel(index){
      this.HivesData[index].isCollect=false
      this.HivesData[index].collection=this.HivesData[index].collection-1
      this.HivesData.splice(index,1)
      //toDo
      //取消收藏
    },
    showCommentDialog(id){
      this.$refs.commentDialog.showDialog(id)
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