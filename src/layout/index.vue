<template>
  <div class="layout">
    <div class="header-wrap">
      <header>
        <div class="logo-wrap">
          <img :src="logo" />
        </div>
      </header>
    </div>
    <div class="main-wrap">
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'

export default {
  name: 'Layout',
  data(){
    return {
      logo
    }
  }
}
</script>

<style scoped lang="scss">
.layout{
  position: absolute;
  width: 100%;
  height: 100%;

  .header-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: #fff;
    border-bottom: 1px solid #dedede;
    box-sizing: border-box;
    margin-bottom: 10px;
    z-index: 1030;

    header{
      width: 100%;
      height: 100%;
      padding: 0 30px;
      max-width: 780px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .logo-wrap{
      display: inline-block;
      height: 100%;
      padding: 10px 0;
      box-sizing: border-box;

      img{
        height: 100%;
      }
    }
  }

  .main-wrap{
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    padding-top: 66px;
    background: #efefef;

    main{
      width: 100%;
      height: 100%;
      max-width: 780px;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
}
</style>
