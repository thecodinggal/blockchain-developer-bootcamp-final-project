//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title  Real Estate Exchange Platform
/// @author github: thecodinggal
/// @notice Real Estate allows an owner of a house to list their house, then confirm that it is for sale. Then a buyer can purchase the home
/// @dev    Add bidding for future implementation
contract RealEstate is Ownable {
    
    /// @dev OpenZeplin Ownable takes care of this
    //address public owner = msg.sender; 

    uint256 public registeredHouseCount;
    mapping(uint256 => House) public houses;

    /// @notice     Owned = User has added state to the system
    /// @notice     ForSale = User has listed this for sale
    /// @dev        Pending = for future implementaton when bidding is enabled
    /// @notice     Sold = House has been sold. The house state will quickly shift back to Owned since the buyer is the new owner.
    enum State {
        Owned,
        ForSale,
        Pending,
        Sold
    }

    /// @dev homeAddress = user input home address
    /// @dev registeredHouseNum = the number of houses in the system, also used as an ID
    /// @dev askingPrice = homeOwner's set price
    /// @dev bidAccepted = for future implementation when bidding is enabled
    struct House {
        string homeAddress;
        uint256 registeredHouseNum;
        uint askingPrice;
        State state;
        bool bidAccepted; //potential security risk when bidding is implemented, keep track of this. Might not need this?
        address payable homeOwner;
        address payable buyer;
    }

    /// @notice OpenZeplin constructor takes care of setting the msg.sender to the deployer
    // Ownable.constructor() {
    //     owner = msg.sender;
    // }

    /// @notice All Log Events
    event LogAddedHouse(uint _registeredHouseNum);
    event LogForSale(uint256 _registeredHouseNum);
    event LogSale(uint256 _registeredHouseNum);
    event LogSold(uint256 _registeredHouseNum);
    event LogOwned(uint256 _registeredHouseNum);



    /// @notice This has been replaced by OpenZeplin's onlyOwner()
    // modifier isOwner() {
    //     require(msg.sender == owner, "msg sender is not owner");
    //     _;
    // }

    /// @notice checks for price > 0
    /// @dev    use for bidding in the future
    modifier validPrice(uint price){
        require(price > 0, "Invalid price");
        _;
    }

    /// @notice checks to see if the buyer paid enough
    modifier paidEnough(uint _price){
        require(msg.value >= _price, "Did not pay enough");
        _;
    }

    /// @notice used to see if the right address is calling (ex: if the listed homeOwner is the transaction sender)
    modifier verifyCaller(address _address){
        require(msg.sender == _address, "Incorrect caller");
        _;
    }

    /// @notice State modifiers:

    modifier owned(uint256 _registeredHouseNum) {
        require(houses[_registeredHouseNum].state == State.Owned, "Error: House is not owned");
        _;
    }
    modifier forSale(uint256 _registeredHouseNum) {
        require(houses[_registeredHouseNum].state == State.ForSale, "Error: House is not in ForSale state");
        _;
    }
    modifier pending(uint256 _registeredHouseNum) {
        require(houses[_registeredHouseNum].state == State.Pending, "Error: House is not in Pending State");
        _;
    }
    modifier sold(uint256 _registeredHouseNum) {
        require(houses[_registeredHouseNum].state == State.Sold, "Error: House is not in Sold state");
        _;
    }

    /// @notice Adds house to the 'houses' array (and into the system). Increments housecounts and returns true
    function addHouse(string memory _homeAddress) 
        public 
        returns (bool) {
        //registers owner and assigns the house. If forSale = true, set State to ForSale. Else set State to Owned
        houses[registeredHouseCount] = House({
            homeAddress: _homeAddress,
            registeredHouseNum: registeredHouseCount,
            askingPrice: 0,
            state: State.Owned,
            bidAccepted: false,
            homeOwner: payable(msg.sender),
            buyer: payable(address(0))
        });
        registeredHouseCount++;
        return true;
    }

    /// @notice modifiers require: 1. That the homeOwner is the transaction sender, 2. House.state = Owned, 3. Checks inputted Price > 0
    /// @notice Then we set the state to "ForSale" and add a price. LogforSale.
    function sellHouse(uint houseNum, uint price) public verifyCaller(houses[houseNum].homeOwner) owned(houseNum) validPrice(price){
        houses[houseNum].state = State.ForSale;
        houses[houseNum].askingPrice = price;
        emit LogForSale(houseNum);
    }

    /// @notice modifiers: 1. State = ForSale, 2. Transaction Sender sent >= askingPrice, and check
    /// @notice if transaction is successful, State is changed to Sold, LogSold
    /// @notice then ownership is transferred to buyer and house state = Owned.
    function buyHouse(uint256 _houseNum) 
        public 
        payable
        forSale(_houseNum) paidEnough(houses[_houseNum].askingPrice)
        returns(bool){
        (bool success, ) = payable(houses[_houseNum].homeOwner).call{ value: msg.value }("");
         require(success, "Sending eth failed");
        houses[_houseNum].buyer = payable(msg.sender);
        houses[_houseNum].state = State.Sold;
        emit LogSold(_houseNum);
        //now transfer home ownership
        houses[_houseNum].homeOwner = payable(msg.sender);
        houses[_houseNum].buyer = payable(address(0));
        houses[_houseNum].state = State.Owned;
        houses[_houseNum].askingPrice = 0;
        emit LogOwned(_houseNum);
        return true;
    }

    /// @notice readonly to display home details for frontend
    function viewHouseInfo(uint256 _houseNum) public view returns (
            string memory homeAddress,
            uint256 registeredHouseNum,
            uint askingPrice,
            State state,
            address homeOwner
    ){
        homeAddress = houses[_houseNum].homeAddress;
        registeredHouseNum = houses[_houseNum].registeredHouseNum;
        askingPrice = houses[_houseNum].askingPrice;
        state = houses[_houseNum].state;
        homeOwner = houses[_houseNum].homeOwner;
    }


/// @notice --- EVERYTHING BELOW IS TO IMPLEMENT LATER ON ---
    /// @notice Wanted to add this but was worried about making frontend more complicated.
    /// @notice Will add this once I am better at frontend to ABI calls
    // modifier notYourHouse(uint houseNum){
    //     require(houses[houseNum].homeOwner !== msg.sender);
    // }
    
    /// @notice future implementation to charge a small fee for auditing and selling a house
    //function chargeFee() public isOwner() returns(bool){}

    /// @notice logs for bids
    //event LogBidSent(uint256 _registeredHouseNum);
    //event LogBidAccepted(uint256 _registeredHouseNum);
    //event LogBidRejected(uint256 _registeredHouseNum);

    /// @dev allows a buyer to submit a bid... figure out if I want to keep the funds on hold by owner
    // function placeBid(
    //     uint32 price,
    //     address buyer,
    //     uint256 _registeredHouses
    // ) public payable {}

    /// @dev call transaction from the homeOwner and start transfer of house
    //function acceptBid(bool bidAccepted) returns (bool) {    }

    /// @notice reject the bid from the homeOwner
    // function rejectBid() {}

}
