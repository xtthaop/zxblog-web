import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getAllNoteList } from '@/api/index.js'

export function createStore(){
  return new Vuex.Store({
    state: {
      noteList: [],
    },
    mutations: {
      setNoteList(state, data){
        state.noteList = data
      }
    },
    actions: {
      fetchNoteList({ commit }, params){
        return getAllNoteList(params).then(res => {
          commit('setNoteList', res.data.note_list)
        })
      }
    },
  })
}
