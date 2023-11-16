document.addEventListener('DOMContentLoaded', async function () {
  const container = document.getElementById('cart');
  const response = await fetch('/carrinho', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });

  const data = await response.json();
  data.sort((a, b) => a.nome.localeCompare(b.nome));

  data.forEach(venda => {
    // Venda
    const label = document.createElement("label");
    label.textContent = venda.nome;
    label.setAttribute("for", `venda-${venda._id}`);
    // Espaço
    const space = document.createTextNode("    ");
    label.appendChild(space);
    // Botão remover
    const removerButton = document.createElement("button");
    removerButton.textContent = "Remover";
    removerButton.classList.add('remover-button');
    removerButton.style.width = "50px"; //
    removerButton.style.height = "15px";
    removerButton.style.fontSize = "8px"

    // Adicionando tudo no append
    container.appendChild(label);
    container.appendChild(removerButton);
    container.appendChild(document.createElement("br"));

    // Adiciona um ouvinte de evento para o botão 'remover-button'
    removerButton.addEventListener('click', function () {
      excluirVenda(venda._id, label, removerButton);
    });
  });

  // Função para excluir a venda
  async function excluirVenda(vendaId, checkbox, label, removerButton) {
    // Adicione a lógica para enviar uma requisição ao servidor para remover a venda pelo ID
    await fetch(`/remover-venda/${vendaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    // Remove os elementos do DOM
    container.removeChild(checkbox);
    container.removeChild(label);
    container.removeChild(removerButton);
    container.removeChild(document.querySelector(`br[for="venda-${vendaId}"]`));

    // Move a venda para o topo do container
    container.prepend(checkbox);
    container.prepend(label);
    container.prepend(removerButton);
    container.prepend(document.createElement("br"));
  }
});
