const { assert } = require("chai");
const { ethers, waffle } = require("hardhat");
const provider = waffle.provider;

/// 6 unit tests total
describe("Real Estate Tests", function (accounts) {
  const price = "5000000000000000000";          //price and paidAmount is equal
  const paidAmount = "5000000000000000000";     //in the future, I will change this to test bids or overpayments.
  const homeAddress = "123 Wallstreet, Some Location, USA";

  let instance;
  let Instance;

  this.beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();
    instance = await ethers.getContractFactory("RealEstate");
    Instance = await instance.deploy(); //this deploys the smart contract, which calls the constructor
    //await Instance.deployed();
  });

  /// Checks to see if there is an owner variable from the OpenZeplin Ownable inheritance
  describe("Check Owner", function () {
    it("Should have an owner", async function () {
      assert.equal(
        typeof Instance.owner,
        "function",
        "The contract has no owner"
      );
    });
  });

  describe("Successfully Added House", async function () {
    //Runs addHome() which adds the house into the system.
    //Then it calls viewHouseInfo() of the house and checks to see if the address and house ID is correct
    it("Adding House with a home address", async function () {
      await Instance.addHouse(homeAddress, { from: owner.address });
      const getResults = await Instance.viewHouseInfo(0);
      assert.equal(
        getResults.homeAddress,
        homeAddress,
        "Address is incorrect!"
      );
      assert.equal(
        getResults.registeredHouseNum,
        0,
        "Registered House Num is incorrect!"
      );
    });

    //Runs addHouse() and sellHouse(), which accepts the houseID and a price from the user.
    //Then it checks that the askingPrice === price
    it("Listing House for Sale and price matches", async function () {
      await Instance.addHouse(homeAddress, { from: owner.address });
      await Instance.sellHouse(0, price, { from: owner.address });
      const getResults = await Instance.viewHouseInfo(0);
      assert.equal(
        getResults.askingPrice,
        price,
        "Incorrect asking price, should be: " + price
      );
    });
  });

  describe("Checking sale of property", async function () {
    //Checks that the sale of the property from one address to another went through by checking the state of the house.
    //House states change from Owned -> ForSale, and then Filter through ->Sold->Owned
    // and end state is "Owned" since the new owner may not want to sell the house.
    it("House is in Owned state after buyer purchases the house", async function () {
      await Instance.addHouse(homeAddress, { from: owner.address });
      await Instance.sellHouse(0, price, { from: owner.address });
      let getResults = await Instance.viewHouseInfo(0);
      console.log("House State (0 = Owned): ", getResults.state);
      const transaction = await Instance.connect(buyer).buyHouse(0, {
        from: buyer.address,
        value: paidAmount,
      });
      await transaction.wait();
      getResults = await Instance.viewHouseInfo(0);
      assert.equal(getResults.state, "0", "House is not in Owned State");
    });

    // Checks that the purchase of a house from one address to another went through correctly by checking the
    // address of owner. At the beginning, homeOwner = Owner, and at the end homeOwner = buyer
    it("House is assigned to the buyer after buyer purchases house", async function () {
      await Instance.addHouse(homeAddress, { from: owner.address });
      await Instance.sellHouse(0, price, { from: owner.address });
      console.log("owner:", owner.address);
      console.log("buyer:", buyer.address);
      const transaction = await Instance.connect(buyer).buyHouse(0, {
        from: buyer.address,
        value: paidAmount,
      });
      await transaction.wait();
      getResults = await Instance.viewHouseInfo(0);
      console.log("New Home Owner: ", getResults.homeOwner.toString());
      assert.equal(
        getResults.homeOwner.toString(),
        buyer.address,
        "Newly sold house is not owned by buyer"
      );
    });

    //Since both the owner and buyer start out with the same balance, it is safe to assume that
    //the seller's balance > buyer's balance after a successful house purchase.
    it("Buyer's balance should be less than the previous owner after purchase", async function () {
      await Instance.addHouse(homeAddress, { from: owner.address });
      await Instance.sellHouse(0, price, { from: owner.address });
      const transaction = await Instance.connect(buyer).buyHouse(0, {
        from: buyer.address,
        value: paidAmount,
      });
      await transaction.wait();
      const getBuyerBalance = await provider.getBalance(buyer.address);
      const getSellerBalance = await provider.getBalance(owner.address);
      console.log(
        "Buyer's Balance: ",
        ethers.utils.formatEther(getBuyerBalance)
      );
      console.log(
        "Seller's Balance: ",
        ethers.utils.formatEther(getSellerBalance)
      );
      assert.isAbove(
        getSellerBalance,
        getBuyerBalance,
        "Seller's balance is smaller than buyer's balance"
      );
    });
  });
});
