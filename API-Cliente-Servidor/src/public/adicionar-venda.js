
document.addEventListener('DOMContentLoaded', async function () {
  const container = document.getElementById('checkbox-container');
  const response = await fetch('/vendas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
  const data = await response.json();

  data.forEach(venda => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `venda-${venda._id}`;
    checkbox.value = venda._id;
    const label = document.createElement("label");
    label.htmlFor = `venda-${venda._id}`;
    label.appendChild(document.createTextNode(` ${venda?.nome}`));

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
})


const button = document.getElementById("adicionarAoCarrinhoBtn");
button.addEventListener('click', async () => {
  const checkboxs = document.querySelectorAll('input[type="checkbox"]');
  const selectedIds = [];
  checkboxs.forEach((check) => {
    if (check.checked) {
      selectedIds.push(check.value);
    }
  })
  console.log(selectedIds);
  if (selectedIds.length < 1) {
    alert("Você precisa adicionar items dentro do seu carrinho!!!")
  } else {
    const response = fetch("/carrinho/adicionar", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({ ids: selectedIds }),
    }).then(response => {
      if (response.ok) {
        const status = response.status;
        if (status === 204) {
          window.location.href = "/ver-carrinho";
        } else {
          alert("Ocorreu um erro na sua requisição. Tente novamente mais tarde!!")
        }
      } else {
        alert("Ocorreu um erro na sua requisição. Tente novamente mais tarde!!")
      }
    });

  }
});
