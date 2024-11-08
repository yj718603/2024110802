<template>
  <div>
    <h1>Welcome to my Nuxt.js project!</h1>
    <div>{{msg}}</div>
    <div>{{title}}</div>
    <div>{{response}}</div>
  </div>
</template>

<script>
  export default {
    name: "resource",
    async asyncData({$axios}) {
      const response = await $axios.get('https://www.ip.cn/api/index?ip&type=0');
      return {
        title: "我是服务端数据",
        response:response.data
      }
    },
    data() {
      return {
        msg: "我是客户端的数据"
      }
    }
  }
</script>

<style scoped>

</style>
