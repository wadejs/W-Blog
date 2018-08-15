<template>
  <d2-container type="full" class="page">
    <div class="search-wrapper">
      <el-input
        placeholder="请输入标签名称"
        v-model="newTag"
        @keyup.enter.native="createTag"
        class="search-input"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-plus" @click="createTag">新增标签</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="tagList"
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
      prop="tagName"
      align="center"
      label="标签名称"
      >
      <template slot-scope="scope">
        <el-input
          class="wcategory"
          :readonly="scope.row.readonly"
          v-model="scope.row.tagName"
          placeholder="请输入标签"
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
      tagList: [],
      selectedList: [],
      page: 1,
      sumList: 0,
      initialValue: '',
      newTag: ''
    }
  },
  computed: {
  },
  mounted() {
    this.getTagList()
  },
  methods: {
    getTagList() {
      this.loading = Loading.service({ fullscreen: true })
      this.$axios('/getTagList', {
        params: {
          page: this.page
        }
      }).then(res => {
        this.loading.close()
        this.tagList = res.data.list.map(item => {
          item.readonly = true
          return item
        })
        this.sumList = res.data.count
      })
    },
    modifyTag(tag) {
      this.$axios.post('/modifyTag', {
        tag: tag
      }).then(res => {
        if (res.errcode === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getTagList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    Edit(index) {
      this.tagList[index].readonly = false
      this.initialValue = this.tagList[index].tagName
    },
    comfirm(index) {
      this.$confirm('是否修改该标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let { _id, tagName } = this.tagList[index]
        this.tagList[index].readonly = true
        // 调用修改标签接口
        this.modifyTag({ _id, tagName })
      }).catch(() => {
        this.cancle(index)
      })
    },
    // 取消修改
    cancle(index) {
      this.tagList[index].readonly = true
      this.tagList[index].tagName = this.initialValue
    },
    del(id) {
      this.$confirm('是否删除标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.post('/delTag', { id })
          .then(res => {
            if (res.errcode === 0) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getTagList()
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
    createTag() {
      this.newTag = this.newTag.trim()
      if (!this.newTag) {
        this.$message({
          type: 'error',
          message: '请填写标签'
        })
        return
      }
      this.$axios.post('/createTag', {
        tagName: this.newTag
      })
        .then(res => {
          if (res.errcode === 0) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.getTagList()
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
      this.getTagList()
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item._id
      })
    }
  }
}
</script>

<style lang="stylus">
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