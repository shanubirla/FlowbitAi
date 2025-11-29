export type GeometryType = "point" | "polygon";

export interface AoiGeometry {
  type: GeometryType;
  // For now just support a single point or simple polygon
  coordinates: [number, number][]; // [lat, lng]
}

export interface Aoi {
  id: string;
  name: string;
  description?: string;
  geometry: AoiGeometry;
  createdAt: string;
  updatedAt: string;
}
