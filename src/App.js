import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import Img from '../src/assets/homeImg.png'

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    //01310930/json/

    if(input === ''){
      alert("Preencha algum cep!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data)
      setCep(response.data);
      setInput("");

    }catch{
      alert("Ops erro ao buscar");
      setInput("")
    }
  }

  return (
    <>
    
    <div className="container">
    <div className="image">
      <img src={Img} alt="" />
    </div>
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>DDD {cep.ddd}</span>

        </main>

      )}


    </div></>
  );
}

export default App;

