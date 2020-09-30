
pragma solidity ^0.5.5;

import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol"; 

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