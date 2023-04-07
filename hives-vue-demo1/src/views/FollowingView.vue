<template>
  <div v-for="item in name">
    {{item}}
  </div>


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