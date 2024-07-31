# Home Address NFT Generator


## Overview

This React application allows users to input their home address, view it on a map, and generate an NFT token based on the address. It features address autocomplete, map display, and location auto-detection capabilities.

## Features

- Address input with Google Places Autocomplete
- Map display of the selected address using Google Maps
- Auto-detection of user's current location
- NFT token generation based on the input address
- Responsive design with Tailwind CSS

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Google Maps JavaScript API for map display
- Google Places API for address autocomplete
- Web3.js for NFT token generation

Demo:

https://github.com/user-attachments/assets/17e4c4fe-d85a-4b6c-ac03-37f4c54b500a


## Key Components

### AddressInput

This component provides an input field with Google Places Autocomplete functionality. It also includes a button for auto-detecting the user's current location.

### Map

The Map component uses the Google Maps JavaScript API to display a map centered on the selected address, with a marker indicating the exact location.

### NFTGenerator

This component simulates the generation of an NFT token based on the input address. In a real-world scenario, this would interact with a blockchain network.


