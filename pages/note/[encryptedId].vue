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
            <div class="author-name">tao</div>
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
      <button class="like" @click="likeModalOpen = true">
        <div class="icon-wrapper">
          <UIcon
            name="i-heroicons-gift-20-solid"
            style="color: #f72d59"
            class="animate__wobble animate__animated animate__delay-5s"
          />
        </div>
        <div class="text">赞赏</div>
      </button>

      <button class="share">
        <UDropdown
          :items="shareItems"
          :popper="{ placement: 'right' }"
          :ui="{ width: 'w-36', item: { disabled: 'opacity-100' } }"
        >
          <div style="text-align: center">
            <div class="icon-wrapper">
              <UIcon name="i-heroicons-paper-airplane-solid" style="transform: rotate(-45deg)" />
            </div>
            <div class="text">分享</div>
          </div>

          <template #wechat>
            <div class="qrcode-wrapper">
              <img :src="QRCodeURL" />
            </div>
          </template>
        </UDropdown>
      </button>
    </div>

    <div class="bottom-actions-wrapper">
      <div class="actions-bar">
        <button class="like" @click="likeModalOpen = true">
          <UIcon
            name="i-heroicons-gift-20-solid"
            style="color: #f72d59"
            class="animate__wobble animate__animated animate__delay-5s"
          />
          <span class="text">赞赏</span>
        </button>

        <button class="share">
          <UDropdown
            :items="shareItems"
            :popper="{ placement: 'top' }"
            :ui="{ width: 'w-36', item: { disabled: 'opacity-100' } }"
          >
            <div>
              <UIcon
                name="i-heroicons-paper-airplane-solid"
                style="transform: translate(2px, -1px) rotate(-45deg) scale(0.9)"
              />
              <span class="text">分享</span>
            </div>

            <template #wechat>
              <div class="qrcode-wrapper">
                <img :src="QRCodeURL" />
              </div>
            </template>
          </UDropdown>
        </button>
      </div>
    </div>

    <UModal v-model="likeModalOpen">
      <div class="like-modal-content">
        <img src="~/assets/imgs/like.jpeg" />
        <div class="tip">
          为了维持本站的运行，我需要投入时间和精力进行维护，同时也需要支付云服务厂商服务器和域名的费用。因此如果我的网络笔记对您有帮助，欢迎通过<span
            style="color: #67cc79"
            >微信扫一扫</span
          >赞赏码来支持我，您的每一份支持都是我继续前进的动力！
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import useMarkdown from './useMarkdown'
import useImgLazyLoad from './useImgLazyLoad'
import QRCode from 'qrcode'

defineOptions({
  name: 'Note',
})

const route = useRoute()
const previewerRef = ref()
const toast = useToast()

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

const likeModalOpen = ref(false)

onMounted(() => {
  handleImgLazyLoad()
})

const shareItems = [
  [
    {
      label: '复制链接',
      icon: 'i-heroicons-link-16-solid',
      click: () => {
        copyUrl()
      },
    },
    {
      label: '微信扫一扫',
      icon: 'i-ic-baseline-wechat',
      iconClass: 'text-green-500',
      disabled: true,
    },
    {
      disabled: true,
      slot: 'wechat',
    },
  ],
]

function copyUrl() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(location.href).then(() => {
      toast.add({ title: '链接复制成功！' })
    })
  } else {
    const input = document.createElement('input')
    input.setAttribute('value', location.href)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    toast.add({ title: '链接复制成功！' })
  }
}

const QRCodeURL = ref('')

function generateQRCode() {
  const opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 1,
    margin: 1,
    color: {
      dark: '#000000ff',
      light: '#ffffffff',
    },
  }

  QRCode.toDataURL(location.href, opts, function (err, url) {
    if (err) throw err
    QRCodeURL.value = url
  })
}

onMounted(() => {
  generateQRCode()
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
  @media (max-width: 960px) {
    display: none;
  }

  position: fixed;
  top: 196px;
  left: calc(50vw - 470px);
  display: flex;
  flex-direction: column;
  background-color: transparent;

  button {
    background-color: transparent;
    color: #8491a5;
    margin-bottom: 10px;

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 40px;
      background-color: transparent;
      border-radius: 50%;

      .iconify {
        font-size: 20px;
      }
    }

    .text {
      font-size: 14px;
    }

    &.like {
      .icon-wrapper {
        height: 50px;
        background-color: var(--bg);
        margin-bottom: 10px;

        .iconify {
          font-size: 24px;
        }
      }
    }

    .qrcode-wrapper {
      width: 80px;
      height: 80px;

      img {
        width: 100%;
        margin-left: 22px;
      }
    }
  }
}

.bottom-actions-wrapper {
  @media (min-width: 960px) {
    display: none;
  }

  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: transparent;

  .actions-bar {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 780px;
    height: 100%;
    padding: 0 30px;
    background: var(--bg);

    button {
      margin-left: 10px;
      color: #8491a5;

      .iconify {
        font-size: 20px;
        margin: 0 5px;
        vertical-align: middle;
      }

      .text {
        font-size: 14px;
        vertical-align: middle;
      }

      .qrcode-wrapper {
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          margin-left: 22px;
        }
      }
    }
  }
}

.like-modal-content {
  padding: 20px;

  img {
    width: 100%;
  }

  .tip {
    width: 100%;
    margin-top: 10px;
    font-size: 13px;
    line-height: 20px;
    color: #aaa;
  }
}
</style>
