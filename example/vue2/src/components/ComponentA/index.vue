<template>
  <div>
    <h3>Component A: {{ msg }}</h3>
    <button @click="goNews">a button</button>
    <button @click="$router.go(-1)">返回</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  methods:{
    goNews(){
       this.$router.push({
        path:'/news'
      })
    }
}
}
</script>
