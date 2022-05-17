export const dropdownAbs = (element, dropdown, wrapper) => {

  if(!element.classList.contains('project__description')) {
    disableStyle(element, wrapper)
  }

  if (!element.classList.contains('active--dropdown')) {
    enableDropdown(element, dropdown, wrapper)
  } else {
    disableDropdown(element, wrapper)
  }

  //contant scaling
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && element.classList.contains('active--dropdown')) {
      enableStyle(element, dropdown, wrapper)
    } else {
      disableDropdown(element, wrapper)
    }
  })

  function enableDropdown(el, dropdown, wrap) {
    el.classList.add('active--dropdown')
    enableStyle(el, dropdown, wrap)
  }

  function disableDropdown(el, wrap) {
    el.classList.remove('active--dropdown')
    disableStyle(el, wrap)
  }

  function enableStyle(el, dropdown, wrap) {
    const wrapPadding = (wrap.style.paddingBottom).split('px')
    const dropdownHeight = dropdown.getBoundingClientRect().height
    const wrapHeight = Number.parseInt(wrapPadding[0]) + dropdownHeight

    el.style.paddingBottom = `${dropdownHeight}px`;
    wrap.style.paddingBottom = `${wrapHeight}px`

  }

  function disableStyle(el, wrap) {
    const wrapPadding = (wrap.style.paddingBottom).split('px')
    const dropdownHeight = dropdown.getBoundingClientRect().height
    const wrapHeight = Number.parseInt(wrapPadding[0]) - dropdownHeight

    el.style.paddingBottom = `unset`
    wrap.style.paddingBottom = `${wrapHeight}px`

  }
}

export default { dropdownAbs }
