const vShape = document.querySelector(".article-share__content--shape");
const menuContent = document.querySelector(".article-share__content");
const menuButton = document.querySelector(".article-share__btn");

const isMenuExpanded = () => menuButton.getAttribute("aria-expanded") === "true";

const showMenu = () => {
    menuButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
        menuContent.style.display = "flex";
        menuContent.style.opacity = "0";
        menuButton.classList.add("menu-shown");

        const rect = menuContent.getBoundingClientRect();
        let offsetX = outerWidth - (rect.width + rect.left);
        if (offsetX < 0) {
            const x = Math.min(Math.abs(offsetX) + 24);
            menuContent.style.margin = `0 ${x}px 0 0`;
            vShape.style.margin = `0 0 0 ${x}px`;
        }

        requestAnimationFrame(() => {
            vShape.style.opacity = null;
            menuContent.style.opacity = null;
        });
    });
};

const hideMenu = () => {
    let startTime = null;
    menuButton.setAttribute("aria-expanded", "false");

    function resetStyling(t) {
        if (!startTime) {
            menuContent.style.opacity = "0";
            menuButton.classList.remove("menu-shown");
            startTime = t;
        }

        if (t - startTime < 200) {
            requestAnimationFrame(resetStyling);
        } else {
            requestAnimationFrame(() => {
                menuContent.style.margin = null;
                menuContent.style.display = null;
                vShape.style.margin = null;
            });
        }
    }
    requestAnimationFrame(resetStyling);
};

menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isMenuExpanded()) hideMenu();
    else showMenu();
});

menuContent.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    if (isMenuExpanded()) hideMenu();
});
window.addEventListener("blur", () => {
    if (isMenuExpanded()) hideMenu();
});
