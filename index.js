import galleryElem from "./gallery-items.js";

const galleryList = document.querySelector('.js-gallery');
const imgElem = document.querySelector('.lightbox__image');
const modal = document.querySelector('.js-lightbox');
const btnClose = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');


const addListImg = (arr) => { 
    return arr.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link"
        href=${original}>
        <img class="gallery__image"
        src=${preview}
        data-source=${original}
        alt=${description} />
        </a>
        </li>`;
    }).join("");
}

function addImgInModal(src = "", alt = "") {
    imgElem.src = src;
    imgElem.alt = alt;
}

galleryList.addEventListener("click", modalOpen);
galleryList.insertAdjacentHTML("afterbegin", addListImg(galleryElem));

function modalOpen(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== "IMG") {
        return;
    }
    modal.classList.add("is-open");
    addImgInModal(e.target.dataset.source, e.target.alt);
    overlay.addEventListener("click", modalCloseOverlay);
    btnClose.addEventListener("click", modalClose);
}

function modalClose(e) {
    modal.classList.remove("is-open");
    overlay.removeEventListener("click", modalCloseOverlay);
    btnClose.removeEventListener("click", modalClose);
    addImgInModal();
}

function modalCloseOverlay(e) {
    if (e.currentTarget === e.target) {
        modalClose(e);
    }
}

