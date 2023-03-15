import './style.css';
import logo from '../../assets/icons/logo.svg'
import logo1 from '../../assets/icons/logo1.svg'
import voltar from '../../assets/icons/voltar.svg'
import filtrar from '../../assets/icons/filtrar.svg'
import { useNavigate } from 'react-router-dom';
import Categoria from '../../componentes/Categoria';
import Cabecalho from '../../componentes/Cabecalho';
import Resumo from '../../componentes/Resumo';
import EditarPerfil from '../../componentes/EditarPerfil';
import api from '../../api';
import Lista from '../../componentes/Lista';
import AdicionarRegistro from '../../componentes/AdicionarRegistro';
import EditarRegistro from '../../componentes/EditarRegistro';
import { useEffect, useState } from 'react';
import { clear } from '../../utils/storage'

function PrincipalPagina() {
  const [transacoes, setTransacoes] = useState([])
  const [categorias, setCategorias] = useState([])
  const [nomeUsuario, setNomeUsuario] = useState([])
  const [transacaoId, setTransacaoId] = useState(0)
  const [modal, setmodal] = useState(false)
  const [filtro, setFiltro] = useState(false)
  const [registro, setRegistro] = useState(false)
  const [editarRegistro, setEditarRegistro] = useState(false)
  const [apagar, setApagar] = useState(false)

  const navigate = useNavigate();

  async function nomeUsuarios() {
    const { data } = await api.get('/usuario')
    setNomeUsuario(data)
  }

  function voltaPagina() {
    clear()
    navigate('/')
  }

  async function categoriaApi() {
    const { data } = await api.get('/categorias')
    setCategorias(data)
  }

  async function getTransacoes() {
    try {

      const { data } = await api.get('/transacao')

      setTransacoes(data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {
    getTransacoes()
    categoriaApi()
    nomeUsuarios()
  }, [])

  return (
    <div className='principalCorpo'>
      <div className='principalCabeca'>
        <div className='principalMenuEsquerdo' >
          <img src={logo} alt="logo esquerdo" />
        </div>

        <div className='principalMenuDireito'>

          <img
            src={logo1}
            alt="logo direita"
            className='logoDireita'
            onClick={() => setmodal(true)}
          />
          <span className='principalUsuario'>{nomeUsuario.nome}</span>
          <img
            src={voltar}
            alt="botão voltar"
            onClick={() => voltaPagina()}
            className='principalButtonVoltar'
          />

        </div>
      </div>

      <div className='principalConteudo'>

        <div className='principalCabecalho'>

          <div
            onClick={() => setFiltro(!filtro)}
            className='principalImagem'
          >

            <img
              src={filtrar}
              alt="imagem do filtro"
            />
            <h1 className='testoPrincipal'>
              Filtrar
            </h1>

          </div>

          <div className='principalResumoTesto'>
            <div className='principalTesto'>

              {
                filtro &&
                <Categoria
                  categorias={categorias}
                />
              }

              <Cabecalho />

              {
                transacoes.map((transacao) => (
                  <Lista
                    key={transacao.id}
                    transacao={transacao}
                    setEditarRegistro={setEditarRegistro}
                    setApagar={setApagar}
                    setTransacaoId={setTransacaoId}
                    getTransacoes={getTransacoes}

                    apagar={apagar}
                    transacaoId={transacaoId}
                  />
                ))
              }

            </div>
            < Resumo
              registro={registro}
              transacoes={transacoes}
              setRegistro={setRegistro}
            />
          </div>
          {
            modal &&
            <EditarPerfil
              nomeUsuarios={nomeUsuarios}
              modal={modal}
              setmodal={setmodal}
            />
          }

          {
            registro &&
            <AdicionarRegistro
              registro={registro}
              setRegistro={setRegistro}
              categorias={categorias}
              getTransacoes={getTransacoes}

            />
          }

          {
            editarRegistro &&
            <EditarRegistro
              editarRegistro={editarRegistro}
              setEditarRegistro={setEditarRegistro}
              categorias={categorias}
              getTransacoes={getTransacoes}
              transacaoId={transacaoId}

            />
          }

          {/* <div className="listaApagar">
            {
              apagar &&

              <ApagarItem
                setApagar={setApagar}
                transacaoId={transacaoId}
                getTransacoes={getTransacoes}

              />
            }
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default PrincipalPagina;