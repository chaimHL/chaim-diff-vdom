// 原生 snabbdom, 用于对比
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([ classModule, propsModule, styleModule, eventListenersModule ])
// const myNode = h("div", { class: { haha: true } }, "测试1")
const myNode = h("div", { class: { haha: true } }, h("div", { class: { haha: true } }, "测试1"))
// const myNode = h("div", { class: { haha: true } }, ['haha', h("div", { class: { haha: true } }, "测试1")])
// const myNode = h("div", { class: { haha: true } }, [
//   h("div", "子元素一"),
//   h("div", "子元素二")
// ])

const container = document.getElementById('container')
patch(container, myNode)
console.log(myNode)

h("div", { class: { haha: true } }, [
  h("div", "子元素一"),
  h("div", "子元素二")
])