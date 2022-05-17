export const dropdownBlock = (element, dropdown) => {

  if (!element.classList.contains('active--dropdown')) {
    enableDropdown(element, dropdown)
  } else {
    disableDropdown(element)
  }

  //contant scaling
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && element.classList.contains('active--dropdown')) {
      enableStyle(element, dropdown)
    } else {
      disableDropdown(element)
    }
  })

  function enableDropdown(element, dropdown) {
    element.classList.add('active--dropdown')
    enableStyle(element, dropdown)
  }

  function disableDropdown(element) {
    element.classList.remove('active--dropdown')
    disableStyle(element)
  }

  function enableStyle(element, dropdown) {
    let contentHeight = dropdown.getBoundingClientRect().height
    element.style.paddingBottom = `${contentHeight}px`;
  }

  function disableStyle(element) {
    element.style.paddingBottom = `unset`
  }

}

export default { dropdownBlock }
