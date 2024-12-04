const dropArea = document.getElementById("drop-area");
const form = document.querySelector("form");
const textInner = document.querySelector(".inner");
const fileTypes = document.querySelector(".file-types");
const inputFile = document.querySelector(".input-file");
const browse = document.querySelector(".select");
const progressBar = document.getElementById("progress-bar");
const cardLoad = document.querySelector(".card-load");
const cardImg = document.querySelector(".card-img");
const buttons = document.querySelector(".container-buttons");
let lastSelectedFileName = "";

// Para el boton Browse files
browse.addEventListener("click", function () {
  inputFile.addEventListener("change", uploadImage);
  inputFile.click();
});

// Arrastrar y soltar la imagen
form.addEventListener("dragover", (e) => {
  e.preventDefault();

  form.classList.add("dragover");
  // const image = inputFile.files[0];
  // const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  // console.log(acceptedImageTypes.includes(image.type));
});

form.addEventListener("dragleave", (e) => {
  e.preventDefault();

  form.classList.remove("dragover");
});

form.addEventListener("drop", (e) => {
  e.preventDefault();
  form.classList.remove("dragover");
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

// Mostrar o cargar la imagen en pantalla
async function uploadImage() {
  const image = inputFile.files[0];

  //Validar si hay archivos o no
  if (!image) {
    return;
  }

  // Validacion de si es una imagen o no
  const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!acceptedImageTypes.includes(image.type)) {
    alert("JPG, PNG or GIF");
    return false;
  }

  // Si la imagen excede los 2MB
  if (image.size > 2_000_000) {
    alert("Maximum upload size is 2MB!");
    return;
  }

  // Validar cantidad de imagenes
  if (lastSelectedFileName && lastSelectedFileName !== image.name) {
    console.log(image.name);
    console.log(lastSelectedFileName);
    lastSelectedFileName = " ";
    console.log(lastSelectedFileName);

    alert("Only upload an image at a time");
    return;
  }
  console.log(image.name);
  console.log(lastSelectedFileName);
  lastSelectedFileName = image.name;

  cardLoad.style.display = "flex";
  cardImg.style.display = "none";

  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    setTimeout(async () => {
      cardLoad.style.display = "none";
      cardImg.style.display = "flex";
      buttons.style.display = "flex";
      const data = await response.json();
      showImage(data.imageUrl);
    }, 2000); //Cambia 2000 por el tiempo en milisegundos que desees (2 segundos en este caso)
  } catch (error) {
    console.log("Error uploading image", error);
  }
}

function showImage(imageUrl) {
  dropArea.style.backgroundImage = `url('http://localhost:3000${imageUrl}')`;
  dropArea.textContent = " ";
  dropArea.style.border = 0;
}
