import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getPublishedNoteList, getNote } from '@/api/index.js'

function decryptNoteId(id){
  let decryptId = id
  decryptId = decryptId.replace(/f/g, '0')
  decryptId = decryptId.replace(/r/g, '4')
  decryptId = parseInt(decryptId)
  return decryptId
}

export function createStore(){
  return new Vuex.Store({
    state: {
      noteList: [],
      note: {},
    },
    mutations: {
      setNoteList(state, data){
        state.noteList = data
      },
      setNote(state, data){
        state.note = data
      },
    },
    actions: {
      fetchNoteList({ commit }){
        return getPublishedNoteList().then(res => {
          commit('setNoteList', res.data.note_list)
        })
      },
      fetchNote({ commit }, id){
        const noteId = decryptNoteId(id)
        const params = {
          note_id: noteId
        }

        return getNote(params).then(res => {
          commit('setNote', res.data)
        })
      }
    },
  })
}
