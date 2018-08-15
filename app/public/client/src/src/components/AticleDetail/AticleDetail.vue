<template>
  <div>
     <div v-if="article._id">
        <Card class="title" :bordered="false">
          <p>{{article.title}}<span class="date">{{formatDate(article.createTime)}}</span></p>
        </Card>
        <div class="bar">
          分类：<Tag @click.native="searchByCategory(article.categoryId._id)" type="border" color="primary">{{article.categoryId.categoryName}}</Tag>
          标签：<Tag @click.native="searchByTag(tag._id)" v-for="tag in article.tagId" :key="tag.id" color="primary">{{tag.tagName}}</Tag>
        </div>
        <div class="container">
          <mavonEditor class="markdown" codeStyle="dark" :value="article.content" :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"></mavonEditor>
          <div class="toc">
          </div>
        </div>
      </div>
      <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Card, Tag, Spin } from 'iview'
import moment from 'moment'
import { genToc } from '@/assets/js/utils.js'
import { getArticleDetail } from '@/assets/js/api.js'
export default {
  components: {
    mavonEditor,
    Card,
    Tag,
    Spin
  },
  data() {
    return {
      id: '',
      toolbarsFlag: false,
      article: {},
      loading: false,
      tocShow: true
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchArticle(this.id)
  },
  methods: {
    fetchArticle(id) {
      this.loading = true
      getArticleDetail({ id }).then(res => {
        this.loading = false
        if (res.errcode === 0) {
          this.article = res.data
          // 生成目录
          this.$nextTick(() => {
            genToc('.v-show-content', '.toc')
          })
        }
      })
    },
    formatDate(date) {
      return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
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
.title
  font-size 20px
  font-weight bold
  margin-bottom 10px
  .date
    float right
    font-size 14px
    color #999
    font-weight normal
.bar
  background #fff
  padding 5px
  margin-bottom 10px
.container
  display flex
  position: absolute
  top 130px
  bottom 0
  left 10px
  right 10px
  .toc
    color #2185d0
    width 200px
    height 100%
    background #fff
    padding 10px
    margin-left 10px
  .markdown
    flex 1
    height 100%
@media (max-width: 780px)
  .toc
    display none
  .title
    .date
      display block
      float none
      margin-top 10px
  .container
    position static
</style>
