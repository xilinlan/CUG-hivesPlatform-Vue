<template>
  <el-upload
      class="upload-demo"
      v-model:file-list="fileList"
      :action="'http://upload-z2.qiniup.com'"
      :on-success="handleSuccess"
      :data="dataObj"
      accept=".mp4,.mov,.wmv,.flv,.avi,.webm,.mkv,.avchd"
  >
    <el-button type="primary">Upload Video</el-button>
  </el-upload>
  <div v-for="item in fileList" style="margin-top: 5px">
    <video :src="item.url" class="avatar" controls="controls" style="width: 100%"/>
  </div>
</template>

<script>
export default {
  name: "VideoPublish",
  mounted(){
    this.getDirAndToken()
    this.actionUrl='http://rszvgtifo.hn-bkt.clouddn.com/'
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