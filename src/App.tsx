// src/App.tsx
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import { useAoiStore } from "./hooks/useAoiStore";
import type { Aoi } from "./types/aoi";

export type MapClickHandler = (lat: number, lng: number) => void;

function App() {
  const aoiStore = useAoiStore();
  const [draftPoint, setDraftPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isWmsVisible, setIsWmsVisible] = useState(true);

  const handleMapClick: MapClickHandler = (lat, lng) => {
    setDraftPoint({ lat, lng });
  };

  const handleCreateAoi = (name: string, description?: string) => {
    if (!draftPoint) return;
    const geometry: Aoi["geometry"] = {
      type: "point",
      coordinates: [[draftPoint.lat, draftPoint.lng]],
    };
    aoiStore.addAoi({ name, description, geometry });
    setDraftPoint(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          {...aoiStore}
          draftPoint={draftPoint}
          onCreateAoi={handleCreateAoi}
          isWmsVisible={isWmsVisible}
          onToggleWms={() => setIsWmsVisible((v) => !v)}
        />

        <main className="flex-1">
          <MapView
            aois={aoiStore.aois}
            selectedAoi={aoiStore.selectedAoi}
            onSelectAoi={aoiStore.setSelectedId}
            onMapClick={handleMapClick}
            isWmsVisible={isWmsVisible}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
