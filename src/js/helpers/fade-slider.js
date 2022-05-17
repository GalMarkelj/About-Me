export const fadeSlider = (items, clickedItem, dots) => {

  const sliderWrapper = document.querySelector('.fadeSlider')
  const itemsList = []
  let index

  items.forEach(item => {
    if (!item.getAttribute('data-sliderItem')) return

    itemsList.push(item.getAttribute('data-sliderItem'))

    if (item.parentNode.classList.contains('active--project')) {
      item.parentNode.classList.remove('active--project')
    }
  })

  itemsList.forEach(item => {
    if (clickedItem.getAttribute('data-slider') == item) {
      index = itemsList.indexOf(clickedItem.getAttribute('data-slider'))
    }
  })

  items[index].parentNode.classList.add('active--project')

  enableStyle(items[index].parentNode)
  itemTrack(dots)


  function itemTrack(dots) {
    if (clickedItem.classList.contains('fadeSlider--active')) return

    dots.forEach(dot => {
      dot.classList.remove('fadeSlider--active')
    })
    clickedItem.classList.add('fadeSlider--active')
  }

  function enableStyle(item) {
    const itemHeight = item.offsetHeight
    sliderWrapper.style.paddingBottom = `${itemHeight}px`
  }

}

export default { fadeSlider }
