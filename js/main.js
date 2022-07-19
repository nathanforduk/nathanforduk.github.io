window.dataLayer = window.dataLayer || []
function gtag() {dataLayer.push(arguments)}

gtag("js", new Date())
gtag("config", "G-LD4L8FCK6D", {cookie_flags: "SameSite=None;Secure"})

function bars(item) {
    const top = item.parentNode

    if (top.className == "top")
        top.className += " active"

    else top.className = "top"
}

onload = () => {
    const year = document.querySelector("span[year]")
    if (year) year.textContent = new Date().getFullYear()
}