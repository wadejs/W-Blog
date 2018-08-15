import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import SearchList from '@/components/SearchList/SearchList'
import AticleDetail from '@/components/AticleDetail/AticleDetail'
import TagCloud from '@/components/TagCloud/TagCloud'
import P404 from '@/components/404/404'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      /**
       * @param type 0 为 关键字搜索， 1 为 分类搜索， 2 为标签搜索
       * @param condition 搜索的关键字 或者 分类/标签的id
       * **/
      path: '/SearchList/:type/:condition?',
      name: 'SearchList',
      component: SearchList
    },
    {
      /**
       * @param id 文章id
       * **/
      path: '/AticleDetail/:id',
      name: 'AticleDetail',
      component: AticleDetail
    },
    {
      path: '/TagCloud',
      name: 'TagCloud',
      component: TagCloud
    },
    {
      path: '*',
      name: 'P404',
      component: P404
    }
  ]
})
