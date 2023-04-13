<template>
Media

  <div class="other-box">
    <div class="menu-box">
      <el-container>
        <el-header>
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
          >
            <el-menu-item index="/profile">Hives</el-menu-item>
            <el-menu-item index="/replies">Replies</el-menu-item>
            <el-menu-item index="/media">Media</el-menu-item>
            <el-menu-item index="/likes">Likes</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view/>
          <div>hives</div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaView"
}
</script>

<style scoped>

</style>