import express from "express";
import multer from "multer"
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
  // Permite que o servidor interprete requisições com corpo no formato JSON
  app.use(express.json());

  //Rota para buscar todos os posts
  app.get("/posts", listarPosts);

  //Rota para criar um post
  app.post("/posts", postarNovoPost) // Chama a função controladora para criação de posts

  // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem) // Chama a função controladora para processamento da imagem

  // Rota para atualização de informação
  app.put("/upload/:id", atualizarNovoPost)
}

export default routes;