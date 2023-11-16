import mongoose from 'mongoose';

// Configuração da conexão com o MongoDB
mongoose.connect('mongodb+srv://karinnylemos:250250@cluster0.oykppr8.mongodb.net/?retryWrites=true&w=majority', {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuração para evitar o aviso de depreciação
mongoose.set('strictQuery', false);

// Captura de eventos de conexão
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão bem-sucedida com o MongoDB.');
});

// Exporte a conexão para ser usada em outros módulos, se necessário
export default db;

