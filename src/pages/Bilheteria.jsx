import { useState } from "react";
import CabecalhoBilheteria from "../components/CabecalhoBilheteria/CabecalhoBilheteria";

const Bilheteria = () => {
const [empresa, setEmpresa] = useState('');
const [linha, setLinha] = useState('');
const [metodoPagamento, setMetodoPagamento] = useState('');
const [etapa, setEtapa] = useState(1);
const [codigoConfirmacao, setCodigoConfirmacao] = useState('');
const [dadosCartao, setDadosCartao] = useState({
numero: '',
nome: '',
validade: '',
cvv: ''
});

  const linhasPorEmpresa = {
    SOU: [
      { numero: "102", nome: "Jardim Brasil ↔ Novo Mundo", motorista: { nome: "Carlos", idade: 35, sexo: "Masculino" } },
      { numero: "103", nome: "Jardim Brasil ↔ Antônio Zanaga / Alabama", motorista: { nome: "Ana", idade: 28, sexo: "Feminino" } },
      { numero: "104", nome: "Bertini / Alabama / Mathiensen", motorista: { nome: "João", idade: 40, sexo: "Masculino" } },
      { numero: "105", nome: "Bertini / Jardim Alvorada", motorista: { nome: "Mariana", idade: 32, sexo: "Feminino" } },
      { numero: "106", nome: "Jardim Bertoni / Terminal", motorista: { nome: "Roberto", idade: 45, sexo: "Masculino" } },
      { numero: "107", nome: "São Roque / Parque das Nações / Bertoni", motorista: { nome: "Patrícia", idade: 30, sexo: "Feminino" } },
      { numero: "108", nome: "Bertini / Cariobinha / Terminal", motorista: { nome: "Marcos", idade: 38, sexo: "Masculino" } },
      { numero: "111", nome: "Sobrado Velho / Terminal via Cadeião", motorista: { nome: "Luciana", idade: 29, sexo: "Feminino" } },
      { numero: "112", nome: "Portal dos Nobres / Iate / Terminal", motorista: { nome: "Eduardo", idade: 41, sexo: "Masculino" } },
      { numero: "114", nome: "Mathiesen / Antônio Zanaga", motorista: { nome: "Fernanda", idade: 27, sexo: "Feminino" } },
      { numero: "116", nome: "Morada do Sol / Terminal", motorista: { nome: "Pedro", idade: 44, sexo: "Masculino" } },
      { numero: "117", nome: "Mathiesen / Novo Mundo / Jardim Alvorada", motorista: { nome: "Raquel", idade: 33, sexo: "Feminino" } },
      { numero: "118", nome: "Antônio Zanaga / Novo Mundo", motorista: { nome: "Ricardo", idade: 36, sexo: "Masculino" } },
      { numero: "119", nome: "Parque Liberdade / Praia dos Namorados / Jardim Asta", motorista: { nome: "Sílvia", idade: 39, sexo: "Feminino" } },
      { numero: "200", nome: "Jardim Brasília / Praia Recanto via Av. Brasil", motorista: { nome: "Fábio", idade: 42, sexo: "Masculino" } },
      { numero: "201", nome: "Jardim Brasília / Praia Azul via Av. Campos Sales", motorista: { nome: "Letícia", idade: 31, sexo: "Feminino" } },
      { numero: "205", nome: "Jardim Brasília / Antônio Zanaga via Av. Brasil", motorista: { nome: "Gustavo", idade: 37, sexo: "Masculino" } },
      { numero: "206", nome: "Jardim da Paz / Terminal", motorista: { nome: "Camila", idade: 26, sexo: "Feminino" } },
      { numero: "207", nome: "Jardim da Paz / Terminal", motorista: { nome: "André", idade: 43, sexo: "Masculino" } },
      { numero: "208", nome: "Jardim da Paz / Antônio Zanaga", motorista: { nome: "Juliana", idade: 34, sexo: "Feminino" } },
      { numero: "211", nome: "Jardim da Paz / Werner Plass via Av. Campos Sales", motorista: { nome: "Rafael", idade: 46, sexo: "Masculino" } },
      { numero: "212", nome: "Jardim da Paz / Praia Azul via Rio Branco", motorista: { nome: "Patrício", idade: 50, sexo: "Masculino" } },
      { numero: "213", nome: "Jardim da Balsa / Hospital Municipal", motorista: { nome: "Sônia", idade: 29, sexo: "Feminino" } },
      { numero: "220", nome: "Mário Covas / Praia Recanto via Av. Campos Sales", motorista: { nome: "Bruno", idade: 40, sexo: "Masculino" } },
      { numero: "224", nome: "Jardim Bôer / Terminal", motorista: { nome: "Carla", idade: 32, sexo: "Feminino" } },
      { numero: "225", nome: "Mathiesen / Praia Recanto", motorista: { nome: "Diego", idade: 38, sexo: "Masculino" } }
    ],
    EMTU: [
      { numero: "619", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista: { nome: "Carlos", idade: 40, sexo: "Masculino" } },
      { numero: "620", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Mollon)", motorista: { nome: "Ana", idade: 35, sexo: "Feminino" } },
      { numero: "621", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano)", motorista: { nome: "João", idade: 45, sexo: "Masculino" } },
      { numero: "622", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista: { nome: "Fernanda", idade: 29, sexo: "Feminino" } },
      { numero: "623", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista: { nome: "Marcos", idade: 38, sexo: "Masculino" } },
      { numero: "624", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista: { nome: "Patrícia", idade: 31, sexo: "Feminino" } },
      { numero: "624DV1", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista: { nome: "Roberto", idade: 50, sexo: "Masculino" } },
      { numero: "625", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista: { nome: "Camila", idade: 33, sexo: "Feminino" } },
      { numero: "626", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista: { nome: "Rafael", idade: 42, sexo: "Masculino" } },
      { numero: "627", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Rodoterminal)", motorista: { nome: "Juliana", idade: 27, sexo: "Feminino" } },
      { numero: "628", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista: { nome: "Eduardo", idade: 36, sexo: "Masculino" } },
      { numero: "629", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista: { nome: "Sílvia", idade: 30, sexo: "Feminino" } },
      { numero: "630", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista: { nome: "André", idade: 39, sexo: "Masculino" } },
      { numero: "631", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista: { nome: "Bianca", idade: 28, sexo: "Feminino" } },
      { numero: "632", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista: { nome: "Fábio", idade: 46, sexo: "Masculino" } },
      { numero: "651", nome: "Sta Bárbara d'Oeste (Rodoterminal) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Paula", idade: 36, sexo: "Feminino" } },
      { numero: "652", nome: "Sta Bárbara d'Oeste (Cidade Nova) / Americana (Terminal Metropolitano)", motorista: { nome: "Ricardo", idade: 41, sexo: "Masculino" } },
      { numero: "653", nome: "Sta Bárbara d'Oeste (Jardim Europa) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Mariana", idade: 29, sexo: "Feminino" } },
      { numero: "654", nome: "Sta Bárbara d'Oeste (Vila Rica) / Americana (Terminal Metropolitano)", motorista: { nome: "Bruno", idade: 38, sexo: "Masculino" } },
      { numero: "655", nome: "Sta Bárbara d'Oeste (São Joaquim) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Carla", idade: 33, sexo: "Feminino" } },
      { numero: "656", nome: "Sta Bárbara d'Oeste (Jardim Mollon) / Americana (Terminal Metropolitano)", motorista: { nome: "Diego", idade: 45, sexo: "Masculino" } },
      { numero: "657", nome: "Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Luciana", idade: 31, sexo: "Feminino" } },
      { numero: "658", nome: "Sta Bárbara d'Oeste (Parque Planalto) / Americana (Terminal Metropolitano)", motorista: { nome: "Rodrigo", idade: 42, sexo: "Masculino" } },
      { numero: "659", nome: "Sta Bárbara d'Oeste (Jardim Santa Maria) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Tatiane", idade: 28, sexo: "Feminino" } },
      { numero: "660", nome: "Sta Bárbara d'Oeste (Nova Conquista) / Americana (Terminal Metropolitano)", motorista: { nome: "Gustavo", idade: 39, sexo: "Masculino" } },
      { numero: "661", nome: "Sta Bárbara d'Oeste (Jardim Esplanada) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Fernanda", idade: 34, sexo: "Feminino" } },
      { numero: "662", nome: "Sta Bárbara d'Oeste (Parque da Matriz) / Americana (Terminal Metropolitano)", motorista: { nome: "Alexandre", idade: 47, sexo: "Masculino" } },
      { numero: "663", nome: "Sta Bárbara d'Oeste (Jardim São Fernando) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista: { nome: "Isabela", idade: 30, sexo: "Feminino" } }
    ]
  };

  // Função para gerar código de confirmação
  const gerarCodigoConfirmacao = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  };
  // Função para avançar etapas
  const avancarEtapa = () => {
    if (etapa === 1 && empresa) {
      setEtapa(2);
    } else if (etapa === 2 && linha) {
      setEtapa(3);
    } else if (etapa === 3 && metodoPagamento) {
      setCodigoConfirmacao(gerarCodigoConfirmacao());
      setEtapa(4);
    }
  };

  // Função para voltar etapas
  const voltarEtapa = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
    }
  };

  // Função para reiniciar o processo
  const reiniciarProcesso = () => {
    setEmpresa('');
    setLinha('');
    setMetodoPagamento('');
    setEtapa(1);
    setCodigoConfirmacao('');
    setDadosCartao({
      numero: '',
      nome: '',
      validade: '',
      cvv: ''
    });
  };

  // Manipular mudanças nos campos do cartão
  const handleCartaoChange = (e) => {
    const { name, value } = e.target;
    setDadosCartao({
      ...dadosCartao,
      [name]: value
    });
  };

  // Formatar número do cartão
  const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Formatar data de validade
  const formatarValidade = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length <= 2) {
      return v;
    }
    
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  };

  return (
  <>
    <CabecalhoBilheteria />
    <div className="bilheteria-container">
      <main className="main-content">
        {/* Indicador de progresso */}
        <div className="progresso">
          <div className={`etapa ${etapa >= 1 ? 'ativo' : ''}`}>
            <span>1</span>
            <p>Empresa</p>
          </div>
          <div className={`etapa ${etapa >= 2 ? 'ativo' : ''}`}>
            <span>2</span>
            <p>Linha</p>
          </div>
          <div className={`etapa ${etapa >= 3 ? 'ativo' : ''}`}>
            <span>3</span>
            <p>Pagamento</p>
          </div>
          <div className={`etapa ${etapa >= 4 ? 'ativo' : ''}`}>
            <span>4</span>
            <p>Confirmação</p>
          </div>
        </div>
        
        {/* Etapa 1: Seleção de empresa */}
        {etapa === 1 && (
          <div className="etapa-container">
            <h2>Selecione a Empresa de Ônibus</h2>
            <p className="etapa-descricao">Escolha a empresa que você deseja utilizar</p>
            
            <div className="opcoes-empresa">
              <div 
                className={`opcao-empresa ${empresa === 'SOU' ? 'selecionado' : ''}`}
                onClick={() => setEmpresa('SOU')}
              >
                <div className="empresa-icon">🚍</div>
                <h3>SOU</h3>
                <p>Sistema de Ônibus Urbano</p>
                <div className="empresa-detalhe">Transporte municipal</div>
              </div>
              
              <div 
                className={`opcao-empresa ${empresa === 'EMTU' ? 'selecionado' : ''}`}
                onClick={() => setEmpresa('EMTU')}
              >
                <div className="empresa-icon">🚎</div>
                <h3>EMTU</h3>
                <p>Empresa Metropolitana de Transportes Urbanos</p>
                <div className="empresa-detalhe">Transporte intermunicipal</div>
              </div>
            </div>
            
            <div className="botoes-navegacao">
              <button className="btn-avancar" onClick={avancarEtapa} disabled={!empresa}>
                Avançar ➔
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa 2: Seleção de linha */}
        {etapa === 2 && (
          <div className="etapa-container">
            <h2>Selecione a Linha - {empresa}</h2>
            <p className="etapa-descricao">Escolha a linha que deseja embarcar</p>
            
            <div className="lista-linhas">
              {linhasPorEmpresa[empresa].map((linhaInfo) => (
                <div 
                  key={linhaInfo.numero}
                  className={`opcao-linha ${linha === linhaInfo.numero ? 'selecionado' : ''}`}
                  onClick={() => setLinha(linhaInfo.numero)}
                >
                  <div className="linha-numero">{linhaInfo.numero}</div>
                  <div className="linha-info">
                    <h3>{linhaInfo.nome}</h3>
                    <div className="info-motorista">
                      <span>Motorista: {linhaInfo.motorista.nome} ({linhaInfo.motorista.sexo}, {linhaInfo.motorista.idade} anos)</span>
                    </div>
                  </div>
                  <div className="linha-selecionador">✓</div>
                </div>
              ))}
            </div>
            
            <div className="botoes-navegacao">
              <button className="btn-voltar" onClick={voltarEtapa}>
                ⇠ Voltar
              </button>
              <button className="btn-avancar" onClick={avancarEtapa} disabled={!linha}>
                Avançar ➔
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa 3: Seleção de método de pagamento */}
        {etapa === 3 && (
          <div className="etapa-container">
            <h2>Método de Pagamento</h2>
            <p className="etapa-descricao">Escolha como deseja pagar sua passagem</p>
            
            <div className="linha-selecionada">
              <h3>Linha {linha} - {empresa}</h3>
              <p>{linhasPorEmpresa[empresa].find(l => l.numero === linha).nome}</p>
            </div>
            
            <div className="opcoes-pagamento">
              <div 
                className={`opcao-pagamento ${metodoPagamento === 'credito' ? 'selecionado' : ''}`}
                onClick={() => setMetodoPagamento('credito')}
              >
                <div className="pagamento-icon">💳</div>
                <h3>Cartão de Crédito</h3>
                <p>Parcelamento em até 12x</p>
              </div>
              
              <div 
                className={`opcao-pagamento ${metodoPagamento === 'debito' ? 'selecionado' : ''}`}
                onClick={() => setMetodoPagamento('debito')}
              >
                <div className="pagamento-icon">💳</div>
                <h3>Cartão de Débito</h3>
                <p>Pagamento à vista</p>
              </div>
              
              <div 
                className={`opcao-pagamento ${metodoPagamento === 'pix' ? 'selecionado' : ''}`}
                onClick={() => setMetodoPagamento('pix')}
              >
                <div className="pagamento-icon">📱</div>
                <h3>PIX</h3>
                <p>Pagamento instantâneo</p>
              </div>
            </div>
            
            {/* Formulário de cartão (se cartão selecionado) */}
            {(metodoPagamento === 'credito' || metodoPagamento === 'debito') && (
              <div className="cartao-form">
                <h3>Dados do Cartão</h3>
                
                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    name="numero"
                    value={dadosCartao.numero}
                    onChange={(e) => {
                      const formatted = formatarNumeroCartao(e.target.value);
                      setDadosCartao({...dadosCartao, numero: formatted});
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                
                <div className="form-group">
                  <label>Nome no Cartão</label>
                  <input
                    type="text"
                    name="nome"
                    value={dadosCartao.nome}
                    onChange={handleCartaoChange}
                    placeholder="Como consta no cartão"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      name="validade"
                      value={dadosCartao.validade}
                      onChange={(e) => {
                        const formatted = formatarValidade(e.target.value);
                        setDadosCartao({...dadosCartao, validade: formatted});
                      }}
                      placeholder="MM/AA"
                      maxLength="5"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={dadosCartao.cvv}
                      onChange={handleCartaoChange}
                      placeholder="123"
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Exibir QR Code se PIX for selecionado */}
            {metodoPagamento === 'pix' && (
              <div className="qrcode-container">
                <h3>Escaneie o QR Code para pagar</h3>
                <div className="qrcode">
                  <div className="qrcode-fake">
                    <div className="qrcode-pattern"></div>
                    <div className="qrcode-pattern"></div>
                    <div className="qrcode-pattern"></div>
                  </div>
                </div>
                <p className="codigo-pix">Ou copie o código: PIX-{gerarCodigoConfirmacao()}</p>
              </div>
            )}
            
            <div className="botoes-navegacao">
              <button className="btn-voltar" onClick={voltarEtapa}>
                ⇠ Voltar
              </button>
              <button className="btn-avancar" onClick={avancarEtapa} disabled={!metodoPagamento}>
                Finalizar Pagamento
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa 4: Confirmação */}
        {etapa === 4 && (
          <div className="etapa-container confirmacao">
            <div className="icone-confirmacao">✅</div>
            <h2>Pagamento Realizado com Sucesso!</h2>
            <p className="confirmacao-mensagem">Sua passagem foi reservada com sucesso!</p>
            
            <div className="detalhes-compra">
              <h3>Detalhes da Compra</h3>
              <div className="detalhe-item">
                <span className="detalhe-label">Empresa:</span>
                <span className="detalhe-valor">{empresa}</span>
              </div>
              <div className="detalhe-item">
                <span className="detalhe-label">Linha:</span>
                <span className="detalhe-valor">{linha} - {linhasPorEmpresa[empresa].find(l => l.numero === linha).nome}</span>
              </div>
              <div className="detalhe-item">
                <span className="detalhe-label">Método de Pagamento:</span>
                <span className="detalhe-valor">
                  {metodoPagamento === 'credito' && 'Cartão de Crédito'}
                  {metodoPagamento === 'debito' && 'Cartão de Débito'}
                  {metodoPagamento === 'pix' && 'PIX'}
                </span>
              </div>
            </div>
            
            <div className="codigo-confirmacao">
              <h3>Código de Confirmação</h3>
              <div className="codigo">{codigoConfirmacao}</div>
              <p>Apresente este código ao motorista no momento do embarque</p>
            </div>
            
            <button className="btn-reiniciar" onClick={reiniciarProcesso}>
              ↻ Fazer Nova Compra
            </button>
          </div>
        )}
      </main>
      
      <style jsx>{`
        /* Estilos gerais */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .bilheteria-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        /* Header */
        .app-header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          color: white;
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
        }
        
        .btn-profile {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-profile:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* Conteúdo principal */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: white;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Progresso */
        .progresso {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
          position: relative;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .progresso::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.3);
          z-index: 1;
        }
        
        .etapa {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .etapa span {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          font-weight: bold;
          color: white;
          transition: all 0.3s ease;
        }
        
        .etapa.ativo span {
          background-color: #4CAF50;
          box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.3);
        }
        
        .etapa p {
          margin: 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .etapa.ativo p {
          color: white;
          font-weight: bold;
        }
        
        /* Container das etapas */
        .etapa-container {
          background-color: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.5s;
          margin-bottom: 2rem;
        }
        
        .etapa-container h2 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.8rem;
        }
        
        .etapa-descricao {
          color: #7f8c8d;
          margin-bottom: 2rem;
        }
        
        /* Opções de empresa */
        .opcoes-empresa {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        .opcao-empresa {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }
        
        .opcao-empresa:hover {
          border-color: #3498db;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-empresa.selecionado {
          border-color: #3498db;
          background-color: #eaf2f8;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .empresa-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .opcao-empresa h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1.5rem;
        }
        
        .opcao-empresa p {
          margin: 0 0 0.5rem 0;
          color: #7f8c8d;
        }
        
        .empresa-detalhe {
          font-size: 0.9rem;
          color: #95a5a6;
          font-style: italic;
        }
        
        /* Lista de linhas */
        .lista-linhas {
          max-height: 400px;
          overflow-y: auto;
          margin: 1.5rem 0;
        }
        
        .opcao-linha {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.2rem;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          background: white;
        }
        
        .opcao-linha:hover {
          border-color: #3498db;
          background-color: #f9f9f9;
        }
        
        .opcao-linha.selecionado {
          border-color: #3498db;
          background-color: #eaf2f8;
        }
        
        .linha-numero {
          background: #3498db;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .linha-info {
          flex-grow: 1;
        }
        
        .opcao-linha h3 {
          margin: 0 0 0.3rem 0;
          color: #2c3e50;
        }
        
        .info-motorista {
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        .linha-selecionador {
          color: #3498db;
          font-size: 1.5rem;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .opcao-linha.selecionado .linha-selecionador {
          opacity: 1;
        }
        
        /* Linha selecionada */
        .linha-selecionada {
          background-color: #eaf2f8;
          padding: 1.2rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #3498db;
        }
        
        .linha-selecionada h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        
        .linha-selecionada p {
          margin: 0;
          color: #7f8c8d;
        }
        
        /* Opções de pagamento */
        .opcoes-pagamento {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.2rem;
          margin: 2rem 0;
        }
        
        .opcao-pagamento {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }
        
        .opcao-pagamento:hover {
          border-color: #3498db;
          transform: scale(1.03);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .opcao-pagamento.selecionado {
          border-color: #3498db;
          background-color: #eaf2f8;
          transform: scale(1.03);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .pagamento-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .opcao-pagamento h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }
        
        .opcao-pagamento p {
          margin: 0;
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        /* Formulário do cartão */
        .cartao-form {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        
        .cartao-form h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .form-group {
          margin-bottom: 1.2rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
        
        /* QR Code */
        .qrcode-container {
          text-align: center;
          margin: 2rem 0;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 12px;
        }
        
        .qrcode-container h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .qrcode-fake {
          width: 200px;
          height: 200px;
          background-color: white;
          margin: 0 auto;
          position: relative;
          border: 1px solid #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 8px;
        }
        
        .qrcode-pattern {
          position: absolute;
          width: 80%;
          height: 80%;
          background-image: 
            linear-gradient(45deg, #ccc 25%, transparent 25%), 
            linear-gradient(-45deg, #ccc 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #ccc 75%), 
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .codigo-pix {
          margin: 1rem 0 0 0;
          padding: 0.8rem;
          background: white;
          border-radius: 8px;
          font-family: monospace;
          font-size: 1.1rem;
        }
        
        /* Confirmação */
        .confirmacao {
          text-align: center;
          padding: 3rem 2rem;
        }
        
        .icone-confirmacao {
          font-size: 4rem;
          margin: 0 0 1.5rem 0;
          animation: bounce 1s;
        }
        
        .confirmacao-mensagem {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin-bottom: 2rem;
        }
        
        .detalhes-compra {
          text-align: left;
          background-color: #f9f9f9;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 2rem 0;
        }
        
        .detalhes-compra h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .detalhe-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .detalhe-item:last-child {
          border-bottom: none;
        }
        
        .detalhe-label {
          font-weight: 500;
          color: #7f8c8d;
        }
        
        .detalhe-valor {
          color: #2c3e50;
        }
        
        .codigo-confirmacao {
          margin: 2.5rem 0;
        }
        
        .codigo-confirmacao h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
        
        .codigo {
          font-size: 2.2rem;
          font-weight: bold;
          letter-spacing: 5px;
          color: #2c3e50;
          background-color: #f9f9f9;
          padding: 1.2rem;
          border-radius: 12px;
          margin: 1rem 0;
          animation: pulse 2s infinite;
          font-family: monospace;
        }
        
        .codigo-confirmacao p {
          color: #7f8c8d;
          margin: 0;
        }
        
        /* Botões */
        .botoes-navegacao {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .btn-avancar, .btn-voltar, .btn-reiniciar {
          padding: 1rem 1.8rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .btn-avancar {
          background-color: #3498db;
          color: white;
        }
        
        .btn-avancar:hover:not(:disabled) {
          background-color: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .btn-avancar:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }
        
        .btn-voltar {
          background-color: #95a5a6;
          color: white;
        }
        
        .btn-voltar:hover {
          background-color: #7f8c8d;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .btn-reiniciar {
          background-color: #2ecc71;
          color: white;
          margin: 0 auto;
          display: block;
        }
        
        .btn-reiniciar:hover {
          background-color: #27ae60;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Animações */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(46, 204, 113, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }
          
          .main-content {
            padding: 1rem;
          }
          
          .progresso {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          
          .progresso::before {
            display: none;
          }
          
          .etapa {
            flex-direction: row;
          }
          
          .etapa span {
            margin-right: 1rem;
            margin-bottom: 0;
          }
          
          .opcoes-empresa, .opcoes-pagamento {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .botoes-navegacao {
            flex-direction: column;
            gap: 1rem;
          }
          
          .btn-voltar, .btn-avancar {
            width: 100%;
          }
        }
           @media (max-width: 768px) {
            .bilheteria-container {
              padding: 0.5rem 0;
            }
            
            .main-content {
              padding: 0 0.5rem;
            }
            
            .etapa-container {
              padding: 1.2rem;
              margin-bottom: 1rem;
            }
            
            .etapa-container h2 {
              font-size: 1.3rem;
            }
            
            .opcoes-empresa {
              grid-template-columns: 1fr;
            }
            
            .opcoes-pagamento {
              grid-template-columns: 1fr;
            }
            
            .form-row {
              grid-template-columns: 1fr;
            }
            
            .botoes-navegacao {
              flex-direction: column;
            }
            
            .linha-info h3 {
              font-size: 0.9rem;
            }
            
            .info-motorista {
              font-size: 0.75rem;
            }
            
            .codigo {
              font-size: 1.5rem;
              letter-spacing: 2px;
              padding: 0.8rem;
            }
            
            .qrcode-fake {
              width: 150px;
              height: 150px;
            }
          }
          @media (max-width: 480px) {
            .etapa-container {
              padding: 1rem;
            }
            
            .opcao-linha {
              flex-direction: column;
              text-align: center;
            }
            
            .linha-numero {
              margin-right: 0;
              margin-bottom: 0.5rem;
            }
            
            .linha-selecionador {
              margin-top: 0.5rem;
            }
            
            .codigo {
              font-size: 1.2rem;
              padding: 0.6rem;
            }
          }
      `}</style>
    </div>
 </> 
  );
};

export default Bilheteria;