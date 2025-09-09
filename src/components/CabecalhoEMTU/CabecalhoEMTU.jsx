import React, { useState } from 'react';    
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importação necessária
import Logo_branca from '../../assets/Imagens/Logo_branca.png';

const CabecalhoEMTU = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Obtendo informações do usuário

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <div className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold">
                            <img 
                                style={{ width: '100px', height: 'auto' }} 
                                src={Logo_branca} 
                                alt="Logo" 
                            />
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-10 text-lg">
                        <Link to="/Home" className="hover:text-gray-300 transition-all">Home</Link>
                        <Link to="/LinhaSou" className="hover:text-gray-300 transition-all">SOU</Link>
                       <Link to="/bilheteria" className="hover:text-gray-300 transition-all">Bilheteria</Link>
                        <Link to="/Acessibilidade" className="hover:text-gray-300 transition-all">Acessibilidade</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-white bg-blue-800 py-2 px-4 rounded-full text-sm">
                                    {user.name}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded-full text-sm transition-all"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <Link to="/Contato" className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all">
                                Get in Touch
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button 
                            id="menu-button" 
                            className="text-white focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            
                {/* Menu mobile controlado por estado */}
                <div id="mobile-menu" className={`md:hidden mt-5 ${mobileMenuOpen ? 'block' : 'hidden'} space-y-4`}>
                    <ul className="flex flex-col mt-4 font-medium space-y-4">
                        <li>
                            <Link 
                                to="/Home" 
                                className="block text-lg hover:text-gray-300 transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/LinhaSou" 
                                className="block text-lg hover:text-gray-300 transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                SOU
                            </Link>
                        </li>
                       <Link 
                            to="/bilheteria" 
                            className="block text-lg hover:text-gray-300 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Bilheteria
                        </Link>
                        <li>
                            <Link 
                                to="/Acessibilidade" 
                                className="block text-lg hover:text-gray-300 transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Acessibilidade
                            </Link>
                        </li>
                        {user ? (
                            <li className="pt-4 border-t border-gray-700">
                                <div className="flex flex-col space-y-3">
                                    <span className="text-white text-sm text-center">{user.name}</span>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded-full text-sm transition-all w-full"
                                    >
                                        Sair
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link  
                                    to="/Contato" 
                                    className="block bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all mt-4 text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get in Touch
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CabecalhoEMTU;