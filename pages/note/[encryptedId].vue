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
    <div class="side-actions-wrapper">
      <button class="like">
        <div class="icon-wrapper">
          <UIcon
            ref="LikeIconRef"
            name="i-heroicons-gift-20-solid"
            style="color: rgb(247, 45, 89)"
            class="animate__wobble animate__animated animate__delay-5s"
          />
        </div>
        <div class="text">赞赏</div>
      </button>
    </div>
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

.side-actions-wrapper {
  position: fixed;
  top: 106px;
  left: calc(50vw - 470px);
  background-color: transparent;

  button {
    background-color: transparent;

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      background-color: var(--bg);
      border-radius: 50%;
      margin-bottom: 10px;

      .iconify {
        font-size: 24px;
      }
    }

    .text {
      font-size: 14px;
    }
  }
}
</style>
