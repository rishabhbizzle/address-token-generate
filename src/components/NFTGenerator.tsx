import React, { useState } from "react";
import Web3 from "web3";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { BitcoinIcon, House, Loader2 } from "lucide-react";

interface NFTGeneratorProps {
  address: string;
}

const NFTGenerator: React.FC<NFTGeneratorProps> = ({ address }) => {
  const [tokenId, setTokenId] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateNFT = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        const web3 = new Web3(Web3.givenProvider);
        const hash = web3.utils.sha3(address);
        setTokenId(hash);
        setIsLoading(false);
        toast.success("NFT generated successfully.. 🎉");
      }, 1000);
    } catch (error) {
      console.error("Error generating NFT:", error);
      toast.error("Error generating NFT.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-3xl">
          Generate NFT for your address
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex items-center gap-4">
          <div className="bg-[#0e0e0e] rounded-lg p-4 flex items-center justify-center">
            <House className="w-8 h-8 text-[#00d8ff]" />
          </div>
          <div>
            Address:
            <div className="text-lg font-medium break-words">{address}</div>
          </div>
        </div>
        {tokenId && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Token ID:</h3>
            <p className="text-lg break-words">{tokenId}</p>
          </div>
        )}

        <Button onClick={generateNFT} className="w-full mt-5" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin mr-2" />}
          Generate NFT
        </Button>
        
      </CardContent>
    </Card>
  );
};

export default NFTGenerator;
