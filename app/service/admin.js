const Service = require('egg').Service;
const qiniu = require('qiniu')
class BlogService extends Service {
  // 根据用户id获取文章列表
  async getArticleList(id, page, keyword, status) {
    const { ctx } = this
    const reg = new RegExp(keyword, 'i')
    let [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: status, $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }] }, { content: 0, tagId: 0 }).limit(10).skip((page - 1) * 10),
      ctx.model.Article.find({ $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }] }).count()
    ])
    return {
      list,
      count
    }
  }
  // 根据文章id获取文章详情
  async getArticleDetailByArticleId(id) {
    const { ctx } = this
    return await ctx.model.Article.find({ _id: id }).populate([ 'tagId', 'categoryId' ])
  }
  // 根据用户id获取分类列表，只返回所有分类，用于文章编辑页
  async getCategoryListById(id) {
    const { ctx } = this
    return await ctx.model.Category.find({ userId: id }, { __v: 0, userId: 0 })
  }
  // 根据用户id获取标签列表，只返回所有标签，用于文章编辑页
  async getTagsListById(id) {
    const { ctx } = this
    return await ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 })
  }
  // 更新文章
  async updateArticle(id) {
    const { ctx } = this
    let [ oldArticle, res ] = await Promise.all([
      ctx.model.Article.findOne({ _id: id }).select('status'),
      ctx.model.Article.update({ _id: id }, {
        userId: ctx.userId,
        tagId: ctx.request.body.tag,
        categoryId: ctx.request.body.category || null,
        content: ctx.request.body.content,
        html: ctx.request.body.html,
        title: ctx.request.body.title,
        updateTime: Date(),
        status: ctx.request.body.status
      })
    ])
    if (res.n > 0) {
      return {
        data: res,
        oldStatus: oldArticle.status
      }
    }
  }
  // 创建文章
  async createArticle() {
    const { ctx } = this
    return await ctx.model.Article.create({
      userId: ctx.userId,
      tagId: ctx.request.body.tag,
      categoryId: ctx.request.body.category || null,
      content: ctx.request.body.content,
      html: ctx.request.body.html,
      title: ctx.request.body.title,
      createTime: Date(),
      status: ctx.request.body.status
    })
  }
  // 根据文章id删除文章
  async delArticleById(id) {
    const { ctx } = this
    if (ctx.request.body.truly) {
      // 如果truly为真，则真正删除该文章，否则改变文章的status，加入垃圾箱
      return await ctx.model.Article.remove({ _id: id })
    }
    return await ctx.model.Article.update({ _id: id }, { status: 2 })
  }
  // 根据文章id的数组批量删除文章
  async delArticleBatch(list) {
    const { ctx } = this
    if (ctx.request.body.truly) {
      // 如果truly为真，则真正删除该文章，否则改变文章的status，加入垃圾箱
      return await ctx.model.Article.remove({ _id: { $in: list } })
    }
    return await ctx.model.Article.update({ _id: { $in: list } }, { status: 2 }, { multi: true })
  }
  // 根据文章id恢复文章至垃圾箱文章
  async recoveryArticleById(id) {
    const { ctx } = this
    return await ctx.model.Article.update({ _id: id }, { status: 1 })
  }
  // 根据文章id的数组批量恢复文章至垃圾箱文章
  async recoveryArticleBatch(list) {
    const { ctx } = this
    return await ctx.model.Article.update({ _id: { $in: list } }, { status: 1 }, { multi: true })
  }
  // 分类列表页获取分类列表，包括数量
  async getCategoryList(id, page) {
    const { ctx } = this
    let [ list, count ] = await Promise.all([
      ctx.model.Category.find({ userId: id }, { __v: 0, userId: 0 }).limit(10).skip((page - 1) * 10),
      ctx.model.Category.find({ userId: id }, { __v: 0, userId: 0 }).count()
    ])
    return {
      list,
      count
    }
  }
  // 修改分类信息
  async modifyCategory({ _id, categoryName }) {
    const { ctx } = this
    return await ctx.model.Category.update({ _id: _id }, { categoryName: categoryName })
  }
  // 删除分类信息
  async delCategory(id) {
    const { ctx } = this
    return await ctx.model.Category.remove({ _id: id })
  }
  // 批量删除分类信息
  async delCategoryBatch(list) {
    const { ctx } = this
    return await ctx.model.Category.remove({ _id: { $in: list } })
  }
  // 检查重复分类
  async checkDuplicateCategory(categoryName) {
    const { ctx } = this
    let res = await ctx.model.Category.find({ categoryName: categoryName })
    return res.length === 0
  }
  // 创建分类
  async createCategory(categoryName) {
    const { ctx } = this
    return await ctx.model.Category.create({ categoryName: categoryName, userId: ctx.userId })
  }
  // 标签列表页获取标签列表，包括数量
  async getTagList(id, page) {
    const { ctx } = this
    let [ list, count ] = await Promise.all([
      ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 }).limit(10).skip((page - 1) * 10),
      ctx.model.Tag.find({ userId: id }, { __v: 0, userId: 0 }).count()
    ])
    return {
      list,
      count
    }
  }
  // 修改标签
  async modifyTag({ _id, tagName }) {
    const { ctx } = this
    return await ctx.model.Tag.update({ _id: _id }, { tagName: tagName })
  }
  // 删除标签
  async delTag(id) {
    const { ctx } = this
    return await ctx.model.Tag.remove({ _id: id })
  }
  // 批量删除标签
  async delTagBatch(list) {
    const { ctx } = this
    return await ctx.model.Tag.remove({ _id: { $in: list } })
  }
  // 检查重复标签
  async checkDuplicateTag(tagName) {
    const { ctx } = this
    let res = await ctx.model.Tag.find({ tagName: tagName })
    return res.length === 0
  }
  // 创建标签
  async createTag(tagName) {
    const { ctx } = this
    return await ctx.model.Tag.create({ tagName: tagName, userId: ctx.userId })
  }
  // 生成七牛token
  async getQiniuToken() {
    const { app } = this
    // 这里需要七牛的Access Key和Secret Key
    let mac = new qiniu.auth.digest.Mac(app.config.qiniu.ak, app.config.qiniu.sk);
    let options = {
      scope: 'blog',
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
  }
}

module.exports = BlogService
