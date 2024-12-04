import express from 'express';
import {dirname, join}from 'path'; //permite acceder a los archivos de forma dinamica, si cambia de lugar lo detecta automaticamente, el join permite concatenar el dirname con el nombre de la carpeta views
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)) // obtiene la ruta hasta la carpeta src -> C:\Users\CHIMBOTE\Documents\Projects\Image Uploader\src

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

// Sirve archivos estáticos desde la carpeta 'public', ya no es necesario llegar hasta public
app.use(express.static(join(__dirname, 'public')))

// Almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // establecer el nombre unico del archivo
    }
});

const upload = multer({ storage })

// ruta para subir imagenes
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'No file uploaded'})
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl }) // devuelve la url de la imagen
    console.log(imageUrl);
})

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

app.listen(3000)
console.log("Server is listening on port ", 3000)
//console.log(join(__dirname, 'views')) //C:\Users\CHIMBOTE\Documents\Projects\Image Uploader\src\views