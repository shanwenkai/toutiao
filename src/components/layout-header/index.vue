<template>
  <div>
    <el-row align="middle" type="flex" class="layoutheader">
      <el-col class="left" :span="12">
        <i class="el-icon-s-fold"></i>
        <span>我的主页</span>
      </el-col>
      <el-col class="right" :span="12">
        <el-row type="flex" align="middle" justify="end">
          <img :src="userInfo.name" alt="">

          <el-dropdown @command='clickMenu' trigger="click">
            <span>{{userInfo.name}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="quiet">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (abc) {
      if (abc === 'info') {
        // '点击了个人信息'
      } else if (abc === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },

  created () {
    this.$axios({
      url: '/user/profile'
    }).then(result => {
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang='less' scopod>
.layoutheader {
  height: 80px;
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
  }
}
</style>
