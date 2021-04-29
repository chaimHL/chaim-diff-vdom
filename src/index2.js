// 原生 snabbdom, 用于对比
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule])
// const myNode = h("div", { class: { haha: true } }, "测试1")
const myNode = h("div", { class: { haha: true } }, h("div", { class: { haha: true } }, "测试1"))
// const myNode = h("div", { class: { haha: true } }, ['haha', h("div", { class: { haha: true } }, "测试1")])
// const myNode = h("div", { class: { haha: true } }, [
//   h("div", "子元素一"),
//   h("div", "子元素二")
// ])

const container = document.getElementById('container')
const btn = document.getElementById('btn')
const vnode1 = h("div", {}, [
  h("div", { key: 1 }, "七里香"),
  h("div", { key: 2 }, "东风破")
])
// const vnode1 = h("div", {}, [
//   h("div", "七里香"),
//   h("div", "东风破")
// ])
const vnode2 = h("div", {}, [
  h('div', [
    h("div", { key: 3 }, "兰亭序"),
    h("div", { key: 1 }, "七里香"),
    h("div", { key: 2 }, "东风破")
  ])
])
// const vnode2 = h("div", {}, [
//   h("div", { key: 3 }, "兰亭序"),
//   h("div", { key: 1 }, "七里香"),
//   h("div", { key: 2 }, "东风破")
// ])
// const vnode2 = h("div", {}, [
//   h("div", "七里香"),
//   h("div", "东风破"),
//   h("div", "兰亭序")
// ])
patch(container, vnode1)
btn.addEventListener('click', () => {
  console.log(1);
  patch(vnode1, vnode2)
})
0 71
570 320