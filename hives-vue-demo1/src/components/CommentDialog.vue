
<template>
<!--  评论发布框-->
  <el-dialog
      v-model="dialogVisible"
      title="COMMENT"
      width="40%"
  >
<!--    评论顶部输入区域-->
    <div class="comment-input-box">
      <el-form-item :inline="true">
        <el-avatar :src="userImageUrl"></el-avatar>
        <el-input
            class="comment-input"
            v-model="commentInput"
            placeholder="Please input your comment"
            style="width:60%;margin-left: 10px;"
        >
        </el-input>
        <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px" @click="commentInputButton">Hive</el-button>
      </el-form-item>
    </div>
    <el-divider />
<!--    评论显示区域-->
    <div class="each-comment" v-for="(item,index) in commentList" :key="index">
      <el-row>
        <el-col :span="2">
          <el-avatar :src="item.user_image"></el-avatar>
        </el-col>
        <el-col :span="23.3">
          <div>
            <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{item.user_nickname}}</h1>
            <p style="font-size: 10px;color: #696969;font-weight: lighter">{{ item.create_time }}</p>
            <p style="font-weight: lighter;color: #181818;font-size: 15px;">{{item.content}}</p>
          </div>
          <el-icon><Comment /></el-icon>
          <a class="Comment-reply-num">{{item.reply_num}}</a>
          <SvgIcon name="reply" style="width: 16px; height: 16px; margin-left: 30px;margin-bottom:1px" @click="replyToComment(index,item)"></SvgIcon>
          <a class="Comment-reply-num" style="color: #4682B4" @click="replyToComment(index,item)">回复</a>

<!--            评论回复显示区-->

          <el-collapse @change="getReplyButtonClick(index,item.reply_id)" style="border:none">
            <el-collapse-item v-if="item.reply_num!==0" style="width: 100%">
              <div class="each-reply" v-for="replyItem in item.reply_data" style="width: 100%">
                <el-row>
                  <el-col :span="1.9">
                    <el-avatar :src="replyItem.user_image"></el-avatar>
                  </el-col>
                  <el-col :span="21.4">
                    <div style="width: 100%">
                      <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{replyItem.user_nickname}}</h1>
                      <p style="font-size: 10px;color: #696969;font-weight: lighter">{{replyItem.create_time }}</p>
                      <a style="font-weight: lighter;color:#4682B4;font-size: 15px">回复{{replyItem.target_nickname}}: </a>
                      <p style="width:100%;font-weight: lighter;color: #181818;font-size: 15px">{{replyItem.content}}</p>
                    </div>
                    <SvgIcon name="reply" style="width: 16px; height: 16px;margin-bottom:1px" @click="replyToComment(index,replyItem)"></SvgIcon>
                    <a class="Comment-reply-num" style="color: #4682B4" @click="replyToComment(index,replyItem)">回复</a>
                  </el-col>
                  <el-divider/>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>

          <el-divider/>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

<!--  回复窗口-->
  <el-dialog
      v-model="replyDialogVisible"
      title="Reply"
      width="40%"
  >
<!--    回复输入框-->
    <div class="comment-reply-box">
      <el-form-item :inline="true">
        <el-input
            class="reply-input"
            v-model="replyInput"
            placeholder="Please input your reply"
            style="width:60%;margin-left: 10px;"
        >
        </el-input>
        <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px" @click="replyButtonClick">Reply</el-button>
      </el-form-item>
    </div>
  </el-dialog>
</template>

<script>
import SvgIcon from "../components/SvgIcon.vue";
export default {
  name: "CommentDialog",
  components:{
    SvgIcon
  },
  data(){
    return{
      dialogVisible:false,
      replyDialogVisible:false,
      userImageUrl:'',
      commentInput:'',
      replyInput:'',
      commentList:[],
      hivesID:0,
      replyItem:{},
      currentCommentIndex:0,
    }
  },
  methods:{
    showDialog(id){
      this.hivesID=id
      // toDo
      //用户信息的获取
      this.userImageUrl='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      // toDo
      //根据id获取该动态的评论
      this.commentList = [
        {
          id:1,
          post_id:2,
          reply_id:1,
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          create_time:'2023年4月6日 16:16',
          user_id:232,
          target_id:64,
          user_nickname:'Visitor1',
          target_nickname:'Retuers',
          reply_num:2,
          user_image:'https://img.wxcha.com/m00/12/db/594dd9fb43029a58df9acc0e4591d94b.jpg',
          reply_data:[],
        },
        {
          id:1,
          post_id:2,
          reply_id:1,
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          create_time:'2023年4月6日 16:16',
          user_id:232,
          target_id:64,
          user_nickname:'Visitor2',
          target_nickname:'Retuers',
          reply_num:0,
          user_image:'https://img.wxcha.com/m00/21/32/187b6676378e5bcfe15cd58cea0aa7f3.jpg',
          reply_data:[]
        },
        {
          id:1,
          post_id:2,
          reply_id:1,
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          create_time:'2023年4月6日 16:16',
          user_id:232,
          target_id:64,
          user_nickname:'Visitor2',
          target_nickname:'Retuers',
          reply_num:1,
          user_image:'https://img.wxcha.com/m00/21/32/187b6676378e5bcfe15cd58cea0aa7f3.jpg',
          reply_data:[]
        },
      ]
      this.dialogVisible=true;
    },
    getReplyButtonClick(index,reply_id){
      // toDo
      //根据reply_id获得对应评论的所有回复
      console.log(index)
      this.commentList[index].reply_data=[
        {
          id:1,
          post_id:2,
          reply_id:1,
          content:'我的思路：. 1.首先input_box是我在最外层新增的样式（也可以使用 样式穿透 ，看个人选择）。',
          create_time:'2023年4月6日 16:16',
          user_id:232,
          target_id:64,
          user_nickname:'Retuers',
          target_nickname:'Visitor1',
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          id:1,
          post_id:2,
          reply_id:1,
          content:'我的思路：. 1.首先input_box是我在最外层新增的样式（也可以使用 样式穿透 ，看个人选择）。',
          create_time:'2023年4月6日 16:16',
          user_id:232,
          target_id:64,
          user_nickname:'Vistor2',
          target_nickname:'Retuers',
          user_image:'https://img.wxcha.com/m00/39/43/e6ae8ffa55fb94cb153dc68478f34487.jpg',
        }
      ]
    },
    getMoment(){
      var date=new Date();
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      // 拼接
      return year+"年"+month+"月"+day+"日 "+hours+":"+minutes;
    },
    commentInputButton(){
      // toDo
      //根据发送用户信息，评论内容，动态id到后端，后端完成评论记录并返回一下格式的数据
      var item ={
        id:1,
        post_id:2,
        reply_id:1,
        content:this.commentInput,
        create_time:this.getMoment(),
        user_id:232,
        target_id:64,
        user_nickname:'TestName',
        target_nickname:'',
        reply_num:0,
        user_image:this.userImageUrl,
        reply_data:[],
      }
      this.commentList.push(item)
      this.commentInput=''
    },

    replyToComment(index,item){
      this.replyDialogVisible=true
      this.currentCommentIndex=index
      this.replyItem=item
      console.log(item)
    },

    replyButtonClick(){
      var index = this.currentCommentIndex
      // toDo
      //前端返回输入内容和回复评论或回复的id，后端进行存储并返回下面格式的回复内容
      var item = {
        id:1,
        post_id:2,
        reply_id:1,
        content:this.replyInput,
        create_time:this.getMoment(),
        user_id:12312,
        target_id:this.replyItem.user_id,
        user_nickname:'testName',
        target_nickname:this.replyItem.user_nickname,
        user_image:this.userImageUrl,
      }
      console.log(this.commentList[this.currentCommentIndex])
      this.commentList[index].reply_data.push(item)
      this.commentList[index].reply_num=this.commentList[index].reply_num+1
      this.replyDialogVisible=false
      this.replyInput=''
    }
  },
}
</script>

<style scoped>
.comment-input:deep(.el-input__wrapper){
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
.reply-input:deep(.el-input__wrapper){
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
</style>