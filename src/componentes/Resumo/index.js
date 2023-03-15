import './styles.css';

function Resumo({ registro, setRegistro, transacoes }) {
    let totalEntrada = 0;
    let totalSaida = 0;
    let saldo = 0;

    for (const transacao of transacoes) {
        if (transacao.tipo === "entrada") {
            totalEntrada += Number(transacao.valor)
        }

        if (transacao.tipo === "saida") {
            totalSaida += Number(transacao.valor)
        }
    }

    saldo = totalEntrada - totalSaida

    return (
        <div >
            <div className="corpoResumo">
                <h1 className="resumo">Resumo</h1>

                <div className="resumoTestos">
                    <h1 className="resumoEntradaSaida">Entradas</h1>
                    <h1 className="resumoValoMaior">R$ {totalEntrada.toFixed(2)}</h1>
                </div>

                <div className="resumoTestos">
                    <h1 className="resumoEntradaSaida">Saídas</h1>
                    <h1 className="resumoValoMenor">R$ {totalSaida.toFixed(2)}</h1>
                </div>
                <div className="resumoRisco"></div>
                <div className="resumoTestos">
                    <h1 className="resumoSaldo">Saldo</h1>
                    <h1 className="resumoTotal">R$ {saldo.toFixed(2)}</h1>
                </div>

            </div>
            <button
                onClick={() => setRegistro(true)}
                className="ResumoBotao">
                Adicionar Registro
            </button>
        </div>
    )
}

export default Resumo;