import { useState, useEffect } from "react";

export default function CabecalhoPages() {
  const [fontSize, setFontSize] = useState(18);
  const [highContrast, setHighContrast] = useState(false);
  const [assistMessage, setAssistMessage] = useState("");
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    helpType: "Ajuda para embarcar", 
    notes: "" 
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleKey = (ev) => {
      if (ev.key === "F1") {
        ev.preventDefault();
        alert("Dicas: use Tab para navegar, A+ / A- para ajustar texto e o botão Alto Contraste.");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleFont = (mult) => {
    setFontSize((prev) => Math.max(14, Math.min(28, Math.round(prev * mult))));
    setAssistMessage(`Tamanho do texto ajustado.`);
    setTimeout(() => setAssistMessage(""), 3000);
  };

  const handleContrast = () => {
    setHighContrast((prev) => !prev);
    setAssistMessage(`Modo ${!highContrast ? "alto contraste ativado" : "alto contraste desativado"}.`);
    setTimeout(() => setAssistMessage(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssistMessage(`Solicitação enviada. Obrigado, ${formData.name || "Usuário"}. Equipe informada (protótipo).`);
    alert("Solicitação enviada. Equipe informada (protótipo).");
    setFormData({ name: "", phone: "", helpType: "Ajuda para embarcar", notes: "" });
    setShowForm(false);
    setTimeout(() => setAssistMessage(""), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <header>
      <div 
        className={`${highContrast ? "bg-black text-yellow-300" : "bg-sky-700 text-white"} p-4 shadow-md`} 
        role="banner"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="ml-auto flex gap-2 items-center">
            <button
              onClick={() => handleFont(0.9)}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-white text-sky-700 font-semibold"
              aria-label="Diminuir tamanho do texto"
            >
              A-
            </button>
            <button
              onClick={() => handleFont(1.125)}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-white text-sky-700 font-semibold"
              aria-label="Aumentar tamanho do texto"
            >
              A+
            </button>
            <button
              onClick={handleContrast}
              aria-pressed={highContrast}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-white text-sky-700 font-semibold"
            >
              Alto Contraste
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-3 py-2 bg-yellow-400 text-sky-700 font-semibold"
            >
              Solicitar Ajuda
            </button>
          </div>
        </div>
        
        {showForm && (
          <div className="max-w-5xl mx-auto mt-4 p-4 bg-white text-gray-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Solicitar Assistência</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="helpType" className="block text-sm font-medium mb-1">Tipo de Ajuda</label>
                <select
                  id="helpType"
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Ajuda para embarcar">Ajuda para embarcar</option>
                  <option value="Ajuda para desembarcar">Ajuda para desembarcar</option>
                  <option value="Informações sobre acessibilidade">Informações sobre acessibilidade</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium mb-1">Observações</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-700 text-white rounded font-medium"
                >
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        )}
        
        {assistMessage && (
          <div 
            className="max-w-5xl mx-auto mt-4 p-3 bg-yellow-100 text-gray-900 rounded-lg border border-yellow-300"
            role="status"
            aria-live="polite"
          >
            {assistMessage}
          </div>
        )}
      </div>
    </header>
  );
}