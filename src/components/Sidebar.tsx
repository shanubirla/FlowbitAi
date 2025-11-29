import React, { useState } from "react";
import type { Aoi } from "../types/aoi";

interface SidebarProps {
  aois: Aoi[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  removeAoi: (id: string) => void;
  draftPoint: { lat: number; lng: number } | null;
  onCreateAoi: (name: string, description?: string) => void;
  isWmsVisible: boolean;
  onToggleWms: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  aois,
  selectedId,
  setSelectedId,
  removeAoi,
  draftPoint,
  onCreateAoi,
  isWmsVisible,
  onToggleWms,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftPoint || !name.trim()) return;
    onCreateAoi(name.trim(), description.trim() || undefined);
    setName("");
    setDescription("");
  };

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur">
      {/* Layer toggles */}
      <div className="border-b border-slate-800 px-4 py-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-200">Layers</span>
          <button
            type="button"
            className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300"
          >
            AOI
          </button>
        </div>
        <label className="mt-3 flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={isWmsVisible}
            onChange={onToggleWms}
            className="h-3 w-3 accent-indigo-500"
          />
          Orthophoto WMS layer
        </label>
      </div>

      {/* AOI creation */}
      <div className="border-b border-slate-800 px-4 py-3 text-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-slate-200">Create AOI</span>
          <span
            className={
              "rounded-full px-2 py-0.5 text-[10px] " +
              (draftPoint
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-slate-800 text-slate-500")
            }
          >
            {draftPoint ? "Point selected on map" : "Click map to pick point"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2 text-xs">
          <div>
            <label
              htmlFor="aoi-name"
              className="mb-1 block text-[11px] text-slate-300"
            >
              Name
            </label>

            <input
              id="aoi-name"
              aria-label="Name"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-100 outline-none focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Field 1 – North"
            />
          </div>
          <div>
            <label
              htmlFor="aoi-description"
              className="mb-1 block text-[11px] text-slate-300"
            >
              Description
            </label>

            <textarea
              id="aoi-description"
              aria-label="Description"
              className="h-16 w-full resize-none rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-100 outline-none focus:border-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes"
            />
          </div>
          <button
            disabled={!draftPoint || !name.trim()}
            className="w-full rounded-md bg-indigo-500 py-1 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            Save AOI
          </button>
        </form>
      </div>

      {/* AOI list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 text-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-slate-200">
            AOIs ({aois.length})
          </span>
        </div>
        <ul className="space-y-2">
          {aois.map((aoi) => (
            <li key={aoi.id}>
              <button
                className={
                  "flex w-full items-start justify-between rounded-md border px-2 py-2 text-left " +
                  (aoi.id === selectedId
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-600")
                }
                onClick={() => setSelectedId(aoi.id)}
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-50">
                    {aoi.name}
                  </p>
                  {aoi.description && (
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {aoi.description}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-slate-500">
                    {aoi.geometry.type.toUpperCase()} ·{" "}
                    {aoi.geometry.coordinates[0][0].toFixed(4)},{" "}
                    {aoi.geometry.coordinates[0][1].toFixed(4)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAoi(aoi.id);
                  }}
                  aria-label="Delete AOI"
                  className="ml-2 text-[10px] text-slate-500 hover:text-red-400"
                >
                  ✕
                </button>
              </button>
            </li>
          ))}
          {aois.length === 0 && (
            <li className="rounded-md border border-dashed border-slate-700 bg-slate-900/40 px-2 py-3 text-[11px] text-slate-400">
              Click on the map to pick a point and create your first AOI.
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
