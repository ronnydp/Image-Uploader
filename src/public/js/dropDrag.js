const input = document.getElementById('input-file');
const dropArea = document.getElementById('dropArea');

input.addEventListener("change", uploadImage) ;

function uploadImage(){
    let imgLink = URL.createObjectURL(input.files[0]);
    dropArea.style.backgroundImage = `url(${imgLink})`;
}

// Agregar evento de clic al dropArea
dropArea.addEventListener("click", function() {
    input.click(); // Simula un clic en el input de archivo
});
