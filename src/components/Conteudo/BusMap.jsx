import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import styles from "./BusMap.module.css";

// Corrige ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ---------------- LOCALIZAÇÕES (Exemplos) ----------------
const LOCATIONS = {
  JARDIM_BRASIL: [-22.743, -47.333],
  NOVO_MUNDO: [-22.7305, -47.325],
  ALABAMA: [-22.7385, -47.3498],
  ANTONIO_ZANAGA: [-22.722, -47.315],
  BERTINI: [-22.740, -47.33],
  MATHIENSEN: [-22.735, -47.335],
  JARDIM_ALVORADA: [-22.732, -47.34],
  JARDIM_BERTONI: [-22.738, -47.328],
  TERMINAL_CENTRAL: [-22.73, -47.32],
  SAO_ROQUE: [-22.742, -47.322],
  PARQUE_NACOES: [-22.744, -47.326],
  CARIOBINHA: [-22.736, -47.318],
  SOBRADO_VELHO: [-22.72, -47.31],
  PORTAL_NOBRES: [-22.725, -47.312],
  IATE: [-22.726, -47.317],
  MORADA_SOL: [-22.745, -47.333],
  PARQUE_LIBERDADE: [-22.748, -47.338],
  PRAIA_NAMORADOS: [-22.75, -47.34],
  JARDIM_ASTA: [-22.752, -47.342],
  JARDIM_BRASILIA: [-22.755, -47.345],
  PRAIA_RECANTO: [-22.758, -47.347],
  PRAIA_AZUL: [-22.76, -47.35],
  JARDIM_PAZ: [-22.72, -47.305],
  WERNER_PLASS: [-22.722, -47.308],
  JARDIM_BALSA: [-22.762, -47.355],
  HOSPITAL_MUNICIPAL: [-22.764, -47.358],
  MARIO_COVAS: [-22.77, -47.365],
  JARDIM_BOER: [-22.775, -47.37],
  RODOTERMINAL: [-22.73, -47.31],
  CIDADE_NOVA: [-22.74, -47.32],
  JARDIM_MOLLON: [-22.735, -47.33],
  ROBERTO_ROMANO: [-22.738, -47.34],
  JARDIM_EUROPA: [-22.739, -47.335],
  VILA_RICA: [-22.74, -47.33],
  SAO_JOAQUIM: [-22.745, -47.34],
  PARQUE_PLANALTO: [-22.742, -47.332],
  JARDIM_SANTA_MARIA: [-22.743, -47.334],
  NOVA_CONQUISTA: [-22.744, -47.336],
  JARDIM_ESPLANADA: [-22.745, -47.338],
  PARQUE_DA_MATRIZ: [-22.746, -47.339],
  JARDIM_SAO_FERNANDO: [-22.747, -47.34],
  TERMINAL_METROPOLITANO: [-22.732, -47.31],
  RODOVIARIO_FLB: [-22.731, -47.32],
};

// ---------------- LINHAS DE ÔNIBUS ----------------
// SOU
const busLinesSOU = {
  "102": { name: "Jardim Brasil ↔ Novo Mundo", origin: "Jardim Brasil", destination: "Novo Mundo", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.NOVO_MUNDO] },
  "103": { name: "Jardim Brasil ↔ Antônio Zanaga / Alabama", origin: "Jardim Brasil", destination: "Antônio Zanaga", coordinates: [LOCATIONS.JARDIM_BRASIL, LOCATIONS.ALABAMA, LOCATIONS.ANTONIO_ZANAGA] },
  "104": { name: "Bertini / Alabama / Mathiensen", origin: "Bertini", destination: "Mathiensen", coordinates: [LOCATIONS.BERTINI, LOCATIONS.ALABAMA, LOCATIONS.MATHIENSEN] },
  "105": { name: "Bertini / Jardim Alvorada", origin: "Bertini", destination: "Jardim Alvorada", coordinates: [LOCATIONS.BERTINI, LOCATIONS.JARDIM_ALVORADA] },
  "106": { name: "Jardim Bertoni / Terminal", origin: "Jardim Bertoni", destination: "Terminal Central", coordinates: [LOCATIONS.JARDIM_BERTONI, LOCATIONS.TERMINAL_CENTRAL] },
  "107": { name: "São Roque / Parque das Nações / Bertoni", origin: "São Roque", destination: "Jardim Bertoni", coordinates: [LOCATIONS.SAO_ROQUE, LOCATIONS.PARQUE_NACOES, LOCATIONS.JARDIM_BERTONI] },
  "108": { name: "Bertini / Cariobinha / Terminal", origin: "Bertini", destination: "Terminal Central", coordinates: [LOCATIONS.BERTINI, LOCATIONS.CARIOBINHA, LOCATIONS.TERMINAL_CENTRAL] },
  "111": { name: "Sobrado Velho / Terminal via Cadeião", origin: "Sobrado Velho", destination: "Terminal Central", coordinates: [LOCATIONS.SOBRADO_VELHO, LOCATIONS.TERMINAL_CENTRAL] },
  "112": { name: "Portal dos Nobres / Iate / Terminal", origin: "Portal dos Nobres", destination: "Terminal Central", coordinates: [LOCATIONS.PORTAL_NOBRES, LOCATIONS.IATE, LOCATIONS.TERMINAL_CENTRAL] },
  "114": { name: "Mathiesen / Antônio Zanaga", origin: "Mathiensen", destination: "Antônio Zanaga", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.ANTONIO_ZANAGA] },
  "116": { name: "Morada do Sol / Terminal", origin: "Morada Sol", destination: "Terminal Central", coordinates: [LOCATIONS.MORADA_SOL, LOCATIONS.TERMINAL_CENTRAL] },
  "117": { name: "Mathiesen / Novo Mundo / Jardim Alvorada", origin: "Mathiensen", destination: "Jardim Alvorada", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.NOVO_MUNDO, LOCATIONS.JARDIM_ALVORADA] },
  "118": { name: "Antônio Zanaga / Novo Mundo", origin: "Antônio Zanaga", destination: "Novo Mundo", coordinates: [LOCATIONS.ANTONIO_ZANAGA, LOCATIONS.NOVO_MUNDO] },
  "119": { name: "Parque Liberdade / Praia dos Namorados / Jardim Asta", origin: "Parque Liberdade", destination: "Jardim Asta", coordinates: [LOCATIONS.PARQUE_LIBERDADE, LOCATIONS.PRAIA_NAMORADOS, LOCATIONS.JARDIM_ASTA] },
  "200": { name: "Jardim Brasília / Praia Recanto via Av. Brasil", origin: "Jardim Brasília", destination: "Praia Recanto", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_RECANTO] },
  "201": { name: "Jardim Brasília / Praia Azul via Av. Campos Sales", origin: "Jardim Brasília", destination: "Praia Azul", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.PRAIA_AZUL] },
  "205": { name: "Jardim Brasília / Antônio Zanaga via Av. Brasil", origin: "Jardim Brasília", destination: "Antônio Zanaga", coordinates: [LOCATIONS.JARDIM_BRASILIA, LOCATIONS.ANTONIO_ZANAGA] },
  "206": { name: "Jardim da Paz / Terminal", origin: "Jardim da Paz", destination: "Terminal Central", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "207": { name: "Jardim da Paz / Terminal", origin: "Jardim da Paz", destination: "Terminal Central", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.TERMINAL_CENTRAL] },
  "208": { name: "Jardim da Paz / Antônio Zanaga", origin: "Jardim da Paz", destination: "Antônio Zanaga", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.ANTONIO_ZANAGA] },
  "211": { name: "Jardim da Paz / Werner Plass via Av. Campos Sales", origin: "Jardim da Paz", destination: "Werner Plass", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.WERNER_PLASS] },
  "212": { name: "Jardim da Paz / Praia Azul via Rio Branco", origin: "Jardim da Paz", destination: "Praia Azul", coordinates: [LOCATIONS.JARDIM_PAZ, LOCATIONS.PRAIA_AZUL] },
  "213": { name: "Jardim da Balsa / Hospital Municipal", origin: "Jardim da Balsa", destination: "Hospital Municipal", coordinates: [LOCATIONS.JARDIM_BALSA, LOCATIONS.HOSPITAL_MUNICIPAL] },
  "220": { name: "Mário Covas / Praia Recanto via Av. Campos Sales", origin: "Mário Covas", destination: "Praia Recanto", coordinates: [LOCATIONS.MARIO_COVAS, LOCATIONS.PRAIA_RECANTO] },
  "224": { name: "Jardim Bôer / Terminal", origin: "Jardim Bôer", destination: "Terminal Central", coordinates: [LOCATIONS.JARDIM_BOER, LOCATIONS.TERMINAL_CENTRAL] },
  "225": { name: "Mathiesen / Praia Recanto", origin: "Mathiensen", destination: "Praia Recanto", coordinates: [LOCATIONS.MATHIENSEN, LOCATIONS.PRAIA_RECANTO] },
};

// EMTU
const busLinesEMTU = {
  "651": { name: "Sta Bárbara d'Oeste (Rodoterminal) / Americana (Rodoviário FLB)", origin: "Rodoterminal", destination: "Rodoviário FLB", coordinates: [LOCATIONS.RODOTERMINAL, LOCATIONS.RODOVIARIO_FLB] },
  "652": { name: "Sta Bárbara d'Oeste (Cidade Nova) / Americana (Terminal Metropolitano)", origin: "Cidade Nova", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.CIDADE_NOVA, LOCATIONS.TERMINAL_METROPOLITANO] },
  "653": { name: "Sta Bárbara d'Oeste (Jardim Europa) / Americana (Rodoviário FLB)", origin: "Jardim Europa", destination: "Rodoviário FLB", coordinates: [LOCATIONS.JARDIM_EUROPA, LOCATIONS.RODOVIARIO_FLB] },
  "654": { name: "Sta Bárbara d'Oeste (Vila Rica) / Americana (Terminal Metropolitano)", origin: "Vila Rica", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.VILA_RICA, LOCATIONS.TERMINAL_METROPOLITANO] },
  "655": { name: "Sta Bárbara d'Oeste (São Joaquim) / Americana (Rodoviário FLB)", origin: "São Joaquim", destination: "Rodoviário FLB", coordinates: [LOCATIONS.SAO_JOAQUIM, LOCATIONS.RODOVIARIO_FLB] },
  "656": { name: "Sta Bárbara d'Oeste (Jardim Mollon) / Americana (Terminal Metropolitano)", origin: "Jardim Mollon", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.JARDIM_MOLLON, LOCATIONS.TERMINAL_METROPOLITANO] },
  "657": { name: "Sta Bárbara d'Oeste (Roberto Romano) / Americana (Rodoviário FLB)", origin: "Roberto Romano", destination: "Rodoviário FLB", coordinates: [LOCATIONS.ROBERTO_ROMANO, LOCATIONS.RODOVIARIO_FLB] },
  "658": { name: "Sta Bárbara d'Oeste (Parque Planalto) / Americana (Terminal Metropolitano)", origin: "Parque Planalto", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.PARQUE_PLANALTO, LOCATIONS.TERMINAL_METROPOLITANO] },
  "659": { name: "Sta Bárbara d'Oeste (Jardim Santa Maria) / Americana (Rodoviário FLB)", origin: "Jardim Santa Maria", destination: "Rodoviário FLB", coordinates: [LOCATIONS.JARDIM_SANTA_MARIA, LOCATIONS.RODOVIARIO_FLB] },
  "660": { name: "Sta Bárbara d'Oeste (Nova Conquista) / Americana (Terminal Metropolitano)", origin: "Nova Conquista", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.NOVA_CONQUISTA, LOCATIONS.TERMINAL_METROPOLITANO] },
  "661": { name: "Sta Bárbara d'Oeste (Jardim Esplanada) / Americana (Rodoviário FLB)", origin: "Jardim Esplanada", destination: "Rodoviário FLB", coordinates: [LOCATIONS.JARDIM_ESPLANADA, LOCATIONS.RODOVIARIO_FLB] },
  "662": { name: "Sta Bárbara d'Oeste (Parque da Matriz) / Americana (Terminal Metropolitano)", origin: "Parque da Matriz", destination: "Terminal Metropolitano", coordinates: [LOCATIONS.PARQUE_DA_MATRIZ, LOCATIONS.TERMINAL_METROPOLITANO] },
  "663": { name: "Sta Bárbara d'Oeste (Jardim São Fernando) / Americana (Rodoviário FLB)", origin: "Jardim São Fernando", destination: "Rodoviário FLB", coordinates: [LOCATIONS.JARDIM_SAO_FERNANDO, LOCATIONS.RODOVIARIO_FLB] },
};

// Empresas
const BUS_LINES = {
  SOU: busLinesSOU,
  EMTU: busLinesEMTU
};

// ---------------- COMPONENTE DE ROTEAMENTO ----------------
function Routing({ coords, setRouteInfo }) {
  const map = useMap();
  useEffect(() => {
    if (!coords || coords.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: coords.map(c => L.latLng(c[0], c[1])),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      createMarker: () => null
    }).addTo(map);

    routingControl.on("routesfound", e => {
      const route = e.routes[0];
      const summary = route.summary;
      setRouteInfo({
        distance: (summary.totalDistance / 1000).toFixed(2) + " km",
        duration: Math.round(summary.totalTime / 60) + " min",
      });
    });

    return () => map.removeControl(routingControl);
  }, [coords, map, setRouteInfo]);
  return null;
}

// ---------------- DROPDOWN DE LINHAS ----------------
function LineSelect({ busLines, selectedLine, setSelectedLine }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.selector}>
      <label className="block text-sm font-medium text-gray-700 mb-1">Selecione uma linha:</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default"
        >
          <span className="block truncate">{selectedLine ? `${selectedLine} - ${busLines[selectedLine].name}` : "Selecione uma linha"}</span>
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto">
            {Object.keys(busLines).map(line => (
              <div key={line} onClick={() => { setSelectedLine(line); setOpen(false); }}
                   className="cursor-pointer py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white">
              {line} - {busLines[line].name}
            </div>))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- MAPA PRINCIPAL ----------------
export default function BusMap() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [routeInfo, setRouteInfo] = useState(null);

  const filteredLines = selectedCompany ? BUS_LINES[selectedCompany] : {};

  return (
    <div className={styles.container}>
      {/* Select Empresa */}
      <div className={styles.selector}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Selecione a empresa:</label>
        <select
          value={selectedCompany}
          onChange={(e) => { setSelectedCompany(e.target.value); setSelectedLine(""); }}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer"
        >
          <option value="">Selecione a empresa</option>
          <option value="SOU">SOU</option>
          <option value="EMTU">EMTU</option>
        </select>
      </div>

      {/* Select Linha */}
      {selectedCompany && (
        <LineSelect busLines={filteredLines} selectedLine={selectedLine} setSelectedLine={setSelectedLine} />
      )}

      {/* Mapa */}
      <div className={styles.map}>
        <MapContainer center={[-22.73, -47.33]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          {selectedLine && filteredLines[selectedLine].coordinates.map((pos, idx) => (
            <Marker key={idx} position={pos}>
              <Popup>{idx === 0 ? "Origem" : idx === filteredLines[selectedLine].coordinates.length - 1 ? "Destino" : "Parada"}</Popup>
            </Marker>
          ))}
          {selectedLine && <Routing coords={filteredLines[selectedLine].coordinates} setRouteInfo={setRouteInfo} />}
        </MapContainer>
      </div>

      {/* Informações da Linha */}
      {selectedLine && (
        <div className={styles.lineInfoCard}>
          <h3>{selectedLine} - {filteredLines[selectedLine].name}</h3>
          <div><strong>Origem:</strong> {filteredLines[selectedLine].origin}</div>
          <div><strong>Destino:</strong> {filteredLines[selectedLine].destination}</div>
          {routeInfo && <>
            <div><strong>Distância:</strong> {routeInfo.distance}</div>
            <div><strong>Tempo estimado:</strong> {routeInfo.duration}</div>
          </>}
        </div>
      )}
    </div>
  );
}
