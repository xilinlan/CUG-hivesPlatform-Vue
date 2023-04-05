<script setup>

import SvgIcon from "@/components/SvgIcon.vue";

</script>

<template>
  <div>
    <el-image style="width: 70px; height: 70px;border-radius: 70px;margin-top: 40px;margin-left: 40px" :src="url" :fit="fit"/>
    <a style="margin-left: 15px; position: relative;bottom: 20px;font-weight: bolder;font-size: 30px">What's happening?</a>
  </div>
  <div style="margin-top: 50px;margin-left: 100px">
    <SvgIcon name="picture" className="picture" />
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
                  <SvgIcon name="love-g" className="Tips-tag" />
                  <a class="tips_num">{{scope.row.love}}</a>
                  <SvgIcon name="comment-g" className="Tips-tag" />
                  <a class="tips_num">{{scope.row.comment_tips}}</a>
                  <SvgIcon name="collection-g" className="Tips-tag" />
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
</template>

<script>
export default {
  name: "ForyouView",
  data(){
    return{
      url : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogImageUrl:'',
      dialogVisibleimge:false,
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
          love:'102',
          comment_tips:'67',
          collection:'88',
          hot:'9895'
        },
        {
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          user_email:'#Retuers@XXXXX.com',
          nickname:"Retuers",
          time:'1h',
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          url:['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',],
          love:'102',
          comment_tips:'67',
          collection:'88',
          hot:'9895'
        },
        {
          user_image:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          user_email:'#Retuers@XXXXX.com',
          nickname:"Retuers",
          time:'1h',
          content:'UK finance minister says SVB rescue necessary to protect UK tech',
          url:['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg','https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',],
          love:'102',
          comment_tips:'67',
          collection:'88',
          hot:'9895'
        },
      ],
    }
  },
  methods:{
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file
      this.dialogVisibleimge = true
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
</style>