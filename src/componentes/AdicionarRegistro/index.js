import './styles.css';
import api from '../../api';

import fechar from '../../assets/icons/fechar.svg';
import { useState } from 'react';

function AdicionarRegistro({ getTransacoes, setRegistro, categorias }) {

    const [tipo, setTipo] = useState('entrada')

    function entrada() {
        setTipo('entrada')
    }

    function saida() {
        setTipo('saida')

    }

    const [form, setForm] = useState({
        valor: '',
        categoria: '',
        data: '',
        descricao: ''

    });

    function limparForm() {
        setForm(
            {
                valor: '',
                categoria: '',
                data: '',
                descricao: ''
            }
        );
    }

    function handleForm(e) {
        const value = e.target.value;
        const name = e.target.name
        setForm({ ...form, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        AdicionarRegistro()
    }

    async function AdicionarRegistro() {

        const categoria_id = categorias.find((categoria) => {
            return categoria.descricao === form.categoria
        })

        if(!categoria_id){
            return;
        }

        const novaTransacao = {
            "data": form.data,
            tipo,
            "valor": form.valor,
            "descricao": form.descricao,
            "categoria_id": categoria_id.id,
        }

        try {
            await api.post('/transacao',
                novaTransacao
            );

            getTransacoes()
            setRegistro(false);
        } catch (error) {
            console.log(error)
        } finally {
            limparForm()

        }
    }

    return (
        <div className='corpoRegistro'>

            <form className='corpoRegistroForme' onSubmit={(e) => handleSubmit(e)}>
                <div className='corpoRegistroFechar'>
                    <h1 className='corpoRegistroTesto'>Adicionar Registro</h1>
                    <img src={fechar} alt="imagem fechar" onClick={() => setRegistro(false)} />
                </div>

                <div className='corpoRegistroEntradaSaida'>
                    <button type='button' className={tipo === 'entrada' ? 'registroEntrada' : 'registroEntradaDesativado'} onClick={() => entrada()} >Entrada</button>
                    <button type='button' className={tipo === 'saida' ? 'registroSaida' : 'registroSaidaDesativado'} onClick={() => saida()} >Saida</button>
                </div>

                <div className='corpoRegistroLabel'>

                    <label>Valor</label>
                    <input
                        name='valor'
                        type="text"
                        value={form.valor}
                        onChange={(e) => handleForm(e)}
                        className='corpoRegistroInput'
                        required
                    />

                </div>

                <div className='corpoRegistroLabel'>

                    <label>Categoria</label>

                    <select
                        name='categoria'
                        onChange={(e) => handleForm(e)}
                        className='corpoRegistroInput'
                    >
                        <option>Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id}>{categoria.descricao}</option>
                        ))}

                    </select>

                </div>

                <div className='corpoRegistroLabel'>

                    <label>Data</label>
                    <input
                        name='data'
                        type="date"
                        value={form.data}
                        onChange={(e) => handleForm(e)}
                        className='corpoRegistroInput'
                        required
                    />

                </div>

                <div className='corpoRegistroLabel'>

                    <label>Descrição</label>
                    <input
                        name='descricao'
                        type="text"
                        value={form.descricao}
                        onChange={(e) => handleForm(e)}
                        className='corpoRegistroInput'
                        required
                    />

                </div>
                <div>
                    <button
                        type='submit'
                        className='corpoRegistroButton'
                    >
                        Confirmar
                    </button>
                </div>
            </form>

        </div>
    )
}

export default AdicionarRegistro;