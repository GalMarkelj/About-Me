export const slider = (btn, elements, slider) => {

  let elList = []
  let index


  elements.forEach( el => {
    elList.push(el.getAttribute('data-project'))
    if (el.classList.contains('active--project')) {
      index = elList.indexOf(el.getAttribute('data-project'))

    }
  })


  if (elList.length == 1) return
  elements[index].classList.remove('active--project')



  switch (btn.getAttribute('data-sliderBtn')) {

    case 'slide-forward':
      slideForward(index)
      break

    case 'slide-backwards':
      slideBackwards(index)
      break

    default:
      console.log('Error with the slider')
  }



  function slideForward(i) {
    if(i != elements.length -1) {
      elements[i + 1].classList.add('active--project')
      elements[i].style.left = '-100%'
      document.getElementById('project__name').innerHTML = elList[i + 1]
      enableStyle(elements[i + 1])
    } else {
      elements[0].classList.add('active--project')
      document.getElementById('project__name').innerHTML = elList[0]

      for(let x = 1; x < elList.length; x++) {
        elements[x].style.left = '100%'
      }
      enableStyle(elements[0])
    }

  }

  function slideBackwards(i) {
    if (i != 0) {
      elements[i - 1].classList.add('active--project')
      elements[i].style.left = '100%'
      document.getElementById('project__name').innerHTML = elList[i - 1]
      enableStyle(elements[i - 1])
    } else {
      elements[elements.length - 1].classList.add('active--project')
      document.getElementById('project__name').innerHTML = elList[elements.length - 1]

      for(let x = 1; x < elList.length; x++) {
        elements[x].style.left = '-100%'
      }

      enableStyle(elements[elements.length - 1])
    }
  }

  function enableStyle(element) {
    const elHeight = element.offsetHeight
    const elDropdownHeight = element.querySelector('.project__description-wrapper').offsetHeight
    slider.style.paddingBottom = `${checkHeight(elHeight, elDropdownHeight)}px`

    function checkHeight(el, dropdown) {
      if (window.innerWidth > 786) {
        return el + dropdown
      } else {
        return el
      }
    }
  }


}

export default { slider }
