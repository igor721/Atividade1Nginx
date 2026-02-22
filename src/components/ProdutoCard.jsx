import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProdutoCard = ({ imagem, nome, descricao, preco}) => {
  const detalharHandleClick = (event) => {
    console.log('Clicou');
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imagem} />
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Text>{descricao}</Card.Text>
          <Button onClick={detalharHandleClick} variant="primary">
            Comprar {preco}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

ProdutoCard.propTypes = {
  imagem: PropTypes.string,
  nome: PropTypes.string,
  descricao: PropTypes.string,
  preco: PropTypes.string,
};

export default ProdutoCard;
