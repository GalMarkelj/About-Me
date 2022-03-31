document.addEventListener('click', handleClicks, false)

function handleClicks(e) {

    if (!e.target.classList.contains('js--click')) return

    switch (e.target.dataset.action) {
        case 'toggleNavigation':
            toggleNavigation()
            break

        case 'projectSwap':
            projectSwap(e.target)
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

function projectSwap(clickedBtn) {
    let projects = document.querySelectorAll('.project-review__visual')
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