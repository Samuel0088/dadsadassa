import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Fix para ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de todos os locais (igual ao seu)
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
  MORADA_SOL: [-22.7400, -47.3600],
  JARDIM_BRASILIA: [-22.7550, -47.3350],
  WERNER_PLASS: [-22.7450, -47.3250],
  JARDIM_BALSA: [-22.7050, -47.3800],
  HOSPITAL_MUNICIPAL: [-22.7420, -47.3090],
  JARDIM_BOER: [-22.7350, -47.3550],
  PRAIA_AZUL: [-22.7680, -47.3180],
};

// Linhas de ônibus (igual ao seu)
const busLines = {
  "102": { name: "Jardim Brasil ↔ Novo Mundo", origin: "Jardim Brasil", destination: "Novo Mundo", color: "#1e5799", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.NOVO_MUNDO] },
  "103": { name: "Jardim Brasil ↔ Antônio Zanaga / Alabama", origin: "Jardim Brasil", destination: "Antônio Zanaga", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.ALABAMA, LOCATIONS.ANTONIO_ZANAGA] },
  "104": { name: "Bertini / Alabama / Mathiensen", origin: "Bertini", destination: "Mathiensen", color: "#41b6e6", coordinates: [LOCATIONS.BERTINI, LOCATIONS.ALABAMA, LOCATIONS.MATHIENSEN] },
  "105": { name: "Bertini / Jardim Alvorada", origin: "Bertini", destination: "Jardim Alvorada", color: "#7fcdbb", coordinates: [LOCATIONS.BERTINI, LOCATIONS.JARDIM_ALVORADA] },
  "106": { name: "Jardim Bertoni / Terminal", origin: "Jardim Bertoni", destination: "Terminal Central", color: "#edf8b1", coordinates: [LOCATIONS.JARDIM_BERTONI, LOCATIONS.TERMINAL_CENTRAL] },
  "107": { name: "São Roque / Parque das Nações / Bertoni", origin: "São Roque", destination: "Jardim Bertoni", color: "#ff7f00", coordinates: [LOCATIONS.SAO_ROQUE, LOCATIONS.PARQUE_NACOES, LOCATIONS.JARDIM_BERTONI] },
  "108": { name: "Bertini / Cariobinha / Terminal", origin: "Bertini", destination: "Terminal Central", color: "#41b6e6", coordinates: [LOCATIONS.BERTINI, LOCATIONS.CARIOBINHA, LOCATIONS.TERMINAL_CENTRAL] },
  "111": { name: "Sobrado Velho / Terminal via Cadeião", origin: "Sobrado Velho", destination: "Terminal Central", color: "#1e5799", coordinates: [LOCATIONS.SOBRADO_VELHO, LOCATIONS.TERMINAL_CENTRAL] },
  "112": { name: "Portal dos Nobres / Iate / Terminal", origin: "Portal dos Nobres", destination: "Terminal Central", color: "#2c7fb8", coordinates: [LOCATIONS.PORTAL_NOBRES, LOCATIONS.IATE, LOCATIONS.TERMINAL_CENTRAL] },
  "114": { name: "Mathiesen / Antônio Zanaga", origin: "Mathiesen", destination: "Antônio Zanaga", color: "#41b6e6", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.ANTONIO_ZANAGA] },
  "116": { name: "Morada do Sol / Terminal", origin: "Morada do Sol", destination: "Terminal Central", color: "#7fcdbb", coordinates: [LOCATIONS.MORADA_SOL, LOCATIONS.TERMINAL_CENTRAL] },
  "117": { name: "Mathiesen / Novo Mundo / Jardim Alvorada", origin: "Mathiesen", destination: "Jardim Alvorada", color: "#edf8b1", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.NOVO_MUNDO, LOCATIONS.JARDIM_ALVORADA] },
  "118": { name: "Antônio Zanaga / Novo Mundo", origin: "Antônio Zanaga", destination: "Novo Mundo", color: "#ff7f00", coordinates: [LOCATIONS.ANTONIO_ZANAGA, LOCATIONS.NOVO_MUNDO] },
  "119": { name: "Parque Liberdade / Praia dos Namorados / Jardim Asta", origin: "Parque Liberdade", destination: "Jardim Asta", color: "#1e5799", coordinates: [LOCATIONS.PARQUE_LIBERDADE, LOCATIONS.PRAIA_NAMORADOS, LOCATIONS.JARDIM_ASTA] },
  "200": { name: "Jardim Brasília / Praia Recanto via Av. Brasil", origin: "Jardim Brasília", destination: "Praia Recanto", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_RECANTO] },
  "201": { name: "Jardim Brasília / Praia Azul via Av. Campos Sales", origin: "Jardim Brasília", destination: "Praia Azul", color: "#41b6e6", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_AZUL] },
  "205": { name: "Jardim Brasília / Antônio Zanaga via Av. Brasil", origin: "Jardim Brasília", destination: "Antônio Zanaga", color: "#7fcdbb", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.ANTONIO_ZANAGA] },
  "206": { name: "Jardim da Paz / Terminal", origin: "Jardim da Paz", destination: "Terminal Central", color: "#edf8b1", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "207": { name: "Jardim da Paz / Terminal", origin: "Jardim da Paz", destination: "Terminal Central", color: "#ff7f00", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "208": { name: "Jardim da Paz / Antônio Zanaga", origin: "Jardim da Paz", destination: "Antônio Zanaga", color: "#1e5799", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.ANTONIO_ZANAGA] },
  "211": { name: "Jardim da Paz / Werner Plass via Av. Campos Sales", origin: "Jardim da Paz", destination: "Werner Plass", color: "#2c7fb8", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.WERNER_PLASS] },
  "212": { name: "Jardim da Paz / Praia Azul via Rio Branco", origin: "Jardim da Paz", destination: "Praia Azul", color: "#41b6e6", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.PRAIA_AZUL] },
  "213": { name: "Jardim da Balsa / Hospital Municipal", origin: "Jardim da Balsa", destination: "Hospital Municipal", color: "#7fcdbb", coordinates: [LOCATIONS.JARDIM_BALSA, LOCATIONS.HOSPITAL_MUNICIPAL] },
  "220": { name: "Mário Covas / Praia Recanto via Av. Campos Sales", origin: "Mário Covas", destination: "Praia Recanto", color: "#edf8b1", coordinates: [LOCATIONS.MARIO_COVAS, LOCATIONS.PRAIA_RECANTO] },
  "224": { name: "Jardim Bôer / Terminal", origin: "Jardim Bôer", destination: "Terminal Central", color: "#ff7f00", coordinates: [LOCATIONS.JARDIM_BOER, LOCATIONS.TERMINAL_CENTRAL] },
  "225": { name: "Mathiesen / Praia Recanto", origin: "Mathiesen", destination: "Praia Recanto", color: "#1e5799", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.PRAIA_RECANTO] }
};

// Componente Routing para substituir Polyline
function Routing({ waypoints, color }) {
  const map = useMap();

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    const control = L.Routing.control({
      waypoints: waypoints.map((coord) => L.latLng(coord[0], coord[1])),
      lineOptions: { styles: [{ color: color || '#1e5799', weight: 6, opacity: 0.8 }] },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false
    }).addTo(map);

    return () => map.removeControl(control);
  }, [map, waypoints, color]);

  return null;
}

// Componente principal
function BusMap() {
  const [selectedLine, setSelectedLine] = useState('');
  const [routeInfo, setRouteInfo] = useState(null);

  // Calcular distância entre duas coordenadas (igual ao seu)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const handleLineChange = (e) => {
    const lineNumber = e.target.value;
    setSelectedLine(lineNumber);
    
    if (!lineNumber) {
      setRouteInfo(null);
      return;
    }

    const line = busLines[lineNumber];
    if (!line) return;

    let totalDistance = 0;
    for (let i = 0; i < line.coordinates.length - 1; i++) {
      const [lat1, lon1] = line.coordinates[i];
      const [lat2, lon2] = line.coordinates[i+1];
      totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
    }

    const estimatedTime = (totalDistance / 20) * 60;

    setRouteInfo({
      number: lineNumber,
      name: line.name,
      origin: line.origin,
      destination: line.destination,
      distance: totalDistance.toFixed(1),
      time: Math.round(estimatedTime)
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Linhas de Ônibus - Americana/SP</h1>
        <p className="subtitle">Sistema SOU • Urbano</p>
      </header>

      <div className="card">
        <label htmlFor="line-select">Selecione uma linha:</label>
        <select id="line-select" value={selectedLine} onChange={handleLineChange}>
          <option value="">-- Selecione a Linha --</option>
          {Object.entries(busLines).map(([num, line]) => (
            <option key={num} value={num}>{num} - {line.name}</option>
          ))}
        </select>
      </div>

      <div className="card">
        <MapContainer center={LOCATIONS.TERMINAL_CENTRAL} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={LOCATIONS.TERMINAL_CENTRAL}>
            <Popup><b>Terminal Central</b></Popup>
          </Marker>

          {selectedLine && busLines[selectedLine] && (
            <>
              <Routing waypoints={busLines[selectedLine].coordinates} color={busLines[selectedLine].color} />

              <Marker position={busLines[selectedLine].coordinates[0]}>
                <Popup><b>Origem:</b> {busLines[selectedLine].origin}</Popup>
              </Marker>

              <Marker position={busLines[selectedLine].coordinates[busLines[selectedLine].coordinates.length - 1]}>
                <Popup><b>Destino:</b> {busLines[selectedLine].destination}</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      {routeInfo && (
        <div className="card">
          <h2>{routeInfo.number} - {routeInfo.name}</h2>
          <p><b>Origem:</b> {routeInfo.origin}</p>
          <p><b>Destino:</b> {routeInfo.destination}</p>
          <p><b>Distância:</b> {routeInfo.distance} km</p>
          <p><b>Tempo estimado:</b> {routeInfo.time} minutos</p>
        </div>
      )}
    </div>
  );
}

export default BusMap;
