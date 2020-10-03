async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    await deployer.getAddress()
  );
 
   const _name = 'Community Token';
   const _symbol = 'DAPP';
   const _decimals = 18;
 
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Donate = await ethers.getContractFactory("Donate");
  const donate = await Donate.deploy(_name, _symbol, _decimals);

  await donate.deployed();

  console.log("Donate address:", donate.address);
    // We also save the contract's artifacts and address in the client directory
  saveClientFiles(donate);
}

function saveClientFiles(donate) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ donate: donate.address }, undefined, 2)
  );

  fs.copyFileSync(
    __dirname + "/../artifacts/Donate.json",
    contractsDir + "/Donate.json"
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
