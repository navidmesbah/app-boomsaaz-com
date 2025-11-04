// "use client"

import React from "react"
// import Link from "next/link"
// import Image from "next/image"
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below

import Map from './map'
import { getLocation } from "@/lib/db/queries";

export default async function Analytics() {

  const location = await getLocation('579f3ab4-ea21-4e71-b73a-64b05aea9a75');

  return (
    <div>
      <Map location={location}/>
    </div>
  )
}
