import { toggleNavigation } from "./toogle-navigation"
import { slider } from "./slider"
import { dropdownAbs } from "./dropdown-absolute"
import { fadeSlider } from "./fade-slider"
import { dropdownBlock } from "./dropdown-block"

export const handleClicks = (e) => {
  console.log('handleClicks loading')

  if (!e.target.classList.contains('js--click')) return

  switch (e.target.dataset.action) {

    case 'toggleNavigation':
      const navigation = document.querySelector('.mobile-nav')
      toggleNavigation(navigation)
      break

    case 'projectSlider':
      const projects = document.querySelectorAll('.project')
      const projectSlider = document.querySelector('.slideru')

      slider(e.target, projects, projectSlider)
      break

    case 'project-dropdown':
      if (window.innerWidth > 786) return

      const projectDesc = e.target.parentNode
      const projectDropdown = e.target.parentNode.querySelector('.project__description-wrapper')
      const contentWrap = document.querySelector('.slideru')

      dropdownAbs(projectDesc, projectDropdown, contentWrap)
      break

    case 'CV-dropdown':
      const cvMainDrop = e.target.parentNode
      const dropdownWrap = cvMainDrop.querySelector('.CV-main__content__dropdown__wrapper')

      dropdownBlock(cvMainDrop, dropdownWrap)
      break

    case 'CV-dropdown-2':
      const cvMainDrop2 = e.target.parentNode
      const dropdownWrap2 = cvMainDrop2.querySelector('.CV-main__content__dropdown__wrapper')

      dropdownBlock(cvMainDrop2, dropdownWrap2)
      break

    case 'CV-sidebar-dropdown':
      const cvContent = document.querySelector('.CV-sidebar__bottom__content')
      const cvSidebar = document.querySelector('.CV-sidebar__bottom')

      dropdownBlock(cvSidebar, cvContent)
      break

    case 'fadeSlider':
      const slideElements = document.querySelectorAll('.project')
      const sliderDots = document.querySelectorAll('.fadeSlider__dot')

      fadeSlider(slideElements, e.target, sliderDots)
      break

    default:
      console.log('Action not defined')
      break
  }

}

export default { handleClicks }
