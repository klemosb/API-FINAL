import express from 'express';
import CarrinhoController from '../controllers/carrinhoController.js';
import PagamentoController from '../controllers/pagController.js';
import VendasController from '../controllers/vendasController.js';
import cors from 'cors';
import path from 'path';

const router = express.Router();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

router.use(cors());
router.options('/vendas', cors());

router.post('/vendas', VendasController.cadastrarVenda);
router.get('/vendas', VendasController.listarVendas);
router.get('/vendas/:id', VendasController.listarVendasPorId);
router.put('/vendas/:id', VendasController.atualizarVendas);
router.delete('/vendas/:id', VendasController.excluirVendas);


// Carrinho
router.get('/carrinho', CarrinhoController.listarCarrinho);
router.post('/carrinho/adicionar', CarrinhoController.adicionarAoCarrinho);
router.delete('/carrinho/remover/:vendaId', CarrinhoController.removerVendaDoCarrinho);

router.use('/adicionar-venda', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=3600', 'Last-Modified');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitindo de qualquer origem, ajuste conforme necessário
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.use('/cadastrar-venda', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=3600', 'Last-Modified');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitindo de qualquer origem, ajuste conforme necessário
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/pagamento', PagamentoController.listarPagamentos)
router.get('/pagamento/:id', PagamentoController.listarPagamentoPorId)
router.get('/pagamento/:venda', PagamentoController.listarPagamentoPorVenda)
router.post('/pagamento', PagamentoController.cadastrarPagamento)
router.put('/pagamento/:id', PagamentoController.atualizarPagamento)
router.delete('/pagamento/:id', PagamentoController.excluirPagamento);


export default router;