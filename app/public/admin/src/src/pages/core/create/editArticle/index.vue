<template>
  <d2-container type="full" class="page">
    <articleForm v-if="detail._id" :topic="topic" :detail="detail">
    </articleForm>
  </d2-container>
</template>

<script>
import articleForm from '@/components/common/articleForm'
import { Loading } from 'element-ui'
export default {
  components: {
    articleForm
  },
  data () {
    return {
      topic: '编辑文章',
      detail: {},
      isDraft: true
    }
  },
  computed: {
  },
  mounted() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail(id) {
      this.loading = Loading.service({ fullscreen: true })
      this.$axios.post('/getArticleDetail', { id: this.$route.params.id })
        .then(res => {
          this.loading.close()
          if (res.errcode === 0) {
            this.detail = res.data
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>