import mongoose from "mongoose";

const carrinhoSchema = new mongoose.Schema(
  {
    vendasAdicionadas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendas',
      },
    ],
  },
  {
    versionKey: false,
    collection: 'carrinhos',
  }
);

const Carrinho = mongoose.model('carrinhos', carrinhoSchema);
export default Carrinho; 
