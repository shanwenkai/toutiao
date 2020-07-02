<template>
<div>
    <div class="scondhome">
        <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://img5.imgtn.bdimg.com/it/u=1254250781,4085106340&fm=26&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=866627631,3548875565&fm=26&gp=0.jpg',
        'http://attach.bbs.miui.com/forum/201701/08/144654eznarsrnccfa203f.jpg',
        'http://images.ali213.net/picfile/pic/2012-08-28/927_147.jpg'
      ]
    }
  }
}
</script>

<style  scoped>
.scondhome {
  height: calc(100vh - 60px);
  background-image: url("http://www.ronshuka.com/upload/photos/2018/11/qKHkP4COwVcLyZWrRpUG_18_d507699c72bd8239fea1c0b08f6799d8_image.jpeg");
  background-size: contain;
}

</style>
