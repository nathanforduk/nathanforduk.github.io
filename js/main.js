const mutation = new MutationObserver(() => {
    if (!document.body) return

    const theme = localStorage.getItem("theme")
    const dark = matchMedia("(prefers-color-scheme:dark)").matches

    mutation.disconnect()
    document.body.setAttribute("theme", theme ? theme : dark ? "dark" : "light")
})

mutation.observe(document.documentElement, {childList: true})

const sliderContainer = []

function change(dir, jump = 2, index) {
    const item = sliderContainer[index]
    const slider = item.slider

    const images = slider.children.length
    const atEnd = (item.idx + dir > Math.floor(images / jump) - 1)

    if (slider.id.length || (item.idx + dir < 0)) return
    slider.id = 'scroll'

    const tempImage = slider.children[0]
    const increment = tempImage.width * jump

    slider.style.setProperty('--transformOffsetGoal', 'translateX(' + item.pos + 'px)')

    if (atEnd) {
        item.pos = 0
        item.idx = 0
    }
    else {
        item.pos -= increment * dir
        item.idx += dir
    }

    slider.style.setProperty('--transformOffsetStart', 'translateX(' + item.pos + 'px)')
}

function bars(item) {
    const top = item.parentNode

    if (top.className == "top")
        top.className += " active"

    else top.className = "top"
}

function path(theme) {
    return `/assets/images/icons/${theme}.png`
}

function theme(item) {
    const theme = document.body.getAttribute("theme")
    const current = theme == "dark" ? "light" : "dark"

    localStorage.setItem("theme", current)
    document.body.setAttribute("theme", current)

    item.src = path(current)
}

onload = () => {
    const year = document.querySelector("span[year]")
    const icon = document.querySelector(".theme")

    year && (year.textContent = new Date().getFullYear())
    icon.src = path(document.body.getAttribute("theme"))

    const sliders = document.querySelectorAll('.slider')
    for (let i = 0; i < sliders.length; i ++) {
        sliders[i].addEventListener('animationend', () => sliders[i].id = '')
        sliderContainer.push({slider: sliders[i], idx: 0, pos: 0})
    }
}

onresize = () => {
    for (let i = 0; i < sliderContainer.length; i ++) {
        const slider = sliderContainer[i].slider
        slider.id = 'scroll'

        sliderContainer[i].pos = 0
        sliderContainer[i].idx = 0

        slider.style.setProperty('--transformOffsetStart', 'translateX(0)')
        slider.style.setProperty('--transformOffsetGoal', 'translateX(0)')
    }
}