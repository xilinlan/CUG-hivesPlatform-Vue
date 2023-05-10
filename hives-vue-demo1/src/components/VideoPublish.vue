<template>
  <el-upload
      class="upload-demo"
      v-model:file-list="fileList"
      :action="'http://upload-z2.qiniup.com'"
      :on-success="handleSuccess"
      :before-upload="handleBefore"
      :data="dataObj"
      accept=".mp4,.mov,.wmv,.flv,.avi,.webm,.mkv,.avchd"
  >
    <el-button type="primary">Upload Video</el-button>
  </el-upload>
  <div v-for="item in fileList" style="margin-top: 5px">
    <video :src="item.url" class="avatar" controls="controls" style="width: 100%;height: 50%"/>
  </div>
</template>

<script>
export default {
  name: "VideoPublish",
  mounted(){
    this.getDirAndToken()
    this.actionUrl='http://ru8697eyl.hn-bkt.clouddn.com/'
  },
  data() {
    return {
      dialogVisible_upload: false,
      dialogImageUrl: "",
      fileList: [],
      actionUrl:'',
      dataObj:{
        token:'',
      },
    };
  },
  methods: {
    initFileList(fileList){
      this.fileList=fileList
    },
    handleBefore(file){
      console.log('文件：', file)
      var FileExt = file.name.replace(/.+\./, "")
      const isLt5M = file.size / 1024 / 1024 < 100
      var extension = ['exe', 'iso'].indexOf(FileExt.toLowerCase()) === -1
      if (!extension){
        this.$message({
          type: 'warning',
          message: '禁止上传 exe, iso 文件！'
        })
        return false
      }
      if (!isLt5M) {
        this.$message({
          type: 'warning',
          message: '附件大小超限，文件不能超过 100M'
        })
        return false
      }
    },
    handleSuccess(response,file,fileList){
      fileList.pop()
      fileList.push({
        name:file.name,
        url:this.actionUrl+response.key
      })
      this.dialogImageUrl=file.url
      console.log("url",fileList)
    },
    getDirAndToken(){
      this.$http.get("/api/third/oss/policy").then(res=>{
        this.dataObj.token=res.data.data.upToken
        console.log(res)
        console.log(res.data.data.upToken)
        console.log(this.dataObj.token)
      })
    },
  },
}
</script>

<style scoped>

</style>
