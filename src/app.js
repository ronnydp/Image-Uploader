import express from 'express'
import {dirname, join}from 'path' //permite acceder a los archivos de forma dinamica, si cambia de lugar lo detecta automaticamente, el join permite concatenar el dirname con el nombre de la carpeta views
import { fileURLToPath } from 'url'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url)) // obtiene la ruta hasta la carpeta src -> C:\Users\CHIMBOTE\Documents\Projects\Image Uploader\src

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

app.use(express.static(join(__dirname, 'public')))

app.listen(3000)
console.log("Server is listening on port ", 3000)
//console.log(join(__dirname, 'views')) //C:\Users\CHIMBOTE\Documents\Projects\Image Uploader\src\views