const galleryEl = document.querySelector("#gallery");
let imagesArr;

class Image {
    constructor(uuid, name, url) {
        this.uuid = uuid;
        this.name = name;
        this.url = url;
    }

    get imgHTML() {
        return `<div class="img-container"><img src=${this.url} alt="" /></div>`;
    }
}

fetch("https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy")
    .then((res) => res.json())
    .then((data) => {
        imagesArr = data.map((image) => new Image(image.uuid, image.name, image.url));
        galleryEl.innerHTML = imagesArr.map((image) => image.imgHTML).join("");
    });
