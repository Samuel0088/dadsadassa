import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo_branca from "../assets/Imagens/Logo_branca.png";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  // Verificar se já está logado
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    try {
      // Buscar usuários existentes do localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Verificar se email já existe
      if (existingUsers.some(user => user.email === email)) {
        setError("Este email já está cadastrado");
        setLoading(false);
        return;
      }
      
 
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      

      setError("Conta criada com sucesso! Redirecionando para login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-900 via-neutral-900 to-teal-900 rounded-full flex items-center justify-center shadow-lg">
              <img src={Logo_branca} alt="Logo Mobiliza Vida" className="w-32 h-32" />
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-800">
              Criar Conta
            </h1>
            
            {error && (
              <div className={`w-full max-w-xs mt-4 ${
                error.includes("sucesso") 
                  ? "bg-green-100 border-green-400 text-green-700" 
                  : "bg-red-100 border-red-400 text-red-700"
              } border px-4 py-3 rounded`}>
                {error}
              </div>
            )}

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs space-y-4">
                <input
                  className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                
                <input
                  className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <input
                  className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                  type="password"
                  placeholder="Senha (mínimo 6 caracteres)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                
                <input
                  className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                  type="password"
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600">
                  Já tem conta?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline border-b border-blue-500 border-dotted">
                    Entre aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-gradient-to-r from-gray-900 via-neutral-900 to-teal-900 text-center hidden lg:flex rounded-r-lg">
          <div className="m-12 xl:m-16 w-full flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Mobiliza <span className="text-teal-300">Vida</span></h2>
              <p className="text-xl opacity-90">Conectando pessoas, movendo cidades</p>
              <div className="mt-8 opacity-80">
                <p className="text-sm">Sistema de transporte inteligente</p>
                <p className="text-sm">Rotas urbanas e metropolitanas</p>
                <p className="text-sm">Tecnologia e mobilidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}