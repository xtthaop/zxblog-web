import request from '@/utils/request'

export function getAllNoteList(params){
  return request({
    url: '/note/get_all_note_list',
    method: 'get',
    params,
  })
}
