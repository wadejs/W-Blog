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
import { searchByCategory, searchByTag, getArticleList } from '@/assets/js/api.js'
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
    this.serchArticleList()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': function() {
      this.serchArticleList()
    }
  },
  methods: {
    serchArticleList() {
      this.type = this.$route.params.type
      this.condition = this.$route.params.condition
      switch (this.type) {
        case '1':
          this.searchByCategory()
          break
        case '2':
          this.searchByTag()
          break
        case '0':
          this.searchByKeyword()
          break
        default:
          break
      }
    },
    searchByCategory() {
      this.loading = true
      searchByCategory({
        params: {
          page: this.page,
          id: this.condition
        }
      }).then(res => {
        this.loading = false
        this.articleList = res.data.list
        this.total = res.data.count
      })
    },
    searchByTag() {
      this.loading = true
      searchByTag({
        params: {
          page: this.page,
          id: this.condition
        }
      }).then(res => {
        this.loading = false
        this.articleList = res.data.list
        this.total = res.data.count
      })
    },
    searchByKeyword() {
      this.loading = true
      getArticleList({
        params: {
          page: this.page,
          keyword: this.condition
        }
      }).then(res => {
        this.loading = false
        this.articleList = res.data.list
        this.total = res.data.count
      })
    },
    pageChange(page) {
      this.page = page
      this.serchArticleList()
    }
  }
}
</script>
<style lang='stylus' scoped>
</style>
