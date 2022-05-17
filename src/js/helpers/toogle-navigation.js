export const toggleNavigation = (nav) => {

  if (!nav.classList.contains('active--navigation')) {
    nav.classList.add('active--navigation')
  } else {
    nav.classList.remove('active--navigation')
  }

  if (!nav.classList.contains('active--navigation')) return

  window.addEventListener('resize', () => {
    if (window.innerWidth > 500) {
      nav.classList.remove('active--navigation')
    }
  })

}

export default { toggleNavigation }
