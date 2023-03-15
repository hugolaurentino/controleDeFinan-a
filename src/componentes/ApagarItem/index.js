import api from '../../api';
import './styles.css';

function ApagarItem({ setApagar, transacaoId, getTransacoes }) {

    async function deletarTransacao() {
        await api.delete(`/transacao/${transacaoId}`)
        setApagar(false)
        getTransacoes()
    }
    function fecharModal() {
        setApagar(false)
        getTransacoes()
    }

    return (
        <div className='corpoApagar'>
            <h1 className='apagarTesto'>Apagar item?</h1>
            <div className='apagarBotao'>
                <button className='apagarBotaoSim' onClick={() => deletarTransacao()}>sim</button>
                <button className='apagarBotaoNao' onClick={() => fecharModal()}>não</button>

            </div>
        </div>
    )
}

export default ApagarItem;