import './styles.css';
import editar from '../../assets/icons/editar.svg';
import lixeira from '../../assets/icons/lixeira.svg';
import { format, parseISO } from 'date-fns'
import ApagarItem from '../ApagarItem';

function Lista({ transacao, setEditarRegistro, setApagar, setTransacaoId, getTransacoes, transacaoId, apagar }) {

    function apagarTransacao() {
        setApagar(true)
        setTransacaoId(transacao.id)
    }

    function editaraRestro() {
        setEditarRegistro(true)
        setTransacaoId(transacao.id)
    }

    const diasSemanas = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
    var Xmas95 = new Date(transacao.data);
    var weekday = Xmas95.getDay();

    return (
        <div className='lista'>
            <div className='listaItem'>
                <div className="listaTamanho"><h1 className='listaTestoData'>{format(parseISO(transacao.data), 'dd/MM/yyyy')}</h1></div>
                <div className="listaTamanho"><h1 className='listaTesto'>{diasSemanas[weekday]}</h1></div>
                <div className="listaTamanho"><h1 className='listaTesto'>{transacao.descricao}</h1></div>
                <div className="listaTamanho"><h1 className='listaTesto'>{transacao.categoria_nome}</h1></div>
                <div className="listaTamanho"><h1 className={transacao.tipo === 'saida' ? 'listaTestoTotalMenor' : 'listaTestoTotalMaior'}>{`R$ ${transacao.valor.toFixed(2)}`}</h1></div>
                <div className="listaImagem">
                    <img src={editar} alt="imagem de editar" className="listaImagemEditar" onClick={() => editaraRestro()} />
                    <img src={lixeira} alt="imagem de lixeira" className="listaImagemLixeiro" onClick={() => apagarTransacao()} />
                </div>
            </div>

            <div className="listaApagar">
                {
                    (transacaoId === transacao.id && apagar) &&

                    <ApagarItem
                        setApagar={setApagar}
                        transacaoId={transacaoId}
                        getTransacoes={getTransacoes}
                    />
                }
            </div>
            <div className="risco"></div>

        </div>

    )
}

export default Lista;