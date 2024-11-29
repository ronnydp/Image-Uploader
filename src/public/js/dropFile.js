const dropArea = document.getElementById("drop-area");
const form = document.querySelector("form");
const textInner = document.querySelector(".inner");
const fileTypes = document.querySelector(".file-types");
const inputFile = document.querySelector(".input-file");
const browse = document.querySelector(".select");
const progressBar = document.getElementById("progress-bar");

console.log(dropArea);

browse.addEventListener("click", function () {
  inputFile.click();
  inputFile.addEventListener('change', uploadImage)
});

form.addEventListener("dragover", (e) => {
  e.preventDefault();

  form.classList.add("dragover");
  textInner.innerHTML = "Drop images here";
  fileTypes.innerHTML = " ";
});

form.addEventListener("dragleave", (e) => {
  e.preventDefault();

  form.classList.remove("dragover");
  textInner.innerHTML =
    'Drag & drop a file or <span class="select">browse files</span>';
  fileTypes.innerHTML = "JPG, PNG or GIF - Max file size 2MB";
});

form.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
  form.classList.remove("dragover");
})

function uploadImage(){
  let imglink = URL.createObjectURL(inputFile.files[0]);
  dropArea.style.backgroundImage = `url(${imglink})`
  dropArea.textContent = " ";
  dropArea.style.border = 0;
}
