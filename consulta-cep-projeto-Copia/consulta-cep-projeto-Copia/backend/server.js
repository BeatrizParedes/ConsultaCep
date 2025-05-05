import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

// Rota para testar a conexão
app.get('/teste', (req, res) => {
  res.json('Olá do backend!');
});

// Rota para consultar o CEP
app.get('/consulta-cep/:cep', async (req, res) => {
  const cep = req.params.cep;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    // Fazendo a requisição à API ViaCEP
    const response = await axios.get(url);

    // Verificando se o CEP retornou erro
    if (response.data.erro) {
      return res.status(400).json({ erro: 'CEP não encontrado' });
    }

    // Retornando os dados do CEP
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao consultar o CEP' });
  }
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
