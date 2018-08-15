<template>
  <div class="wrapper">
    <div class="logo">
      <img src="../../../static/logo3.png" alt="">
    </div>
    <Menu class="nav" mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1">
          <router-link to="/">
            <Icon type="ios-paper" />
            全部文章
          </router-link>
        </MenuItem>
        <MenuItem name="2">
            <a href="http://www.wadejs.cn/">
              <Icon type="md-navigate" />
              煌哥哥导航站
            </a>
        </MenuItem>
        <MenuItem name="3">
          <a href="http://wadejs.gitee.io/prefix-tool/">
            <Icon type="ios-construct" />
            在线添加css前缀工具
          </a>
        </MenuItem>
        <MenuItem name="4">
          <a href="http://www.wadejs.cn/sorry">
            <Icon type="ios-construct" />
            为所欲为gif生成
          </a>
        </MenuItem>
    </Menu>
    <Dropdown trigger="click" class="menu">
      <a href="javascript:void(0)">
        <Icon type="md-menu" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>
          <router-link to="/">
            <Icon type="ios-paper" />
            全部文章
          </router-link>
        </DropdownItem>
        <DropdownItem>
          <a href="http://www.wadejs.cn/">
            <Icon type="md-navigate" />
            煌哥哥导航站
          </a>
        </DropdownItem>
        <DropdownItem>
          <a href="http://wadejs.gitee.io/prefix-tool/">
            <Icon type="ios-construct" />
            在线添加css前缀工具
          </a>
        </DropdownItem>
        <DropdownItem>
          <a href="http://www.wadejs.cn/sorry">
            <Icon type="ios-construct" />
            为所欲为gif生成
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import {Menu, MenuItem, Icon, Dropdown, DropdownMenu} from 'iview'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Dropdown,
    DropdownMenu
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' scoped>
.wrapper
  display flex
.logo
  width 300px
  height 60px
  text-align center
  background #fff
  img
    width 100%
    height 60px
.nav
  flex 1
  position relative
  a
    display block
    width 100%
    height 100%
.menu
  position absolute
  right 5px
  top 10px
  display none
  font-size 40px
@media (max-width: 780px)
  .nav
    display none
  .menu
    display inline-block
</style>
