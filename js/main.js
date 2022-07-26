const mutation = new MutationObserver(() => {
    if (!document.body) return

    const theme = localStorage.getItem("theme")
    const dark = matchMedia("(prefers-color-scheme:dark)").matches

    mutation.disconnect()
    document.body.setAttribute("theme", theme ? theme : dark ? "dark" : "light")
})

mutation.observe(document.documentElement, {childList: true})
window.dataLayer = window.dataLayer || []

gtag("js", new Date())
gtag("config", "G-LD4L8FCK6D", {cookie_flags: "SameSite=None;Secure"})

function gtag() {
    dataLayer.push(arguments)
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

    if (year) year.textContent = new Date().getFullYear()
    icon.src = path(document.body.getAttribute("theme"))
}