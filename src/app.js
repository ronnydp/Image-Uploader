import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));

app.use(express.static(join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl }); // devuelve la url de la imagen
  console.log(imageUrl);
});

// Servir archivos estáticos desde la carpeta 'uploads'
app.use("/uploads", express.static("uploads"));

// Ruta para descargar archivos
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const fileLocation = path.join(__dirname, "uploads", filename);
  res.download(fileLocation, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File not found");
    }
  });
});

app.listen(3000);
console.log("Server is listening on port ", 3000);
