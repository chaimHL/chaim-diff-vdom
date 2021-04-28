import h from './h.js'
const vnode = h('a', {}, [h("div", {}, "子元素一"), h("div", {}, "子元素二")])
console.log(vnode);