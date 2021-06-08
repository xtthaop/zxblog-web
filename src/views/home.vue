<template>
  <div class="home-wrap">
    <ul class="note-list">
      <li 
        v-for="n in 6" 
        :key="n" 
        @click="handleClick(n)"
      >
        <a class="title">怎样使用 Python 脚本制作可执行文件{{ n }}</a>
        <p class="abstract">
          她把写好的信纸对折，塞进她昨天买的黄皮信封里。她犹豫要不要在信封上写些什么，该有个收信人的，但她又想不出给谁——全是她发自肺腑的剖白，可惜别人看...
        </p>
        <div class="meta">
          <span>2022-0{{n}}-03 11:02:03</span>
        </div>
      </li>
    </ul>
    <footer>
      网站版权及备案
    </footer>
  </div>
</template>

<script>
export default {
  asyncData({ store }){
    return store.dispatch('fetchNoteList')
  },
  computed: {
    noteList(){
      return this.$store.state.noteList
    }
  },
  methods: {
    handleClick(id){
      console.log(id)
    }
  }
}
</script>

<style scoped lang="scss">
.home-wrap{
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p{ margin: 0; }

  .note-list{
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;

    li{
      box-sizing: border-box;
      padding: 20px 18px;
      border-bottom: 1px solid #efefef;

      .title{
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        line-height: 26px;
        margin-bottom: 5px;
      }

      .abstract{
        line-height: 22px;
        margin-bottom: 5px;
        font-size: 13px;
        color: #999;
      }

      .meta{
        line-height: 18px;
        font-size: 12px;
        color: #aaa;
      }
    }

    li:first-child{
      padding-top: 0;
    }

    li:last-child{
      padding-bottom: 0;
      border: none;
    }
  }

  footer{
    width: 100%;
    height: 30px;
    margin-top: 20px;
    color: #999;
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
