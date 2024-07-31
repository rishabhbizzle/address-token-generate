import React, { useState } from "react";
import AddressInput from "./components/AddressInput";
import Map from "./components/Map";
import NFTGenerator from "./components/NFTGenerator";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const App: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddressSelect = async (
    address: string,
    lat: number,
    lng: number
  ) => {
    setIsLoading(true);
    setSelectedAddress(address);
    setCoordinates({ lat, lng });
    setIsLoading(false);
  };

  const handleLocationDetect = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator?.geolocation?.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          // Reverse geocoding to get address from coordinates
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
              }`
            );
            const data = await response?.json();
            if (data?.results && data?.results?.length > 0) {
              const address = data?.results[0]?.formatted_address;
              setSelectedAddress(address);
            }
            toast.success("Address detected successfully.");
          } catch (error) {
            console.error("Error fetching address:", error);
            toast.error("Error fetching address.");
          }

          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported in your browser.");
      setIsLoading(false);
    }
  };

  return (
    // <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <div className="container mx-auto min-h-screen px-10 py-8 bg-secondary">
      <h1 className="text-4xl font-bold mb-8">Address NFT Generator</h1>
      <AddressInput
        onAddressSelect={handleAddressSelect}
        onLocationDetect={handleLocationDetect}
      />
      {isLoading ? (
        <Loader2 className="animate-spin h-8 w-8 mt-8" />
      ) : (
        selectedAddress ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 items-center gap-5">
            <Map latitude={coordinates.lat} longitude={coordinates.lng} />
            <NFTGenerator address={selectedAddress} />
          </div>
        ): (
          <div className="flex w-full h-full justify-center items-center my-10">
              No address selected... Please select an address!
          </div>
        )
      )}



      <Toaster richColors={true} />
    </div>
    // </LoadScript>
  );
};

export default App;
