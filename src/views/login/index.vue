<template>
  <div class="login">
    <el-card class="loginCard">
      <div class="logo">
        <img src="@/assets/img/logo_index.png" alt />
      </div>
      <el-form ref="LoginForm" :model="LoginForm" :rules="LoginRules">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <div class="data">
          <el-form-item prop="code">
            <el-input v-model="LoginForm.code" style="width:60%" placeholder="验证码"></el-input>
            <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="checkbox">
            <el-checkbox v-model="LoginForm.checkbox">我已阅读并且同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width:100%" type="primary">点击登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      LoginForm: {
        mobile: '',
        code: '',
        checkbox: false
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '您输入的手机号错误'
          }
        ],
        code: [{ required: true, message: '请输入正确的验证码' }, {
          pattern: /^\d{6}$/,
          message: '您输入的验证码错误'
        }],
        checkbox: [
          {
            validator: function (rule, value, callback) {
              value ? callback() : callback(new Error('请勾选'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.LoginForm.validate().then(() => {
        this.$axios({
          url: '/authorizations',
          data: this.LoginForm,
          method: 'post'

        }).then(result => {
          // console.log(result)
          window.localStorage.setItem('user-token', result.data.token)
          this.$router.push('/home')
          // 跳转到主页
        }).catch(() => {
          this.$message.error('用户名或密码错误')
        })
      })
    }
  }

}

</script>

<style lang='less' scoped>
.login {
  background-image: url("http://t9.baidu.com/it/u=86853839,3576305254&fm=79&app=86&f=JPEG?w=750&h=390");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginCard {
    width: 440px;
    height: 350px;
    .logo {
      text-align: center;
      margin-bottom: 30px;
      img {
        height: 45px;
      }
    }
  }

}
</style>
