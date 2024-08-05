# Home Address NFT Generator


## Overview

This React application allows users to input their home address, view it on a map, and generate an address NFT token on the Ethereum blockchain. It features address autocomplete, map display, and location auto-detection capabilities.

## Demo 

https://github.com/user-attachments/assets/aaa1908d-aaf8-4596-b78d-6ba7f02b70b8



## Features

- Address input with Google Places Autocomplete
- Map display of the selected address using Google Maps
- Auto-detection of user's current location
- NFT token generation on Ethereum blockchain based on the input address using ethers js 

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Google Maps JavaScript API for map display
- Google Places API for address autocomplete
- ethers js for NFT token generation
  

## Implementation Details

Address Input with Autocomplete
We use the react-google-autocomplete component to provide autocomplete functionality for address input. The component integrates with the Google Places API to fetch address suggestions as the user types.

Displaying the Address on a Map
We use @react-google-maps/api to display the selected address on a Google Map. When the user selects an address from the autocomplete suggestions, the map updates to show the location.

Generating an NFT Token
We used ethers package to help communicate to the blockchain network and the smart contract to generate the NFT. Upon successful NFT creation, the details of the transaction and NFT can be verified on Sepolia Etherscan (sepolia.etherscan.io), including contract and transaction details.


