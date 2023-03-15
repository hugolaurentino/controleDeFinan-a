import './styles.css';
import logo from '../../assets/icons/logo.svg'
import api from '../../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem, getItem } from '../../utils/storage';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const token = getItem('token');
        if (token) {
            navigate('/principal');
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!email || !senha) {
                console.log('Preencha todos os campos!');
                return
            }

            const response = await api.post('/login',
                {
                    email,
                    senha
                }
            );

            const { token, usuario } = response.data;
            setItem('token', token);
            setItem('usuarioId', usuario.id);
            document.location.assign('/principal');

        } catch (error) {
            console.log(error.message)
            console.log(error.response.data.message)
        }
    }

    return (
        <div className='corpo'>
            <img src={logo} alt="logo esquerdo" className='logoEsquerdo' />

            <div className='login'>
                <div className='texto'>
                    <div>
                        <div className='testoAcima'><h1>Controle suas  <strong className='corFinaca'> finanças </strong>,<br />
                            sem planilha chata.</h1></div>
                        <div className='testoAbaixo'><h1>Organizar as suas finanças nunca foi tão fácil ,<br />
                            com o DINDIN, você tem tudo num único lugar <br /> e em um clique de distância.</h1></div>
                        <button
                            onClick={() => navigate('/cadastro')}
                            className='testoButton'>
                            Cadastre-se
                        </button>

                    </div>
                </div>

                <form onSubmit={handleSubmit} className='formulario'>
                    <h1 className='formularioTesto'>login</h1>
                    <div className='labelInput'>
                        <label>E-mail</label>
                        <input
                            name='email'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='formularioInput'
                            required
                        />
                    </div>

                    <div className='labelInput'>
                        <label>Password</label>
                        <input
                            name='senha'
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className='formularioInput'
                            required
                        />

                    </div>

                    <button className='formularioButton'>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
