<template>
  <d2-container type="full" class="page">
    <div class="search-wrapper">
      <el-input
        placeholder="请输入分类名称"
        v-model="newCategory"
        @keyup.enter.native="createCategory"
        class="search-input"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-plus" @click="createCategory">新增分类</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="categoryList"
    tooltip-effect="dark"
    :default-sort = "{prop: 'date', order: 'descending'}"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    >
    <el-table-column
      ref="test"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="categoryName"
      align="center"
      label="分类名称"
      >
      <template slot-scope="scope">
        <el-input
          class="wcategory"
          :readonly="scope.row.readonly"
          v-model="scope.row.categoryName"
          placeholder="请输入内容"
          ></el-input>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button v-show="scope.row.readonly" type="primary" icon="el-icon-edit" @click="Edit(scope.$index)">修改</el-button>
        <el-button class="no-margin" v-show="!scope.row.readonly" type="primary" icon="el-icon-check" @click="comfirm(scope.$index)">确认</el-button>
        <el-button class="no-margin" v-show="!scope.row.readonly" type="warning" icon="el-icon-close" @click="cancle(scope.$index)">取消</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="del-batch" type="danger" icon="el-icon-delete" @click="delCategoryBatch">批量删除</el-button>
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
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      categoryList: [],
      selectedList: [],
      page: 1,
      sumList: 0,
      initialValue: '',
      newCategory: ''
    }
  },
  computed: {
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.loading = Loading.service({ fullscreen: true })
      this.$axios('/getCategoryList', {
        params: {
          page: this.page
        }
      }).then(res => {
        this.loading.close()
        this.categoryList = res.data.list.map(item => {
          item.readonly = true
          return item
        })
        this.sumList = res.data.count
      })
    },
    modifyCategory(category) {
      this.$axios.post('/modifyCategory', {
        category: category
      }).then(res => {
        if (res.errcode === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getCategoryList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    Edit(index) {
      this.categoryList[index].readonly = false
      this.initialValue = this.categoryList[index].categoryName
    },
    comfirm(index) {
      this.$confirm('是否修改该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let { _id, categoryName } = this.categoryList[index]
        this.categoryList[index].readonly = true
        // 调用修改分类接口
        this.modifyCategory({ _id, categoryName })
      }).catch(() => {
        this.cancle(index)
      })
    },
    // 取消修改
    cancle(index) {
      this.categoryList[index].readonly = true
      this.categoryList[index].categoryName = this.initialValue
    },
    del(id) {
      this.$confirm('是否删除分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.post('/delCategory', { id })
          .then(res => {
            if (res.errcode === 0) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getCategoryList()
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
      }).catch(() => {
      })
    },
    delCategoryBatch() {
      this.del(this.selectedList)
    },
    createCategory() {
      this.newCategory = this.newCategory.trim()
      if (!this.newCategory) {
        this.$message({
          type: 'error',
          message: '请填写分类'
        })
        return
      }
      this.$axios.post('/createCategory', {
        categoryName: this.newCategory
      })
        .then(res => {
          if (res.errcode === 0) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.getCategoryList()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
    },
    handlePageChange(currPage) {
      this.page = currPage
      this.getCategoryList()
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item._id
      })
    }
  }
}
</script>

<style lang="stylus" >
.search-wrapper
  display flex
  .search-input
    margin-right 10px
.pagination-wrapper
  margin-top 50px
  text-align center
.wcategory
  height 45px
  input:read-only
    border none
.del-batch
  margin-top 10px
.no-margin
  margin 0 !important
</style>