import './styles.css';

function Cabecalho() {
    return (
        <div className='cabecalho'>
            <div className='cabecalhoTopo'>
                <div className="listaTamanho"><h1 className="testoCabecalho">{'Data'}</h1></div>
                <div className="listaTamanho"><h1 className="testoCabecalho">{'Dia da semana'}</h1></div>
                <div className="listaTamanho"><h1 className="testoCabecalho">{'Descrição'}</h1></div>
                <div className="listaTamanho"><h1 className="testoCabecalho">{'Categoria'}</h1></div>
                <div className="listaTamanho"><h1 className="testoCabecalho">{'Valor'}</h1></div>
                <div className="listaTamanhoEspaco"><h1 className="espaco"></h1></div>
            </div>

        </div>

    )
}

export default Cabecalho;