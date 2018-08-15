const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  // 首页
  {
    path: '/',
    redirect: { name: 'index' },
    component: () => import('@/components/core/d2-layout-main'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/core/index')
      }
    ]
  },
  {
    path: '/core/create',
    name: 'core-create',
    meta,
    redirect: { name: 'core-create-index' },
    component: () => import('@/components/core/d2-layout-main'),
    children: (pre => [
      { path: 'index', name: `${pre}index`, component: () => import('@/pages/core/create/index'), meta: { ...meta, title: '博客管理首页' } },
      { path: 'newArticle', name: `${pre}newArticle`, component: () => import('@/pages/core/create/newArticle'), meta: { ...meta, title: '创建文章', alive: true } },
      { path: 'editArticle/:id', name: `${pre}editArticle`, component: () => import('@/pages/core/create/editArticle'), meta: { ...meta, title: '编辑文章' } },
      { path: 'newCategory', name: `${pre}newCategory`, component: () => import('@/pages/core/create/newCategory'), meta: { ...meta, title: '创建分类' } },
      { path: 'newTag', name: `${pre}newTag`, component: () => import('@/pages/core/create/newTag'), meta: { ...meta, title: '创建标签' } },
      { path: 'articleList', name: `${pre}articleList`, component: () => import('@/pages/core/create/articleList'), meta: { ...meta, title: '全部文章' } },
      { path: 'articleList/draft', name: `${pre}articleList-draft`, component: () => import('@/pages/core/create/articleList/draft.vue'), meta: { ...meta, title: '草稿箱' } },
      { path: 'articleList/garbage', name: `${pre}articleList-garbage`, component: () => import('@/pages/core/create/articleList/garbage.vue'), meta: { ...meta, title: '垃圾箱' } }
    ])('core-create-')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/core/404')
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/core/login')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
