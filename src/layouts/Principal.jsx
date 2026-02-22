import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Principal.css';

const Principal = () => {
  return (
    <div className="App">
      <Header></Header>
      {/* Irá mudar de acordo com a página */}
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Principal;
