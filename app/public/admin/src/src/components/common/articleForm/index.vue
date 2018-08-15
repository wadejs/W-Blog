<template>
  <div>
    <el-card shadow="hover" class="topic" :body-style="bodyStyle">
      {{topic}}
    </el-card>
    <div class="form-item flex-wrapper">
      <span>文章标题：</span>
      <el-input class="title" v-model="article.title" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-item">
      <span>文章分类：</span>
      <el-select
      class="selector"
      v-if="categories.length > 0"
      v-model="article.category"
      placeholder="请选择分类">
        <el-option
          v-for="item in categories"
          :key="item.value"
          :label="item.categoryName"
          :value="item._id">
        </el-option>
      </el-select>
    </div>
    <div class="form-item">
      <span>文章标签：</span>
      <el-select
      class="selector"
      v-if="tags.length > 0"
      v-model="article.tag"
      multiple
      placeholder="文章标签">
        <el-option
          v-for="item in tags"
          :key="item.value"
          :label="item.tagName"
          :value="item._id">
        </el-option>
      </el-select>
    </div>
    <div class="form-item">
      <!-- markdown插件 -->
      <mavon-editor
      id="mark"
      ref="md"
      v-model="article.content"
      codeStyle="atom-one-dark"
      @change="markdownChange"
       @imgAdd="imgAdd"
      class="mark-editor"/>
    </div>
    <el-button type="primary" @click="submit">发布</el-button>
    <el-button type="warning" v-if="this.detail.status !== 0"  @click="saveDraft">{{this.detail.status === undefined ? '存为草稿' : '保存'}}</el-button>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import * as qiniu from 'qiniu-js'
export default {
  data() {
    return {
      aaa: false,
      // 现有的所有分类
      categories: [],
      // 现有的所有标签
      tags: [],
      article: {
        id: null,
        title: '',
        category: '',
        tag: [],
        content: '',
        html: '',
        status: 0
      },
      bodyStyle: {
        padding: '10px'
      }
    }
  },
  props: {
    topic: {
      type: String,
      default: '新建文章'
    },
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
  },
  mounted() {
    this._fetchOptions()
    this._initData()
    // 去服务端生成七牛token
    this.fetchUploadToken()
  },
  methods: {
    // 获取选项数据
    _fetchOptions() {
      this.$axios('/getArticleOptions').then(res => {
        this.categories = res.data.categoryList
        this.tags = res.data.tagsList
      })
    },
    _initData() {
      if (!this.detail.tagId) {
        this.tag = []
      } else {
        this.article.tag = this.detail.tagId.map(item => {
          return item._id
        })
      }
      this.article.category = this.detail.categoryId ? this.detail.categoryId._id : ''
      this.article.content = this.detail.content || ''
      this.article.title = this.detail.title || ''
      this.article.id = this.detail._id || ''
    },
    submit() {
      this.article.status = 0
      this.postArticle()
    },
    saveDraft() {
      this.article.status = 1
      this.postArticle()
    },
    postArticle() {
      this.loading = Loading.service({ fullscreen: true })
      this.$axios.post('/postArticle', this.article)
        .then(res => {
          this.loading.close()
          if (res.errcode === 0) {
            if (res.data.id) {
              // 清空文章内容
              this.article = {
                id: null,
                title: '',
                category: '',
                tag: [],
                content: '',
                html: '',
                status: 0
              }
              this.$router.push(`editArticle/${res.data.id}`)
            }
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    markdownChange(markdown, html) {
      this.article.html = html
    },
    fetchUploadToken() {
      this.$axios.get('/getQiniuToken')
        .then(res => {
          if (res.errcode === 0) {
            this.token = res.data.token
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    imgAdd(pos, file) {
      this.file = file
      this.pos = pos
      let key = this.file.name
      // 调用七牛的接口将图片上传至七牛
      let observable = qiniu.upload(this.file, key, this.token)
      observable.subscribe(this.uploadNext, this.uploadError, this.uploadComplete)
      return false
    },
    uploadNext(res) {
      // ...
    },
    uploadError(err) {
      alert(err)
    },
    uploadComplete(res) {
      // 取得七牛返回的url
      let url = 'http://你七牛的外链默认域名/' + res.key
      // 将url插入markdown
      this.$refs.md.$img2Url(this.pos, url)
    }
  }
}
</script>
<style lang='stylus' scoped>
.topic
  font-size 22px
  font-weight bold
  color #79a1fb
.form-item
  margin 10px 0
  .selector
    width 500px
.flex-wrapper
  display flex
  flex-wrap nowrap
  span
    line-height 38px
    margin-right 4px
  .title
    flex 1
.mark-editor
  height 500px
</style>
