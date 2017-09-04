/**
 * Created by Administrator on 2017/9/2.
 */
import MainSec from '../components/mainSec.vue'
import UserInfo from '../components/UserInfo.vue'
import ArticleInfo from '../components/ArticleInfo.vue'

export default [
  {
    path:'/',
    name:'RootPath',
    components:{main:MainSec}
  },{
    path:'/user/:name',
    name:'UserRoute',
    components:{main:UserInfo}
  },{
    path:'/topic/:id',
    name:'ArticleRouter',
    components:{main:ArticleInfo}
  },{
    path:'/user/:name',
    redirect:'/user:name',
  }
]
