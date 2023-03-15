import './styles.css';
import fechar from '../../assets/icons/fechar.svg';

import { useState } from 'react';
import api from '../../api';
import { getItem } from '../../utils/storage';


function EditarPerfil({ modal, setmodal, nomeUsuarios }) {

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [senha, setSenha] = useState('');

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.senha !== senha) {
            return
        }

        try {
            if (!form.nome || !form.email) {
                console.log("Todos os campos são obrigatórios!")
                return
            }
            const token = getItem('token');

            await api.put(`/usuario`,
                {
                    ...form
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            nomeUsuarios()


            setmodal(false)
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className='corpoEditaPerfil'>
            <form className='editarPerfilForme' onSubmit={handleSubmit}>

                <div className='editarPerfilTestoFechar'>
                    <h1 className='editarPerfilTesto'>Editar Perfil</h1>
                    <img
                        className='editarPerfilTesto'
                        src={fechar} alt="imagem fechar"
                        onClick={() => setmodal(false)}
                    />
                </div>

                <div className='editarPerfilLabel'>
                    <label>Nome</label>
                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome'
                        value={form.nome}
                        onChange={handleChangeInput}
                        className='editarPerfilInput'
                        required
                    />

                </div>

                <div className='editarPerfilLabel'>

                    <label>E-mail</label>
                    <input
                        name='email'
                        type="text"
                        placeholder='E-mail'
                        value={form.email}
                        onChange={handleChangeInput}
                        className='editarPerfilInput'
                        required
                    />

                </div>

                <div className='editarPerfilLabel'>

                    <label>Senha</label>
                    <input
                        name='senha'
                        type="password"
                        placeholder='Senha'
                        value={form.senha}
                        onChange={handleChangeInput}
                        className='editarPerfilInput'
                        required
                    />

                </div>

                <div className='editarPerfilLabel'>

                    <label>Confirmação de senha</label>
                    <input
                        name='senha-confirma'
                        type="password"
                        value={senha}
                        placeholder='senha-confirma'
                        onChange={(e) => setSenha(e.target.value)}
                        className='editarPerfilInput'
                        required
                    />

                </div>
                <div >
                    <button
                        className='editarPerfilButton'
                    >
                        Cadastrar
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EditarPerfil;