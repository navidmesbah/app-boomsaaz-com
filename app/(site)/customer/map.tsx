"use client"

import React from "react"

import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import { MapPin } from "lucide-react";

export default function Maplibre(props: any) {
    return (
        <Map
            initialViewState={{
                longitude: Number(props.lng),
                latitude: Number(props.lat),
                zoom: 15
            }}
            dragPan={false}
            scrollZoom={false}
            style={{ width: "100%", height: 300 }}
            mapStyle='https://api.maptiler.com/maps/basic-v2/style.json?key=l2lhfToTYDJSlIPhOJ7E'
        // className="relative z-30"
        >
            <Marker longitude={Number(props.lng)} latitude={Number(props.lat)} anchor="bottom" >
                <MapPin size={48} color="red" />
                <span className="bg-white text-lg font-bold">
                    مقصد بار
                </span>
            </Marker>
        </Map>
    )
}