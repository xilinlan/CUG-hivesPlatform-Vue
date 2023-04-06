<script setup>

import SvgIcon from "@/components/SvgIcon.vue";

</script>

<template>
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
          :on-preview="UploadHandlePictureCardPreview"
          :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible_upload">
        <img w-full :src="HivesdialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <el-button round class="Hive-button" @click="HiveButtonClick">Hive</el-button>
  </el-dialog>
  <div>
    <el-image style="width: 70px; height: 70px;border-radius: 70px;margin-top: 40px;margin-left: 40px" :src="user_imageURL" :fit="fit"/>
    <a style="margin-left: 15px; position: relative;bottom: 20px;font-weight: bolder;font-size: 30px">What's happening?</a>
  </div>
  <div style="margin-top: 50px;margin-left: 100px">
    <SvgIcon name="picture" className="picture" @click="PictureClick"/>
    <SvgIcon name="emoji" className="emoji"/>
    <SvgIcon name="file" className="file"/>
    <SvgIcon name="location" className="location"/>
    <SvgIcon name="tag" className="tag"/>
    <el-button round class="Hive-button">Hive</el-button>
  </div>
  <div>
    <el-divider></el-divider>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%" :show-header="false">
      <el-table-column>
        <template  #default="scope">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content ep-bg-purple">
                <img :src="scope.row.user_image" style="width: 70px; height: 70px;border-radius: 70px">
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content ep-bg-purple">
                <div><a style="font-size: 20px;font-weight: bolder">{{scope.row.nickname}}</a>
                  <a style="color: #BEBEBE;margin-left: 2px">{{scope.row.user_email}}</a>
                  <a style="color: #BEBEBE"> . </a>
                  <a style="color: #BEBEBE">{{scope.row.time}}</a></div>
                <p>{{scope.row.content}}</p>
                <div>
                  <ul class="el-upload-list el-upload-list--picture-card">
                    <li class="el-upload-list__item is-success" v-for="fit in scope.row.url" :key="fit">
                      <img style="width: 100%; height: 100%" :src="fit" @click="handlePictureCardPreview(fit)"/>
                    </li>
                  </ul>
                </div>
                <div>
                  <SvgIcon name="love-g" className="Tips-tag" v-if="!scope.row.isLove" @click="LoveClick(scope.$index)"/>
                  <SvgIcon name="love-p" className="Tips-tag" v-if="scope.row.isLove" @click="LoveCancel(scope.$index)"/>
                  <a class="tips_num">{{scope.row.love}}</a>
                  <SvgIcon name="comment-g" className="Tips-tag" @click="commentDialogVisible=true"/>
                  <a class="tips_num">{{scope.row.comment_tips}}</a>
                  <SvgIcon name="collection-g" className="Tips-tag" v-if="!scope.row.isCollect" @click="CollectClick(scope.$index)"/>
                  <SvgIcon name="collection-y" className="Tips-tag" v-if="scope.row.isCollect" @click="ClickCancel(scope.$index)"/>
                  <a class="tips_num">{{scope.row.collection}}</a>
                  <SvgIcon name="statistics-g" className="Tips-tag" />
                  <a class="tips_num">{{scope.row.hot}}</a>
                  <SvgIcon name="share-g" className="Tips-tag" />
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisibleimge">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>

<!--  评论区对话框-->
  <el-dialog
      v-model="commentDialogVisible"
      title="Comments"
      width="50%"
  >
    <div class="my-reply" >
      <el-form-item :inline="true">
        <el-avatar :src="user_imageURL"></el-avatar>
        <el-input
            class="comment-input"
            v-model="comment_input"
            placeholder="Please input your comment"
            style="width:500px;margin-left: 10px;"
        >
        </el-input>
        <el-button round style="background: #FFD103;font-weight: bolder;border-radius: 95px">Round</el-button>
      </el-form-item>
      <el-divider />
      <div class="tips-comment">
        <div class="each-comment" v-for="item in commentData">
          <el-row>
            <el-col :span="2">
              <el-avatar :src="item.user_image"></el-avatar>
            </el-col>
            <el-col :span="23.3">
              <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{item.user_nickname}}</h1>
              <p style="font-size: 10px;color: #696969;font-weight: lighter">{{ item.create_time }}</p>
              <p style="font-weight: lighter;color: #181818;font-size: 15px">{{item.content}}</p>
              <el-icon><Comment /></el-icon>
              <a class="Comment-reply-num">{{item.reply_num}}</a>
              <el-collapse>
                <el-collapse-item v-if="item.reply_num!==0">
                  <div class="each-reply" v-for="replyItem in item.reply_data">
                    <el-row>
                      <el-col :span="1.9">
                        <el-avatar :src="replyItem.user_image"></el-avatar>
                      </el-col>
                      <el-col :span="21.4">
                        <h1 style="font-weight: bolder;color: #181818;font-size: 15px">{{replyItem.user_nickname}}</h1>
                        <p style="font-size: 10px;color: #696969;font-weight: lighter">{{replyItem.create_time }}</p>
                        <a style="font-weight: lighter;color:#4682B4;font-size: 15px">回复{{replyItem.target_nickname}}: </a>
                        <a style="font-weight: lighter;color: #181818;font-size: 15px">{{replyItem.content}}</a>
                      </el-col>
                      <el-divider/>
                    </el-row>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
          <el-divider/>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ForyouView",
  data(){
    return{
      user_imageURL : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      comment_input:'',
      commentDialogVisible:false,
      dialogImageUrl:'',
      dialogVisibleimge:false,
      dialogVisible_upload:false,
      HivesdialogImageUrl:'',
      content_input:'',
      dialogVisible : false,
      fileList:[],
      tableData : [
        {
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
      commentData :[
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
          reply_data:[
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
        },
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
          reply_num:1,
          user_image:'https://img.wxcha.com/m00/12/db/594dd9fb43029a58df9acc0e4591d94b.jpg',
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
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
          reply_data:[
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
            }
          ]
        },
      ],
    }
  },
  methods:{
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file
      this.dialogVisibleimge = true
    },
    LoveClick(index){
      this.tableData[index].isLove=true
      this.tableData[index].love=this.tableData[index].love+1
    },
    LoveCancel(index){
      this.tableData[index].isLove=false
      this.tableData[index].love=this.tableData[index].love-1
    },
    CollectClick(index){
      this.tableData[index].isCollect=true
      this.tableData[index].collection=this.tableData[index].collection+1
    },
    ClickCancel(index){
      this.tableData[index].isCollect=false
      this.tableData[index].collection=this.tableData[index].collection-1
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    UploadHandlePictureCardPreview(file) {
      this.HivesdialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    HiveButtonClick(){
      this.dialogVisible=false;
      this.reload()
    },
    PictureClick(){
      this.dialogVisible=true;
    },
  },

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
.Hive-button{
  margin-left: 200px;
  font-weight: bolder;
  font-size: 20px;
  background: #FFD103;
  width: 180px;
  height: 60px;
}
.comment-input{
  width: 300px;
  margin-right: 15px;
  border-radius: 95px;
}
:deep(.el-input__wrapper) {
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
.Comment-reply-num{
  margin-left: 5px;
  position: relative;
  bottom: 3px
}
</style>