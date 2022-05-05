import { events } from './events'
(() => {

  function fadeSlider() {
    const sc_width = window.innerWidth
    const slider_wrapper = document.querySelector('.slider-wrapper')
    const items = document.querySelectorAll('.project')
    let item_height

    if (sc_width > 786) return

    items.forEach(item => {

      if (!item.getAttribute('data-sliderItem')) return

      item_height = item.parentNode.getBoundingClientRect().height

      if (item.parentNode.classList.contains('active--project')) {
        slider_wrapper.style.paddingBottom = `${item_height}px`
      }
    })
  }

  fadeSlider()
  events()

})()
