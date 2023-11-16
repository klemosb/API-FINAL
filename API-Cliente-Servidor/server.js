
import app from "./app.js";

const port = process.env.PORT || 8080;
// Onde ele vai escutar:
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});