import patchVnode from './patchVnode.js'

// 判断两个虚拟节点是否为同一节点
function sameVnode(vnode1, vnode2) {
	return vnode1.sel === vnode2.sel && vnode1.key === vnode2.key
}

export default (parentElm, oldCh, newCh) => {
	let oldStartIdx = 0 // 旧前指针
	let oldEndIdx = oldCh.length - 1 // 旧后指针
	let newStartIdx = 0 // 新前指针
	let newEndIdx = newCh.length - 1 // 新后指针
	
	let oldStartVnode = oldCh[0] // 初始时旧前指针指向的虚拟节点
	let oldEndVnode = oldCh[oldEndIdx] // 初始时旧后指针指向的虚拟节点
	let newStartVnode = newCh[0] // 初始时新前指针指向的虚拟节点
	let newEndVnode = newCh[newEndIdx] // 初始时新后指针指向的虚拟节点
	
	while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
		console.log('死循环')
		// 1. 新前与旧前
		if (sameVnode(oldStartVnode, newStartVnode)) {
			patchVnode(oldStartVnode, newStartVnode)
			oldStartVnode = oldCh[++oldStartIdx] 
			newStartVnode = newCh[++newStartIdx]
		} else if (sameVnode(oldEndVnode, newEndVnode)) {
			// 2. 新后与旧后
			patchVnode(oldEndVnode, newEndVnode)
			oldEndVnode = oldCh[--oldEndIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (sameVnode(oldStartVnode, newEndVnode)) {
			// 3. 新后与旧前
			patchVnode(oldStartVnode, newEndVnode)
			// 把旧前指向的节点移动到旧后指向的节点的后面
			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
			oldStartVnode = oldCh[++oldStartIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (sameVnode(oldEndVnode, newStartVnode)) {
			// 新前与旧后
			patchVnode(oldEndVnode, newStartVnode)
			// 将旧后指向的节点移动到旧前的前面
			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
			oldEndVnode = oldCh[--oldEndIdx]
			newStartVnode = newCh[++newStartIdx]
		} else {
			// 四种命中都没有成功
		}
	}
}