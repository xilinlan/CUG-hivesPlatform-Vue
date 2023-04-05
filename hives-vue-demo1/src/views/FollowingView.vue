<template>
  <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
      <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible_upload">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
  </el-dialog>

</template>

<script lang="ts">
export default {
  name: "FollowingView",
  data() {
    return {
      dialogVisible:false,
      dialogImageUrl: '',
      dialogVisible_upload: false
    };
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<script lang="ts" setup>

import { Plus } from '@element-plus/icons-vue'

</script>

<style scoped>

</style>