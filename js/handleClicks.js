export const handleClicks = (e) => {

  console.log("handleClicks script is loading successfully !")

  if (!e.target.classList.contains('js--click')) return

  switch (e.target.dataset.action) {
    case 'toggleNavigation':
      toggleNavigation()
      break

    case 'projectSwap':
      projectSwap(e.target)
      break

    case 'project-dropdown':
      if (window.innerWidth > 786) return
      dropdown(e.target.parentNode, e.target.parentNode.querySelector('.project__description-wrapper'))
      break

    case 'CV-dropdown':
      dropdown('.CV__main__secondary__dropdown', '.CV__main__secondary__dropdown__wrapper')
      break

    case 'CV-sidebar-dropdown':
      dropdown('.CV__sidebar__secondary', '.CV__sidebar__secondary__content')
      break

    case 'slider':
      fadeSlider('.project', e.target, '.project__dot')
      break

    default:
      console.log('Action not defined')
  }

  function toggleNavigation() {
    const navigation = document.querySelector('.mobile-navigation-dropdown')

    if (!navigation.classList.contains('active--navigation')) {
      navigation.classList.add('active--navigation')
    } else {
      navigation.classList.remove('active--navigation')
    }

    if (!navigation.classList.contains('active--navigation')) return

    window.addEventListener('resize', () => {
      if (window.innerWidth > 500) {
        navigation.classList.remove('active--navigation')
      }
    })
  }

  function projectSwap(clickedBtn) {
    let projects = document.querySelectorAll('.project')
    let projectsList = []
    let index

    projects.forEach(project => {
      projectsList.push(project.getAttribute('data-project'))

      if (project.classList.contains('active--project')) {
        index = projectsList.indexOf(project.getAttribute('data-project'))
      }
    })

    if (projects.length == 1) return

    projects[index].classList.remove('active--project')

    switch (clickedBtn.getAttribute('id')) {
      case 'project__next-btn':
        nextProject(index)
        break
      case 'project__back-btn':
        previousProject(index)
        break
      default:
        console.log('Error in function projectSwap')
    }

    function nextProject(i) {
      if (i != projects.length - 1) {
        projects[i + 1].classList.add('active--project')
        document.getElementById('project__name').innerHTML = projectsList[i + 1]
      } else {
        projects[0].classList.add('active--project')
        document.getElementById('project__name').innerHTML = projectsList[0]
      }
    }

    function previousProject(i) {
      if (i != 0) {
        projects[i - 1].classList.add('active--project')
        document.getElementById('project__name').innerHTML = projectsList[i - 1]
      } else {
        projects[projects.length - 1].classList.add('active--project')
        document.getElementById('project__name').innerHTML = projectsList[projects.length - 1]
      }
    }
  }

  //function dropdown gets a parent element soo if it is more the same elements it know in which one to searsh
  //it also gets a dropdown soo that it checks the content height and gives the parent element a padding-bottom
  //you can insert a DOM element or a class, the result will be the same thanks to the functions that check if it is a class or a DOM element
  function dropdown(element, dropdown) {

    if (!checkElement(element).classList.contains('active--dropdown')) {
      enableDropdown(element, checkDropdown(dropdown))
    } else {
      disableDropdown(element)
    }

    //contant scaling
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768 && checkElement(element).classList.contains('active--dropdown')) {
        enableStyle(element, checkDropdown(dropdown))
      } else {
        disableDropdown(element)
      }
    })

    function enableDropdown(element, dropdown) {
      checkElement(element).classList.add('active--dropdown')
      enableStyle(element, dropdown)
    }

    function disableDropdown(element) {
      checkElement(element).classList.remove('active--dropdown')
      disableStyle(element)
    }

    function enableStyle(element, dropdown) {
      let contentHeight = dropdown.getBoundingClientRect().height

      checkElement(element).style.paddingBottom = `${contentHeight}px`;
    }

    function disableStyle(element) {
      checkElement(element).style.paddingBottom = `unset`
    }

    function checkElement(element) {

      if (typeof element == 'string') {
        return (document.querySelector(`${element}`))
      } else {
        return element
      }

    }

    function checkDropdown(dropdown) {

      if (typeof dropdown == 'string') {
        return (document.querySelector(`${dropdown}`))
      } else {
        return dropdown
      }

    }
  }

  function fadeSlider(elements, clickedItem, dots) {

    const slider_wrapper = document.querySelector('.slider-wrapper')
    const items = document.querySelectorAll(`${elements}`)
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
      if(clickedItem.getAttribute('data-slider') == item) {
        index = itemsList.indexOf(clickedItem.getAttribute('data-slider'))
      }
    })


    items[index].parentNode.classList.add('active--project')
    enableStyle(items[index])

    if (clickedItem.classList.contains('slider-dot--active')) return
    document.querySelectorAll(`${dots}`).forEach(dot => {
      dot.classList.remove('slider-dot--active')
    })

    clickedItem.classList.add('slider-dot--active')

    function enableStyle(item) {
      const item_height = item.parentNode.getBoundingClientRect().height
      slider_wrapper.style.paddingBottom = `${item_height}px`
    }
  }

}


export default { handleClicks }
