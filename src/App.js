// src/App.js
import React, { useState, useEffect } from 'react';
import AddProduto from './components/AddProduto';
import ProdutoList from './components/ProdutoList';
import api from './api';

function App() {
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleEditProduto = (produto) => {
        setProdutoEditando(produto);
    };

    const handleProdutoSalvo = () => {
        setProdutoEditando(null);
        fetchProdutos(); // Atualiza a lista após adicionar ou editar
    };

    return (
        <div className="App d-flex justify-content-center" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ width: '40%', marginRight: '5%' }}>
                <AddProduto produtoEditando={produtoEditando} onProdutoSalvo={handleProdutoSalvo} />
            </div>
            <div style={{ width: '55%' }}>
                <ProdutoList produtos={produtos} onEditProduto={handleEditProduto} onDeleteProduto={fetchProdutos} />
            </div>
        </div>
    );
}

export default App;
