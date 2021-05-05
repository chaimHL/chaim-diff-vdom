import patchVnode from './patchVnode.js'
import creatElement from './creatElement.js'

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
		if (oldStartVnode === undefined) { // 有可能已经是处理过的情况
			oldStartVnode = oldCh[++oldStartIdx]
		} else if (oldEndVnode === undefined) {
			oldEndVnode = oldCh[--oldEndIdx]
		} else if (sameVnode(oldStartVnode, newStartVnode)) {
			// 1. 新前与旧前
			patchVnode(oldStartVnode, newStartVnode)
			if(newStartVnode) newStartVnode.elm = oldStartVnode?.elm
			oldStartVnode = oldCh[++oldStartIdx] 
			newStartVnode = newCh[++newStartIdx]
		} else if (sameVnode(oldEndVnode, newEndVnode)) {
			// 2. 新后与旧后
			patchVnode(oldEndVnode, newEndVnode)
			if(newEndVnode) newEndVnode.elm = oldEndVnode?.elm
			console.log(oldEndVnode.elm, newEndVnode.elm)
			oldEndVnode = oldCh[--oldEndIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (sameVnode(oldStartVnode, newEndVnode)) {
			// 3. 新后与旧前
			patchVnode(oldStartVnode, newEndVnode)
			if(newEndVnode) newEndVnode.elm = oldStartVnode?.elm
			// 把旧前指向的节点移动到旧后指向的节点的后面
			parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
			oldStartVnode = oldCh[++oldStartIdx]
			newEndVnode = newCh[--newEndIdx]
		} else if (sameVnode(oldEndVnode, newStartVnode)) {
			// 新前与旧后
			patchVnode(oldEndVnode, newStartVnode)
			if(newStartVnode) newStartVnode.elm = oldEndVnode?.elm
			// 将旧后指向的节点移动到旧前的前面
			parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
			oldEndVnode = oldCh[--oldEndIdx]
			newStartVnode = newCh[++newStartIdx]
		} else {
			// 四种命中都没有成功
			// 创建一个 key 的映射对象，方便新节点在旧节点中寻找是否有相同的 key
			const keyMap = {}
			for (let i = oldStartIdx; i <= oldEndIdx; i++) {
				const key = oldCh[i]?.key
				if (key) keyMap[key] = i
			}
			const idxInOld = keyMap[newStartVnode.key] // 在旧节点中寻找新前指向的节点
			if (idxInOld) {
				// 如果有，说明该节点在旧节点中存在，只需要移动节点位置
				const elmToMove = oldCh[idxInOld]
				patchVnode(elmToMove, newStartVnode)
				// 处理过的节点赋值为 undefined
				oldCh[idxInOld] = undefined
				parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
			} else {
				// 如果没有，说明是个新节点
				parentElm.insertBefore(creatElement(newStartVnode), oldStartVnode.elm)
			}
			newStartVnode = newCh[++newStartIdx]
		}
	}
	/**
	 * while 循环结束的条件只有两种
	 * 1. oldStartIdx > oldEndIdx 
	 * 		旧节点先处理完毕，说明新节点还有指针没指到并处理的节点，新节点有增加
	 * 2. newStartIdx > newEndIdx 
	 * 		新节点先处理完毕，说明新节点有删除
	 */
	if (oldStartIdx > oldEndIdx) { // 新节点有增加
		// 这里不能用真实 DOM 才有的属性 nextSibling
		const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null
		console.log(newCh[newEndIdx + 1],newCh[newEndIdx + 1].elm)
		for (let i = newStartIdx; i <= newEndIdx; i++) {
			parentElm.insertBefore(creatElement(newCh[i]), before)
		}
	} else { // 新节点有删除
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			parentElm.removeChild(oldCh[i].elm)
		}
	}
}