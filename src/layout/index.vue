<template>
  <div class="layout">
    <header>
      <!-- <div>网站标题</div> -->
    </header>
    <!-- <div class="main">
      <router-view></router-view>
    </div>
    <footer>
      网站版权与备案
    </footer> -->
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout{
  width: 100%;

  header{
    width: 100%;
    height: 56px;
    background: #fff;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }
}
</style>
