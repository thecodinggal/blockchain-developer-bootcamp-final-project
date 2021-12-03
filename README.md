# FINAL PROJECT

## Deployed Version
Uses Ropsten network: (https://objective-bassi-793790.netlify.app/)

## Project Description
Real Estate app that allows a user to list a house on the system, list for sale, or buy a house. There are currently 3 states to a house: Owned, ForSale, and Sold. See "Workflow" for detailed step-by-step instructions.

## How to run this project locally:
### Prerequisites
 - Node.js >= 16.8.0
 - Hardhat, Waffle, and EtherJS
 - Npm 7.21.0
 - git checkout master

 ## To run the Contract
From the root (Contracts and frontend can be run from the same location):
 - run `npm install` to install all dependecies (Hardhat, Waffle, React, etc)
  - run `npx hardhat compile`
 - run `npx hardhat node`
 - run `npx hardhat run scripts/deploy.js --network localhost`

 ## To run frontend
 - From the root directory, run `npm start` to run local website
 -  development network id is 1337 localhost 
 - open [localhost:3000](http://localhost:3000)

 ### Smart Contract Unit Tests
- in root file, run `npx hardhat compile`
- run `npx hardhat test`
Hardhat unit test should deploy immediately

### Directory Structure
`root`: Contain's React frontend project. /src file has the pages

`contracts` : Smart contracts that have been deployed to the Ropsten testnet

`test` : Hardhat tests for smart contract

### Workflow
1. Connect Metamask
2. Either click on "Sell Property" in header or scroll down. Put in address and list house. Wait for transaction. If there is a nonce error, please Reset your account using Settings > Advanced > Reset Account.
3. Feel free to check the house details under "Buy Your New Home" by inputting the house # and clicking "Search For House". Wait for success/error message to show up. 
4. List your home's price in eth at a value > 0. Click on sell your House and wait for transaction to go through.
5. Now check the house details using the house ID # that is printed in the success message. Switch to a different account (or if you want to save time, use the same account) to purchase the home at the located house ID. You are also welcome to search up other houses.
6. Check Metamask for success message. Feel free to check the house in the lookup. Congratulations, you have just bought a house!

## Screencast link
(https://www.youtube.com/watch?v=nFDBdOBJqak)

## Public Ethereum Wallet for Certification
0x4957A8097CAcfa1D306Fdbd8fA287a0A540380D3


### Future Improvements
Will add better validations (checking to see if user already owns this house before they purchase a house), bidding functionalities, and charge a small fee that is collected by the owner of the contract.

