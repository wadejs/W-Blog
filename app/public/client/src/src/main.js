// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
import '@/assets/css/index.styl'
import './plugins/axios'
// 打包的设置 用户获取路径
import buildConfig from '../config/index'
Vue.prototype.$assetsPublicPath = process.env.NODE_ENV === 'development' ? buildConfig.dev.assetsPublicPath : buildConfig.build.assetsPublicPath
Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
