<template>
  <el-upload
      v-model:file-list="fileList"
      :action="'http://upload-z2.qiniup.com'"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :data="dataObj"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible_upload">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script>

export default {
  name: "HivesPublish",
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
    handleSuccess(response,file,fileList){
      fileList.pop()
      fileList.push({
        name:file.name,
        url:this.actionUrl+response.key
      })
      console.log("url",response)
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
};
</script>

<style scoped>
</style>