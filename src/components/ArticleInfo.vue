<template>
  <div class="secDiv" v-loading="loading" element-loading-text="拼命加载中">
    <span>发布于:{{createdTime}}</span>
    <router-link :to="{name:'UserRouter',params:{name:article.author.loginname}}">作者：{{article.author.loginname}}</router-link>
    <span class="marginSpan">浏览量：{{article.visit_count}}</span>
    <span>来自：{{article.tab}}</span>
    <h3>{{article.title}}</h3>
    <div v-html="article.content" id="content"></div>
    <div id="reply">
      <div v-for="reply in article.replies" class="replySec">
        <router-link :to="{name:'UserRoute',params:{name:reply.author.loginname}}">
          <img :src="reply.author.avatar_url" />
        </router-link>
        <div>
          <div class="replyUp">
            <span class="replyName"> {{reply.author.loginname}}</span>
            <span>{{dealCommentTime(reply.create_at)}}</span>
            <span v-if="reply.ups.length > 0" class="thumbsClass">
              <span>{{reply.ups.length}}</span>
            </span>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
  export default {
    data() {
      return {
        loading:true,
        article: {
          title: '',
          author: {
            loginname:'tepm',
          },
          visit_count:'',
          tab:'',
          content:'',
          create_at:'2017-09-01',
          replies:'',
        }
      };
    },
    computed:{
      createdTime() {
        return String(this.article.create_at).match(/.{10}/)[0];
      }
    },
    methods: {
      dealCommentTime(time) {
        return String(time).match(/.{16}/)[0].replace(/.{2}/, '').replace(/[T]/, ' ');
      }
    },
    watch: {
      article(val) {
        if(val) {
          this.loading = false;
        }
      }
    },
    beforeCreate() {
      this.$http({
        url: `http://cnodejs.org/api/v1${this.$route.path}`,
        method:'get',
      }).then((res) => {
        if(res.data.success === true) {
          this.article = res.data.data;
          this.$parent.authorName = this.article.author.loginname;
        } else {
          this.article = 'get data error'
        }
      }).catch((res) => {
        console.log(res+'error')
      });
    }
  }
</script>

<style scoped>
  @import url('../assets/style/markdown-github.css')
  .secDiv{
    margin-top:3.6rem;
    padding:2rem;
    background:#F9FAFC;
  }
  .secDiv a{
    color:#222;
    font-size:1rem;
  }
  .secDiv>span{
    color:#8492A6;
    font-size:1rem;
  }
  #content{
    margin:2rem auto;
    padding:1rem 2rem;
    border:1px solid #ddd;
    line-height:1.2rem;
  }
  #reply{
     display:flex;
     flex-direction:column;
     padding:2rem;
  }
  #reply img{
    height:5rem;
    margin-right: 1rem;
  }
  .replySec{
    display:flex;
    box-sizing:border-box;
    border-bottom:2px solid #ddd;
    padding-top:1rem;
  }
  .replySec > div{
    width:100%;
    display:flex;
    flex-direction:column;
    align-item:flex-start;
    margin-left:1rem;
    justify-content:space-around;
    font-size:1.2rem;
  }
  .replySec p{
    margin:0.5rem;
  }
</style>
