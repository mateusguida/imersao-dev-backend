import fs from "fs"; // Importa o módulo 'fs' do Node.js para realizar operações com o sistema de arquivos, como renomear arquivos.

import { getTodosPosts, criarPost } from "../models/postsModels.js"; // Importa as funções `getTodosPosts` e `criarPost` do módulo `postsModels`, que provavelmente interagem com um banco de dados para buscar e criar posts.

export async function listarPosts(req, res) {
  // Chama a função para buscar os posts do banco de dados e armazena o resultado na constante 'posts'.
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Extrai os dados do novo post a partir do corpo da requisição (req.body).
  const novoPost = req.body;
  try {
    // Chama a função para criar um novo post no banco de dados e armazena o resultado na constante 'postCriado'.
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (OK) e o post recém-criado no formato JSON.
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante a criação do post, imprime a mensagem de erro no console e envia uma resposta HTTP com status 500 (Erro interno do servidor).
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo a URL da imagem (que será renomeada posteriormente).
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Cria o post no banco de dados e armazena o resultado.
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo da imagem, usando o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome, movendo-o para a pasta 'uploads'.
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post recém-criado no formato JSON.
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro durante o processo, imprime a mensagem de erro no console e envia uma resposta HTTP com status 500 (Erro interno do servidor).
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}