import React, { useState } from 'react';
import CabecalhoSou from '../components/CabecalhoSou/CabecalhoSou.jsx';
import { Footer } from '../components/Footer/Footer.jsx';

function LinhaSou() {
  const [searchTerm, setSearchTerm] = useState('');
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);

  const linhasOnibusSOU = [
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
  ];

  // Filtrar linhas baseado no termo de busca
  const linhasFiltradas = linhasOnibusSOU.filter(linha =>
    linha.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    linha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInfoMotorista = (numeroLinha) => {
    if (linhaSelecionada === numeroLinha) {
      setLinhaSelecionada(null);
    } else {
      setLinhaSelecionada(numeroLinha);
    }
  };

  return (
    <>
      <CabecalhoSou />
      <div style={{ paddingTop: '80px', paddingBottom: '40px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 20px' }}>
          
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
              Linhas <span style={{ color: '#ffee03ff'}}>SOU</span> - Americana/SP
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Sistema Operacional Urbano - Transporte público municipal
            </p>
            
            <div style={{ marginTop: '24px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Buscar linha SOU, bairro, destino..."
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '1.125rem',
                  outline: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '20px',
                  height: '24px',
                  width: '24px',
                  color: '#9ca3af'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
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
                Linhas SOU Disponíveis
              </h3>
              <span style={{
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                fontSize: '0.875rem',
                padding: '4px 12px',
                borderRadius: '9999px'
              }}>
                {linhasFiltradas.length} linhas
              </span>
            </div>
            
            {linhasFiltradas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '8px' }}>Nenhuma linha</p>
                <p style={{ color: '#d1d5db' }}>Tente buscar por outro termo</p>
              </div>
            ) : (
              <div>
                {linhasFiltradas.map((linha, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fffef3ff';
                      e.currentTarget.style.borderColor = '#fff200ff';
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
                          backgroundColor: '#FBC02D',
                          color: 'white',
                          fontWeight: 'bold',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          minWidth: '50px',
                          textAlign: 'center'
                        }}>
                          {linha.numero}
                        </span>
                        <div>
                          <p style={{ fontWeight: '500', color: '#1f2937', margin: '0' }}>
                            {linha.nome}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '4px 0 0 0' }}>
                            Sistema SOU • Urbano
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
                        backgroundColor: '#f8fafc', 
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#1f2937' }}>Motorista</h5>
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
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Horários</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Funcionamento das 5h às 23h, com intervalos de 15-30 minutos.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#16a34a', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Tarifas</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>R$ 5,20 tarifa comum. Meia-tarifa para estudantes e idosos.</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#7c3aed', marginBottom: '12px' }}>
                <svg style={{ height: '32px', width: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Acessibilidade</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Ônibus adaptados com elevadores e espaços para cadeirantes.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default  LinhaSou ;