const Service = require('egg').Service;
class BlogService extends Service {

  async getAllArticleById(page, keyword) {
    const { ctx } = this
    const reg = new RegExp(keyword, 'i')
    let [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: 0, $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }] }, { html: 0 })
        .populate([{ path: 'tagId', select: 'tagName' }, { path: 'categoryId', select: 'categoryName' }]).limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }] }).count()
    ])
    // 截出预览部分
    list.map(item => {
      item.content = item.content.split('<!-- more -->')[0]
      return item
    })
    return {
      list,
      count
    }
  }

  async searchByCategory(page, id) {
    const { ctx } = this
    // let list = await ctx.model.Article.find({ categoryId: id })
    let [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: 0, categoryId: id }, { html: 0 }).populate([{ path: 'tagId', select: 'tagName' }, { path: 'categoryId', select: 'categoryName' }]).limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, categoryId: id }, { html: 0 }).count()
    ])
    // 截出预览部分
    list.map(item => {
      item.content = item.content.split('<!-- more -->')[0]
      return item
    })
    return {
      list,
      count
    }
  }

  async searchByTag(page, id) {
    const { ctx } = this
    let [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: 0, tagId: id }, { html: 0 }).populate([{ path: 'tagId', select: 'tagName' }, { path: 'categoryId', select: 'categoryName' }]).limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, tagId: id }, { html: 0 }).count()
    ])
    // 截出预览部分
    list.map(item => {
      item.content = item.content.split('<!-- more -->')[0]
      return item
    })
    return {
      list,
      count
    }
  }

  async getArticleDetailByArticleId(id) {
    const { ctx } = this
    return await ctx.model.Article.find({ _id: id }, { html: 0 }).populate([{ path: 'tagId', select: 'tagName' }, { path: 'categoryId', select: 'categoryName' }])
  }

  // 获取分类及数量
  async getCategoriesCount() {
    const { ctx } = this
    let categories = await ctx.model.Category.find({}, { __v: 0, userId: 0 })
    let res = []
    for (let index = 0; index < categories.length; index++) {
      let item = categories[index]
      let count = await ctx.model.Article.find({ status: 0, categoryId: item._id }).count()
      res.push({
        count: count,
        categoryName: item.categoryName,
        categoryId: item._id
      })
    }
    return res
  }

  // 获取标签及数量
  async getTagsCount() {
    const { ctx } = this
    let tags = await ctx.model.Tag.find({}, { __v: 0, userId: 0 })
    let res = []
    for (let index = 0; index < tags.length; index++) {
      let item = tags[index]
      let count = await ctx.model.Article.find({ status: 0, tagId: item._id }).count()
      res.push({
        count: count,
        tagName: item.tagName,
        tagId: item._id
      })
    }
    return res
  }

}

module.exports = BlogService
