document.addEventListener('DOMContentLoaded', () => {
    ''
    const form = document.getElementById('formCadastro');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const quantidade = document.getElementById('quantidade').value;

      try {
        const response = await fetch('/vendas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, quantidade }),
        });

        const data = await response.json();

        if (response.ok) {

          console.log(data);
          document.getElementById('mensagemDiv').innerText = data.message;

          // Mostrar mensagem de sucesso
          const mensagemSucesso = document.getElementById('mensagemSucesso');

        } else {

          console.error(data);
          document.getElementById('mensagemDiv').innerText = data.message;
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    });
  });