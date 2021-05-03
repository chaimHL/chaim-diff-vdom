import creatElement from './creatElement.js'
import updateChildren from './updateChildren.js'

// 处理新旧虚拟节点为同一节点的情况
export default (oldVnode, newVnode) => {
	// oldVnode 和 newVnode 是否为内存中同一对象
	if (oldVnode === newVnode) return
	// newVnode 的 text 属性有没有值
	if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
		// 有 text
		// 新老虚拟节点的 text 的值是否一样
		if (newVnode.text !== oldVnode.text) {
			// oldVnode.elm 就是旧虚拟节点的真实 DOM
			oldVnode.elm.innerText = newVnode.text
		}
	} else {
		// 没有 text (说明 newVnode.children 有值 )
		// 判断旧节点是 children 有值还是 text 有值
		if (oldVnode.text !== undefined && (oldVnode.children === undefined || oldVnode.children.length === 0)) {
			// 旧节点 text 属性有值，新节点 children 属性有值
			oldVnode.elm.innerHTML = ''
			newVnode.children.forEach(item => {
				const newDom = creatElement(item)
				oldVnode.elm.appendChild(newDom)
			})
		} else {
			// 新旧节点都是 children 属性有值
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
		}
	}
}
