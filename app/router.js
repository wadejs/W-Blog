'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 后台授权中间件
  const auth = app.middleware.auth()
  // 首页
  router.get('/', controller.page.index);
  router.get('/admin', controller.page.admin);
  // 获取验证码
  router.get('/getCaptcha', controller.login.getCaptcha);
  // 登录
  router.post('/login', controller.login.login);
  // 获取所有文章列表
  router.get('/getArticleList', auth, controller.admin.getArticleList);
  // 编辑文章页获取用户的标签和分类数据
  router.get('/getArticleOptions', auth, controller.admin.getArticleOptions);
  // 获取文章的内容
  router.post('/getArticleDetail', auth, controller.admin.getArticleDetail);
  // 创建或更新文章，如果有文章id就更新文章，否则新建文章
  router.post('/postArticle', auth, controller.admin.postArticle);
  // 删除文章
  router.post('/delArticle', auth, controller.admin.delArticle);
  // 批量删除文章
  router.post('/delArticleBatch', auth, controller.admin.delArticleBatch);
  // 恢复文章
  router.post('/recoveryArticle', auth, controller.admin.recoveryArticle);
  // 批量恢复文章
  router.post('/recoveryArticleBatch', auth, controller.admin.recoveryArticleBatch);
  // 获取分类列表
  router.get('/getCategoryList', auth, controller.admin.getCategoryList);
  // 修改分类信息
  router.post('/modifyCategory', auth, controller.admin.modifyCategory);
  // 删除分类，如果提交一个id字符串，删除该分类；如果提交一个分类的数组，则删除该数组匹配的所有分类
  router.post('/delCategory', auth, controller.admin.delCategory);
  // 创建分类
  router.post('/createCategory', auth, controller.admin.createCategory);
  // 获取标签列表
  router.get('/getTagList', auth, controller.admin.getTagList);
  // 修改标签信息
  router.post('/modifyTag', auth, controller.admin.modifyTag);
  // 删除标签，如果提交一个id字符串，删除该标签；如果提交一个标签的数组，则删除该数组匹配的所有标签
  router.post('/delTag', auth, controller.admin.delTag);
  // 创建标签
  router.post('/createTag', auth, controller.admin.createTag);
  // 获取七牛token
  router.get('/getQiniuToken', auth, controller.admin.getQiniuToken);

  /* 前台路由 */
  // 获取所有文章列表，如果有传keyword,则根据keyword搜索
  router.get('/c/getArticleList', controller.client.getArticleList);
  // 根据分类搜索
  router.get('/c/searchByCategory', controller.client.searchByCategory);
  // 根据标签搜索
  router.get('/c/searchByTag', controller.client.searchByTag);
  // 获取文章的详细信息
  router.post('/c/getArticleDetail', controller.client.getArticleDetail);
  // 获取所有分类和标签及其数量
  router.get('/c/getTagsAndCategories', controller.client.getTagsAndCategories);

};
