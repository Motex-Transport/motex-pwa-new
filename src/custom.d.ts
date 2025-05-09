// Declare image modules
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// MapLibre types
declare module 'maplibre-gl' {
  export class Map {
    fitBounds(bounds: LngLatBounds, options?: { padding?: number | { top: number; bottom: number; left: number; right: number } }): this;
    getLayer(id: string): any;
    removeLayer(id: string): this;
    getSource(id: string): any;
    removeSource(id: string): this;
    addSource(id: string, source: any): this;
    addLayer(layer: any): this;
  }

  export class LngLatBounds {
    constructor(sw?: [number, number] | LngLatBounds, ne?: [number, number] | LngLatBounds);
    extend(coord: [number, number] | LngLatBounds): this;
  }

  export interface MapLibreEvent {
    target: maplibregl.Map;
  }
}

// @vis.gl/react-maplibre types
declare module '@vis.gl/react-maplibre' {
  export interface MapProps {
    mapLib?: any;
  }
  
  export type MapLib = any;
} 