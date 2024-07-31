import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface AddressInputProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
  onLocationDetect: () => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressSelect, onLocationDetect }) => {
  const [address, setAddress] = React.useState('');

  const handleSelect = async (selectedAddress: string) => {
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    setAddress(selectedAddress);
    onAddressSelect(selectedAddress, latLng.lat, latLng.lng);
  };

  return (
    <div className="relative flex items-center">
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative flex-grow">
            <Input {...getInputProps({ placeholder: 'Enter your home address' })} className="w-full pr-10" />
            {suggestions.length > 0 && (
              <Card className="absolute z-10 w-full mt-1">
                <ul className="py-2">
                  {loading && <li className="px-4 py-2">Loading...</li>}
                  {suggestions.map((suggestion) => (
                    <li
                      {...getSuggestionItemProps(suggestion)}
                      key={suggestion.placeId}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </PlacesAutocomplete>
      <Button 
        onClick={onLocationDetect}
        className="ml-2"
        variant="outline"
        size="icon"
      >
        <MapPin className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AddressInput;