const mutation = new MutationObserver(() => {
    if (!document.body) return

    const theme = localStorage.getItem("theme")
    const dark = matchMedia("(prefers-color-scheme:dark)").matches

    mutation.disconnect()
    document.body.setAttribute("theme", theme ? theme : dark ? "dark" : "light")
})

mutation.observe(document.documentElement, {childList: true})

const slidersContainer = []

function change(dir, jump = 2, index) {
    // get the slider div element
    const item = slidersContainer[index]

    // get the width of a template image
    const tempImage = item.slider.children[0]
    const increment = tempImage.width * jump

    // move div in specified direction
    item.pos -= increment * dir
    item.slider.style.transform = 'translateX(' + item.pos + 'px)'
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
    for (let i = 0; i < sliders.length; i ++)
        slidersContainer.push({slider: sliders[i], pos: 0})
}

onresize = () => {
    // the sliders are reset so that the images don't get jumbled
    for (let i = 0; i < slidersContainer.length; i ++) {
        const item = slidersContainer[i]
        item.pos = 0
        item.slider.style.transform = 'translateX(0)'
    }
}