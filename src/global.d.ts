import type { Marker, Circle } from 'leaflet';

declare global {
  interface Window {
    userLocationMarker?: Marker;
    userLocationCircle?: Circle;
  }
}

export {};