<template>
  <div>
    <Card>
        <h2>分类</h2>
        <div>
          <Tag  @click.native="searchByCategory(category.categoryId)" v-for="category in categories" :key="category.id" type="dot" color="primary">{{category.categoryName}}({{category.count}})</Tag>
        </div>
    </Card>
    <Card>
        <h2>标签云</h2>
        <div class="tag-cloud">
          <vue-word-cloud
            :words="tags"
            fontFamily="Anton"
            :enterAnimation="enterAnimation"
            :color="color"
            :spacing="spacing">
            <template slot-scope="props">
              <Tooltip slot="activator" :content="props.weight" placement="top-start">
                <div  style="cursor: pointer;" @click="onWordClick(props.word)">{{ props.text }}</div>
              </Tooltip>
            </template>
          </vue-word-cloud>
        </div>
    </Card>
  </div>
</template>
<script>
import { Card, Tag, Tooltip } from 'iview'
import VueWordCloud from 'vuewordcloud'
import { getTagsAndCategories } from '@/assets/js/api.js'
export default {
  components: {
    Card,
    Tag,
    Tooltip,
    [VueWordCloud.name]: VueWordCloud
  },
  data () {
    return {
      spacing: 1,
      repoTags: [],
      categories: [],
      enterAnimation: {opacity: 0},
      color: ([, weight]) => weight > 8 ? 'DeepPink' : weight > 3 ? 'RoyalBlue' : 'Indigo'
    }
  },
  computed: {
    tags() {
      return this.repoTags.map(item => {
        return [item.tagName, item.count, item.tagId]
      })
    }
  },
  mounted() {
    this.fetchTagsAndCategories()
  },
  methods: {
    onWordClick(v) {
      let id = v[2]
      this.$router.push(`/SearchList/2/${id}`)
    },
    searchByCategory(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/1/${id}`)
    },
    fetchTagsAndCategories() {
      getTagsAndCategories().then(res => {
        if (res.errcode === 0) {
          this.repoTags = res.data.tagsCount
          this.categories = res.data.categoriesCount
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.tag-cloud
  height 500px
</style>
