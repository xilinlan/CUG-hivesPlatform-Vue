<template>
  <div id="app">
    <div class="main">
      <Contact @set-contact="set"/>
      <Dialog :contact="contact" :msgList="msgList"/>
    </div>
  </div>
</template>

<script>
import Contact from '../components/Contact.vue'
import Dialog from '../components/Dialog.vue'

export default {
  name: "Chat",
  components: {
    Dialog,
    Contact
  },
  data() {
    return {
      contact: null,
      msgList: [],

    }
  },
  methods: {
    // 点击指定用户后，就获取两人之间的所有信息
    // 并将当前联系人保存在 localStorage
    set(user) {
      this.contact = user
      this.$http.post('/pullMsg', {from: JSON.parse(localStorage.getItem('user')).id, to: this.contact.id}).then(res => {
        this.msgList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
