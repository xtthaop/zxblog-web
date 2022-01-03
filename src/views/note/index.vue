<template>
  <div class="note-wrap">
    <div class="note">
      <header>
        <h1 class="title">{{ note.publish_note_title }}</h1>
        <div class="note-info">
          <a class="author-avatar" href="https://xtthaop.github.io" target="_blank">
            <img :src="avatar" />
          </a>
          <div style="margin-left:10px;">
            <div class="author-name">tao</div>
            <div class="note-detail">
              <span>
                <span>发布于</span>
                <span>{{ moment(note.publish_time).format('YYYY-MM-DD') }}</span>
              </span>
              <span v-if="note.publish_update_time">
                <span> | 更新于</span>
                <span>{{ moment(note.publish_update_time).format('YYYY-MM-DD') }}</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      <article v-html="parseMarkdown(note.publish_note_content)"></article>
    </div>
    <footer>
      <div class="option-bar">
        <div class="option">
          <div class="item">
            <div class="btn" @click="$refs.likeDialog.open()">
              <svg-icon iconClass="like" className="icon"></svg-icon>
              <span class="text">赞赏</span>
            </div>
          </div>
          <div class="item">
            <div class="btn" @click.stop="shareMenuToggle">
              <svg-icon iconClass="share" className="icon"></svg-icon>
              <span class="text">分享</span>
            </div>
            <ul class="menu" v-if="shareMenuShow" @click="shareMenuToggle">
              <li @click="copyUrl">
                <svg-icon iconClass="link" className="icon link"></svg-icon>
                <span>复制链接</span>
              </li>
              <li @click="showQRCode">
                <svg-icon iconClass="wechat" className="icon wechat"></svg-icon>
                <span>微信分享</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <ShareDialog ref="shareDialog"></ShareDialog>
    <LikeDialog ref="likeDialog"></LikeDialog>
    <SharePop v-if="sharePopShow" :sharePopShow.sync="sharePopShow"></SharePop>
  </div>
</template>

<script>
import 'highlight.js/styles/vs2015.css'
import avatar from '@/assets/images/avatar.png'
import ShareDialog from './components/ShareDialog'
import LikeDialog from './components/LikeDialog'
import SharePop from './components/SharePop'
import { getWxConfig } from '@/api/index'
import titleMixin from '@/mixins/title-mixin'

export default {
  mixins: [titleMixin],
  title(){
    return '知行 | ' + this.note.publish_note_title
  },
  asyncData({ store, route }){
    return store.dispatch('fetchNote', route.params.id)
  },
  components: {
    ShareDialog,
    SharePop,
    LikeDialog,
  },
  data(){
    return {
      avatar,
      shareMenuShow: false,
      sharePopShow: false,
    }
  },
  computed: {
    note(){
      return this.$store.state.note
    },
  },
  mounted(){
    this.handleGetWxConfig()
  },
  methods: {
    shareMenuToggle(){
      if(this.shareMenuShow){
        this.shareMenuShow = false
        document.removeEventListener('click', this.shareMenuToggle)
      }else{
        this.shareMenuShow = true
        document.addEventListener('click', this.shareMenuToggle)
      }
    },
    isWeChat(){
      const ua = navigator.userAgent.toLowerCase()
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true
      }else{
        return false
      }
    },
    copyUrl(){
      const input = document.createElement('input')
      input.setAttribute('value', location.href)
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    },
    showQRCode(){
      if(this.isWeChat()){
        this.sharePopShow = true
      }else{
        this.$refs.shareDialog.open()
      }
    },
    getNoteAbstract(content){
      const md = require('markdown-it')()
      let abstract = md.render(content)
      abstract = abstract.replace(/\n/g, '')
      abstract = abstract.replace(/<code.+?code>/g, '')
      abstract = abstract.replace(/<\/?.+?>/g, '')
      abstract = abstract.substring(0, 90) + '...'
      return abstract
    },
    handleGetWxConfig(){
      const params = {
        url: location.href
      }

      getWxConfig(params).then(res => {
        const wx = require('weixin-js-sdk')

        wx.config({
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
          ]
        })

        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: this.note.note_title,
            desc: this.getNoteAbstract(this.note.publish_note_content),
            link: location.href,
            imgUrl: location.origin + '/public/images/logo.png',
            success: () => {}
          })

          wx.updateTimelineShareData({
            title: this.note.note_title,
            link: location.href,
            imgUrl: location.origin + '/public/images/logo.png',
            success: () => {}
          })
        })
      })
    },
    parseMarkdown(content){
      const hljs = require('highlight.js/lib/common')
      const md = require('markdown-it')({
        breaks: true,
        highlight: (str, lang) => {
          if(lang && hljs.getLanguage(lang)){
            try{
              return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>'
            }catch(__){}
          }
      
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
      })

      // add target="_blank" to all links
      // Remember old renderer, if overridden, or proxy to default renderer
      const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self){
        return self.renderToken(tokens, idx, options)
      }

      md.renderer.rules.link_open = function(tokens, idx, options, env, self){
        // If you are sure other plugins can't add `target` - drop check below
        const aIndex = tokens[idx].attrIndex('target')
      
        if(aIndex < 0){
          tokens[idx].attrPush(['target', '_blank']) // add new attribute
        }else{
          tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
        }
        
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self)
      }

      // replace default image render rule
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        token.attrs[token.attrIndex('alt')][1] = self.renderInlineAsText(token.children, options, env)

        return '<div class="image-package"><img' + 
              '  src="' + token.attrs[token.attrIndex('src')][1] + '"' + 
              '  alt="' + token.attrs[token.attrIndex('alt')][1] + '"' +
              '  title="' + (token.attrs[token.attrIndex('title')] ? token.attrs[token.attrIndex('title')][1] : '') + '"' +
              '/></div>'
      }

      let abstract = md.render(content)
      return abstract
    },
  }
}
</script>

<style scoped lang="scss">
.note-wrap{
  width: 100%;
  padding-bottom: 66px;
}

.note{
  width: 100%;
  padding: 30px 30px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;

  header{
    width: 100%;
    margin-bottom: 30px;

    .title{
      line-height: 1.5;
      font-size: 26px;
      font-weight: 700;
      color: #333;
      word-break: break-word;
      margin-top: 0;
      margin-bottom: 15px;
    }

    .note-info{
      display: flex;
      align-items: center;
      width: 100%;

      .author-avatar{
        display: inline-block;
        width: 39px;
        height: 39px;
        background: #efefef;
        border-radius: 50%;
        overflow: hidden;
      }

      .author-name{
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 3px;
      }

      .note-detail{
        font-size: 12px;
        color: #666;
      }
    }
  }
}

footer{
  width: 100%;

  .option-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: #fff;
    border-top: 1px solid #eee;

    .option{
      width: 100%;
      max-width: 780px;
      height: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      margin: 0 auto;

      .item{
        position: relative;
        float: right;
        line-height: 56px;
        margin-left: 15px;
        cursor: pointer;

        .btn{
          display: flex;
          align-items: center;
          user-select: none;

          .icon{
            color: #03a9f4;
            font-size: 22px;
          }

          .text{
            font-size: 14px;
            color: #666;
            margin-left: 2px;
          }
        }

        .menu{
          position: absolute;
          left: 0;
          bottom: 45px;
          margin: 0;
          padding: 0;
          list-style: none;
          width: 110px;
          border: 1px solid #efefef;
          border-radius: 5px;
          background: #fff;

          li{
            display: flex;
            align-items: center;
            margin: 0;
            padding: 10px;
            line-height: 18px;
            font-size: 14px;
            color: #666;
            border-bottom: 1px solid #efefef;

            &:last-child{
              border-bottom: none;
            }

            .icon{
              margin-right: 5px;
              font-size: 20px;
              &.link{
                color: #999;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
article{
  position: relative;
  font-size: 16px;
  line-height: 1.7;

  h1, h2, h3, h4, h5, h6{
    text-rendering: optimizelegibility;
    line-height: 1.7;
    margin: 0 0 15px;
  }

  h1{ font-size: 26px; }
  h2{ font-size: 24px; }
  h3{ font-size: 22px; }
  h4{ font-size: 20px; }
  h5{ font-size: 18px; }
  h6{ font-size: 16px; }

  p{
    margin: 0 0 15px;
    word-break: break-word;
  }

  em{ font-style: italic; }

  blockquote{
    padding: 20px;
    background-color: #f2f2f2;
    border-left: 6px solid #b3b3b3;
    word-break: break-word;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    margin: 0 0 20px;

    p:last-child{
      margin-bottom: 0;
    }
  }

  hr{
    margin: 0 0 20px;
    border: 0;
    border-top: 1px solid #d9d9d9 !important;
  }

  a{
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  ul{
    list-style-type: disc;
    word-break: break-word;
    margin: -5px 0 20px 20px;
    padding: 0;

    li{
      line-height: 30px;

      ol{
        margin-top: 15px;
      }
    }
  }

  ol{
    list-style-type: decimal;
    word-break: break-word;
    margin: -5px 0 20px 20px;
    padding: 0;

    li{
      line-height: 30px;

      ul{
        margin-top: 15px;
      }
    }
  }

  table{
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #d9d9d9;
    border-collapse: collapse;
    border-left: none;
    word-break: normal;

    tr:nth-of-type(2n) {
      background-color: hsla(0,0%,71%,.1);
    }

    td, th{
      padding: 8px;
      border: 1px solid #d9d9d9;
      line-height: 20px;
      vertical-align: middle;
    }

    th{
      font-weight: 700;
    }

    thead th{
        vertical-align: middle;
        text-align: inherit;
    }
  }

  code{
    padding: 2px 4px;
    background-color: #f6f6f6;
    vertical-align: middle;
    border: none;
    color: #c7254e;
    font-size: 15px;
    line-height: 25px;
    white-space: pre-wrap;
  }

  pre{
    word-wrap: normal;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 0;
    line-height: 20px;
    background-color: #282c34;

    code{
      padding: 0;
      background-color: transparent;
      white-space: pre;
      color: #c0c5ce;
    }
  }

  .image-package{
    text-align: center;
    font-size: 0;
    margin-bottom: 20px;

    img{
      max-width: 100%;
      width: auto;
      height: auto;
    }
  }
}
</style>
