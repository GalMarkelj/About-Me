(function () {

    const elementOpenIcon = document.querySelector('#open-icon')
    const elementMobileMainNavigation = document.querySelector('.mobile-navigation-dropdown')
    const elementCloseIcon = document.querySelector('#close-icon')
    let windowWidth = 0

    //When u click on the icon it togels the menu up and down in view prot
    elementOpenIcon.addEventListener('click', function () {
        elementMobileMainNavigation.style.bottom = "0"

        elementCloseIcon.addEventListener('click', function () {
            elementMobileMainNavigation.style.bottom = "100%"
        })
    })

    //If u resize the site while menu is still open and goes pass 950px it hides it.
    window.addEventListener('resize', function () {
        windowWidth = window.innerWidth

        if (windowWidth < 950) {
            elementOpenIcon.addEventListener('click', function () {
                elementMobileMainNavigation.style.bottom = "0"

                elementCloseIcon.addEventListener('click', function () {
                    elementMobileMainNavigation.style.bottom = "100%"
                })
            })
        } else {
            elementMobileMainNavigation.style.bottom = "100%"
        }
    })
})()