<template>
  <el-card>
    <berad-crumb>
      <template slot="title">发布文章</template>
    </berad-crumb>
    <!-- 表单组件  标题宽度设置于 el-form组件-->
      <el-form  ref="myCours" :model="publishForm" :rules="publishRules"  style="margin-left:50px" label-width="100px">
        <el-form-item  prop="title" label="标题">
          <!-- 输入框 -->
          <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <!-- 多行输入 -->
          <el-input v-model="publishForm.content" placeholder="请输入您的内容" type='textarea' :rows="4"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="封面">
          <!-- 单选框组 -->
          <el-radio-group v-model="publishForm.cover.type">
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="2">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel_id" label="频道">
          <!-- select选择器 -->
          <el-select v-model="publishForm.channel_id"  placeholder="请选择频道">
              <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <el-button @click="publish" type='primary'>发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1自动 0 无图 1一图 2三图
          image: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5到30之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章标题不能为空' }],
        channel_id: [{ required: true, message: '频道标题不能为空' }]
      }
    }
  },
  methods: {
    getPublish () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    publish () {
      this.$refs.myCours.validate()
    }
  },
  created () {
    this.getPublish()
  }
}
</script>

<style>
</style>
