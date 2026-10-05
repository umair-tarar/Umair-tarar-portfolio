import * as THREE from "three";

/** Reads a space-separated RGB CSS variable (e.g. "59 130 246") as a THREE.Color. */
export function cssColor(name: string, fallback: string) {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const [r, g, b] = raw.split(/\s+/).map(Number);
    if ([r, g, b].some((v) => Number.isNaN(v))) return new THREE.Color(fallback);
    return new THREE.Color(r / 255, g / 255, b / 255);
  } catch {
    return new THREE.Color(fallback);
  }
}
