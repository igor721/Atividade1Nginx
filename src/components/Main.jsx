import { Container } from 'react-bootstrap';
import ProdutosCard from './ProdutosCard';

const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
        {/* Produtos */}
        <ProdutosCard/>
      </Container>
    </main>
  );
};

export default Main;
