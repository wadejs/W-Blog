<template>
  <div>
    <ArticleList
      @pageChange="pageChange"
      :articleList="articleList"
      :page="page"
      :total="total"
      :loading="loading"
    />
  </div>
</template>
<script>
import ArticleList from '@/components/ArticleList/ArticleList'
import { getArticleList } from '@/assets/js/api.js'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      articleList: [],
      page: 1,
      total: 0,
      loading: false
    }
  },
  computed: {
  },
  mounted() {
    this.fetchArticle()
  },
  methods: {
    fetchArticle() {
      this.loading = true
      getArticleList({
        params: {
          page: this.page,
          keyword: this.keyword
        }
      }).then(res => {
        this.loading = false
        this.articleList = res.data.list
        this.total = res.data.count
      })
    },
    pageChange(page) {
      this.page = page
      this.fetchArticle()
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
