import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
import routes from "./src/routes/post.Routes.js";

const app = express();
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000,() => {
  console.log("Servidor escutando...");
});



/*function buscarPostsPorID(id){
  return posts.findIndex((post) => {
    return post.id == Number(id);
  })
};*/

/*app.get("/posts/random",(req,res) => {
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  res.status(200).json(randomPost);
});*/

/*app.get("/posts/:id",(req,res) => {
  const index = buscarPostsPorID(req.params.id);
  res.status(200).json(posts[index]);
});*/

/*app.get("/livro",(req,res) => {
  const livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954
  };
  res.status(200).json(livro);
});*/
