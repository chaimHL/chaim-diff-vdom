/**
 * 将 vnode 创建为真正的 DOM 节点(孤儿节点)
 */
export default function createElement (vnode) {
  const domNode = document.createElement(vnode.sel)
  vnode.elm = domNode
  // 判断 vnode 有子节点(children)还是文本(text)
  if (vnode.children !== undefined && vnode.children.length && vnode.text === undefined) {
    // 有子节点
    vnode.children.forEach(item => {
      // 调用 createElement 意味着创建出了 DOM，并且将改虚拟节点的 elm 属性指向了这个 DOM，
      // 但这个 DOM 是个孤儿节点，还没上树
      const childNode = createElement(item)
      item.elm = childNode
      domNode.appendChild(childNode)
    })
  } else {
    // 内部为文本
    domNode.innerText = vnode.text
  }
  return domNode
}