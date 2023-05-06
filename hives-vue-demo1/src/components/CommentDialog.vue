
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
          <el-avatar :src="item.header"></el-avatar>
        </el-col>
        <el-col :span="23.3">
          <div>
            <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{item.userNickname}}</h1>
            <p style="font-size: 10px;color: #696969;font-weight: lighter">{{ item.createTime }}</p>
            <p style="font-weight: lighter;color: #181818;font-size: 15px;">{{item.content}}</p>
          </div>
          <el-icon><Comment /></el-icon>
          <a class="Comment-reply-num">{{item.replyNum}}</a>
          <SvgIcon name="reply" style="width: 16px; height: 16px; margin-left: 30px;margin-bottom:1px" @click="replyToComment(index,item)"></SvgIcon>
          <a class="Comment-reply-num" style="color: #4682B4" @click="replyToComment(index,item)">回复</a>

<!--            评论回复显示区-->

          <el-collapse style="border:none">
            <el-collapse-item v-if="item.replyNum!==0" style="width: 100%">
              <div class="each-reply" v-for="replyItem in item.replyVoList" style="width: 100%">
                <el-row>
                  <el-col :span="1.9">
                    <el-avatar :src="replyItem.header"></el-avatar>
                  </el-col>
                  <el-col :span="21.4">
                    <div style="width: 100%">
                      <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{replyItem.userNickname}}</h1>
                      <p style="font-size: 10px;color: #696969;font-weight: lighter">{{replyItem.createTime }}</p>
                      <a style="font-weight: lighter;color:#4682B4;font-size: 15px">回复{{replyItem.targetNickname}}: </a>
                      <p style="width:100%;font-weight: lighter;color: #181818;font-size: 15px">{{replyItem.content}}</p>
                    </div>
                    <SvgIcon name="reply" style="width: 16px; height: 16px;margin-bottom:1px" @click="replyToReply(index,replyItem,item)"></SvgIcon>
                    <a class="Comment-reply-num" style="color: #4682B4" @click="replyToReply(index,replyItem,item)">回复</a>
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

  <!--  回复窗口2-->
  <el-dialog
      v-model="replyDialogVisible2"
      title="Reply"
      width="40%"
  >
    <!--    回复输入框2-->
    <div class="comment-reply-box">
      <el-form-item :inline="true">
        <el-input
            class="reply-input"
            v-model="replyInput2"
            placeholder="Please input your reply"
            style="width:60%;margin-left: 10px;"
        >
        </el-input>
        <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px" @click="replyButtonClick2">Reply</el-button>
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
      user:{},
      hive:{},
      dialogVisible:false,
      replyDialogVisible:false,
      userImageUrl:'',
      commentInput:'',
      replyInput:'',
      commentList:[],
      hivesID:0,
      replyItem:{},
      currentCommentIndex:0,
      replyDialogVisible2:false,
      replyInput2:'',
      commentItem:{},
    }
  },
  methods:{
    showDialog(hive){
      this.hivesID=hive.id
      this.hive=hive
      // toDo
      //用户信息的获取
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
      this.userImageUrl = this.user.header

      // toDo
      //根据id获取该动态的评论
      let params={
        "postId":this.hivesID
      }
      this.$http.get('/api/exchange/reply/firstLevelComments?',{params}).then(ref=>{
        if(ref.data.code===200){
          this.commentList=ref.data.data
          console.log('comment',ref)
        }
        else {
          this.$message({
            message: ref.data.msg,
            type: 'error'
          })
        }
      })

      this.dialogVisible=true;
    },

    commentInputButton(){
      // toDo
      //根据发送用户信息，评论内容，动态id到后端，后端完成评论记录并返回一下格式的数据
      var item ={
        "postId":this.hivesID,
        "userId":this.user.id,
        "targetId":this.hive.userId,
        "replyId":0,
        content:this.commentInput,
      }

      this.$http.post('/api/exchange/reply/save',item).then(ref=>{
        if(ref.data.code===200){
          this.$message({
            message: ref.data.msg,
            type: 'success'
          })
          this.commentInput=''
          let params={
            "postId":this.hivesID
          }
          this.$http.get('/api/exchange/reply/firstLevelComments?',{params}).then(ref=>{
            if(ref.data.code===200){
              this.commentList=ref.data.data
              console.log('comment',ref)
              this.$emit('updateComment',1)
            }
            else {
              this.$message({
                message: ref.data.msg,
                type: 'error'
              })
            }
          })
        }
        else{
          this.$message({
            message: ref.data.msg,
            type: 'error'
          })
        }
      })

      //更新评论
      let params={
        "postId":this.hivesID
      }
      this.$http.get('/api/exchange/reply/firstLevelComments?',{params}).then(ref=>{
        if(ref.data.code===200){
          this.commentList=ref.data.data
        }
        else {
          this.$message({
            message: ref.data.msg,
            type: 'error'
          })
        }
      })
    },

    replyToComment(index,item){
      this.replyDialogVisible=true
      this.currentCommentIndex=index
      this.replyItem=item
      console.log(item)
    },

    replyToReply(index,replyItem,item){
      this.replyDialogVisible2=true
      this.currentCommentIndex=index
      this.replyItem=replyItem
      this.commentItem=item
    },

    handleClose(){
      this.commentInput=''
      this.dialogVisible=false
    },

    replyButtonClick(){
      let item={
        "postId":this.hivesID,
        "replyId":this.replyItem.id,
        "userId":this.user.id,
        "targetId":this.hive.userId,
        "reply1Id":this.replyItem.id,
        "content":this.replyInput
      }
      this.$http.post('/api/exchange/reply/save',item).then(ref=>{
        console.log("回复",ref)
        //更新评论
        let params={
          "postId":this.hivesID
        }
        this.$http.get('/api/exchange/reply/firstLevelComments?',{params}).then(ref=>{
          if(ref.data.code===200){
            this.commentList=ref.data.data
            console.log('reply_comment',ref)
            this.$emit('updateComment',1)
          }
          else {
            this.$message({
              message: ref.data.msg,
              type: 'error'
            })
          }
        })
      })
      this.replyDialogVisible=false
    },
    replyButtonClick2(){
      let item={
        "postId":this.hivesID,
        "replyId":this.replyItem.id,
        "userId":this.user.id,
        "targetId":this.replyItem.userId,
        "reply1Id":this.commentItem.id,
        "content":this.replyInput2
      }

      this.$http.post('/api/exchange/reply/save',item).then(ref=>{
        console.log("回复",ref)
        //更新评论
        let params={
          "postId":this.hivesID
        }
        this.$http.get('/api/exchange/reply/firstLevelComments?',{params}).then(ref=>{
          if(ref.data.code===200){
            this.commentList=ref.data.data
            console.log('reply_comment',ref)
            this.$emit('updateComment',1)
          }
          else {
            this.$message({
              message: ref.data.msg,
              type: 'error'
            })
          }
        })
      })
      this.replyDialogVisible2=false
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
