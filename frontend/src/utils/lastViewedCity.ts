import type { City } from "../types/city";

const KEY = "lastViewedCity";

export function saveLastViewedCity(
  city: Pick<City, "name" | "latitude" | "longitude">,
) {
  localStorage.setItem(KEY, JSON.stringify(city));
}

export function getLastViewedCity(): Pick<
  City,
  "name" | "latitude" | "longitude"
> | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
