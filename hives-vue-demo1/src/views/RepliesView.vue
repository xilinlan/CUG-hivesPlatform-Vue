<template>
<VideoPublish/>
</template>

<script>
import VideoPublish from "../components/VideoPublish.vue";

export default {
  name: "RepliesView",
  components:{
    VideoPublish
  },
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