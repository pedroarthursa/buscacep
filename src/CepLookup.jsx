// src/CepLookup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CepLookup.css';

const CEP_API_URL = 'https://viacep.com.br/ws';

const CepLookup = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${CEP_API_URL}/${cep}/json/`);
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }
      setAddress(response.data);
    } catch (err) {
      setError(err.message);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Busca de CEP</h1>
      <input
        className="input"
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button className="button" onClick={handleSearch}>Buscar</button>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">Erro: {error}</p>}
      {address && (
        <div className="result">
          <h2>Endereço Encontrado:</h2>
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade}</p>
          <p><strong>Estado:</strong> {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default CepLookup;
