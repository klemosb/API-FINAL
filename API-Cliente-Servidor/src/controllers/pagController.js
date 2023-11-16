// Controladores: Recebe a requisção e devolve as respostas.
import pagamento from '../models/Pagamento.js';

class PagamentoController {
  static listarPagamentos = (req, res) => {
    pagamento.find((err, pagamento) => {
      res.status(200).json(pagamento)
    })
    // pagamento.populate('pagamento');
  };

  static listarPagamentoPorId = (req, res) => {
    const id = req.params.id;
    pagamento.findById(id, (err, pagamento) => { // Alterado para "Pagamento"
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - ID do pagamento não localizado.` }); // Atualizado para "ID do pagamento"
      } else {
        res.status(200).send(pagamento);
      }
    });

  };

  static listarPagamentoPorVenda = (req, res) => {
    const venda = req.params.vendas;
    pagamento.findById(venda, (err, pagamento) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - ID do pagamento não localizado.` });
      } else {
        res.status(200).send(pagamento);
      }
    });
  }
  static cadastrarPagamento = (req, res) => {
    let novopagamento = new pagamento(req.body);
    novopagamento.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar pagamento.` });
      } else {
        res.status(201).send(novopagamento.toJSON());
      }
    });
  };

  static atualizarPagamento = (req, res) => {
    const id = req.params.id;

    pagamento.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Pagamento atualizado com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirPagamento = (req, res) => {
    const id = req.params.id;

    pagamento.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Pagamento removido com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static listarPagamentoPorEditora = (req, res) => {
    const carrinho = req.query.carrinho;

    pagamento.find({ carrinho: carrinho }, {}, (err, pagamento) => {
      res.status(200).send(pagamento);
    });
  };
}

export default PagamentoController;

// Esse controlador vai ser usado lá nas rotas, dada a rota que for pedida, qual método ele deve chamar.
