<template>
  <div id="app">
    <header>
      <Header></Header>
    </header>
    <div class="container">
      <aside>
        <LeftSide></LeftSide>
      </aside>
      <section>
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import LeftSide from '@/components/LeftSide/LeftSide'
import ArticleList from '@/components/ArticleList/ArticleList'
export default {
  components: {
    Header,
    LeftSide,
    ArticleList
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
header
  position fixed
  top 0
  width 100%
  height 60px
  background #fff
  z-index 9999999
.container
  position absolute
  top 60px
  bottom 0
  width 100%
  padding-left 300px
  aside
    position fixed
    top 60px
    left 0
    bottom 0
    width 300px
    background #f5f5f5
    box-shadow: 0 0px 5px 3px #c6c6c6;
    border-top none
  section
    position relative
    height 100%
    padding 10px
@media (max-width: 780px)
  .container
    flex-direction column
    padding-left 0
    padding-top 405px
    aside
      position absolute
      top 0
      width 100%
      height 405px
</style>
