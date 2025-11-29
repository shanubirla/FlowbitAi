import { useEffect, useState } from "react";
import type { Aoi } from "../types/aoi";

const STORAGE_KEY = "aoi-map::aois";

function loadFromStorage(): Aoi[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Aoi[];
  } catch {
    return [];
  }
}

export function useAoiStore() {
  const [aois, setAois] = useState<Aoi[]>(() => loadFromStorage());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(aois));
  }, [aois]);

  function addAoi(partial: Omit<Aoi, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const aoi: Aoi = {
      ...partial,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setAois((prev) => [...prev, aoi]);
    setSelectedId(aoi.id);
  }

  function updateAoi(id: string, partial: Partial<Omit<Aoi, "id">>) {
    setAois((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, ...partial, updatedAt: new Date().toISOString() }
          : a
      )
    );
  }

  function removeAoi(id: string) {
    setAois((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const selectedAoi = aois.find((a) => a.id === selectedId) ?? null;

  return {
    aois,
    selectedAoi,
    selectedId,
    setSelectedId,
    addAoi,
    updateAoi,
    removeAoi,
  };
}
