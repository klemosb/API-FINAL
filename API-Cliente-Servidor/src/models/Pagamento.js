import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema(
  {
    valor: { type: Number, required: true },
    forma_pagamento: { type: String, required: true },
    num_parcelas: { type: Number, required: true },
    aprovado: { type: Boolean, required: true }
  },
  {
    versionKey: false,
  }
);

const pagamento = mongoose.model('pagamento', pagamentoSchema); // Renomeado para "Pagamento"

export default pagamento;

