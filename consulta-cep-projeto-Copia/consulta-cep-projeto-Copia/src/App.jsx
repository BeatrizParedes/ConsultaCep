import { useState } from 'react';

function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);

  const consultarCep = async () => {
    if (cep.trim() === '') return;
  
    try {
      const resposta = await fetch(`http://localhost:3000/cep/${cep}`);
      const dados = await resposta.json();
  
      console.log(dados);
  
      if (dados.erro) {
        alert('CEP não encontrado');
        setDados(null);
      } else {
        setDados(dados);
      }
    } catch (error) {
      alert('Erro na consulta');
    }
  };
  

  return (
    <div className="container">
      <h1>Olá!</h1>
      <p><strong>Insira um cep:</strong></p>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="01002000"
      />
      <br />
      <button onClick={consultarCep}>Enviar</button>

      {dados && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <p><strong>CEP:</strong> {dados.cep}</p>
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade}</p>
          <p><strong>Estado:</strong> {dados.uf}</p>
        </div>
      )}
    </div>
  );
}

export default App;
