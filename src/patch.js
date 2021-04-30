import vnode from './vnode.js'
import creatElement from './creatElement.js'

export default (oldVnode, newVnode) => {
  // 判断 oldVnode 是否为虚拟节点
  if (oldVnode.sel === undefined) {
    // oldVnode 不是虚拟节点，则包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase, {}, [], undefined, oldVnode)
  } 
  // 判断 oldVnode, newVnode 是否为同一节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    // 同一节点
  } else {
    // 不是同一节点
    const domNode = creatElement(newVnode)
    // 将新节点上树
    oldVnode.elm.parentNode?.insertBefore(domNode, oldVnode.elm)
  }
  // 删除老节点
  oldVnode.elm.parentNode?.removeChild(oldVnode.elm)
}