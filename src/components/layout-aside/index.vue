<template>
  <div class="layoutaside">
    <div class="title">
      <img src="@/assets/img/logo_admin.png" alt />
    </div>
    <el-menu :router="true" background-color="#323745" text-color="#adafb5">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <i slot="title" class="el-icon-s-grid"></i>
        <span slot="title">内容管理</span>

        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-user-solid"></i>
        <span>用户信息</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i  class="el-icon-s-opportunity"></i>
          <span>粉丝管理</span>
        </template>

        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layoutaside {
  width: 230px;
  height: 100vh;
  background-color: #323745;
  .title {
    text-align: center;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
  .el-menu {
    border-right: 0px;
  }
}
</style>
