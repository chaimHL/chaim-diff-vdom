import h from './h.js'
import patch from './patch'

const btn = document.getElementById('btn')
const container = document.getElementById('container')
// const vnode = h('div', {}, '简单爱')
const vnode = h('ul', {}, [
  h('li', { key: 'A'}, 'A'),
  h('li', { key: 'B'}, 'B'),
	h('li', { key: 'C'}, 'C')
])

const vnode2 = h('ul', {}, [
  h('li', { key: 'C'}, 'CCC'),
  h('li', { key: 'A'}, 'AAA'),
	h('li', { key: 'B'}, 'BBB')
])

// const vnode2 = h('div', {}, [
//   h('ul', {}, [
//     h('li', { key: 'A'}, 'A'),
//     h('li', { key: 'B'}, 'B'),
//     h('li', { key: 'C'}, 'Cccc')
//   ])
// ])

// const vnode = h('div', {}, '晴天')
patch(container, vnode)
btn.addEventListener('click', () => {
  patch(vnode, vnode2)
})
