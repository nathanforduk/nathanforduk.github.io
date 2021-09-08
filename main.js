window.dataLayer = window.dataLayer || [];
function gtag() {dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-7WP82B4W69");

onload = () => {
    if (typeof year != "undefined")
        year.innerText = new Date().getFullYear()
}

const bar = item => {
    const parent = item.parentElement
    
    if (parent.className === "top") parent.className += " responsive"    
    else parent.className = "top"
}