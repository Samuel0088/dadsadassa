import style from './Conteudo.module.css';
import imagem_destaque from '../../assets/Imagens/img-ini.png';
import BusMap from './BusMap';
import PlanejadorRota from './Escolha';
import { Cabecalho } from '../Cabecalho/Cabecalho';


const Conteudo = () => {
  return (

    
    <main className={style.Conteudo}>
      <div className={style.container}>
        <div>
          <div className={style.title}>
            <h1 className="font-bold font-arialfont-arial">
              Conectando pessoas,
              <br />
              movendo cidades.
            </h1>
          </div>

          <p className={style.p}  class="font-arial">
            Somos uma startup focada em transformar a forma como as pessoas se
            mobilizam. Nosso objetivo é identificar e remover barreiras que
            dificultam o engajamento — seja em comunidades, projetos sociais ou
            campanhas — criando soluções práticas e inclusivas que tornam a
            participação mais fácil, acessível e impactante.
          </p>
          <br />
          <button className={style.botaoOpcoes} role="button">Ver rotas</button>

        </div>

        <div className={style.imagem_destaque}>
          <img src={imagem_destaque} alt="Ilustração Mobiliza Vida" />
        </div>
      </div>
      <br /><br /><br />
      <BusMap />

      <PlanejadorRota />
    </main>
  );
};

export { Conteudo };