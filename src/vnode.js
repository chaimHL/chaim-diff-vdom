export default (sel, data, children, text, elm) => {
	const { key } = data
  return { sel, data, children, text, elm, key }
}