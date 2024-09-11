<template>
  <div class="note-wrapper">
    <div class="note">
      <header>
        <h1 class="title">{{ note.publish_note_title }}</h1>
        <div class="note-info">
          <a class="author-avatar" href="https://xtthaop.github.io" target="_blank">
            <img src="~/assets/imgs/avatar.png" />
          </a>
          <div style="margin-left: 10px">
            <div class="author-name">陈涛</div>
            <div class="note-detail">
              <span>
                <span>发布于</span>
                <span>{{ $dayjs(note.publish_time).format('YYYY-MM-DD') }}</span>
              </span>
              <span v-if="note.publish_update_time">
                <span> | 更新于</span>
                <span>{{ $dayjs(note.publish_update_time).format('YYYY-MM-DD') }}</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      <div
        ref="previewerRef"
        class="md-result-wrapper"
        v-html="md.render(note.publish_note_content || '')"
      ></div>
    </div>
    <!-- <footer>
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
    </footer> -->

    <!-- <ShareDialog ref="shareDialog"></ShareDialog> -->
    <!-- <LikeDialog ref="likeDialog"></LikeDialog> -->
    <!-- <SharePop v-if="sharePopShow" :sharePopShow.sync="sharePopShow"></SharePop> -->
  </div>
</template>

<script setup>
import useMarkdown from './useMarkdown'
import useImgLazyLoad from './useImgLazyLoad'

defineOptions({
  name: 'Note',
})

const route = useRoute()
const previewerRef = ref()

const { md } = useMarkdown()
const { loadImgFn: handleImgLazyLoad } = useImgLazyLoad(previewerRef)

function decryptNoteId(id) {
  let decryptId = id
  decryptId = decryptId.replace(/f/g, '0')
  decryptId = decryptId.replace(/r/g, '4')
  decryptId = parseInt(decryptId)
  return decryptId
}

const { data: note } = await useAsyncData('note', async () => {
  const params = {
    note_id: decryptNoteId(route.params.encryptedId),
  }
  const { data } = await $fetch('/restful/note/get_published_note', { method: 'GET', params })
  return data || {}
})

useHead({
  title: note.value.publish_note_title,
})

onMounted(() => {
  handleImgLazyLoad()
})
</script>

<style scoped lang="scss">
.note-wrapper {
  width: 100%;
  padding-bottom: 66px;
}

.note {
  width: 100%;
  padding: 30px 30px;
  background: var(--bg);
  border-radius: 5px;

  header {
    width: 100%;
    margin-bottom: 30px;

    .title {
      line-height: 1.5;
      font-size: 30px;
      font-weight: 600;
      word-break: break-word;
      margin-top: 0;
      margin-bottom: 15px;
    }

    .note-info {
      display: flex;
      align-items: center;
      width: 100%;

      .author-avatar {
        display: inline-block;
        width: 39px;
        height: 39px;
        background: var(--bg-secondary);
        border-radius: 50%;
        overflow: hidden;
      }

      .author-name {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 3px;
      }

      .note-detail {
        font-size: 12px;
      }
    }
  }
}

footer {
  width: 100%;

  .option-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: #fff;
    border-top: 1px solid #eee;

    .option {
      width: 100%;
      max-width: 780px;
      height: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      margin: 0 auto;

      .item {
        position: relative;
        float: right;
        line-height: 56px;
        margin-left: 15px;
        cursor: pointer;

        .btn {
          display: flex;
          align-items: center;
          user-select: none;

          .icon {
            color: #03a9f4;
            font-size: 22px;
          }

          .text {
            font-size: 14px;
            color: #666;
            margin-left: 2px;
          }
        }

        .menu {
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

          li {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 10px;
            line-height: 18px;
            font-size: 14px;
            color: #666;
            border-bottom: 1px solid #efefef;

            &:last-child {
              border-bottom: none;
            }

            .icon {
              margin-right: 5px;
              font-size: 20px;
              &.link {
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
