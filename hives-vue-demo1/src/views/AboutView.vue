<template>
  <el-button type="primary" @click="submit">Primary</el-button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  name: "login",
  data() {
  },
  created() {},
  methods: {
    submit() {
     this.$http.get( '/api/exchange/post/test', {
        params: {}
      } ).then(res=>{
        console.log(res)
      })
    }    
  }
};
</script>