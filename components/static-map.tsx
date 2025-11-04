"use client"

import React from "react"
import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from "lucide-react";

interface StaticMapProps {
  lng: number;
  lat: number;
  city: string;
}

export default function StaticMap({ lng, lat, city }: StaticMapProps) {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15
        }}
        dragPan={false}
        scrollZoom={false}
        style={{ width: "100%", height: "100%" }}
        mapStyle='https://api.maptiler.com/maps/basic-v2/style.json?key=l2lhfToTYDJSlIPhOJ7E'
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <MapPin size={48} color="red" />
          <span className="bg-white text-lg font-bold">
            {city}
          </span>
        </Marker>
      </Map>
    </div>
  );
} 