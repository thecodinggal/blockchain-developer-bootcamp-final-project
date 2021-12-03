import { useState, useEffect, componentDidMount } from "react";
import Login from "./components/Login.js";
import { ethers } from "ethers";
import FullImageSection from "./components/fullImageSection.js";
import { Button } from "./components/button.js";

import tenureLogo from "./images/tenure-icon.png";
import RealEstate from "./artifacts/contracts/RealEstate.sol/RealEstate.json";

let realEstateAddress;
if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
  console.log("Connected to localhost");
  realEstateAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //localhost address
}
else{
  realEstateAddress = "0x1b19Fd17096447B670Adeb0bFF4FD918Ce2AFC7E"; //ropsten address
}


function App() {
  const [isConnected, setIsConnected] = useState(false);  //for Connect button

  const [currentHome, setCurrentHome] = useState(""); //User input: Home Address
  const [homeLists, setHomeLists] = useState(""); //Information from viewHouseInfo()

  const [saleValue, setSaleValue] = useState(0);  //User input: Asking Price

  const [selectedHome, setSelectedHome] = useState(0);  //User input: Inputted House Number (for searching)
  const [yourHouse, setYourHouse] = useState();         //User's Current House #

  const [provider, setProvider] = useState();       //provider

  const [listSuccess, setListSuccess] = useState(0);    //validation msg for addHouse
  const [priceSuccess, setPriceSuccess] = useState(0);  //validaton msh for sellHouse


  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const value = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(value);
    }
  }, []);



  const onLogin = async (provider) => {
    const value = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(value);
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  //request access to the user's Metamask Account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchHouses() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        realEstateAddress,
        RealEstate.abi,
        provider
      );
      try {
        let data;
        console.log("this is for #", selectedHome);
        data = await contract.viewHouseInfo(selectedHome);
        console.log("data: ", data);
        setHomeLists(data);
        setFetchError(false);
      } catch (err) {
        console.log("Error: ", err);
        setFetchError(true);
      }
    }
  }


  async function sellHouse() {
    if (typeof window.ethereum !== "undefined") {
      const signer = provider.getSigner(); //For signing transactions
      const contract = new ethers.Contract(
        realEstateAddress,
        RealEstate.abi,
        signer
      );
      try {
        const transaction = await contract.sellHouse(
          ethers.BigNumber.from(yourHouse),
          ethers.BigNumber.from(ethers.utils.parseEther(saleValue))
        );
        await transaction.wait();
        setPriceSuccess(1); //success
        setListSuccess(0);
      }
      catch{
        setPriceSuccess(2); //Send error prompt
      }
    }
  }

  async function addHouse() {
    if (typeof window.ethereum !== "undefined") {
      const signer = provider.getSigner(); //For signing transactions
      const contract = new ethers.Contract(
        realEstateAddress,
        RealEstate.abi,
        signer
      );
      try{
        const transaction = await contract.addHouse(currentHome);
        await transaction.wait();
        var houseNum = await contract.registeredHouseCount();
        houseNum = parseInt(houseNum._hex, 16) - 1;
        setYourHouse(houseNum);
        setListSuccess(1);
    }
      catch {
        setListSuccess(2);
      }
    }
  }

  async function buyHouse() {
    if (typeof window.ethereum !== "undefined") {
      const signer = provider.getSigner(); //For signing transactions
      const contract = new ethers.Contract(
        realEstateAddress,
        RealEstate.abi,
        signer
      );
      const transaction = await contract.buyHouse(ethers.BigNumber.from(selectedHome), {
        value: ethers.BigNumber.from(homeLists[2]),
          //ethers.utils.parseEther("5")),
      });
          await transaction.wait();
    }
  }

  function convertState(state) {
    switch (state) {
      case 0:
        return "Owned";
        break;
      case 1:
        return "For Sale";
        break;
      case 2:
        return "Pending";
        break;
      case 3:
        return "Sold";
        break;
      default:
        return "Error";
    }
  }

  return (
    <div className="text-center">
      <header>
        <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-black shadow text-gray-50">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a href="/" className="inline-block mr-4">
                <img src={tenureLogo} className="w-8 inline-block" />
                <span className="text-3xl pl-2">Tenure</span>
              </a>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center bg-black lg:bg-opacity-0 lg:shadow-none"
              }
              id="example-navbar-warning"
            >
              <ul className="flex lg:flex-row list-none lg:ml-auto">
                <li className="md:flex items-center">
                  <a href="/#sell">
                    <span className="inline-block ml-2 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-primary-lightblue">
                      Sell Property
                    </span>
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="/#buy">
                    <span className="inline-block ml-2 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-primary-lightblue">
                      Purchase Property
                    </span>
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="inline-block ml-2 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold hover:text-primary-lightblue">
                    {!isConnected && (
                      <Login realEstateAddress={realEstateAddress} onLogin={onLogin} onLogout={onLogout} />
                    )}
                    {isConnected && <div>Hello! This works</div>}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <FullImageSection />
        <div className="pt-8">
          <div id="sell">
            <h2 className="text-4xl">Sell Your Home</h2>
            <p className="pt-10 text-xl pb-4">
              1. List your home on our system
            </p>
            <div className="pb-12">
              <div className="pb-4">
                <input
                  type="text"
                  placeholder="Input Your Home Address"
                  className="border border-gray-900 border-solid p-2 w-1/3"
                  onChange={(e) => setCurrentHome(e.target.value)}
                />
              </div>
              <Button onclick={addHouse} isDisabled={ listSuccess === 0 || (priceSuccess === 1 && listSuccess === 1) || listSuccess === 2 ? false : true }>List your Home To the System</Button>
              <div className="pt-2">{ listSuccess === 1 ? <div>Success! Our super speedy auditors have approved your home, <span className="font-bold">{currentHome}</span>, at House ID #<span className="font-bold">{yourHouse}</span></div> : listSuccess === 2 ? <div className="text-red-500">Error: Transaction was rejected</div> : ''}</div>
            </div>
            <div>
            <p className="text-xl pb-4">2. List your home's price (in ETH)</p>
            <div className="pb-4">
              <input
                type="number"
                placeholder="Input your price in Eth"
                className="border border-gray-900 border-solid p-2"
                onChange={(e) => setSaleValue(e.target.value)}
              />
              </div>
              <Button onclick={sellHouse} isDisabled={listSuccess === 1 ? false : true}>Sell your House</Button>
              { priceSuccess === 1 ? <div className="pt-2">House <span className="font-bold">{currentHome}</span> is now listed for sale at house ID # <span className="font-bold">{yourHouse}</span></div> : priceSuccess === 2 ? <div className="pt-2 text-red-500">Error: Transaction was rejected or failed. Price must be greater than 0 or you may not have registered your home</div> : ''}
            </div>
          </div>
          <div id="buy">
            <h2 className="pt-12 text-4xl pb-4">Buy Your New Home</h2>
            <div className="pb-8">
            <div className="card">
              <div className="cards ">
                <span className="house-name">
                  Address: {homeLists ? homeLists[0] : ""}
                </span>
                <div className="">
                  State: {homeLists ? convertState(homeLists[3]) : ""}
                </div>
                <div className="">
                  House Number:{" "}
                  {homeLists ? parseInt(homeLists[1]._hex, 16) : ""}
                </div>
                <div className="">
                  Asking Price:{" "}
                  {homeLists
                    ? ethers.utils.formatEther(homeLists[2]) + " ETH"
                    : ""}
                </div>
                <div className="">
                  Owned by: {homeLists ? homeLists[4] : ""}
                </div>
              </div>
            </div>
              <div className="py-4">
                <input
                  type="number"
                  placeholder="Input Home ID"
                  className="border border-gray-900 border-solid p-2"
                  onChange={(e) => setSelectedHome(e.target.value)}
                />
              </div>
              <Button onclick={fetchHouses}>Search for House</Button>
              <Button onclick={buyHouse} isDisabled={selectedHome ? false : true}>Purchase House</Button>
              { fetchError == true ? <div className="text-red-500">Error fetching house - Please use a number greater than 0</div> : ''}
              <div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
