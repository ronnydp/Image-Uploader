const inputFile = document.getElementById('input-file');
const dragArea = document.getElementById('drop-area');

inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.addEventListener
}

dragArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dragArea.addEventListener("drop", function(e){
    e.preventDefault();
    
})
