<template>
  <div class="secDiv" v-loading="loading">
    <div v-for="item of content">
      <router-link :to="{name:'UserRoute',params:{name: item.author.loginname}}">
        <img :src="item.author.avatar_url" :title="item.author.loginname" />
      </router-link>
      <div class="textDiv">
        <router-link :to="{name:'ArticleRouter',params:{id:item.id}}">{{item.title}}</router-link>
        <div class="stuff">
          <span>回复：{{item.reply_count}}</span>
          <span>创建于：{{dealTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name:'MainSec',
    data() {
     return {
      content:[],
      item:{
        create_at:'2017-09-01'
      },
      limit:0,
      loading: true,
     };
    },
    methods:{
      scrollMethod() {
        const sumH = document.body.scrollHeight;
        const viewH = document.documentElement.clientHeight;
        const scrollH = document.body.scrollTop;
        if(viewH + scrollH === sumH) {
          this.getData();
        }
      },
      getData() {
        this.limit += 10;
        this.$http({
          url: 'https:cnodejs.org/api/v1/topics',
          method:'get',
          params: {
            page: 1,
            limit: this.limit,
            mdrender: 'false',
          }
        }).then((res) => {
          this.content = res.data.data;
        }).catch((res) => {
          console.log(res);
        })
      }
    },
    mounted() {
      window.addEventListener('scroll',this.scrollMethod);
    },
    computed: {
      dealTime() {
        return String(this.item.create_at).match(/.{10}/)[0];
      }
    },
    created() {
       this.getData();
    },
    watch: {
      content(val) {
        if(val) {
          this.loading = false;
        }
      }
    }
  }
</script>


<style scoped>
  .secDiv{
    width:calc (100% - 2.4rem);
    margin-top:3.6rem;
    background-color:#F9FAFC;
    border: 1px solid #ddd;
    padding:1.2rem;
    display: flex;
    flex-direction: column;
    font-size:1.2rem;
    min-height:40rem;
  }
  .secDiv img{
    width:5rem;
    display:block;
    margin-right:1.3rem;
  }
  .secDiv>div{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    margin:0.5rem 0;
    border-bottom: 2px solid #ddd;
    padding-bottom:1rem;
  }
  .textDiv{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-start;
    width:100%;
  }
  .textDiv a{
    color: #222;
    font-size: 1.2rem;
  }
  .stuff{
    font-size: 1rem;
    margin-top: 0.5rem;
    color: #8492A6;
  }
</style>
