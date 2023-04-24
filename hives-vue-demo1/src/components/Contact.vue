<template>
  <div class="contact">
    <div class="top">
      <div class="left">
        <img class="avatar" :src=circleUrl alt=""/>
      </div>
      <div class="right">
        {{ user.nickname }}
      </div>
    </div>
    <div v-if="friendList.length" class="bottom">
      <div v-for="(friend, i) in friendList" class="friend" :class="{activeColor: isActive(i)}" @click="setContact(i)">
        <div class="left">
          <img class="avatar" :src=circleUrl alt=""/>
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
      active: -1,
      friendList: [],
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  mounted() {
    // 界面渲染时获取用户的好友列表并展示
    this.$http.post('/getFriends', {id: this.user.id}).then(res => {
      this.friendList = res.data.data
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
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
