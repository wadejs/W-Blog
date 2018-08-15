const Controller = require('egg').Controller
class BlogController extends Controller {
  // 获取所有文章列表
  async getArticleList() {
    const { ctx } = this
    let { page = 1, keyword = '', status = 0 } = ctx.query
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let articleList = await ctx.service.admin.getArticleList(ctx.userId, page, keyword, status)
    resMsg.data = {
      list: articleList.list,
      count: articleList.count
    }
    ctx.body = resMsg
  }
  // 获取文章的内容
  async getArticleDetail() {
    const { ctx } = this
    let articleId = ctx.request.body.id
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let articleDetail = await ctx.service.admin.getArticleDetailByArticleId(articleId)
    resMsg.data = articleDetail[0]
    ctx.body = resMsg
  }
  // 编辑文章页获取用户的标签和分类数据
  async getArticleOptions() {
    const { ctx } = this
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let categoryListPromise = ctx.service.admin.getCategoryListById(ctx.userId)
    let tagsListPromise = ctx.service.admin.getTagsListById(ctx.userId)
    let categoryList = await categoryListPromise
    let tagsList = await tagsListPromise
    resMsg.data = {
      categoryList,
      tagsList
    }
    ctx.body = resMsg
  }
  // 创建或更新文章，如果有文章id就更新文章，否则新建文章
  async postArticle() {
    const { ctx } = this
    const { title, content } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    if (!title || !content) {
      resMsg.errcode = 1
      resMsg.msg = '请完整填写文章信息'
      ctx.body = resMsg
      return
    }
    // 如果有文章id就更新文章，否则新建文章
    if (ctx.request.body.id) {
      let res = await ctx.service.admin.updateArticle(ctx.request.body.id)
      resMsg.data.id = res.data._id
      resMsg.msg = '文章修改成功'
      if (res.oldStatus !== ctx.request.body.status) {
        resMsg.msg = '文章发布成功'
      }
    } else {
      let res = await ctx.service.admin.createArticle()
      resMsg.data.id = res._id
      resMsg.msg = '文章发布成功'
      if (res.status === 1) {
        resMsg.msg = '文章已存入草稿箱'
      }
    }
    ctx.body = resMsg
  }
  // 删除文章
  async delArticle() {
    const { ctx } = this
    const { id } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.delArticleById(id)
    if (res.n > 0) {
      resMsg.msg = '文章删除成功'
    } else {
      resMsg.msg = '文章删除失败'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 批量删除文章
  async delArticleBatch() {
    const { ctx } = this
    const { list } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.delArticleBatch(list)
    if (res.n > 0) {
      resMsg.msg = '文章删除成功'
    } else {
      resMsg.msg = '文章删除失败'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 恢复文章
  async recoveryArticle() {
    const { ctx } = this
    const { id } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.recoveryArticleById(id)
    if (res.n > 0) {
      resMsg.msg = '文章恢复成功'
    } else {
      resMsg.msg = '文章恢复失败'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 批量恢复文章
  async recoveryArticleBatch() {
    const { ctx } = this
    const { list } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.recoveryArticleBatch(list)
    if (res.n > 0) {
      resMsg.msg = '文章恢复成功'
    } else {
      resMsg.msg = '文章恢复失败'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 分类列表页获取分类列表
  async getCategoryList() {
    const { ctx } = this
    const id = ctx.userId
    const page = ctx.query.page
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.getCategoryList(id, page)
    resMsg.data = res
    ctx.body = resMsg
  }
  // 修改分类信息
  async modifyCategory() {
    const { ctx } = this
    const { category } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '分类修改成功'
    }
    let res = await ctx.service.admin.modifyCategory(category)
    if (res.n === 0) {
      resMsg.msg = '该分类id不存在'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 删除分类信息
  async delCategory() {
    const { ctx } = this
    const { id } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '分类删除成功'
    }
    let res
    if (id instanceof Array) {
      res = await ctx.service.admin.delCategoryBatch(id)
    } else if (typeof id === 'string') {
      res = await ctx.service.admin.delCategory(id)
    } else {
      resMsg.msg = '参数类型应为数组或字符串'
      resMsg.errcode = 1
      ctx.body = resMsg
      return
    }
    if (res.n === 0) {
      resMsg.msg = '分类id不存在'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 创建分类
  async createCategory() {
    const { ctx } = this
    const { categoryName } = ctx.request.body
    let res
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '分类新增成功'
    }
    let isNew = await ctx.service.admin.checkDuplicateCategory(categoryName)
    if (!isNew) {
      resMsg.msg = '该分类已存在'
      resMsg.errcode = 1
    } else {
      res = await ctx.service.admin.createCategory(categoryName)
      if (!res._id) {
        resMsg.msg = '分类新增失败'
      }
    }
    ctx.body = resMsg
  }
  // 获取标签列表
  async getTagList() {
    const { ctx } = this
    const id = ctx.userId
    const page = ctx.query.page
    let resMsg = {
      errcode: 0,
      data: {},
      msg: 'success'
    }
    let res = await ctx.service.admin.getTagList(id, page)
    resMsg.data = res
    ctx.body = resMsg
  }
  // 修改标签信息
  async modifyTag() {
    const { ctx } = this
    const { tag } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '标签修改成功'
    }
    let res = await ctx.service.admin.modifyTag(tag)
    if (res.n === 0) {
      resMsg.msg = '该标签id不存在'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 删除标签，如果提交一个id字符串，删除该标签；如果提交一个标签的数组，则删除该数组匹配的所有标签
  async delTag() {
    const { ctx } = this
    const { id } = ctx.request.body
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '标签删除成功'
    }
    let res
    if (id instanceof Array) {
      res = await ctx.service.admin.delTagBatch(id)
    } else if (typeof id === 'string') {
      res = await ctx.service.admin.delTag(id)
    } else {
      resMsg.msg = '参数类型应为数组或字符串'
      resMsg.errcode = 1
      ctx.body = resMsg
      return
    }
    if (res.n === 0) {
      resMsg.msg = '标签id不存在'
      resMsg.errcode = 1
    }
    ctx.body = resMsg
  }
  // 创建标签
  async createTag() {
    const { ctx } = this
    const { tagName } = ctx.request.body
    let res
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '标签新增成功'
    }
    let isNew = await ctx.service.admin.checkDuplicateTag(tagName)
    if (!isNew) {
      resMsg.msg = '该标签已存在'
      resMsg.errcode = 1
    } else {
      res = await ctx.service.admin.createTag(tagName)
      if (!res._id) {
        resMsg.msg = '标签新增失败'
      }
    }
    ctx.body = resMsg
  }
  // 获取七牛token
  async getQiniuToken() {
    const { ctx } = this
    let resMsg = {
      errcode: 0,
      data: {},
      msg: '获取token成功'
    }
    let uploadToken = await ctx.service.admin.getQiniuToken()
    resMsg.data.token = uploadToken
    ctx.body = resMsg
  }

}

module.exports = BlogController
