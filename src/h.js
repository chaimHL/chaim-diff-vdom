import vnode from './vnode'
export default function(sel, data, c) {
  if (arguments.length !== 3) {
    throw Error('请传入3个参数')
  }
  if (typeof c === ('string' || 'number')) {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c) && c.length) {
		// 如果第 3 个参数为数组，且不为空
    const children = []
    c.forEach(item => {
      if (!(typeof item === 'object' && item.hasOwnProperty('sel'))) 
        throw Error('传入数组的元素不是 h 函数')
      children.push(item)
    })
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
		// 如果第 3 个参数为 h 函数的执行
    return vnode(sel, data, [c], undefined, undefined)
  } else {
    throw Error('第 3 个参数不正确')
  }
}

