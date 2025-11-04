import React, { useState, useCallback } from 'react';
import Map from 'react-map-gl/mapbox';
import { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number; city: string }) => void;
  currentLocation?: {
    lat: number;
    lng: number;
    city: string;
  };
}

export function MapModal({ isOpen, onClose, onLocationSelect, currentLocation }: MapModalProps) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : null
  );
  const [city, setCity] = useState<string>(currentLocation?.city || '');

  const handleMapClick = useCallback((event: any) => {
    const { lng, lat } = event.lngLat;
    setMarker({ lng, lat });
    
    // Reverse geocoding to get city name
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=fa`
    )
      .then((response) => response.json())
      .then((data) => {
        const cityFeature = data.features.find((feature: any) => 
          feature.place_type.includes('locality') || 
          feature.place_type.includes('city')
        );
        setCity(cityFeature ? cityFeature.text : '');
      })
      .catch((error) => {
        console.error('Error fetching city:', error);
        setCity('');
      });
  }, []);

  const handleConfirm = () => {
    if (marker) {
      onLocationSelect({
        lat: marker.lat,
        lng: marker.lng,
        city: city
      });
      onClose();
    }
  };

  // Update marker when currentLocation changes
  React.useEffect(() => {
    if (currentLocation) {
      setMarker({ lat: currentLocation.lat, lng: currentLocation.lng });
      setCity(currentLocation.city);
    }
  }, [currentLocation]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle>انتخاب موقعیت روی نقشه</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="relative w-full h-[calc(90vh-4rem)]">
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: marker?.lng || 51.389, // Tehran coordinates as fallback
              latitude: marker?.lat || 35.6892,
              zoom: marker ? 12 : 8
            }}
            onClick={handleMapClick}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {marker && (
              <Marker
                longitude={marker.lng}
                latitude={marker.lat}
                color="#22c55e"
                scale={1.5}
              />
            )}
          </Map>
          {marker && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm mb-2">شهر: {city || 'نامشخص'}</p>
              <p className="text-sm mb-2">عرض جغرافیایی: {marker.lat.toFixed(6)}</p>
              <p className="text-sm mb-2">طول جغرافیایی: {marker.lng.toFixed(6)}</p>
              <Button onClick={handleConfirm} className="w-full">
                تایید موقعیت
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 