import { Row } from 'react-bootstrap';
import ProdutoCard from './ProdutoCard';
import produtos from '../datasets/produtos';

const ProdutosCard = () => {
  let produtosData = [...produtos
  
  ];
  return (
    <>
      <Row>
        {produtosData.map(({ imagem, nome, descricao, preco}, indice) => {
          return (
            <ProdutoCard
              key={indice}
              imagem={imagem}
              nome={nome}
              descricao={descricao}
              preco={preco}
            />
          );
        })}
      </Row>
    </>
  );
};

export default ProdutosCard;
