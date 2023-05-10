<template>
<div>
  <el-divider>图片</el-divider>
  <div>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li class="el-upload-list__item is-success" v-for="fit in pictureTable" :key="fit">
        <img style="width: 100%; height: 100%" :src="fit" />
      </li>
    </ul>
  </div>
  <el-divider>视频</el-divider>
  <div>
    <video :src=fit class="avatar" controls="controls" style="width: 100%;height: 50%" v-for="fit in videoTable"/>
  </div>
</div>
</template>

<script>
export default {
  name: "MediaView",
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
    this.initProfileHives()
  },
  data(){
    return{
      user:{},
      limit:10,
      totalCount:0,
      currentPage:1,
      hivesTable:[],
      videoTable:[],
      pictureTable:[]
    }
  },
  methods:{
    initProfileHives(){
      let params={
        "page":this.currentPage,
        "limit":this.limit,
        "userId":this.user.id
      }

      let tempPictureTable=[]
      let tempVideoTable=[]
      this.$http.get('/api/exchange/post/own?',{params}).then(ref=>{
        console.log("profile",ref.data)
        if(ref.data.code===200){
          this.hivesTable=ref.data.page.list
          this.totalCount=ref.data.page.totalCount
          console.log('this.table',this.hivesTable)
          for(let index in this.hivesTable){
            console.log("测试",this.hivesTable[index].urls)
            if(this.hivesTable[index].type===0){
              this.pictureTable=this.pictureTable.concat(this.hivesTable[index].urls)
            }else{
              this.videoTable=this.videoTable.concat(this.hivesTable[index].urls)
            }
          }
          this.pictureTable=tempPictureTable
          this.videoTable=tempVideoTable
          console.log(this.pictureTable)
        }
        else{
          this.$message({
            message:ref.data.msg,
            typr:'error'
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>