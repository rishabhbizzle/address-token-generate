import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Card } from "@/components/ui/card";

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {

  const center = {
    lat: latitude,
    lng: longitude
  };
    //   @ts-ignore
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Card className="p-4 h-full">
      <GoogleMap
        mapContainerStyle={{
            width: '100%',
            height: '400px'
          }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </Card>
  ) 
};

export default Map;