<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
      <el-form style="padding-left:50px">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchForm.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="searchForm.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="日期范围：">

          <el-date-picker  v-model="searchForm.dateRange" value-format="yyyy-MM-dd" type="daterange" placeholder="请选择范围"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row class="total" type="flex" align="middle">
        <span>搜索到1000条记录</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
         <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag :type="item.status | filterType" class="tag">{{item.status | fileterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span @click="delMaterial(item.id.toString())">
            <i  class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height:80px">
        <el-pagination @current-change="changePage" :page="page.currentPage" :page-size="pageSize" :total="page.total" background
        layout="prev,pager,next"
        >

        </el-pagination>
      </el-row>
    </bread-crumb>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1, // 当前的页码
        pageSize: 10, // 接口要求每页的条数
        total: 0 // 总数
      },
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/default.gif')

    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.page.currentPage = 1
        this.getParams()
      }
    }
  },
  filters: {
    fileterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'

        case 2:
          return '已发表'

        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    delMaterial (id) {
      this.$confirm('您确定删除此条数据吗').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          this.getParams()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    changePage (newPage) {
      // const params = {
      //   page: this.page.currentPage = newPage,
      //   per_page: this.page.pageSize,
      //   status: this.searchForm.status === 5 ? null : this.searchForm.status,
      //   channel_id: this.channel_id,
      //   begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
      //   end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      // }
      this.page.currentPage = newPage
      this.getParams()
    },
    getParams () {
      const params = {
        page: this.page.currentPage, // 如果条件改变 就回到第一页
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },

    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },

    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.article-item {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      display: flex;
      flex-direction: column;
      height: 100px;
      justify-content: space-around;
      margin-left: 10px;
      .date {
        color: #999;
        font-size: 12px;
      }
      .tag {
        width: 60px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 14px;
    margin-right: 8px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
