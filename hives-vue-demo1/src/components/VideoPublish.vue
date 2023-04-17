<template>
  <el-upload
      v-if="!isShow"
      v-model:file-list="fileList"
      :action="'http://upload-z2.qiniup.com'"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1"
      :data="dataObj"
  >
    <el-icon v-if="!isShow"><Plus /></el-icon>
  </el-upload>
  <video :src="dialogImageUrl" class="avatar" controls="controls" v-if="isShow" style="width: 100%"/>
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
      isShow:false,
      actionUrl:'',
      dataObj:{
        token:'',
      },
    };
  },
  methods: {
    handleSuccess(response,file,fileList){
      fileList.pop()
      fileList.push({
        name:file.name,
        url:this.actionUrl+response.key
      })
      this.dialogImageUrl=file.url
      console.log("url",fileList)
      this.isShow=true
    },
    handleRemove(file, fileList) {
      console.log("file", file);
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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