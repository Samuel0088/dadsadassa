import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage ao carregar
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao parsear usuário:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Buscar usuários do localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Remover a senha do objeto do usuário antes de salvar
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        return { success: true };
      }
      
      return { success: false, error: "Email ou senha incorretos" };
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, error: "Erro ao fazer login" };
    }
  };

  const loginWithGoogle = (googleData) => {
    try {
      // Cria ou busca usuário baseado nos dados do Google
      const user = {
        id: googleData.sub,
        name: googleData.name,
        email: googleData.email,
        picture: googleData.picture,
        isGoogleUser: true
      };
      
      // Salva no localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login com Google:', error);
      return { success: false, error: 'Erro ao fazer login com Google' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user: currentUser,
    login,
    loginWithGoogle, // ← ADICIONE ESTA LINHA
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 