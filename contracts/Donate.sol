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
}


contract DonateCrowdsale is Crowdsale, MintedCrowdsale {

    // Track investor contributions
    uint256 public investorMinCap = 20000000000000000; // 0.02 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;

    constructor(
        uint256 _rate,
        address payable _wallet,
        ERC20 _token
    ) 
    Crowdsale(_rate, _wallet, _token) public {}
}
// contract MyCrowdsale is Crowdsale, MintedCrowdsale {
//     constructor(
//         uint256 rate,    // rate in TKNbits
//         address payable wallet,
//         IERC20 token
//     )
//         MintedCrowdsale()
//         Crowdsale(rate, wallet, token)
//         public
//     {

//     }
// }

// contract MyCrowdsaleDeployer {
//     constructor()
//         public
//     {
//         // create a mintable token
//         ERC20Mintable token = new Donate();

//         // create the crowdsale and tell it about the token
//         Crowdsale crowdsale = new MyCrowdsale(
//             1,               // rate, still in TKNbits
//             msg.sender,      // send Ether to the deployer
//             token            // the token
//         );
//         // transfer the minter role from this contract (the default)
//         // to the crowdsale, so it can mint tokens
//         token.addMinter(address(crowdsale));
//         token.renounceMinter();


//     }

// 	// function getAmountRaised() public view returns (uint256){
// 	// 	uint256 amountRaised = address(this).crowdsale.weiRaised(); 
// 	// 	return amountRaised;
// 	// }
// }