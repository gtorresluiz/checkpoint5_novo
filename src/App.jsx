import './style.scss';
import React, { useState, useEffect } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [produtoId, setProdutoId] = useState('');

  useEffect(() => {
    // Carregar produtos da API ao carregar a página
    fetch('http://localhost:5000/produtos')
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error('Erro ao carregar produtos da API:', error));
  }, []);

  const inserirProduto = () => {
    // Enviar um novo produto para a API com o método POST
    fetch('http://localhost:5000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: nomeProduto, preço: parseFloat(precoProduto) }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Atualizar a lista de produtos após a inserção
        setProdutos([...produtos, data]);
        setNomeProduto('');
        setPrecoProduto('');
      })
      .catch((error) => console.error('Erro ao inserir o produto:', error));
  };

  const excluirProduto = () => {
    // Enviar uma solicitação DELETE para a API com base no ID do produto
    fetch(`http://localhost:5000/produtos/${produtoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remover o produto da lista após a exclusão
          setProdutos(produtos.filter((p) => p.id !== parseInt(produtoId)));
          setProdutoId('');
        } else {
          console.error('Erro ao excluir o produto.');
        }
      })
      .catch((error) => console.error('Erro ao realizar a requisição DELETE:', error));
  };

  return (
    <div>
      <header className="header">
        <h1 className="header-title">Gerenciamento de Produtos</h1>
      </header>
      <div>
        <h2>Inserir Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço do Produto"
          value={precoProduto}
          onChange={(e) => setPrecoProduto(e.target.value)}
        />
        <div className="botao">
          <button onClick={inserirProduto}>Inserir</button>
        </div>
      </div>
      <div>
        <h2>Excluir Produto</h2>
        <input
          type="text"
          placeholder="ID do Produto"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
        />
        <div className="botao">
          <button onClick={excluirProduto}>Excluir</button>
        </div>
      </div>
      <div className='lista_produtos'>
        <h2>Lista de Produtos</h2>
        <ul>
          {produtos.map((p) => (
            <li key={p.id}>
              {p.nome} - R${p.preço}
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <h1 className='footer-h1'>&copy; 2023 CleanWave. Todos os direitos reservados</h1>
      </footer>
    </div>
  );
}

export default App;
