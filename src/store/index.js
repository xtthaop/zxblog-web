import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getPublishedNoteList } from '@/api/index.js'

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
        return getPublishedNoteList(params).then(res => {
          commit('setNoteList', res.data.note_list)
        })
      }
    },
  })
}
