<template>
  <el-input style="width:80%;display: inline-block;" v-model="search_data" placeholder="请输入搜索的关键字">
    <template slot="append">
      <el-button type="primary" plain @click="">查找</el-button>
    </template>
  </el-input>


</template>

<script lang="ts">
export default {
  name: "FollowingView",
  data() {
    return {
      dialogVisible:false,
      dialogImageUrl: '',
      dialogVisible_upload: false,
      name:['1','2','3','4']
    };
  },
  methods:{
  }
}
</script>

<script lang="ts" setup>


</script>

<style scoped>

</style>