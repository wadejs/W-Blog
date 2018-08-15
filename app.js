module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    const db = app.mongooseDB.get('blog')
    let adminInfo = app.config.user
    let admin = await app.model.User.find({ userName: adminInfo.userName })
    if (admin.length === 0) {
      // 初始化管理员
      await app.model.User.create(adminInfo)
      console.log('管理员已初始化')
    }
    db.once('open', () => {
      console.log('数据库连接成功');
    })
  })
}
