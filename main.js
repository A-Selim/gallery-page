const galleryEl = document.querySelector("#gallery");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-img");
let imagesArr;

class Image {
    constructor(uuid, name, url) {
        this.uuid = uuid;
        this.name = name;
        this.url = url;
    }

    get imgHTML() {
        return `<div class="img-container">
                    <img class="image" src=${this.url} alt="" />
                    <span class="material-icons-outlined zoom-icon">search</span>
                </div>`;
    }
}

fetch("https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy")
    .then((res) => res.json())
    .then((data) => {
        imagesArr = data.map((image) => new Image(image.uuid, image.name, image.url));
        galleryEl.innerHTML = imagesArr.map((image) => image.imgHTML).join("");
    });

galleryEl.addEventListener("click", function (event) {
    modal.showModal();
    if (event.target.classList.contains("zoom-icon")) {
        const zoomIconsArr = Array.from(document.getElementsByClassName("zoom-icon"));
        const zoomIconIndex = zoomIconsArr.indexOf(event.target);
        displayModalImg(imagesArr[zoomIconIndex]);
    } else if (event.target.classList.contains("image")) {
        const clickedImgSrc = event.target.src;
        imagesArr.forEach((image) => {
            if (image.url === clickedImgSrc) {
                displayModalImg(image);
            }
        });
    }
});

modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-img")) {
        return;
    }
    modal.close();
});

// Function to display the clicked image in modal
function displayModalImg(image) {
    const imgCount = document.querySelector(".img-count");
    modalImg.innerHTML = `
        <img class="modal-img" src=${image.url} alt="" />
        <figcaption class="img-name">${image.name}</figcaption>
    `;
    imgCount.textContent = `Image ${imagesArr.indexOf(image) + 1}/${imagesArr.length}`;
}
