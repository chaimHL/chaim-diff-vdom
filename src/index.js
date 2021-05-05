import h from './h.js'
import patch from './patch'

const btn = document.getElementById('btn')
const container = document.getElementById('container')
// const vnode = h('div', {}, '简单爱')
const vnode = h('ul', {}, [
  h('li', { key: 'A'}, 'A'),
  h('li', { key: 'B'}, 'B'),
  h('li', { key: 'C'}, 'C'),
	h('li', { key: 'D'}, 'D')
])

const vnode2 = h('ul', {}, [
  h('li', { key: 'B'}, 'BBB'),
  h('li', { key: 'G'}, 'GGG'),
	h('li', { key: 'Q'}, 'QQQ'),
  h('li', { key: 'A'}, 'A'),
  h('li', { key: 'C'}, 'CCC'),
  h('li', { key: 'D'}, 'DDD'),
])

// const vnode2 = h('ul', {}, [
// 	h('li', { key: 'C'}, 'C'),
//   h('li', { key: 'B'}, 'B'),
//   h('li', { key: 'A'}, 'A'),
//   h('li', { key: 'D'}, 'D')
// ])

// const vnode2 = h('ul', {}, [
// 	h('li', { key: 'B'}, 'BBB'),
// 	h('li', { key: 'A'}, 'AAA'),
// 	h('li', { key: 'D'}, 'DDD'),
// 	h('li', { key: 'C'}, 'CCC')
// ])

// const vnode2 = h('div', {}, [
//   h('ul', {}, [
//     h('li', { key: 'A'}, 'A'),
//     h('li', { key: 'B'}, 'B'),
//     h('li', { key: 'C'}, 'Cccc')
//   ])
// ])

// const vnode2 = h('div', {}, '晴天')
patch(container, vnode)
btn.addEventListener('click', () => {
  patch(vnode, vnode2)
})
