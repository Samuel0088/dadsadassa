// src/pages/Home.jsx
import { Cabecalho } from '../components/Cabecalho/Cabecalho';
import { Conteudo } from '../components/Conteudo/Conteudo';
import { Footer } from '../components/Footer/Footer';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth(); // Agora usa o contexto

  return (
    <>
      <Cabecalho />
      <Conteudo />
      <Footer />
    </>
  );
};

export default HomePage;