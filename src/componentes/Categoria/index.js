import './styles.css';
import adicionar from '../../assets/icons/adicionar.svg';

function Categoria({ categorias }) {

    return (
        <div className='categoriaCorpo'>
            <h1 className='categoriaTesto'>Categoria</h1>
            <div className='categoriaItens'>

                {
                    categorias.map((categoria) =>
                        <div className='categoriaConteudo'>
                            <h1 className='categoriaConteudoTesto'>{categoria.descricao}</h1>
                            <img src={adicionar} alt="imagem mais" className='categoriaConteudoImg' />
                        </div>

                    )
                }

            </div>
            <div className='categoriaLimparAplicar'>
                <button className='categoriaButtonLimpar'>Limpar Filtros</button>
                <button className='categoriaButtonFiltro'>Aplicar Filtros</button>
            </div>
        </div>

    )
}

export default Categoria;