import React, { useState } from 'react';
import styled from "styled-components";
import { ethers } from "ethers";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import DonateArtifact from "../contracts/Donate.json"
import contractAddress from "../contracts/contract-address.json"

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
  color: ${({ theme }) => theme.colors.primaryTextColor};
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


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useStylesSlider = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value: any) {
  return `${value}Ξ`;
}



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
  const classes = useStyles()
  //modal
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  //slider
  const classesSlider = useStylesSlider();
  const [value, setValue] = React.useState(30);


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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Fund this server!</h2>
      <p id="simple-modal-description">
        <div className={classesSlider.root}>
          <Typography id="discrete-slider" gutterBottom>
            Donation Value Ξ:
      </Typography>
          <Slider
            defaultValue={0.5}
            onChange={handleSliderChange}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={0.1}
            marks
            min={0.00}
            max={2}

          />
        </div>
      </p>
      <FundButton>
        <button onClick={() => { sendDonation() }}> Submit! </button>
      </FundButton>
    </div>
  );

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
    console.log(provider3)
    const donateInterface = new ethers.Contract(
      contractAddress.donate,
      DonateArtifact.abi,
      provider3.getSigner(0)
    )
    setTokenData(donateInterface)
  }

  async function checkNetwork() {
    if (window.ethereum.networkVersion === BUIDLER_EVM_NETWORK_ID) {
      return true;
    }
    setNetworkError('Please connect Metamask to Localhost:8545')
    return false;
  }


  async function sendDonation() {
    console.log("addr:", Addr[0])
    console.log("Contract addr:", contractAddress.donate)
    const params = [{
      from: Addr[0],//provider address
      to: contractAddress.donate, //token address
      value: ethers.utils.parseUnits(value.toString(), 'ether').toHexString()
    }];

    const transactionHash = await provider.send('eth_sendTransaction', params)
    console.log('transactionHash is ' + transactionHash);

  }

  return (

    <Main>
      <User>
        <span className="name">Jane Doe</span>
        <div className="online" />
      </User>
      <FundButton>
        <button onClick={() => { console.log("Test") }} >Fork Community</button>
        {Addr ? <button onClick={handleOpen} >Boost This Server!</button> : <button onClick={() => connectWallet()} > Connect Wallet</button>}
      </FundButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Boost server"
        aria-describedby="Donate ETH to the server"
      >
        {body}
      </Modal>
    </Main>


  );
};

export default Topbar;
