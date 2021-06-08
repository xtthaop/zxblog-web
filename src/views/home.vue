<template>
  <div>
    <ul v-for="item in noteList" :key="item.note_id">
      <li @click="handleClick(item.note_id)">
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
  },
  methods: {
    handleClick(id){
      console.log('文', id)
    }
  }
}
</script>
