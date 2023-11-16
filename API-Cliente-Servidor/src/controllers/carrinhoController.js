import mongoose from 'mongoose';
import Carrinho from '../models/Carrinho.js';
import Vendas from '../models/Vendas.js';
import fetch from 'node-fetch';
import https from 'https';

export default class CarrinhoController {

  static adicionarAoCarrinho = async (req, res) => {
    try {

      const ids = req.body.ids;      
      const vendas = await Vendas.find({ _id: { $in: ids }}, {nome: 1}).lean(); 

      await Carrinho.findByIdAndUpdate('650d960c6d226c5e144cae97', {
        $addToSet: {
          vendasAdicionadas: vendas
        }
      }, {new: true});   

      res.status(204).json();
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Erro ao adicionar a venda no carrinho.' });
    }
  };

  static async listarCarrinho(req, res) {
    try {
      const carrinho = await Carrinho.findById('650d960c6d226c5e144cae97').lean();   
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }
      const vendas = await Vendas.find({ _id: { $in: carrinho.vendasAdicionadas }}, {nome: 1});

      res.json(vendas).status(200);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar o carrinho.' });
    }
  }
  static removerVendaDoCarrinho = async (req, res) => {
    try {
      const vendaId = req.params.vendaId;

      if (!vendaId) {
        return res.status(400).json({ error: 'ID da venda não fornecido.' });
      }

      const carrinho = await Carrinho.findById('650d960c6d226c5e144cae97');

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      const updatedVendasAdicionadas = carrinho.vendasAdicionadas.filter((venda) =>
        venda.toString() !== vendaId
      );

      carrinho.vendasAdicionadas = updatedVendasAdicionadas;
      await carrinho.save();

      res.status(200).json({ message: 'Venda removida do carrinho com sucesso.' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover a venda do carrinho.' });
    }
  };

  static async getCartItems(req, res ){   
    
    const url = "http://api-cliente-servidor.onrender.com/vendas";
    const response = await fetch(url, {
        // mode:"no-cors",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const data = await response.json();
    return res.json(data);
  }
};


