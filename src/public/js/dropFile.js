const dropArea = document.getElementById("drop-area");
const form = document.querySelector("form");
const inputFile = document.querySelector(".input-file");
const browse = document.querySelector(".select");
const cardLoad = document.querySelector(".card-load");
const cardImg = document.querySelector(".card-img");
const buttons = document.querySelector(".container-buttons");
const shareButton = document.getElementById("shareButton");
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

  // Validacion imagen o no
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
    lastSelectedFileName = " ";

    alert("Only upload an image at a time");
    return;
  }

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
      const downloadLink = document.getElementById("downloadLink");

      showImage(data.imageUrl);
      shareButton.addEventListener("click", () => shareLink(data.imageUrl)); //funcion anonima o de flecha
      downloadLink.href = data.imageUrl; // Obtiene la URL de la imagen y lo envía al elemento html
    }, 2000);
  } catch (error) {
    console.log("Error uploading image", error);
  }
}

function showImage(imageUrl) {
  dropArea.style.backgroundImage = `url('https://image-uploader-flame-one.vercel.app${imageUrl}')`;
  dropArea.textContent = " ";
  dropArea.style.border = 0;
}

// Compartir el link de la imagen subida
function shareLink(imageUrl) {
  const Url = `https://image-uploader-flame-one.vercel.app${imageUrl}`; // obtiene la url de la imagen

  // usa la API del portapapeles para copiar la url com promesas
  navigator.clipboard
    .writeText(Url)
    .then(() => {
      // maneja el caso exitoso
      alert("URL copied to clipboard: " + Url);
    })
    .catch((err) => {
      // maneja el caso si hay error
      console.error("Error al copiar la URL: ", err);
      alert("Error al copiar la URL");
    });
}
