<template>
  <!-- 先放在一个大容器 -->

  <el-container>
    <!-- 侧边栏导航区域 -->
    <el-aside style="width:230px">
      <layoutAside></layoutAside>
    </el-aside>
    <el-container>
      <el-header>
       <layoutHeader></layoutHeader>
      </el-header>
      <el-main style="padding: 0 0">

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
</style>
