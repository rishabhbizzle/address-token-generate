import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddressNFTAbi from "../assets/MyNFT.json";
import { toast } from "sonner";
import { House, Loader2 } from "lucide-react";

const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS as string;

interface NFTGeneratorProps {
  address: string;
}

const NFTGenerator: React.FC<NFTGeneratorProps> = ({ address }) => {
  const [loading, setLoading] = useState(false);
  const [transactionLink, setTransactionLink] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const generateNFT = async () => {
    try {
      setLoading(true);
      const provider = new ethers.JsonRpcProvider(
        import.meta.env.VITE_ETH_URL as string
      );
      const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY as string;
      const wallet = new ethers.Wallet(privateKey, provider);

      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        AddressNFTAbi.abi,
        wallet
      );
      const transaction = await contract.mintNFT(
        import.meta.env.VITE_WALLET_ADDRESS,
        `https://example.com/metadata/${encodeURIComponent(address)}`
      );
      await transaction.wait();

      if (!transaction.hash) {
        throw new Error("Transaction hash not found");
      }
      
      setTokenId(transaction.hash);

      setTransactionLink(`https://sepolia.etherscan.io/tx/${transaction.hash}`);

      toast.success("NFT generated successfully");

    } catch (error) {
      console.error("Error generating NFT:", error);
      toast.error("Error generating NFT");
    } finally {
      setLoading(false);
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
            <h3 className="text-xl font-semibold">Token Hash:</h3>
            <p className="text-lg break-words">{tokenId}</p>
          </div>
        )}

        {transactionLink && (
          <a
            href={transactionLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline mt-2"
          >
            View transaction on Etherscan
          </a>
        )}

        <Button onClick={generateNFT} className="w-full mt-5" disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2" />}
          Generate NFT
        </Button>
        
      </CardContent>
    </Card>
  );
};

export default NFTGenerator;
