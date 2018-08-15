const create = {
  path: '/core/create',
  title: '博客管理',
  icon: 'cog',
  children: (pre => [
    { path: `${pre}index`, title: '博客管理首页', icon: 'pencil' },
    { path: `${pre}newArticle`, title: '创建文章', icon: 'code' },
    // { path: `${pre}editArticle`, title: '编辑文章', icon: 'code' },
    { path: `${pre}newCategory`, title: '创建分类', icon: 'cubes' },
    { path: `${pre}newTag`, title: '创建标签', icon: 'tags' },
    {
      // path: `${pre}articleList`,
      title: '文章管理',
      icon: 'file',
      children: [
        { path: `${pre}articleList`, title: '全部文章', icon: 'th-large' },
        { path: `${pre}articleList/draft`, title: '草稿箱', icon: 'save' },
        { path: `${pre}articleList/garbage`, title: '垃圾箱', icon: 'remove' }
      ]
    }
  ])('/core/create/')
}

// 菜单 侧边栏
export const side = [
  create
]

// 菜单 顶栏
export default [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  create
]
