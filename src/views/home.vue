<template>
  <div>
    <ul v-for="item in noteList" :key="item.note_id">
      <li>
        {{ item.note_title }}
      </li>
    </ul>
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
  }
}
</script>
