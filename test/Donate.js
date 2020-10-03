const { expect } = require("chai");
//import ether from './util/ether';
const web3 = require("web3");

//not really testing correctly yet
describe("Donate contract", function() {
  it("Deployment should work", async function() {

    const _name = 'Dapp Token';
    const _symbol = 'DAPP';
    const _decimals = 18;
    const _rate = 500;

    const [owner, addr1, addr2] = await ethers.getSigners();

    const Donate = await ethers.getContractFactory("Donate");

    const donateDeployer = await Donate.deploy(_name, _symbol, _decimals);

    await donateDeployer.deployed();

    const balanceB4 = await donateDeployer.balanceOf(owner.getAddress());
    console.log(parseInt(balanceB4));
    const name = await donateDeployer.name();
    console.log(name);
    const symbol = await donateDeployer.symbol();
    console.log(symbol);
    const totalSupplyB4 = await donateDeployer.totalSupply();
    console.log(parseInt(totalSupplyB4));

    await donateDeployer.mint(addr1.getAddress(), 1)
    
    const balanceAfter = await donateDeployer.balanceOf(owner.getAddress());
    console.log(balanceAfter);
    const totalSupplyAfter = await donateDeployer.totalSupply();
    console.log(parseInt(totalSupplyAfter));

    const weiAmount = web3.utils.toHex( web3.utils.toWei('1', 'ether'))

    const transaction = {
      nonce: 2,
      to: donateDeployer.address,
      value: weiAmount

  };

    await owner.sendTransaction(transaction);
    const balanceAfterTx = await donateDeployer.balanceOf(owner.getAddress());
    console.log("Balance After Tx" , parseInt(balanceAfterTx));
    const totalSupplyAfterTx = await donateDeployer.totalSupply();
    console.log("Total Supply After Tx" , parseInt(totalSupplyAfterTx));

    //Unused testing code but keeping in case of future use
    // const _rate = 500;
    // const _wallet = await owner.getAddress();
    // const _tokenAddress = await donateDeployer.address;
    // console.log(_tokenAddress)
    // const Crowdsale = await ethers.getContractFactory("DonateCrowdsale")
    // const CrowdsaleDeployer = await Crowdsale.deploy(_rate , _wallet, _tokenAddress);
    // await CrowdsaleDeployer.deployed();
    // const crowdsaleAddress = await CrowdsaleDeployer.address;
    // const weiAmount = web3.utils.toWei('1', 'ether')
    // await donateDeployer.transferOwnership(crowdsaleAddress);
    // const crowdsale = await ethers.getContractFactory("MyCrowdsaleDeployer");
    // const CrowdsaleDeployer = await crowdsale.deploy(_name, _symbol, _decimals);
    // await CrowdsaleDeployer.deployed();
    // console.log(CrowdsaleDeployer.address);
    
  });
});
