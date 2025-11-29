export interface GeocodeResult {
  display_name: string;
  lat: string;
  lon: string;
}

export async function searchPlace(query: string): Promise<GeocodeResult[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "5");

  const res = await fetch(url.toString(), {
    headers: {
      "Accept-Language": "en",
      // required by Nominatim usage policy: identify your app
      "User-Agent": "flowbit-assignment-aoi-map/1.0 (your-email@example.com)",
    },
  });

  if (!res.ok) {
    throw new Error("Geocoding request failed");
  }

  return (await res.json()) as GeocodeResult[];
}

export function formatAddress({ display_name, lat, lon }: GeocodeResult) {
  return `${display_name} (${lat}, ${lon})`;
}
