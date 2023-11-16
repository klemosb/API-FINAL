import Vendas from '../models/Vendas.js';
export default class VendasController {
  static listarVendas = (req, res) => {
    Vendas.find((err, vendas) => {
      res.status(200).json(vendas);
    });
  };

  static listarVendasPorId = (req, res) => {
    const id = req.params.id;

    Vendas.findById(id, (err, vendas) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do Vendas não localizado.` });
      } else {
        res.status(200).json(vendas);
        res.status(200).send(vendas);

      }
    });
  };

  static atualizarVendas = (req, res) => {

    const id = req.params.id;
    Vendas.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, vendaAtualizada) => {
      if (!err) {
        res.status(200).json(vendaAtualizada);;
      } else {
        console.error('Erro ao atualizar vendas:', err);
      }
    });
  };

  static excluirVendas = (req, res) => {
    const id = req.params.id;

    Vendas.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Venda(s) removida(s) com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static cadastrarVenda(req, res) {
    const { nome, quantidade } = req.body;

    const novaVenda = new Vendas({
      nome: nome,
      quantidade: quantidade,
    });

    novaVenda.save((err, venda) => {
      if (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao cadastrar venda.` });
      } else {
        res.status(201).send({
          message: 'Venda cadastrada com sucesso.',
          id: venda._id,
          nome: venda.nome,
          quantidade: venda.quantidade,
        });
      }
    });
  }

  static idsSelecionados = []; // Array para armazenar IDs selecionados

  static carregarVendasECheckboxes() {
    console.log('Entrei no carregar')
    const url = "https://api-cliente-servidor.onrender.com/vendas";
    const container = document.getElementById("checkbox-container");

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar vendas. Código de status: ${response.status}`);
        }
        return response.json();
      })
      .then(vendas => {
        if (vendas && vendas.length > 0) {
          vendas.forEach(venda => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `venda-${venda.id}`;
            checkbox.value = venda.id;
            checkbox.addEventListener('change', () => {
              this.atualizarIdsSelecionados(); // Atualiza os IDs selecionados quando um checkbox é alterado
            });

            const label = document.createElement("label");
            label.htmlFor = `venda-${venda.id}`;
            label.appendChild(document.createTextNode(`Venda ${venda.id}`));

            container.appendChild(checkbox);
            container.appendChild(label);
            container.appendChild(document.createElement("br"));
          });
        } else {
          container.innerHTML = "Nenhuma venda encontrada.";
        }
      })
      .catch(error => {
        console.error(`Erro ao carregar vendas: ${error.message}`);
      });
  }

  static atualizarIdsSelecionados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.idsSelecionados = Array.from(checkboxes).map(checkbox => checkbox.value);
  }

  static adicionarAoCarrinho() {
    // Use this.idsSelecionados para realizar as operações desejadas
    console.log('IDs selecionados:', this.idsSelecionados);

    // Suponha que você tenha uma função mostrarCarrinho para lidar com a lógica de exibição do carrinho
    mostrarCarrinho(this.idsSelecionados);
  }

}

