<template>
  <div id="app">
    <cnode-head></cnode-head>
    <router-view name="main"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import cnodeHead from './components/cnodeHead.vue'
  export default {
    name:'app',
    components: { cnodeHead }
  }
</script>

<style>
  #app{
    width:100%;
  }
</style>
