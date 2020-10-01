import React, { useState } from 'react';
import styled from "styled-components";
import { ethers } from "ethers";

const BUIDLER_EVM_NETWORK_ID = '31337'
const ERROR_CODE_TX_REJECTED_BY_USER = 4001

const Main = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  width: 20%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  font-weight: bold;
  display: flex;
  align-items: center;

  & > .online {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.green};
    margin-left: 10px;
  }
`;

//rename, something like 'boost'
const FundButton = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  font-weight: bold;
  display: flex;
  align-items: center;

  button {
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px;
    background-color: transparent;
    margin: 0 10px;
  }
`;

declare const window: any;
declare const accounts: any;

const ethereum = window.ethereum;

const Topbar: React.FC<{}> = () => {

 //eth state
 const [Addr, setAddr] = useState()
 const [provider, setProvider] = useState()
 const [TokenData, setTokenData] = useState()
 const [networkError, setNetworkError] = useState()
 const [txError, setTxError] = useState()
 const [txBeingSent, setTxBeingSent] = useState()
 const [getTestAddr, setTestAddr] = useState('1')
 const [txHash, setTxHash] = useState(0)
 const [associateSuccess, setAssociateSuccess] = useState()

 React.useEffect(() => {
  const windowProvider = async () => {
      if (typeof window.ethereum !== 'undefined'
          || (typeof window.web3 !== 'undefined')) {

          setProvider(window['ethereum'] || window.web3.currentProvider);

          try {
              await provider.enable();
          } catch (e) {
              console.error('user refused to connect');
          }
          // console.log('network:', provider.networkVersion);
          // console.log('selectedAddress:', provider.selectedAddress);
          // console.log('is metamask:', provider.isMetaMask);
      }
  }
  windowProvider();
});

if (ethereum) {
  ethereum.on('accountsChanged', function (accounts: any) {
      setAddr(accounts[0])
  })
}

async function connectWallet() {
  const tempAddr = await window.ethereum.enable()
  setAddr(tempAddr)
  if (!checkNetwork()) {
      return;
  }
  initializeEthers()
}

async function initializeEthers() {
  const provider3 = new ethers.providers.Web3Provider(window.ethereum)
  setProvider(provider3)
  // const tokenTemp = new ethers.Contract(
  //     contractAddress.push,
  //     PushArtifact.abi,
  //     provider3.getSigner(0)
  // )
  // setTokenData(tokenTemp)
}

async function checkNetwork() {
  if (window.ethereum.networkVersion === BUIDLER_EVM_NETWORK_ID) {
      return true;
  }
  setNetworkError('Please connect Metamask to Localhost:8545')
  return false;
}


// if (!Addr) {
// //<Button variant="contained" color="primary" onClick={() => connectWallet()} > Connect Wallet</Button>
// return <div>
//       <h1> Connect dat wallet</h1>
//   </div>
// }

  return (
    <Main>
      <User>
        <span className="name">Jane Doe</span>
        <div className="online" />
      </User>
      <FundButton>
        <button onClick={()=>{console.log("Test")}} >Fork Community</button>
        {Addr ? <button>Boost This Server!</button> : <button onClick={() => connectWallet()} > Connect Wallet</button>}
      </FundButton>
    </Main>
  );
};

export default Topbar;
