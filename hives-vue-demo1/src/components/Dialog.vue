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
          <div class="msg" :style="msg.fromId === contact.targetId ? 'flex-direction: row;' : 'flex-direction: row-reverse;'">
            <div class="avatar">
              <img :src="contact.header" v-if="msg.fromId === contact.targetId" alt="">
              <img :src="this.user.header" v-if="msg.fromId !== contact.targetId" alt="">
            </div>
            <div v-if="msg.fromId === contact.targetId" style="flex: 13;">
              <div class="bubble-msg-left" style="margin-right: 75px;">
                {{ msg.content}}
              </div>
            </div>
            <div v-else style="flex: 13;">
              <div class="bubble-msg-right" style="margin-left: 75px;">
                {{ msg.content }}
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
      <SvgIcon name="emoji" className="emoji" @click="emojiShow"/>
      <div class="emoji-container" v-show="emojiHowVisible">
        <emotion @chooseEmojiDefault="chooseEmojiDefault"/>
      </div>
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


import emotion from "./emotion.vue";
import SvgIcon from "./svgIcon.vue";

export default {
  name: "Dialog",
  components:{
    emotion,
    SvgIcon
  },
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
    this.socket = new WebSocket(`ws://localhost:14000/websocket/${this.user.id}`)
    this.socket.onmessage = event => {
      this.msgList.push(JSON.parse(event.data))
    }
    // 为防止网络和其他一些原因，每隔一段时间自动从信箱中获取信息
    // this.interval = setInterval(() => {
    //   if (this.contact && this.contact.id) {
    //     let params={
    //       "fromId":this.user.id,
    //       "toId":this.contact.targetId
    //     }
    //     this.$http.get('/api/chat/pullMsg', {params}).then(res => {
    //       console.log("res",res)
    //       for(let item in res.data){
    //         this.msgList.push(JSON.parse(res.data[item]))
    //       }
    //       console.log(this.msgList)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   }
    // }, 15000)
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
      emojiHowVisible:false,
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
        fromId: this.user.id,
        toId: this.contact.targetId,
        content: this.msg,
        time: new Date(),
        type:''
      }
      this.socket.send(JSON.stringify(entity))
      this.msgList.push(entity)
      this.msg = ''
      this.hint = ''
      this.emojiHowVisible = false
    },
    emojiShow(){
      this.emojiHowVisible = !this.emojiHowVisible
    },
    chooseEmojiDefault(e){
      this.msg += e
    },
  }
}
</script>
<style>
:root {
  --scroll-color: #0000;
}
.dialog {
  width: 100%;
  height: 100%;
  float: right;
}
.name {
  position: relative;
  bottom: 5%;
  left: 5%;
  font-weight: bolder;
  font-size: 30px;
}
.info {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.info .msg {
  flex: 1;
  text-align: center;
}
.top {
  width: 100%;
  height: 60px;
  border-bottom: #d0d0d0 1px solid;
}
/*.top::after {*/
/*  content: " ";*/
/*  float: right;*/
/*  position: relative;*/
/*  top: 40px;*/
/*  border: 4px solid #0000;*/
/*  border-top-color: #8e9292;*/
/*}*/
.middle {
  height: 432px;
  overflow: auto;
  padding: 10px;
  margin: 0px 0 11px 0;
  background-color: #F5F5F5;
}
.middle::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
.middle::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: var(--scroll-color);
}
.middle::-webkit-scrollbar-track {
  background: #efeded;
  border-radius: 4px;
}
.middle .msg {
  display: flex;
}
.avatar {
  margin: 8px;
  flex: 1;
}
.avatar img {
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.bubble-msg-left, .bubble-msg-right {
  padding: 10px;
  font-size: 14px;
  margin-top: 10px;
  line-height: 24px;
  border-radius: 5px;
  width: fit-content;
  line-break: anywhere;
}
.bubble-msg-left {
  float: left;
  color: black;
  margin-left: -1%;
  text-indent: -0.5em;
  background-color: white;
}
.bubble-msg-right {
  float: right;
  color: white;
  background-color: #FFD103;
}
.bubble-msg-right::before {
  content: " ";
  float: right;
  position: relative;
  left: 18px;
  border: 4px solid #0000;
  border-left-color: #FFD103;
}
.bubble-msg-left::before {
  content: " ";
  float: left;
  position: relative;
  left: -18px;
  border: 4px solid #0000;
  border-right-color: white;
}
.line {
  width: 100%;
  height: 0;
  position: relative;
  top: -6px;
  border-top: #d0d0d0 1px solid;
}
.dialog .bottom {
  padding-left: 10px;
  padding-right: 25px;
}
.messageText {
  position: relative;
  margin-right: 2px;
  font: 14px/1.5 Helvetica,Arial,Tahoma,微软雅黑;
  width: 100%;
  height: 106px;
  outline: none;
  background: #efeded;
  border: 0 none;
  overflow-y: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  resize: none;
  vertical-align: middle;
  display: inline-block;
}
/*.dialog .bottom::after {*/
/*  content: " ";*/
/*  float: right;*/
/*  position: relative;*/
/*  top: -121px;*/
/*  left: 75px;*/
/*  border: 4px solid #0000;*/
/*  border-bottom-color: #8e9292;*/
/*}*/
.send {
  float: right;
  position: relative;
  top: 20%;
  left: 0px;
  background-color: #51a5e6;
  border: #87ceeb;
  color: #fff;
  font-size: 12px;
  width: 50px;
  height: 22px;
  border-radius: 3px;
}
.send:focus{
  outline: none;
}
.emptyText {
  background-color: #d0d0d0;
}
.emoji-container {
  background-color: white;
  width: 400px;
  height: 210px;
  position: fixed;
  z-index: 10;
  transition: all 0.2s;
}
.emoji{
  width: 25px;
  height: 25px;
}
</style>
