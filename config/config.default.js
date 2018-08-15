'use strict';

module.exports = appInfo => {
  return {
    keys: appInfo.name + '_153332185447_3632',
    mongoose: {
      clients: {
        blog: {
          url: 'mongodb://127.0.0.1/blogtest',
          options: {
            // user: 'test', // 数据库账号
            // pass: 'test'  // 数据库密码
          },
        }
      }
    },
    user: { // 初始化管理员的账号
      userName: 'admin',
      password: 'admin',
    },
    session: {
      maxAge: 3600 * 1000,
    },
    jwt: {
      cert: 'huanggegehaoshuai' // jwt秘钥
    },
    qiniu: { // 这里填写你七牛的Access Key和Secret Key
      ak: '',
      sk: ''
    }
  }
};
