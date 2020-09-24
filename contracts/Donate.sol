pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Donation is ERC721{
	using Counters for Counters.Counter;
     Counters.Counter private _id;
    address public owner;

    constructor() ERC721("Gem" , "GEM") public {
        owner = msg.sender;
    }
}
