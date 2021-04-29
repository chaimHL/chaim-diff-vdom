/**
 * 将 vnode 创建为真正的 DOM 节点，插入到 pivot 之前
 */
export default (vnode, pivot) => {
  const domNode = document.createElement(vnode.sel)
  // 判断 vnode 有子节点(children)还是文本(text)
  if (vnode.children !== undefined && vnode.children.length && vnode.text === undefined) {
    // 有子节点
  } else {
    // 内部为文本
    domNode.innerText = vnode.text
    // 将孤儿节点上树
    pivot.parentNode.insertBefore(domNode, pivot)
  }
}