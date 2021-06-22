<template>
  <div class="dialog-wrap" v-if="dialogVisible">
    <div class="mask"></div>
    <div class="dialog">
      <header>
        <svg-icon iconClass="close" className="close" @click="dialogVisible = false"></svg-icon>
      </header>
      <div class="content">
        <img ref="qrcodeImg" src="" />
        <div class="scanning">使用微信扫一扫</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dialogVisible: false
    }
  },
  methods: {
    open(){
      this.dialogVisible = true
      this.$nextTick(() => {
        const opts = {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          quality: 0.3,
          margin: 1,
          color: {
            dark:"#008ac9",
            light:"#cae7f7"
          }
        }

        const QRCode = require('qrcode')
        const img = this.$refs.qrcodeImg

        QRCode.toDataURL(location.href, opts, function(error, url){
          if(error) console.log(error)
          img.src = url
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrap{
  width: 100%;

  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1030;
    background: rgba(0, 0, 0, 0.3);
  }

  .dialog{
    position: fixed;
    top: 160px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    z-index: 1031;

    header{
      position: relative;
      width: 100%;
      height: 16px;
      margin-bottom: 15px;

      .close{
        position: absolute;
        right: -5px;
        color: #999;
        cursor: pointer;

        &:hover{
          color: #333;
        }
      }
    }

    .content{
      min-width: 50px;
      min-height: 50px;

      .scanning{
        width: 100%;
        margin-top: 10px;
        text-align: center;
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>
