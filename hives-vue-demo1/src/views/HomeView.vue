<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
const tableData = [
    {
      place:'Trending in Philippines',
      trendsname:'#LADJOAWDQWELADNASSD',
      num:'23,23M Hives'
    },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  },
  {
    place:'Trending in Philippines',
    trendsname:'#LADJOAWDQWELADNASSD',
    num:'23,23M Hives'
  }
]
const activeIndex = ref('1')
</script>

<template>
  <el-row :gutter="0">
    <el-col :span="20"><div class="grid-content ep-bg-purple">
      <el-container class="layout-container-demo" >
        <el-aside width="600px">
          <el-scrollbar>
            <el-menu @select="MeanClick" class="el-menu-home">
              <el-menu-item class="main-menu-item" index="/home"><el-icon><Monitor /></el-icon>Home</el-menu-item>
              <el-menu-item class="main-menu-item" index="/explore"><el-icon><Search /></el-icon>Explore</el-menu-item>
              <el-menu-item class="main-menu-item" index="/notifications"><el-icon><Bell /></el-icon>Notifications</el-menu-item>
              <el-menu-item class="main-menu-item" index="4"><el-icon><Message /></el-icon>Message</el-menu-item>
              <el-menu-item class="main-menu-item" index="5"><el-icon><Star /></el-icon>Bookmarks</el-menu-item>
              <el-menu-item class="main-menu-item" index="6"><el-icon><Promotion /></el-icon>Hive Yellow</el-menu-item>
              <el-menu-item class="main-menu-item" index="7"><el-icon><UserFilled /></el-icon>Profile</el-menu-item>
              <el-menu-item class="main-menu-item" index="8"><el-icon><CirclePlus /></el-icon>More</el-menu-item>
              <el-menu-item class="main-menu-item" index="9">Hive</el-menu-item>
              <el-menu-item class="main-menu-item" index="10"><el-icon><Tools /></el-icon>Set</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-container>
          <el-header style="text-align: left; font-size: 20px" v-if="this.$router.currentRoute.value.path==='/home'||this.$router.currentRoute.value.path==='/foryou'||this.$router.currentRoute.value.path==='/following'">
            <div class="toolbar">
              <div>Home</div>
              <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="MeanClick"
              >
                <el-menu-item index="foryou">For you</el-menu-item>
                <el-menu-item index="following">Following</el-menu-item>
              </el-menu>
            </div>
          </el-header>
          <el-main class="el-main-content">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
    </el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" id="search_div">
      <el-aside width="350px" style="text-align: center">
        <el-scrollbar>
          <div class="demo-input-size" style="width: 250px;margin-left: 50px">
<!--            <el-input-->
<!--                v-model="input1"-->
<!--                class="w-50 m-2"-->
<!--                size="large"-->
<!--                rows="1"-->
<!--                style="border-top-left-radius: 50px"-->
<!--                placeholder="Search Hives"-->
<!--                :prefix-icon="Search"-->
<!--            />-->
            <input class="explore-input" type="text" placeholder="    Search Hives" :prefix="Search" />
            </div>
          <div>
            <el-table :data="tableData" style="width: 100%;margin-top: 10px" class="table_trends">
              <el-table-column  label="Trends for you" :header-cell-style="{fontSize: '14px',fontWeight:'bolder',color:'black'}">
                <template  #default="scope">
                  <p style="color: #D3D3D3;font-size: 10px">{{scope.row.place}}</p>
                  <h1 style="color: #696969;font-size: 15px;font-weight: bolder;text-overflow: ellipsis">{{scope.row.trendsname}}</h1>
                  <p style="color: #D3D3D3;font-size: 10px">{{scope.row.num}}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </el-aside>
    </div>
    </el-col>
  </el-row>

</template>

<script>

export default {
  methods: {
    MeanClick(index){
      this.$router.push(index);
    }
  }
}
</script>
<style scoped>
.main-menu-item:hover{
  border-left:none !important;
  background-color:white;
  color: #fdc107 !important;
  font-size: 25px;
}
.main-menu-item.is-active{
  border-left:none !important;
  background-color: rgba(166, 163, 163, 0.99);
  color: #fdc107 !important;
  font-size: 20px;
}
.el-menu-home{
  margin-left: 350px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-main-content{
  width: 800px;
}
#search_div{
  margin-top: 15px;
}
.explore-input{
  width: 250px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
}
</style>

