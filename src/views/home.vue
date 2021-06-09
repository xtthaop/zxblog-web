<template>
  <div class="home-wrap">
    <ul class="note-list">
      <li v-for="item in noteList" :key="item.note_id" @click="handleClick(item)">
        <div class="content">
          <a class="title">{{ item.note_title }}</a>
          <p class="abstract">
            {{ item.abstracrt }}
          </p>
          <div class="meta">
            <span>{{ moment(item.create_time).format('YY-MM-DD HH:mm::ss') }}</span>
          </div>
        </div>
      </li>
    </ul>
    <footer>@2018-2021 知行 · 陈涛的网络笔记 · 晋ICP备19000910号-1</footer>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch('fetchNoteList')
  },
  computed: {
    noteList(){
      return this.$store.state.noteList
    },
  },
  methods: {
    encryptNoteId(id){
      let encryptId = (id * 2).toString()
      encryptId = Array(encryptId.length < 6 ? 6 - encryptId.length + 1 || 0 : 0).join(0) + encryptId
      encryptId = encryptId.replace(/0/g, 'f')
      encryptId = encryptId.replace(/4/g, 'r')
      return encryptId
    },
    handleClick(id){
      console.log(id)
    },
  },
};
</script>

<style scoped lang="scss">
.home-wrap{
  width: 100%;

  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p{
    margin: 0;
  }

  .note-list{
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;

    li{
      width: 100%;
      box-sizing: border-box;
      padding: 20px 18px;
      border-bottom: 1px solid #efefef;

      .content{
        width: 100%;

        .title{
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          line-height: 26px;
          margin-bottom: 5px;

          &:hover{
            cursor: pointer;
            text-decoration: underline;
          }
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
    padding: 10px 18px;
    box-sizing: border-box;
    margin-top: 20px;
    line-height: 20px;
    color: #ccc;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
