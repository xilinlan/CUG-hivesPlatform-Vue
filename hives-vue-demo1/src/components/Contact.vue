<template>
  <div class="contact">
    <div class="top">
      <div class="left">
        <img class="avatar" :src=user.header alt=""/>
      </div>
      <div class="right">
        {{ user.nickname }}
      </div>
    </div>
    <div v-if="friendList.length" class="bottom">
      <div v-for="(friend, i) in friendList" class="friend" :class="{activeColor: isActive(i)}" @click="setContact(i)">
        <div class="left">
          <img class="avatar" :src=friend.header alt=""/>
        </div>
        <div class="right">
          {{ friend.nickname }}
        </div>
      </div>
    </div>
    <div v-else class="info">
      <div class="msg">
        还没有好友~~~
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Contact',
  data() {
    return {
      user:{},
      active: -1,
      friendList: [],
    }
  },
  mounted() {
    this.user=JSON.parse(window.sessionStorage.getItem('user'))
    console.log(this.user)
    // 界面渲染时获取用户的好友列表并展示
    let params={
      "userId": this.user.id
    }
    this.$http.get('/api/user/follow/getFollows?',{params}).then(res => {
      console.log(res)
      this.friendList = res.data.follow
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    user() {
      return JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    setContact(index) {
      this.active = index
      delete this.friendList[index].password
      this.$emit('set-contact', this.friendList[index])
    },
    isActive(index) {
      return this.active === index
    }
  }
}
</script>
<style>
.contact {
  width: 100%;
  height: 100%;
  float: left;
  border-right: #d0d0d0 1px solid;
}
.top {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: #e0dfdf 1px solid;
}
.activeColor {
  background-color: #c9cbcb;
}
.top .left {
  flex: 1;
  text-align: center;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 4px;
}
.top .right {
  flex: 3;
}
.friend {
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  border-bottom: #faf7f7 1px solid;
}
.friend .left {
  flex: 1;
  margin-top: 24px;
  text-align: center;
}
.friend .right {
  flex: 3;
  color: #575454;
  font-size: 14px;
}
.friend .avatar {
  width: 36px;
  height: 36px;
}
.info {
  margin-top: 230px;
}
.info .msg {
  text-align: center;
}
</style>