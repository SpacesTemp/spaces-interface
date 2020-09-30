const { expect } = require("chai");
//import ether from './util/ether';
const web3 = require("web3");

describe("Donate contract", function() {
  it("Deployment should work", async function() {

    const _name = 'Dapp Token';
    const _symbol = 'DAPP';
    const _decimals = 18;

    const [owner, addr1, addr2] = await ethers.getSigners();

    const Donate = await ethers.getContractFactory("Donate");

    const donateDeployer = await Donate.deploy(_name, _symbol, _decimals);

    await donateDeployer.deployed();

    const balance = await donateDeployer.balanceOf(owner.getAddress());
    console.log(parseInt(balance));
    const name = await donateDeployer.name();
    console.log(name);
    const symbol = await donateDeployer.symbol();
    console.log(symbol);
    const totalSupply = await donateDeployer.totalSupply();
    console.log(parseInt(totalSupply));
  
    
    const _rate = 500;
    const _wallet = await owner.getAddress();
    const _tokenAddress = await donateDeployer.address;

    console.log(_tokenAddress)

    const Crowdsale = await ethers.getContractFactory("DonateCrowdsale")
    const CrowdsaleDeployer = await Crowdsale.deploy(_rate , _wallet, _tokenAddress);
    await CrowdsaleDeployer.deployed();

    const crowdsaleAddress = await CrowdsaleDeployer.address;

    const weiAmount = web3.utils.toWei('1', 'ether')

    await donateDeployer.transferOwnership(crowdsaleAddress);


   
    //await donateDeployer.connect(owner).transfer(await addr1.getAddress(), 10);

    //await Crowdsale.sendTransaction({ value: weiAmount, from: addr1 });


    
  });
});
