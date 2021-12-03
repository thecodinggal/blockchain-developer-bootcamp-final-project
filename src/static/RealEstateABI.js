const RealEstate = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_registeredHouseNum",
				"type": "uint256"
			}
		],
		"name": "LogAddedHouse",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_registeredHouseNum",
				"type": "uint256"
			}
		],
		"name": "LogForSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_registeredHouseNum",
				"type": "uint256"
			}
		],
		"name": "LogOwned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_registeredHouseNum",
				"type": "uint256"
			}
		],
		"name": "LogSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_registeredHouseNum",
				"type": "uint256"
			}
		],
		"name": "LogSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_homeAddress",
				"type": "string"
			}
		],
		"name": "addHouse",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "buyHouse",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "houses",
		"outputs": [
			{
				"internalType": "string",
				"name": "homeAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "registeredHouseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "askingPrice",
				"type": "uint256"
			},
			{
				"internalType": "enum RealEstate.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "bidAccepted",
				"type": "bool"
			},
			{
				"internalType": "address payable",
				"name": "homeOwner",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "buyer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registeredHouseCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "sellHouse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "viewHouseInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "homeAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "registeredHouseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "askingPrice",
				"type": "uint256"
			},
			{
				"internalType": "enum RealEstate.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "homeOwner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default RealEstate;