import { drop } from "lodash"

export const executeOnLoad = () => {


  function fadeSlider() {
    const items = document.querySelectorAll('.project-wrapper')

    if (window.innerWidth < 786) {
      enableStyle(items)
    } else {
      return
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 786) {
        enableStyle(items)
      } else {
        disableStyle(items)
      }
    })

    function enableStyle(items) {
      items.forEach( item => {
        if (item.classList.contains('active--project')) {
          let itemHeight = item.offsetHeight
          item.parentNode.style.paddingBottom = `${itemHeight}px`
        }
      })
    }

    function disableStyle(items) {
      items.forEach( item => {
          item.parentNode.style.paddingBottom = `0`
      })
    }
  }

  function slider() {
    const projectSec = document.getElementById('projectsID')
    const slideru = document.querySelector('.slideru')
    const projects = projectSec.querySelectorAll('.project')


    projects.forEach(project => {
      if (project.classList.contains('active--project')) {
        enableStyle(project, slideru)
      }
    })

    function enableStyle(item, slider) {
      const itemHeight = item.offsetHeight
      const itemDropdownHeight = item.querySelector('.project__description-wrapper').offsetHeight
      slider.style.paddingBottom = `${checkHeight(itemHeight, itemDropdownHeight)}px`

      function checkHeight(item, dropdown) {
        if (window.innerWidth > 786) {
          return item + dropdown
        } else {
          return item
        }
      }
    }
  }


  fadeSlider()
  slider()
}

export default { executeOnLoad }
