import React, { useState, useEffect, useRef } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'; 
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';

// Fix para ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ 
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de todos os locais (mantenha as existentes)
const LOCATIONS = {
  TERMINAL_CENTRAL: [-22.7392, -47.3315],
  TERMINAL_NORTE: [-22.7100, -47.3250], 
  TERMINAL_SUL: [-22.7650, -47.3450], 
  JARDIM_BRASIL: [-22.7150, -47.3500],
  NOVO_MUNDO: [-22.7450, -47.3200], 
  ANTONIO_ZANAGA: [-22.7300, -47.3400], 
  ALABAMA: [-22.7250, -47.3450],
  BERTINI: [-22.7200, -47.2950],
  CARIOBINHA: [-22.7350, -47.3100], 
  PARQUE_LIBERDADE: [-22.7100, -47.3550],
  PRAIA_NAMORADOS: [-22.7050, -47.2800], 
  JARDIM_ASTA: [-22.7000, -47.2750], 
  JARDIM_PAZ: [-22.7500, -47.3300], 
  MARIO_COVAS: [-22.7600, -47.3700],
  PRAIA_RECANTO: [-22.7650, -47.3200],
  MATHIENSEN: [-22.7280, -47.3480],
  JARDIM_ALVORADA: [-22.7550, -47.3050],
  JARDIM_BERTONI: [-22.7250, -47.3150], 
  SAO_ROQUE: [-22.7100, -47.2900], 
  PARQUE_NACOES: [-22.7150, -47.3000], 
  SOBRADO_VELHO: [-22.7500, -47.3500], 
  PORTAL_NOBRES: [-22.7650, -47.3400],
  IATE: [-22.7700, -47.3450], 
  MATHIESEN: [-22.7320, -47.3420], 
  MORADA_SOL: [-22.7400, -47.3600], 
  JARDIM_BRASILIA: [-22.7550, -47.3350],
  WERNER_PLASS: [-22.7450, -47.3250], 
  JARDIM_BALSA: [-22.7050, -47.3800],
  HOSPITAL_MUNICIPAL: [-22.7420, -47.3090], 
  JARDIM_BOER: [-22.7350, -47.3550], 
  PRAIA_AZUL: [-22.7680, -47.3180],
};

// Dados das linhas de ônibus (mantenha os existentes)
const busLines = {
  "102": { name: "Jardim Brasil ↔ Novo Mundo", origin: "Jardim Brasil", destination: "Novo Mundo", color: "#1e5799", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.NOVO_MUNDO] },
  "103": { name: "Jardim Brasil ↔ Antônio Zanaga / Alabama", origin: "Jardim Brasil", destination: "Antônio Zanaga", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.ALABAMA, LOCATIONS.ANTONIO_ZANAGA] },
  "104": { name: "Bertini / Alabama / Mathiensen", origin: "BERTINI", destination: "MATHIENSEN", color: "#41b6e6", coordinates: [LOCATIONS.BERTINI, LOCATIONS.ALABAMA, LOCATIONS.MATHIENSEN] },
  "105": { name: "Bertini / Jardim Alvorada", origin: "BERTINI", destination: "JARDIM_ALVORADA", color: "#7fcdbb", coordinates: [LOCATIONS.BERTINI, LOCATIONS.JARDIM_ALVORADA] },
  "106": { name: "Jardim Bertoni / Terminal", origin: "JARDIM_BERTONI", destination: "TERMINAL_CENTRAL", color: "#edf8b1", coordinates: [LOCATIONS.JARDIM_BERTONI, LOCATIONS.TERMINAL_CENTRAL] },
  "107": { name: "São Roque / Parque das Nações / Bertoni", origin: "SAO_ROQUE", destination: "JARDIM_BERTONI", color: "#ff7f00", coordinates: [LOCATIONS.SAO_ROQUE, LOCATIONS.PARQUE_NACOES, LOCATIONS.JARDIM_BERTONI] },
  "108": { name: "Bertini / Cariobinha / Terminal", origin: "BERTINI", destination: "TERMINAL_CENTRAL", color: "#41b6e6", coordinates: [LOCATIONS.BERTINI, LOCATIONS.CARIOBINHA, LOCATIONS.TERMINAL_CENTRAL] },
  "111": { name: "Sobrado Velho / Terminal via Cadeião", origin: "SOBRADO_VELHO", destination: "TERMINAL_CENTRAL", color: "#1e5799", coordinates: [LOCATIONS.SOBRADO_VELHO, LOCATIONS.TERMINAL_CENTRAL] },
  "112": { name: "Portal dos Nobres / Iate / Terminal", origin: "PORTAL_NOBRES", destination: "TERMINAL_CENTRAL", color: "#2c7fb8", coordinates: [LOCATIONS.PORTAL_NOBRES, LOCATIONS.IATE, LOCATIONS.TERMINAL_CENTRAL] },
  "114": { name: "Mathiesen / Antônio Zanaga", origin: "MATHIENSEN", destination: "ANTONIO_ZANAGA", color: "#41b6e6", coordinates: [LOCATIONS.MATHIESEN, LOCATIONS.ANTONIO_ZANAGA] },
  "116": { name: "Morada do Sol / Terminal", origin: "MORADA_SOL", destination: "TERMINAL_CENTRAL", color: "#7fcdbb", coordinates: [LOCATIONS.MORADA_SOL, LOCATIONS.TERMINAL_CENTRAL] },
  "117": { name: "Mathiesen / Novo Mundo / Jardim Alvorada", origin: "MATHIESEN", destination: "JARDIM_ALVORADA", color: "#edf8b1", coordinates: [LOCATIONS.MATHIESEN, LOCATIONS.NOVO_MUNDO, LOCATIONS.JARDIM_ALVORADA] },
  "118": { name: "Antônio Zanaga / Novo Mundo", origin: "ANTONIO_ZANAGA", destination: "NOVO_MUNDO", color: "#ff7f00", coordinates: [LOCATIONS.ANTONIO_ZANAGA, LOCATIONS.NOVO_MUNDO] },
  "119": { name: "Parque Liberdade / Praia dos Namorados / Jardim Asta", origin: "PARQUE_LIBERDADE", destination: "JARDIM_ASTA", color: "#1e5799", coordinates: [LOCATIONS.PARQUE_LIBERDADE, LOCATIONS.PRAIA_NAMORADOS, LOCATIONS.JARDIM_ASTA] },
  "200": { name: "Jardim Brasília / Praia Recanto via Av. Brasil", origin: "JARDIM_BRASILIA", destination: "PRAIA_RECANTO", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_RECANTO] },
  "201": { name: "Jardim Brasília / Praia Azul via Av. Campos Sales", origin: "JARDIM_BRASILIA", destination: "PRAIA_AZUL", color: "#41b6e6", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_AZUL] },
  "205": { name: "Jardim Brasília / Antônio Zanaga via Av. Brasil", origin: "JARDIM_BRASILIA", destination: "ANTONIO_ZANAGA", color: "#7fcdbb", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.ANTONIO_ZANAGA] },
  "206": { name: "Jardim da Paz / Terminal", origin: "JARDIM_PAZ", destination: "TERMINAL_CENTRAL", color: "#edf8b1", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "207": { name: "Jardim da Paz / Terminal", origin: "JARDIM_PAZ", destination: "TERMINAL_CENTRAL", color: "#ff7f00", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "208": { name: "Jardim da Paz / Antônio Zanaga", origin: "JARDIM_PAZ", destination: "ANTONIO_ZANAGA", color: "#1e5799", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.ANTONIO_ZANAGA] },
  "211": { name: "Jardim da Paz / Werner Plass via Av. Campos Sales", origin: "JARDIM_PAZ", destination: "WERNER_PLASS", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.WERNER_PLASS] },
  "212": { name: "Jardim da Paz / Praia Azul via Rio Branco", origin: "JARDIM_PAZ", destination: "PRAIA_AZUL", color: "#41b6e6", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.PRAIA_AZUL] },
  "213": { name: "Jardim da Balsa / Hospital Municipal", origin: "JARDIM_BALSA", destination: "HOSPITAL_MUNICIPAL", color: "#7fcdbb", coordinates: [LOCATIONS.JARDIM_BALSA, LOCATIONS.HOSPITAL_MUNICIPAL] },
  "220": { name: "Mário Covas / Praia Recanto via Av. Campos Sales", origin: "MARIO_COVAS", destination: "PRAIA_RECANTO", color: "#edf8b1", coordinates: [LOCATIONS.MARIO_COVAS, LOCATIONS.PRAIA_RECANTO] },
  "224": { name: "Jardim Bôer / Terminal", origin: "JARDIM_BOER", destination: "TERMINAL_CENTRAL", color: "#ff7f00", coordinates: [LOCATIONS.JARDIM_BOER, LOCATIONS.TERMINAL_CENTRAL] },
  "225": { name: "Mathiesen / Praia Recanto", origin: "MATHIENSEN", destination: "PRAIA_RECANTO", color: "#1e5799", coordinates: [LOCATIONS.MATHIESEN, LOCATIONS.PRAIA_RECANTO] }
};

// Componente para ajustar a visualização do mapa
function MapViewAdjuster({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

// Componente principal
function BusMap() {
  const [selectedLine, setSelectedLine] = useState('');
  const [routeInfo, setRouteInfo] = useState(null);
  const [bounds, setBounds] = useState(null);

  // Calcular distância entre duas coordenadas
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Manipular mudança de linha selecionada
  const handleLineChange = (e) => {
    const lineNumber = e.target.value;
    setSelectedLine(lineNumber);

    if (!lineNumber) {
      setRouteInfo(null);
      setBounds(null);
      return;
    }

    const line = busLines[lineNumber];
    if (!line) return;

    // Calcular distância total
    let totalDistance = 0;
    for (let i = 0; i < line.coordinates.length - 1; i++) {
      const [lat1, lon1] = line.coordinates[i];
      const [lat2, lon2] = line.coordinates[i + 1];
      totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
    }

    // Calcular tempo estimado (considerando velocidade média de 20 km/h)
    const estimatedTime = (totalDistance / 20) * 60;

    // Atualizar informações da rota
    setRouteInfo({
      number: lineNumber,
      name: line.name,
      origin: line.origin,
      destination: line.destination,
      distance: totalDistance.toFixed(1),
      time: Math.round(estimatedTime),
    });

    // Calcular bounds para ajustar a visualização do mapa
    const coords = line.coordinates;
    if (coords.length > 0) {
      const newBounds = L.latLngBounds(coords);
      setBounds(newBounds);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Linhas de Ônibus - Americana/SP</h1>
        <p className="subtitle">Sistema SOU • Urbano</p>
      </header>

      <div className="card">
        <div className="controls">
          <div className="line-selector">
            <label htmlFor="line-select">Selecione uma linha:</label>
            <select id="line-select" value={selectedLine} onChange={handleLineChange}>
              <option value="">-- Selecione a Linha --</option>
              {Object.entries(busLines).map(([number, line]) => (
                <option key={number} value={number}>
                  {number} - {line.name}
                </option>
              ))}
            </select>
          </div>
          <div className="status">
            {selectedLine 
              ? `Exibindo rota da linha ${selectedLine} - ${busLines[selectedLine]?.name || ''}` 
              : 'Selecione uma linha para visualizar a rota no mapa.'}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="map-container">
          <MapContainer
            center={LOCATIONS.TERMINAL_CENTRAL}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            />
            
            <Marker position={LOCATIONS.TERMINAL_CENTRAL}>
              <Popup>
                <b>Terminal Central</b><br />Principal ponto de integração
              </Popup>
            </Marker>

            {selectedLine && busLines[selectedLine] && (
              <>
                {/* Mostrar a rota como Polyline */}
                <Polyline
                  positions={busLines[selectedLine].coordinates}
                  color={busLines[selectedLine].color}
                  weight={6}
                  opacity={0.8}
                />
                
                <Marker position={busLines[selectedLine].coordinates[0]}>
                  <Popup><b>Origem:</b> {busLines[selectedLine].origin}</Popup>
                </Marker>
                <Marker position={busLines[selectedLine].coordinates[busLines[selectedLine].coordinates.length - 1]}>
                  <Popup><b>Destino:</b> {busLines[selectedLine].destination}</Popup>
                </Marker>
                
                {/* Marcadores intermediários */}
                {busLines[selectedLine].coordinates.slice(1, -1).map((coord, index) => (
                  <Marker key={index} position={coord}>
                    <Popup><b>Ponto Intermediário {index + 1}</b></Popup>
                  </Marker>
                ))}
                
                <MapViewAdjuster bounds={bounds} />
              </>
            )}
          </MapContainer>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#1e5799' }}></div>
            <span>Rota da Linha Selecionada</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#e74c3c' }}></div>
            <span>Pontos de Parada</span>
          </div>
        </div>
      </div>

      {routeInfo && (
        <div className="card route-info">
          <div className="route-title">{routeInfo.number} - {routeInfo.name}</div>
          <div className="route-details">
            <div className="detail-item">
              <span className="detail-label">Origem</span>
              <span className="detail-value">{routeInfo.origin}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Destino</span>
              <span className="detail-value">{routeInfo.destination}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Distância Aproximada</span>
              <span className="detail-value">{routeInfo.distance} km</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tempo Estimado</span>
              <span className="detail-value">{routeInfo.time} minutos</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          font-size: 2.2rem;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        .card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 20px;
        }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .line-selector {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        label {
          font-weight: 600;
          color: #1e5799;
        }
        select {
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          background-color: white;
          transition: border-color 0.3s;
        }
        select:focus {
          border-color: #1e5799;
          outline: none;
        }
        .status {
          padding: 12px;
          background-color: #e9f7fe;
          border-left: 4px solid #1e5799;
          border-radius: 4px;
          font-size: 14px;
        }
        .map-container {
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .color-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }
        .route-info {
          margin-top: 20px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        .route-title {
          font-weight: 600;
          color: #1e5799;
          margin-bottom: 10px;
        }
        .route-details {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        .detail-label {
          font-size: 12px;
          color: #666;
        }
        .detail-value {
          font-weight: 600;
        }
        footer {
          text-align: center;
          margin-top: 30px;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
          h1 {
            font-size: 1.8rem;
          }
          .map-container {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}

export default BusMap;