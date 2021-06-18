import request from '@/utils/request'

export function getPublishedNoteList(){
  return request({
    url: '/note/get_published_note_list',
    method: 'get',
  })
}

export function getNote(params){
  return request({
    url: '/note/get_note',
    method: 'get',
    params,
  })
}

export function getWxConfig(params){
  return request({
    url: '/note/get_wx_config',
    method: 'get',
    params,
  })
}
