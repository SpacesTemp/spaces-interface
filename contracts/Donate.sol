pragma solidity ^0.5.5;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";


//using openZeplin version2.5 for prototyping b/c it supports crowdsale:
//https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v2.5.0/contracts/token/ERC20

contract Donate is ERC20, ERC20Detailed, ERC20Mintable, ERC20Pausable, Ownable {
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
        ERC20Detailed(_name, _symbol, _decimals)
        public {}

		function mint(address sender, uint value) public returns (bool) {
			_mint(sender, value);
		}

		function () external payable{
			mint(msg.sender , msg.value);
		}
}


//crowdsale is outdated so not using anymore, just here for implementation reference purposes
contract DonateCrowdsale is Crowdsale, MintedCrowdsale {

    // Track investor contributions
    uint256 public investorMinCap = 20000000000000000; // 0.02 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;

    constructor(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token
    ) 
    Crowdsale(_rate, _wallet, _token) public {
	}

}

//reference to deploying a token and crowd sale together
contract MyCrowdsaleDeployer {
    constructor(string memory _name, string memory _symbol, uint8 _decimals )
        public
    {
        // create a mintable token
        ERC20Mintable token = new Donate(_name, _symbol, _decimals);

        // create the crowdsale
        DonateCrowdsale crowdsale = new DonateCrowdsale(
            1,               // rate
            msg.sender,      // send Ether to the deployer address
            token            // the token
        );
        // transfer the minter role from this contract to crowdsale contract
        token.addMinter(address(crowdsale));
        token.renounceMinter();


    }

}
