import React, { useState, useEffect } from 'react';    
import Logo_branca from '../../assets/Imagens/Logo_branca.png';

const SegundoCabecalho = () => {
    useEffect(() => {
        // ✅ CORREÇÃO: Acesse o DOM apenas após o componente ser renderizado
        const menuButton = document.getElementById('menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuButton && mobileMenu) {
            const handleClick = () => {
                mobileMenu.classList.toggle('hidden');
            };

            menuButton.addEventListener('click', handleClick);

            // ✅ Importante: Remover o event listener quando o componente for desmontado
            return () => {
                menuButton.removeEventListener('click', handleClick);
            };
        }
    }, []); // ✅ Array vazio = executa apenas uma vez após a renderização

    return (
        <div className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-2xl font-bold">
                            <img 
                                style={{ width: '100px', height: 'auto' }} 
                                src={Logo_branca} 
                                alt="Logo" 
                            />
                        </a>
                    </div>
                    
                    <nav className="hidden md:flex space-x-10 text-lg">
                        <a href="/Home" className="hover:text-gray-300 transition-all">Home</a>
                        <a href="/LinhaEMTU" className="hover:text-gray-300 transition-all">EMTU</a>
                        <a href="#about" className="hover:text-gray-300 transition-all">Status</a>
                        <a href="#contact" className="hover:text-gray-300 transition-all">Acessibilidade</a>
                    </nav>

                    <div className="hidden md:block">
                        <a href="#contact" className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all">
                            Get in Touch
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button id="menu-button" className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            
                <div id="mobile-menu" className="md:hidden mt-5 hidden space-y-4">
                    <a href="#" className="block text-lg hover:text-gray-300 transition-all">Home</a>
                    <a href="/LinhaEMTU" className="block text-lg hover:text-gray-300 transition-all">EMTU</a>
                    <a href="#about" className="block text-lg hover:text-gray-300 transition-all">Status</a>
                    <a href="#contact" className="block text-lg hover:text-gray-300 transition-all">Acessibilidade</a>
                </div>
            </div>
        </div>
    );
};

export default SegundoCabecalho;