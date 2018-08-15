<template>
  <div>
    <div v-for="article in articleList" :key="article.id" class="article-list">
      <Card class="card" :bordered="false">
        <p class="title" @click="toDetail(article._id)" slot="title">{{article.title}}<span class="date">{{formatDate(article.createTime)}}</span></p>
        <mavonEditor class="article" codeStyle="dark" :value="article.content" :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
        <p><span @click="toDetail(article._id)" class="read-more">阅读全文 >></span></p>
        <p>
          分类：<Tag v-if="article.categoryId" @click.native="searchByCategory(article.categoryId._id)" type="border" color="primary">{{article.categoryId.categoryName}}</Tag>
          标签：<Tag v-for="tag in article.tagId" @click.native="searchByTag(tag._id)" :key="tag.id" color="primary">{{tag.tagName}}</Tag>
        </p>
      </Card>
    </div>
    <div class="empty" v-if="!articleList.length">没有相应的文章</div>
    <Page class="page"
          :total="total"
          show-total
          show-elevator
          @on-change="pageChange"
          />
    <Spin class="loading" size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Card, Tag, Spin } from 'iview'
import moment from 'moment'
export default {
  components: {
    mavonEditor,
    Card,
    Tag,
    Spin
  },
  data () {
    return {
      toolbarsFlag: false
    }
  },
  props: {
    articleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    pageChange(page) {
      this.$emit('pageChange', page)
    },
    formatDate(date) {
      return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
    },
    toDetail(id) {
      this.$router.push(`/AticleDetail/${id}`)
    },
    searchByCategory(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/1/${id}`)
    },
    searchByTag(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/2/${id}`)
    }
  }
}
</script>
<style lang='stylus' scoped>
.card
  margin 15px 0
  .title
    font-size 24px
    height 24px
    line-height 24px
    padding-left 5px
    cursor pointer
    border-left 3px solid transparent
    &:hover
      border-left 3px solid #7394d0
  .read-more
    float right
    background #A5C0E3
    color #fff
    padding 5px
    cursor pointer
  p
    clear: both
    margin-top 10px
    &:after
      content ''
      display block
      clear both
.date
  float right
  font-size 14px
  font-weight normal
  color #999
.article
  min-height: 0
.page
  text-align center
  font-size 14px
.loading
  position fixed
  z-index 9999999
.empty
  text-align center
  font-size 18px
  color #999
  margin-bottom 10px
</style>
<style lang='stylus'>
// 覆盖文章列表页markdown自带样式
.article-list // 放在这个大类之下，防止污染
  .v-note-wrapper
    .v-note-panel
      .v-note-show
        .v-show-content
          background #fff !important
  .v-note-wrapper
    .v-note-panel.shadow
      box-shadow none !important
  .markdown-body
    pre
      background-color #fff !important
</style>
