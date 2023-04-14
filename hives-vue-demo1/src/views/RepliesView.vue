<template>
  <el-upload
      v-model:file-list="fileList"
      accept="#"
      :auto-upload='false'
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="UploadFun"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible_upload">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>
export default {
  name: "RepliesView",
  data(){
    return{
      dialogVisible_upload:false,
      dialogImageUrl:'',
      fileList:[],
    }
  },
  methods:{
    handleRemove(file, fileList) {
      console.log("file",file)
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
      })
    },
    UploadFun(param){

    }
  }
}
</script>

<style scoped>

</style>