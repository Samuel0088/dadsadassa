import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlanejadorRotas = () => {
  const [origem, setOrigem] = useState('Americana (SP)');
  const [destino, setDestino] = useState("SBO (SP)");

  const trocarOrigemDestino = () => {
    const temp = origem;
    setOrigem(destino);
    setDestino(temp);
  };

  const IconeOrigem = () => (
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-green-500 shadow-lg z-10" 
         style={{boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)'}} />
  );

  const IconeDestino = () => (
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 shadow-lg z-10" 
         style={{boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)'}} />
  );

  const LabelOrigem = () => (
    <div className="absolute -top-2 left-5 bg-white px-2 text-xs font-semibold text-green-500 rounded z-20">
      Origem
    </div>
  );

  const LabelDestino = () => (
    <div className="absolute -top-2 left-5 bg-white px-2 text-xs font-semibold text-red-500 rounded z-20">
      Destino
    </div>
  );

  const LinhaConectora = () => (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 rounded-sm z-0"
         style={{background: 'linear-gradient(to bottom, #22c55e, )'}} />
  );

  return (
    <div className="max-w-2xl mx-auto p-5 font-sans text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-50 relative">
        {/* Badge */}
        <span className="absolute top-5 right-5 bg-blue-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          Novo • Integra SP
        </span>
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
          Planeje sua rota
        </h1>
         
        {/* Inputs de Origem e Destino */}
        <div className="flex flex-col gap-0 mb-8 relative max-w-sm mx-auto">
          {/* Input Origem */}
          <div className="flex items-center p-5 px-6 border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 relative transition-all duration-300 hover:border-blue-800 hover:shadow-lg hover:-translate-y-0.5 rounded-t-2xl rounded-b-sm border-b border-blue-100">
            <IconeOrigem />
            <LabelOrigem />
            <div className="text-base font-medium text-gray-700 pl-8 flex-grow leading-snug">
              {origem}
            </div> 
          </div>
          
          <LinhaConectora />
          
          {/* Botão Trocar */}
          <button 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-gradient-to-br from-blue-800 to-indigo-700 text-white w-9 h-9
                        rounded-full flex justify-center items-center font-bold text-lg z-30 
                        transition-all duration-300 shadow-lg border-3 border-white
                        hover:scale-110 hover:rotate-180 hover:shadow-xl active:scale-95 white-space: nowrap;   
                      "
            onClick={trocarOrigemDestino}
          >
            ⇅
          </button>
            
          {/* Input Destino */}
          <div className="flex items-center p-5 px-6 border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 relative transition-all duration-300 hover:border-blue-800 hover:shadow-lg hover:-translate-y-0.5 rounded-b-2xl rounded-t-sm border-t border-blue-100">
            <IconeDestino />
            <LabelDestino />
            <div className="text-base font-medium text-gray-700 pl-8 flex-grow leading-snug">
              {destino}
            </div>
          </div>
        </div>
        
        {/* Botão Ver Opções */}
        <button 
          className="w-full p-4 px-6 bg-gradient-to-r from-blue-800 to-indigo-700 text-white rounded-xl text-base font-semibold transition-all duration-300 mt-8 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        >
          Ver opções
        </button>
      </div>

      {/* Seção de Opções */}
      
        <div className="border-t border-gray-200 pt-8 mt-8">
          {/* Grid de Opções */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            
            <Link 
              to="/LinhaEMTU" 
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block"
            >
              <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">Linhas EMTU</h3>
              <p className="m-0 text-sm text-gray-600">Intermunicipais e metropolitanas.</p>
            </Link>
            
            <Link 
              to="/Linhasou" 
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block"
            >
              <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">Linhas SOU</h3>
              <p className="m-0 text-sm text-gray-600">Urbanas locais nas cidades.</p>
            </Link>
            
            <Link 
              to="/Bilheteria" 
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block"
            >
              <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">Bilhete & Integração</h3>
              <p className="m-0 text-sm text-gray-600">Cartões, tarifas e descontos.</p>
            </Link>
            
            <Link 
              to="/Acessibilidade" 
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 text-inherit no-underline block"
            >
              <h3 className="m-0 mb-2 text-base font-semibold text-blue-800">Acessibilidade</h3>
              <p className="m-0 text-sm text-gray-600">Rotas acessíveis e maior acessibilidade</p>
            </Link>
          </div>
          
          {/* Sugestões Rápidas */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Sugestões rápidas</h3>
            
            <div className="space-y-2">
              {[
                {numero: '600', rota: 'Americana → Santa Bárbara D\'Oeste', tipo: 'emtu'},
                {numero: '123', rota: 'Terminal Centro → UFSP', tipo: 'sou'},
                {numero: '687', rota: 'Americana → Santa Bárbara D\'Oeste', tipo: 'emtu'},
                {numero: '010', rota: 'Circular Norte', tipo: 'sou'}
              ].map((sugestao, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 px-4 border border-gray-200 rounded-lg bg-gray-50 transition-all duration-300 hover:bg-blue-50 hover:translate-x-1 cursor-pointer"
                >
                  <span className="font-bold mr-4 min-w-[40px] text-blue-800 text-sm">
                    {sugestao.numero}
                  </span>
                  <span className="flex-grow text-sm text-gray-700">
                    {sugestao.rota}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    sugestao.tipo === 'emtu' 
                      ? 'bg-blue-800 text-white' 
                      : 'bg-yellow-400 text-gray-800'
                  }`}>
                    {sugestao.tipo.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default PlanejadorRotas;