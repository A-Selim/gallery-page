const galleryEl = document.querySelector("#gallery");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-img");
const previousBtn = document.querySelector("#previous-btn");
const nextBtn = document.querySelector("#next-btn");
const darkModeBtn = document.querySelector("#dark-mode-btn");
let imagesArr;
let modalImgIndex;

class Image {
    constructor(uuid, name, url) {
        this.uuid = uuid;
        this.name = name;
        this.url = url;
    }

    get imgHTML() {
        return `<div class="img-container">
                    <img src=${this.url} alt="" />
                    <span class="material-icons-outlined zoom-icon">search</span>
                </div>`;
    }
}

fetch("https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy")
    .then((res) => res.json())
    .then((data) => {
        imagesArr = data.map((image) => new Image(image.uuid, image.name, image.url));
        // Generate images HTML
        galleryEl.innerHTML = imagesArr.map((image) => image.imgHTML).join("");

        const imgContainers = document.querySelectorAll(".img-container");
        imgContainers.forEach((container, index) => {
            container.addEventListener("click", function () {
                modal.showModal();
                displayModalImg(imagesArr[index]);
            });
        });
    });

// Closing modal eventListener
modal.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-img") || event.target.classList.contains("btn")) {
        return;
    }
    modal.close();
});

// Carousel modal navigation arrows listeners
previousBtn.addEventListener("click", navigateToPrevImage);

nextBtn.addEventListener("click", navigateToNextImage);

modal.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
        navigateToPrevImage();
    } else if (event.key === "ArrowRight") {
        navigateToNextImage();
    }
});

// Display the clicked image in modal
function displayModalImg(image) {
    modalImgIndex = imagesArr.indexOf(image);
    const imgCount = document.querySelector(".img-count");
    modalImg.innerHTML = `
        <img class="modal-img" src=${image.url} alt="" />
        <figcaption class="img-name">${image.name}</figcaption>
    `;
    imgCount.textContent = `Image ${imagesArr.indexOf(image) + 1}/${imagesArr.length}`;
}

function navigateToPrevImage() {
    if (modalImgIndex === 0) {
        modalImgIndex = imagesArr.length - 1;
    } else {
        modalImgIndex--;
    }
    displayModalImg(imagesArr[modalImgIndex]);
}

function navigateToNextImage() {
    if (modalImgIndex === imagesArr.length - 1) {
        modalImgIndex = 0;
    } else {
        modalImgIndex++;
    }
    displayModalImg(imagesArr[modalImgIndex]);
}

// Dark mode button eventListener
darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});
