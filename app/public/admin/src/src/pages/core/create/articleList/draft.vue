<template>
  <d2-container type="full" class="page">
    <div class="search-wrapper">
      <el-input
        placeholder="请输入搜索内容"
        v-model="keyword"
        class="search-input"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="articleList"
    tooltip-effect="dark"
    :default-sort = "{prop: 'date', createTime: 'descending'}"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    >
    <el-table-column
      ref="test"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="createTime"
      sortable
      label="日期"
      :formatter="timeFormatter"
      align="center"
      width="220">
    </el-table-column>
    <el-table-column
      prop="title"
      align="center"
      label="文章标题"
      >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="toEdit(scope.row._id)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDel(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="del-batch" type="danger" icon="el-icon-delete" @click="delArticleBatch">批量删除</el-button>
  <div class="pagination-wrapper">
    <el-pagination
      @current-change="handlePageChange"
      background
      :current-page="page"
      layout="prev, pager, next, jumper"
      :total="sumList">
    </el-pagination>
  </div>
  </d2-container>
</template>

<script>
import moment from 'moment'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      articleList: [],
      selectedList: [],
      keyword: '',
      page: 1,
      status: 1,
      sumList: 0
    }
  },
  computed: {
  },
  mounted() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      this.loading = Loading.service({ fullscreen: true })
      this.$axios('/getArticleList', {
        params: {
          keyword: this.keyword,
          page: this.page,
          status: this.status
        }
      }).then(res => {
        this.loading.close()
        this.articleList = res.data.list
        this.sumList = res.data.count
      })
    },
    toEdit(id) {
      this.$router.push(`../editArticle/${id}`)
    },
    handleDel(id) {
      this.$confirm('此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定发送删除请求
        this._toDel(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delArticleBatch() {
      this.$confirm('此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定发送删除请求
        this._toDel(null, this.selectedList)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    _toDel(id, list) {
      let params = {
        id
      }
      let url = '/delArticle'
      if (list) {
        params.list = list
        url = '/delArticleBatch'
      }
      this.loading = Loading.service({ fullscreen: true })
      this.$axios.post(url, params)
        .then(res => {
          this.loading.close()
          if (res.errcode === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getArticleList()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    handlePageChange(currPage) {
      this.page = currPage
      this.getArticleList()
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item._id
      })
    },
    timeFormatter(row, column, cellValue, index) {
      return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSearch() {
      this.page = 1
      this.getArticleList()
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-wrapper
  display flex
  .search-input
    margin-right 10px
.pagination-wrapper
  margin-top 50px
  text-align center
.del-batch
  margin-top 10px
</style>