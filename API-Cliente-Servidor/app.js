import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import db from './src/config/dbConnect.js';
import router from './src/routes/routes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão feita com sucesso');
});

const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Rota para a página principal
app.get('/', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'cadastro-vendas.html'));
});

// Rota para a página "adicionar-venda.html"
app.get('/adicionar-venda', cors(), (req, res) => {
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // res.header("Access-Control-Allow-Origin", "*")
  res.sendFile(path.join(__dirname, 'src', 'public', 'adicionar-venda.html'));
});

app.get('/ver-carrinho', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'carrinho.html'));
});


const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
  // optionsSuccessStatus: 204,
};
app.options('*', cors(corsOptions));
// app.use(cors());

app.use(express.json());
app.use(router);

export default app;
