import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo_branca from "../assets/Imagens/Logo_branca.png";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user, login, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const testUserExists = users.some(u => u.email === "teste@email.com");
    if (!testUserExists) {
      users.push({
        id: 1,
        name: "Usuário Teste",
        email: "teste@email.com",
        password: "123456",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/home");
      } else {
        setError(result.error || "Erro ao fazer login");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setError("");
      const token = credentialResponse.credential;
      
      if (!token) {
        setError("Token não recebido do Google");
        return;
      }

      // Decodifica o token JWT
      const userInfo = jwtDecode(token);
      console.log("Dados do Google:", userInfo);

      // Chama a função de login do Google (do seu contexto)
      const result = await loginWithGoogle(userInfo);
      
      if (result && result.success) {
        navigate("/home");
      } else {
        setError(result?.error || "Erro ao fazer login com Google");
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      setError("Erro ao processar login do Google");
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
              Entrar no Mobiliza Vida
            </h1>

            {error && (
              <div className="w-full max-w-xs mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* LOGIN COM GOOGLE */}
            <div className="w-full flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Erro no login do Google");
                  setError("Não foi possível fazer login com o Google");
                }}
              />
            </div>

            <div className="my-8 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Ou entre com seu email
              </div>
            </div>

            {/* LOGIN TRADICIONAL */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-xs space-y-4">
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
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    Entrando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                    </svg>
                    <span className="ml-3">Entrar</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                Não tem conta?{" "}
                <Link to="/cadastro" className="text-blue-500 hover:underline border-blue-500 border-dotted mt-1">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* LADO DIREITO */}
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
