import markdownit from 'markdown-it'

export default function (content) {
  const md = markdownit({ html: false })
  const tokens = md.parse(content, {})
  let noteAbstract = ''
  let i = 0
  const maxLength = 100
  while (i < tokens.length && noteAbstract.length < maxLength) {
    noteAbstract += deepFindTokenText(tokens[i])
    i++
  }
  if (noteAbstract.length > maxLength) {
    noteAbstract = noteAbstract.substring(0, maxLength) + '...'
  }
  return noteAbstract
}

function deepFindTokenText(token) {
  let text = ''
  if (token.type === 'text' || token.type === 'code_block' || token.type === 'fence') {
    if (token.type === 'code_block' || token.type === 'fence') {
      text = token.content.replace(/\n/g, '')
    } else {
      text = token.content
    }
    return text
  }
  if (token.children && token.type !== 'image') {
    token.children.forEach((childToken) => {
      text += deepFindTokenText(childToken)
    })
  }
  return text
}
