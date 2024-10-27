// src/components/AddProduto.js
import React, { useState, useEffect } from 'react';
import api from '../api';

const AddProduto = ({ produtoEditando, onProdutoSalvo }) => {
    const [produto, setProduto] = useState({
        nome: '',
        quantidade: '',
        preco: '',
        validade: ''
    });

    useEffect(() => {
        if (produtoEditando) {
            setProduto(produtoEditando); // Carrega o produto para edição
        } else {
            setProduto({ nome: '', quantidade: '', preco: '', validade: '' });
        }
    }, [produtoEditando]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleAddOrEditProduto = async (e) => {
        e.preventDefault();
        try {
            if (produto.id) {
                await api.put(`/produtos/${produto.id}`, produto);
            } else {
                await api.post('/produtos', produto);
            }
            setProduto({ nome: '', quantidade: '', preco: '', validade: '' });
            onProdutoSalvo();
        } catch (error) {
            console.error("Erro ao adicionar ou editar produto:", error);
        }
    };

    return (
        <div className="add-produto-container">
            <h2 className="text-center">{produto.id ? "Editar Produto" : "Adicionar Produto"}</h2>
            <form onSubmit={handleAddOrEditProduto} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantidade" className="form-label">Quantidade</label>
                    <input type="number" id="quantidade" name="quantidade" value={produto.quantidade} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="preco" className="form-label">Preço</label>
                    <input type="number" id="preco" name="preco" value={produto.preco} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="validade" className="form-label">Validade</label>
                    <input type="date" id="validade" name="validade" value={produto.validade} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {produto.id ? "Salvar Alterações" : "Adicionar Produto"}
                </button>
            </form>
        </div>
    );
};

export default AddProduto;
