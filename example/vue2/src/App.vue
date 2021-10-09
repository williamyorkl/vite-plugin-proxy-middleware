<template>
  <div class="block">
    <ComponentA msg="this is a A component" />
    <router-view></router-view>
  </div>
</template>

<script>
import ComponentA from './components/ComponentA'

export default {
  components:{
    ComponentA
  }
}
</script>

<style scoped>
.block {
  padding: 10px;
  margin: 20px;
  border: 1px solid rebeccapurple;
  border-radius: 15px;
}
</style>
