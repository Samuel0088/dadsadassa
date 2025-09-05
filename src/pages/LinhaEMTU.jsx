import React, { useState } from 'react';
import TerceiroCabecalho from '../components/TerceiroCabecalho/TerceiroCabecalho.jsx';

function LinhaEMTU() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [linhasFiltradas, setLinhasFiltradas] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  const linhasOnibusAmericana = [
    // Linhas Americana → Santa Bárbara d'Oeste
    { numero: "619", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista:{ nome:"Carlos", idade:40, sexo:"Masculino" } },
    { numero: "620", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Mollon)", motorista:{ nome:"Ana", idade:35, sexo:"Feminino" } },
    { numero: "621", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano)", motorista:{ nome:"João", idade:45, sexo:"Masculino" } },
    { numero: "622", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Fernanda", idade:29, sexo:"Feminino" } },
    { numero: "623", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Cidade Nova)", motorista:{ nome:"Marcos", idade:38, sexo:"Masculino" } },
    { numero: "624", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Patrícia", idade:31, sexo:"Feminino" } },
    { numero: "624DV1", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Roberto", idade:50, sexo:"Masculino" } },
    { numero: "625", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Camila", idade:33, sexo:"Feminino" } },
    { numero: "626", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Jardim Europa)", motorista:{ nome:"Rafael", idade:42, sexo:"Masculino" } },
    { numero: "627", nome: "Americana (Terminal Metropolitano) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Juliana", idade:27, sexo:"Feminino" } },
    { numero: "628", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Rodoterminal)", motorista:{ nome:"Eduardo", idade:36, sexo:"Masculino" } },
    { numero: "629", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista:{ nome:"Sílvia", idade:30, sexo:"Feminino" } },
    { numero: "630", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (São Joaquim)", motorista:{ nome:"André", idade:39, sexo:"Masculino" } },
    { numero: "631", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista:{ nome:"Bianca", idade:28, sexo:"Feminino" } },
    { numero: "632", nome: "Americana (Rodoviário Francisco Luiz Bendilatti) / Sta Bárbara d'Oeste (Vila Rica)", motorista:{ nome:"Fábio", idade:46, sexo:"Masculino" } },    
  ];

  const linhasOnibusSBO = [
    { numero: "651", nome: "Sta Bárbara d'Oeste (Rodoterminal) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Paula", idade:36, sexo:"Feminino" } },
    { numero: "652", nome: "Sta Bárbara d'Oeste (Cidade Nova) / Americana (Terminal Metropolitano)", motorista:{ nome:"Ricardo", idade:41, sexo:"Masculino" } },
    { numero: "653", nome: "Sta Bárbara d'Oeste (Jardim Europa) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Mariana", idade:29, sexo:"Feminino" } },
    { numero: "654", nome: "Sta Bárbara d'Oeste (Vila Rica) / Americana (Terminal Metropolitano)", motorista:{ nome:"Bruno", idade:38, sexo:"Masculino" } },
    { numero: "655", nome: "Sta Bárbara d'Oeste (São Joaquim) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Carla", idade:33, sexo:"Feminino" } },
    { numero: "656", nome: "Sta Bárbara d'Oeste (Jardim Mollon) / Americana (Terminal Metropolitano)", motorista:{ nome:"Diego", idade:45, sexo:"Masculino" } },
    { numero: "657", nome: "Sta Bárbara d'Oeste (Conj. Hab. Roberto Romano) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Luciana", idade:31, sexo:"Feminino" } },
    { numero: "658", nome: "Sta Bárbara d'Oeste (Parque Planalto) / Americana (Terminal Metropolitano)", motorista:{ nome:"Rodrigo", idade:42, sexo:"Masculino" } },
    { numero: "659", nome: "Sta Bárbara d'Oeste (Jardim Santa Maria) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Tatiane", idade:28, sexo:"Feminino" } },
    { numero: "660", nome: "Sta Bárbara d'Oeste (Nova Conquista) / Americana (Terminal Metropolitano)", motorista:{ nome:"Gustavo", idade:39, sexo:"Masculino" } },
    { numero: "661", nome: "Sta Bárbara d'Oeste (Jardim Esplanada) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Fernanda", idade:34, sexo:"Feminino" } },
    { numero: "662", nome: "Sta Bárbara d'Oeste (Parque da Matriz) / Americana (Terminal Metropolitano)", motorista:{ nome:"Alexandre", idade:47, sexo:"Masculino" } },
    { numero: "663", nome: "Sta Bárbara d'Oeste (Jardim São Fernando) / Americana (Rodoviário Francisco Luiz Bendilatti)", motorista:{ nome:"Isabela", idade:30, sexo:"Feminino" } },
  ];

  // Combinar todos os arrays de linhas
  const todasAsLinhas = [...linhasOnibusAmericana, ...linhasOnibusSBO];

  const filtrarLinhas = () => {
    if (!origem || !destino) {
      setLinhasFiltradas([]);
      return;
    }

    // Mapear os valores dos selects para os termos exatos usados nos nomes das linhas
    const termos = {
      'americana': 'Americana',
      'sta bárbara': "Sta Bárbara d'Oeste"
    };

    const termoOrigem = termos[origem];
    const termoDestino = termos[destino];

    const linhasFiltradas = todasAsLinhas.filter(linha => {
      const nome = linha.nome;
      
      // Verificar a ordem correta: origem deve vir antes de destino no nome
      const indexOrigem = nome.indexOf(termoOrigem);
      const indexDestino = nome.indexOf(termoDestino);
      
      // A origem deve aparecer antes do destino na string
      return indexOrigem !== -1 && indexDestino !== -1 && indexOrigem < indexDestino;
    });

    setLinhasFiltradas(linhasFiltradas);
  };

  const toggleInfoMotorista = (numeroLinha) => {
    if (linhaSelecionada === numeroLinha) {
      setLinhaSelecionada(null);
    } else {
      setLinhaSelecionada(numeroLinha);
    }
  };

  // Função para formatar o nome da cidade para exibição
  const formatarNomeCidade = (cidade) => {
    if (cidade === 'americana') return 'Americana';
    if (cidade === 'sta bárbara') return "Santa Bárbara d'Oeste";
    return cidade;
  };

  return (
    <>
      <TerceiroCabecalho />
      <div style={{ paddingTop: '80px', paddingBottom: '40px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 20px' }}>
          
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
              Linhas <span style={{ color: '#2563eb'}}>EMTU</span> - Intermunicipais
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Empresa Metropolitana de Transportes Urbanos - Conexão entre municípios
            </p>
            
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Origem
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                >
                  <option value="">Selecione a origem</option>
                  <option value="americana">Americana</option>
                  <option value="sta bárbara">Santa Bárbara d'Oeste</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Destino
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                >
                  <option value="">Selecione o destino</option>
                  <option value="americana">Americana</option>
                  <option value="sta bárbara">Santa Bárbara d'Oeste</option>
                </select>
              </div>
              
              <button
                onClick={filtrarLinhas}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  height: 'fit-content'
                }}
                disabled={!origem || !destino}
              >
                Buscar Linhas
              </button>
            </div>
          </header>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                {origem && destino ? `Linhas de ${formatarNomeCidade(origem)} para ${formatarNomeCidade(destino)}` : 'Selecione origem e destino'}
              </h3>
              <span style={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.875rem',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: '500'
              }}>
                {linhasFiltradas.length} linhas
              </span>
            </div>
            
            {linhasFiltradas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '8px' }}>
                  {origem && destino ? 'Somente Intermunicipais.' : 'Selecione origem e destino para buscar linhas'}
                </p>
                <p style={{ color: '#d1d5db' }}></p>
              </div>
            ) : (
              <div>
                {linhasFiltradas.map((linha, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '16px',
                      border: '1px solid ',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f9ff';
                      e.currentTarget.style.borderColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                    onClick={() => toggleInfoMotorista(linha.numero)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                          backgroundColor: '#2563eb',
                          color: 'white',
                          fontWeight: 'bold',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}>
                          {linha.numero}
                        </span>
                        <div>
                          <p style={{ fontWeight: '500', color: '#1f2937', margin: '0' }}>
                            {linha.nome}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                            EMTU • Intermunicipal
                          </p>
                        </div>
                      </div>
                      <svg 
                        style={{
                          height: '20px',
                          width: '20px',
                          color: '#6b7280',
                          transform: linhaSelecionada === linha.numero ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {linhaSelecionada === linha.numero && (
                      <div style={{ 
                        marginTop: '16px', 
                        padding: '16px', 
                        backgroundColor: '#f0f9ff', 
                        borderRadius: '8px',
                        border: '1px solid #bfdbfe'
                      }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>Motorista</h5>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Nome:</strong> {linha.motorista.nome}
                        </p>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Idade:</strong> {linha.motorista.idade} anos
                        </p>
                        <p style={{ margin: '4px 0', color: '#374151' }}>
                          <strong>Sexo:</strong> {linha.motorista.sexo}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações adicionais */}
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#2563eb', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Horários EMTU</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Funcionamento das 5h às 23h, com intervalos de 20-40 minutos conforme a linha.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#16a34a', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Tarifas EMTU</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>R$ 5,50 tarifa comum. Meia-tarifa para estudantes, idosos e PCDs.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#7c3aed', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Acessibilidade</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Ônibus adaptados com elevadores e espaços para cadeirantes em todas as linhas.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinhaEMTU;