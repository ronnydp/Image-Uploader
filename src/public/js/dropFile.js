const dropArea = document.getElementById("drop-area");
const form = document.querySelector("form");
const textInner = document.querySelector(".inner");
const fileTypes = document.querySelector(".file-types");
const inputFile = document.querySelector(".input-file");
const browse = document.querySelector(".select");
const progressBar = document.getElementById("progress-bar");

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
function uploadImage() {
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
    return false;
  } else {
    showImage();
  }
}

function showImage() {
  let imglink = URL.createObjectURL(inputFile.files[0]);
  dropArea.style.backgroundImage = `url(${imglink})`;
  dropArea.textContent = " ";
  dropArea.style.border = 0;
}
