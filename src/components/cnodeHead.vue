<template>
  <div class="head">
      <router-link to="/">
        <img src="../assets/logo.png" title="logo" />
      </router-link>
    <el-button class="tabout" type="success" @click="dialogVisible = true" size="large">关于</el-button>
    <el-dialog title="第一个Vue demo" v-model="dialogVisible" >
      <div class="dialogDiv">
        <p>作者：<strong>漆静</strong></p>
        <p>邮箱：313392073@qq.com</p>
        <h3>技术栈</h3>
        <ul class="listtext">
          <li><a href="#">Vue.js</a></li>
          <li><a href="#">Vue-router</a></li>
          <li><a href="#">ElementUI</a></li>
          <li><a href="#">Axios</a></li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        dialogVisible:false
      }
    }
  }
</script>

<style scoped>
  #app div.head{
    background:#324057;
    height:3.6rem;
    width:100%;
    position:absolute;
    top:0;
    left:0;
    display:flex;
    align-ltems:center;
    justify-content:space-around;
  }
  #app div.head img{
    width:3rem;
    height:auto;
  }
  .dialogDiv{
    font-size:1.4rem;
  }
  .tabout{
    font-size:20px;
    font-weight:bold;
  }
  ul.listtext>li{
    list-style:circle;
    margin-left:-20px;
  }
  ul.listtext>li>a{
    color:#48576a;
    font-size:1.2rem;
  }
</style>
