// Create a fake window event

export const trigger = (el, event, args) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, false)

  if (args) {
    for (const prop in args) {
      e[prop] = args[prop]
    }
  }

  // Due to Firefox bug, events fired on disabled
  // non-attached form controls can throw errors
  try { el.dispatchEvent(e) } catch (e) {}
}
