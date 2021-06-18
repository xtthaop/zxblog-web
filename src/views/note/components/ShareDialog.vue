<template>
  <div class="dialog-wrap" v-if="dialogVisible">
    <div class="mask"></div>
    <div class="dialog">
      <header>
        <svg-icon iconClass="close" className="close"></svg-icon>
      </header>
      <div class="content">

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
    width: 80%;
    max-width: 600px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    z-index: 1031;

    header{
      position: relative;
      width: 100%;
      height: 16px;
      margin-bottom: 10px;

      .close{
        position: absolute;
        right: 0;
        color: #999;
        cursor: pointer;

        &:hover{
          color: #333;
        }
      }
    }

    .content{
      width: 100%;
    }
  }
}
</style>
