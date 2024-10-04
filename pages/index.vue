<template>
  <div class="home-wrapper">
    <ul v-if="noteList?.length" class="note-list">
      <li v-for="item in noteList" :key="item.note_id">
        <div class="item-wrapper">
          <NuxtLink class="title" :to="`/note/${encryptNoteId(item.note_id)}`">
            {{ item.publish_note_title }}
          </NuxtLink>
          <p class="abstract">
            {{ getNoteAbstract(item.publish_note_content || '') }}
          </p>
          <div class="meta">
            <span>
              <span>发布于 </span>
              <time>{{ $dayjs(item.publish_time).format('YYYY-MM-DD') }}</time>
            </span>
            <span v-if="item.publish_update_time">
              <span> | 更新于 </span>
              <time>{{ $dayjs(item.publish_update_time).format('YYYY-MM-DD') }}</time>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <footer>{{ `©2018-${$dayjs().year()} 知行 · 陈涛的网络笔记 · 晋ICP备19000910号-1` }}</footer>
  </div>
</template>

<script setup>
useHead({
  title: '陈涛的网络笔记',
})

const { data: noteList } = await useAsyncData('notes', async () => {
  const { data } = await $fetch('/restful/note/get_published_note_list', { method: 'GET' })
  return data?.note_list || []
})

function encryptNoteId(id) {
  let encryptId = id.toString()
  encryptId = Array(encryptId.length < 6 ? 6 - encryptId.length + 1 || 0 : 0).join(0) + encryptId
  encryptId = encryptId.replace(/0/g, 'f')
  encryptId = encryptId.replace(/4/g, 'r')
  return encryptId
}
</script>

<style scoped lang="scss">
.home-wrapper {
  width: 100%;

  .note-list {
    width: 100%;
    padding: 20px 0;
    background: var(--bg);
    border-radius: 5px;

    li {
      position: relative;
      width: 100%;
      padding: 20px 30px;
      border-bottom: 1px solid var(--border-color);

      .item-wrapper {
        width: 100%;

        a.title {
          display: inline-block;
          font-size: 18px;
          font-weight: 600;
          line-height: 26px;
          margin-bottom: 5px;
          color: var(--color);
          text-decoration: none;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }

        .abstract {
          line-height: 22px;
          margin-bottom: 5px;
          font-size: 13px;
          color: var(--color-secondary);
        }

        .meta {
          line-height: 18px;
          font-size: 12px;
          color: var(--color-third);
        }
      }
    }

    li:first-child {
      padding-top: 0;
    }

    li:last-child {
      padding-bottom: 0;
      border: none;
    }
  }

  footer {
    width: 100%;
    padding: 5px 30px;
    margin-top: 5px;
    line-height: 20px;
    color: var(--color-third);
    font-size: 12px;
  }
}
</style>
