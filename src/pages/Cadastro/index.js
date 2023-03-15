import './styles.css';
import api from '../../api';

import logo from '../../assets/icons/logo.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useState } from 'react';

function Cadastro() {
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            nome: '',
            email: '',
            senha: ''
        }
    )

    const [senha, setSenha] = useState('');

    function limparForm() {
        setForm(
            {
                nome: '',
                email: '',
                senha: ''
            }
        );
        setSenha('')
    }

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (form.senha !== senha) {
            return
        }
        cadastro()
        console.log('form', form);
        console.log('senha', senha)
    }

    function handleForm(e) {
        const value = e.target.value;
        const name = e.target.name
        setForm({ ...form, [name]: value })
    }

    async function cadastro() {
        try {
            await api.post('/usuario',
                {
                    ...form
                });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='cadastroCorpo'>

            <img src={logo} alt="logo esquerdo" className='logoEsquerdo' />

            <form onSubmit={(e) => handleSubmit(e)} className='cadastroFormulario'>
                <h1 className='cadastroTesto'>Cadastre-se</h1>

                <div className='cadastroLabel'>
                    <label>Nome</label>
                    <input
                        name='nome'
                        type="text"
                        value={form.nome}
                        onChange={(e) => handleForm(e)}
                        className='CadastroInput'
                        required
                    />
                </div>

                <div className='cadastroLabel'>
                    <label>E-mail</label>
                    <input
                        name='email'
                        type="text"
                        value={form.email}
                        onChange={(e) => handleForm(e)}
                        className='CadastroInput'
                        required
                    />
                </div>

                <div className='cadastroLabel'>
                    <label>Senha</label>
                    <input
                        name='senha'
                        type="password"
                        value={form.senha}
                        onChange={(e) => handleForm(e)}
                        className='CadastroInput'
                        required
                    />
                </div>

                <div className='cadastroLabel'>
                    <label>Confirmação de senha</label>
                    <input
                        name='senha-confirma'
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className='CadastroInput'
                        required
                    />
                </div>


                <div className='cadastroButtonSpan'>
                    <button
                        className='cadastroButton'
                    >
                        Cadastrar
                    </button>
                    <span className='cadastroSpan'>já tem cadastro?<Link to='/'>Clique aqui!</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;