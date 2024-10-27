// src/components/ProdutoList.js
import React from 'react';
import api from '../api';

const ProdutoList = ({ produtos, onEditProduto, onDeleteProduto }) => {
    const handleDelete = async (id) => {
        try {
            await api.delete(`/produtos/${id}`);
            onDeleteProduto(); 
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    return (
        <div className="produto-list-container mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h2 className="text-center">Lista de Produtos</h2>
            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.validade}</td>
                            <td className="text-center">
                                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(produto.id)}>
                                    Excluir
                                </button>
                                <button className="btn btn-warning btn-sm" onClick={() => onEditProduto(produto)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProdutoList;
