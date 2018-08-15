<template>
  <div>
    <router-link to="/">
      <Avatar class="avatar" :src="`${$assetsPublicPath}static/qqq.jpg`" />
    </router-link>
    <p class="desc">药药切克闹</p>
    <Input @on-search="search" v-model="keyword" class="search-input" search enter-button placeholder="根据标题或内容搜索" />
    <router-link class="category" to="/TagCloud">分页/标签</router-link>
    <div class="icon-group">
      <Tooltip content="github" placement="top">
        <a href="https://github.com/wadejs"><i class="iconfont">&#xe7ab;</i></a>
      </Tooltip>
      <Tooltip content="码云" placement="top">
        <a href="https://gitee.com/wadejs"><i class="iconfont">&#xe600;</i></a>
      </Tooltip>
      <Tooltip content="知乎" placement="top">
        <a href="https://www.zhihu.com/people/huang-ge-ge-65/activities"><i class="iconfont">&#xe69a;</i></a>
      </Tooltip>
      <Tooltip content="QQ" placement="top">
        <a href="tencent://message/?uin=379664673&Site=&Menu=yes"><i class="iconfont">&#xe657;</i></a>
      </Tooltip>
    </div>
    <footer>
      <p>Theme by wadejs</p>
      <p>备案号：闽ICP备123321122号</p>
    </footer>
  </div>
</template>
<script>
import {Avatar, Input, Tooltip} from 'iview'
export default {
  components: {
    Avatar,
    Input,
    Tooltip
  },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
  },
  methods: {
    search() {
      this.$router.push(`/SearchList/0/${this.keyword}`)
    }
  }
}
</script>
<style lang='stylus' scoped>
.avatar
  display block
  width 100px
  height 100px
  border-radius 50%
  margin 50px auto 0
  box-shadow 0px 0px 5px .5px #999
  animation floater 2s linear infinite
.desc
  text-align center
  margin-top 30px
  font-size 14px
.search-input
  width 80%
  margin 30px auto 0
.category
  display inline-block
  width 100%
  margin-top 50px
  font-size 18px
  color #696969
  font-weight bold
  text-align center
  &:hover
    color #6b6bea
    text-decoration underline
.icon-group
  display flex
  justify-content space-around
  margin-top 30px
  .iconfont
    font-size 28px
footer
  position absolute
  bottom 10px
  width 100%
  text-align center
  color #999
  font-size 14px
  line-height 20px
@keyframes floater
  0%
    transform: translateY(0%)
  50%
    transform: translateY(8%)
  100%
    transform: translateY(0%)
@media (max-width: 780px)
  .category
    margin-top 10px
</style>
