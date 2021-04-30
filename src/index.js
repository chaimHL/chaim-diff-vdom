import h from './h.js'
import patch from './patch'

const btn = document.getElementById('btn')
const container = document.getElementById('container')
const vnode2 = h('h2', {}, '简单爱')
const vnode = h('div', {}, [
  h('ul', {}, [
    h('li', {}, '七里香'),
    h('li', {}, '东风破'),
    h('li', {}, '以父之名')
  ])
])
// const vnode = h('ul', {}, [
//   h('li', {}, '七里香'),
//   h('li', {}, '东风破'),
//   h('li', {}, '以父之名')
// ])
patch(container, vnode)
btn.addEventListener('click', () => {
  patch(vnode, vnode2)
})
