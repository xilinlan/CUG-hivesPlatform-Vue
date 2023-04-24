<template>
  <div v-if="contact" class="dialog">
    <div class="top">
      <div class="name">
        {{ contact.nickname }}
      </div>
    </div>
    <div class="middle" @mouseover="over" @mouseout="out">
      <div v-if="msgList.length">
        <div v-for="msg in msgList">
          <div class="msg" :style="msg.from === contact.id ? 'flex-direction: row;' : 'flex-direction: row-reverse;'">
            <div class="avatar">
              <img alt="" :src=circleUrl />
            </div>
            <div v-if="msg.from === contact.id" style="flex: 13;">
              <div class="bubble-msg-left" style="margin-right: 75px;">
                {{ msg.message }}
              </div>
            </div>
            <div v-else style="flex: 13;">
              <div class="bubble-msg-right" style="margin-left: 75px;">
                {{ msg.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="bottom">
      <label>
        <textarea
            class="messageText"
            maxlength="256"
            v-model="msg"
            :placeholder="hint"
            @keydown.enter="sendMsg($event)"
        ></textarea>
      </label>
      <button class="send" :class="{emptyText: isEmptyText}" title="按下 ENTER 发送" @click="sendMsg()">发送</button>
    </div>
  </div>
  <div v-else class="info">
    <div class="msg">
      找个好友聊天吧~~~
    </div>
  </div>
</template>

<script>


export default {
  name: "Dialog",
  props: {
    contact: {
      type: Object
    },
    msgList: {
      type: Array
    }
  },
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
    // 渲染界面时, 根据用户的 id 获取 websocket 连接
    this.socket = new WebSocket(`wss://localhost/websocket/${this.user.id}`)
    this.socket.onmessage = event => {
      this.msgList.push(JSON.parse(event.data))
    }
    // 为防止网络和其他一些原因，每隔一段时间自动从信箱中获取信息
    this.interval = setInterval(() => {
      if (this.contact && this.contact.id) {
        this.$http.post('/pullMsg', {from: JSON.parse(localStorage.getItem('user')).id, to: this.contact.id}).then(res => {
          this.msgList = res.data.data
        }).catch(err => {
          console.log(err)
        })
      }
    }, 15000)
  },
  beforeDestroy() {
    // 清楚定时器的设置
    !this.interval &&clearInterval(this.interval)
  },
  data() {
    return {
      user:{},
      msg: '',
      hint: '',
      socket: null,
      bubbleMsg: '',
      interval: null,
      isEmptyText: true,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }
  },
  watch: {
    msgList() {
      // 保证滚动条(如果存在), 始终在最下方
      const mid = document.querySelector('.middle')
      this.$nextTick(() => {
        mid && (mid.scrollTop = mid.scrollHeight)
        document.querySelector('.messageText').focus()
      })
    },
    msg() {
      this.isEmptyText = !this.msg
    }
  },
  methods: {
    over() {
      this.setColor('#c9c7c7')
    },
    out() {
      this.setColor('#0000')
    },
    setColor(color) {
      document.documentElement.style.setProperty('--scroll-color', `${color}`)
    },
    sendMsg(e) {
      if (e) {
        e.preventDefault()
      }
      if (!this.msg) {
        this.hint = '信息不可为空！'
        return
      }
      let entity = {
        from: JSON.parse(localStorage.getItem('user')).id,
        to: this.contact.id,
        message: this.msg,
        time: new Date()
      }
      this.socket.send(JSON.stringify(entity))
      this.msgList.push(entity)
      this.msg = ''
      this.hint = ''
    }
  }
}
</script>
