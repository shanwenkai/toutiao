<template>
  <el-card>
    <berad-crumb>
      <template slot="title">素材管理</template>
    </berad-crumb>
      <el-row type="flex" justify="end">
        <el-upload http-request="uploadImg" action="">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-row>
           <el-tabs @tab-click='changeTab' v-model="changematerial">
               <el-tab-pane label="全部素材" name="all">
                   <div class="img-list">
                       <el-card v-for="(item,index) in list" :key="item.id" class="img-card">
                           <img :src="item.url" alt="" @click="selectIndex(index)">
                           <el-row type="flex" align="middle" justify="space-around" class="oprite">
                             <i @click="changeCollet(item)" :style="{color :item.is_collected ? 'red' : 'black'}" class="el-icon-star-off"></i>
                             <i @click="delCollet(item)" class="el-icon-delete"></i>
                           </el-row>
                       </el-card>
                   </div>
               </el-tab-pane>
               <el-tab-pane label="收藏素材" name="second">
                 <div class="img-list">
                       <el-card v-for="(item,index) in list" :key="item.id" class="img-card">
                           <img :src="item.url" alt="" @click="selectIndex(index)">
                       </el-card>
                   </div>
               </el-tab-pane>
           </el-tabs>
           <el-row type="flex" align="middle" justify="space-around" style="height:80px">
             <el-pagination
             @current-change = 'changePage'
             :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            layout="prev, pager, next">

             </el-pagination>
              <el-dialog  @opened="opendEnd" @close="dialogVisible = false" :visible="dialogVisible">
                <el-carousel  ref="myCarousel" indicator-position="outside" height="400px">
                  <el-carousel-item v-for="item in list" :key= item.id>
                    <img style="width:100% height:100%" :src="item.url" alt="">
                  </el-carousel-item>
                </el-carousel>
              </el-dialog>
           </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      changematerial: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 4
      },
      dialogVisible: false,
      clickIndex: -1
    }
  },
  methods: {
    opendEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    selectIndex (index) {
      this.clickIndex = index
      this.dialogVisible = true
    },
    changeCollet (row) {
      this.$axios({
        method: 'put',
        url: `/user/images/${row.id}`,
        data: {
          collect: !row.id_collected
        }

      }).then(() => {
        this.getMatrial()
      }).catch(() => {
        this.$message.error('收藏素材是失败')
      })
    },
    delCollet (row) {
      this.$confirm('您确定要删除素材吗').then(() => {
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'delete'
        }).then(() => {
          this.getMatrial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6
      }).then(() => {
        this.getMatrial()
      }).catch(() => {
        this.$message.error('你上传的素材失败')
      })
    },

    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMatrial()
    },
    getMatrial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.changematerial === 'second', // 获取不是收藏的数据 就是获取全部的数据 false 获取的是全部的数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        // 将返回的数据 赋值到data中的数据
        this.list = result.data.results
        // 获取完整数据赋值给total
        this.page.total = result.data.total_count
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMatrial()
    }
  },
  created () {
    this.getMatrial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
        width: 220px;
        height: 240px;
        margin: 20px 50px;
        position: relative;
        img{
            width: 100%;
        }
        .oprite {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
        }
    }

}
</style>
