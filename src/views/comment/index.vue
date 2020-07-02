<template>
  <el-card v-loading="loading">
    <berad-crumb>
      <template slot="title">评论管理</template>
    </berad-crumb>
    <el-table stripe :data="list">
      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="comment_status" label="评论状态" :formatter="formatterBoolean"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            @click="opencomment(obj.row)"
            size="small"
            type="text"
          >{{ obj.row.comment_status ? '关闭' : '打开' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        :background="true"
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change='changePage'
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        currentPage: 10,
        pageSize: 10
      },
      list: [],
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: 'articles',
        params: {
          page: this.page.currentPage, // 查对应页码
          per_page: this.page.pageSize // 查10条
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },

    opencomment (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否${{ mess }}评论`).then(() => {
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            article_id: row.id.toString() // 要求参数的文章id
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        })
          .then(() => {
            this.$message.success(`${{ mess }}评论成功`)
          })
          .catch(() => {
            this.$message.error(`${{ mess }}评论失败`)
          })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
