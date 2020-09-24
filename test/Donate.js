const { expect } = require("chai");

describe("Donate contract", function() {
  it("Deployment should work", async function() {
    const [owner] = await ethers.getSigners();

    const Donate = await ethers.getContractFactory("Donation");

    const donateDeployer = await Donate.deploy();
    await donateDeployer.deployed();

   //not tests yet
  });
});
