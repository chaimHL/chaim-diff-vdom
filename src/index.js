import h from './h.js'
import patch from './patch'

const container = document.getElementById('container')
const vnode = h('div', {}, '简单爱')
patch(container, vnode)