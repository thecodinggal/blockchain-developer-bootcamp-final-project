import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "./button";
import RealEstate from '../artifacts/contracts/RealEstate.sol/RealEstate.json';


export default function Login(props, realEstateAddress){
  const [isConnecting, setIsConnecting] = useState(false);
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    } else {
      window.alert("No Ethereum Browser Detected!");
    }
    return provider;
  };
  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      setIsConnecting(true);
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
        setIsConnecting(false);
      } catch (error) {
        console.log("User cancelled wallet connection");
        setIsConnecting(false);
      }
    }
    props.onLogin(provider);
  };

  return (
    <div>
      <Button onclick={onLoginHandler}>
        {!isConnecting && "Connect"}
        {isConnecting && "Loading..."}
      </Button>
    </div>
  );
};


