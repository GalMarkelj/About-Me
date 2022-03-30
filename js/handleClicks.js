document.addEventListener('click', handleClicks, false)

function handleClicks(e) {

    if (!e.target.classList.contains('js--click')) return

    switch (e.target.dataset.action) {
        case 'toggleNavigation':
            toggleNavigation()
            break
        default:
            console.log('Action not defined')
    }
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