<template>
  <div class="share-pop-wrap">
    <div class="mask"></div>
    <div class="share-pop">
      <span>点击“</span>
      <svg-icon iconClass="menu"></svg-icon>
      <span>”分享给微信好友</span>
      <svg-icon iconClass="close" className="close" @click="$emit('update:sharePopShow', false)"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1030;
  background: rgba(0, 0, 0, 0.3);
}

.share-pop{
  position: fixed;
  top: 20px;
  right: 10px;
  padding: 15px;
  background: #fff;
  border: 1px solid #eee;
  z-index: 1099;

  &::before, &::after{
    content: '';
    position: absolute;
    top: -20px;
    right: 5px;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 10px solid #eee;
  }

  &::after{
    border-bottom-color: #fff;
    top: -19px;
  }

  .close{
    font-size: 14px;
    margin-left: 10px;
    color: #999;
    cursor: pointer;
  }
}
</style>
