// src/components/MapView.tsx
import React, { useEffect } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { WMSTileLayer } from "react-leaflet/WMSTileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Aoi } from "../types/aoi";

interface MapViewProps {
  aois: Aoi[];
  selectedAoi: Aoi | null;
  onSelectAoi: (id: string | null) => void;
  onMapClick: (lat: number, lng: number) => void;
  isWmsVisible: boolean;
}

const DEFAULT_CENTER: LatLngExpression = [51.5, 7.5]; // roughly NRW
const DEFAULT_ZOOM = 8;

const SelectedAoiFocus: React.FC<{ aoi: Aoi | null }> = ({ aoi }) => {
  const map = useMap();

  useEffect(() => {
    if (!aoi) return;
    const [lat, lng] = aoi.geometry.coordinates[0];
    map.flyTo([lat, lng], 15, { duration: 0.6 });
  }, [aoi, map]);

  return null;
};

const ClickHandler: React.FC<{
  onClick: (lat: number, lng: number) => void;
}> = ({ onClick }) => {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const MapView: React.FC<MapViewProps> = ({
  aois,
  selectedAoi,
  onSelectAoi,
  onMapClick,
  isWmsVisible,
}) => {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        {/* Base OSM layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* WMS orthophoto layer */}
        {isWmsVisible && (
          <WMSTileLayer
            url="https://www.wms.nrw.de/geobasis/wms_nw_dop?"
            params={{
              // TODO: replace with the actual layer name from GetCapabilities
              layers: "nw_dop_rgb",
              format: "image/png",
              transparent: true,
            }}
            opacity={0.8}
          />
        )}

        {/* AOI markers */}
        {aois.map((aoi) => {
          const [lat, lng] = aoi.geometry.coordinates[0];
          return (
            <Marker
              key={aoi.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => onSelectAoi(aoi.id),
              }}
            >
              <Popup>
                <div className="text-xs">
                  <div className="font-semibold">{aoi.name}</div>
                  {aoi.description && (
                    <div className="mt-1 text-slate-600">{aoi.description}</div>
                  )}
                  <div className="mt-1 text-[10px] text-slate-500">
                    {lat.toFixed(4)}, {lng.toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <SelectedAoiFocus aoi={selectedAoi} />
        <ClickHandler onClick={onMapClick} />
      </MapContainer>
    </div>
  );
};

export default MapView;
