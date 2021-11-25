//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RealEstate {
//states:
address public owner = msg.sender;
uint public registeredHouses;
mapping (uint => House) public Houses;

//State of house: Owned, ForSale, Pending, Sold
enum State {
  Owned,
  ForSale,
  Pending,
  Sold
}


struct House {
  string homeAddress;
  uint registeredHouses;
  uint32 askingPrice;   //we are assuming that no houses over ~4 trillion ETH will be listed, make sure it is in ETH and not WEI
  State state;
  bool bidAccepted;     //potential security risk, keep track of this. Might not need this
  address payable homeOwner;
  address payable buyer;
}

//events, figure out what variables must be passed in functions
event LogForSale();
event LogSale();
event LogBidSent();
event LogBidAccepted();
event LogBidRejected();
event LogSold();

//add modifiers
//...

//need to add memory somewhere, figure this out
/*function addHouse(string _homeAddress, uint32 _askingPrice, bool forSale) public returns(bool){
  //registers owner and assigns the house. If forSale = true, set State to ForSale. Else set State to Owned
}

function buyHouse(address buyer, uint _registeredHouses) public payable{
  //allows user to buy house at the askingPrice State if there are sufficient funds
}

function placeBid(uint32 price, address buyer, uint _registeredHouses) public payable{
  //allows user to submit a bid... figure out if I want to keep the funds on hold
}

function acceptBid(bool bidAccepted) returns(bool){
  //call transaction and start transfer of house
}

function rejectBid(){
  //reject the bid
}

*/


/* -- Not my work below -- */
/*
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
    */
}
