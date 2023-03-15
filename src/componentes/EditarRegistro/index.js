import './styles.css';
import fechar from '../../assets/icons/fechar.svg';

import { useState } from 'react';
import api from '../../api';

function EditarRegistro({ categorias, setEditarRegistro, transacaoId, getTransacoes }) {
    const [tipo, setTipo] = useState('entrada')

    function entrada() {
        setTipo('entrada')
    }

    function saida() {
        setTipo('saida')
    }

    const [form, setForm] = useState({
        valor: '',
        descricao: '',
        data: '',
        categoria: ''

    });

    function handleForm(e) {
        const value = e.target.value;
        const name = e.target.name
        setForm({ ...form, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        editarRegistro()
    }

    async function editarRegistro() {

        const categoria_id = categorias.filter((categoria) =>
            categoria.descricao === form.categoria
        )

        if(!categoria_id){
            return;
        }

        const novaTransacao = {
            "data": form.data,
            "tipo": tipo,
            "valor": form.valor,
            "descricao": form.descricao,
            "categoria_id": categoria_id[0].id,
        }

        try {
            await api.put(`/transacao/${transacaoId}`,
                novaTransacao
            );

            getTransacoes()
            setEditarRegistro(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='corpoEditarRegistro'>

            <form className='corpoEditarRegistroForme' onSubmit={(e) => handleSubmit(e)}>
                <div className='corpoEditarRegistroFechar'>
                    <h1 className='corpoEditarRegistroTesto'>Editar Registro</h1>
                    <img src={fechar} alt="imagem fechar" onClick={() => setEditarRegistro(false)} />
                </div>
                <div className='corpoEditarRegistroEntradaSaida'>
                    <button type='button' className={tipo === 'entrada' ? 'corpoEditarRegistroEntrada' : 'corpoEditarRegistroEntradaDesativado'} onClick={() => entrada()} >Entrada</button>
                    <button type='button' className={tipo === 'saida' ? 'corpoEditarRegistroSaida' : 'corpoEditarRegistroSaidaDesativado'} onClick={() => saida()} >Saida</button>
                </div>
                <div className='corpoEditarRegistroLabel'>

                    <label>Valor</label>
                    <input
                        name='valor'
                        type="text"
                        value={form.valor}
                        onChange={(e) => handleForm(e)}
                        className='corpoEditarRegistroInput'
                        required
                    />

                </div>

                <div className='corpoEditarRegistroLabel'>

                    <label>Categoria</label>

                    <select
                        name='categoria'
                        onChange={(e) => handleForm(e)}
                        className='corpoEditarRegistroInput'
                    >
                         <option>Selecione uma categoria</option>

                        {categorias.map((categoria) => (
                            <option key={categoria.id}>{categoria.descricao}</option>
                        ))}
                    </select>

                </div>

                <div className='corpoEditarRegistroLabel'>

                    <label>Data</label>
                    <input
                        name='data'
                        type="date"
                        value={form.data}
                        onChange={(e) => handleForm(e)}
                        className='corpoEditarRegistroInput'
                        required
                    />

                </div>

                <div className='corpoEditarRegistroLabel'>

                    <label>Descrição</label>
                    <input
                        type="text"
                        name='descricao'
                        value={form.descricao}
                        onChange={(e) => handleForm(e)}
                        className='corpoEditarRegistroInput'
                        required
                    />

                </div>
                <div>
                    <button
                        type='submit'
                        className='corpoEditarRegistroButton'
                    >
                        Confirmar
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EditarRegistro;