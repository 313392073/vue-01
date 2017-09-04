<template>
  <div class="secDiv">
    <div class="profile" v-loading.lock='loading'>
      <div>
        <img :src="userInfo.avatar_url" :title="userInfo.loginname"/>
        <span>{{userInfo.loginname}}</span>
      </div>
      <p>
        <i class="el-icon-star-on"></i>
        <span>积分:</span>{{userInfo.score}}
      </p>
      <p>
        <i class="el-icon-upload"></i>
        <span>Github:</span>http://github.com/{{userInfo.githubUsername}}
      </p>
      <p>
        <i class="el-icon-time"></i>
        <span>注册时间：</span>{{dealCommentTime(userInfo.create_at)}}
      </p>
    </div>

    <div class="recentReplies" v-loading.lock="loading">
      <p>最近参与的话题</p>
      <template v-for="(item,index) of userInfo.recent_replies">
        <div v-if='index < 4'>
          <router-link :to="{name: 'UserRoute',params:{name: item.author.loginname}}">
            <img :src="item.author.avatar_url" :title="item.author.loginname" />
          </router-link>
          <router-link :to="{name:'ArticleRouter',params:{id:item.id}}">
            <p class="userTitle">{{item.title}}</p>
          </router-link>
        </div>
      </template>
    </div>

    <div class="recentTopics" v-loading.lock="loading">
      <p>最近创建的话题</p>
      <template v-for="(item,index) of userInfo.recent_topics">
        <div v-if="index < 5 &&　item">
          <img :src="item.author.avatar_url" :title="item.author.loginname"/>
          <router-link :to="{name:'ArticleRouter',params:{id: item.id}}">
            <p class="userTitle">{{item.title}}</p>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        userInfo:　{create_at:'2017-09-01'},
        loading:true
      }
    },
    created() {
      this.$http({
        url:`https://cnodejs.org/api/v1${this.$route.path}`,
        method: 'get'
      }).then((res) => {
        this.userInfo = res.data.data;
      }).catch((res) => {
        console.log('1111');
      })
    },
    methods: {
      dealCommentTime(time) {
        return String(time).match(/.{10}/)[0].replace(/.{2}/).replace(/[T]/, ' ');
      }
    },
    beforeRouteUpdate(to,from,next) {
      this.$http({
        url:`https://cnodejs.org/api/v1${to.path}`,
        method:'get'
      }).then((res) => {
        this.userInfo = res.data.data;
      }).catch((res) => {
        console.log('222')
      })
    },
    watch: {
      userInfo(val) {
        if(val) {
          this.loading = false;
        }
      }
    }
  }
</script>
<style scoped>
  .secDiv{
    padding:2rem;
    box-sizing: border-box;
    border:none;
    margin-top:3.6rem;
  }
  .profile{
    padding:1rem;
    background:#EFF2F7;
    border-radius: 0.4rem;
  }
  .profile div{
    margin-bottom:1.5rem;
  }
  .profile div span{
    font-size:1.2rem;
    color:#222;
    margin-left:1rem;
  }
  .profile p i {
    width:1.5rem;
  }
  .recentReplies{
    background:#E5E9F2;
    padding:2rem;
    margin-top:1rem;
    border-radius:0.3rem;
  }

  .recentReplies img{
    display:block;
    width:4rem;
    height:auto;
  }
  .recentReplies div,
  .recentTopics div{
    display:flex;
    align-item:center;
    margin:1rem 0;
    border-bottom:2px solid #ddd;
    padding-bottom:0.5rem;
  }

  .recentReplies p,.recentTopics p{
    color:#222;
    font-size:1.4rem;
    margin-left:1rem;
  }

  .recentTopics{
    margin-top:1rem;
    background:#D3DCE6;
    padding:2rem;
    border-radius:0.3rem;
  }
  .recentTopics div{
    border-bottom:2px solid #99A9BF;
  }
  .recentTopics img{
    height:5rem;
  }
</style>
