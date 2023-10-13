import { Alchemy, Network, Utils } from "alchemy-sdk";
//const { Alchemy, Network, Utils } = require("alchemy-sdk");
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  //  const [block, setBlock] = useState();
  const [blockDetails, setBlockDetails] = useState();
  const [blockDetails2, setBlockDetails2] = useState([]);
  const [senders, setSenders] = useState([]);
  const [code, setCode] = useState([]);
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      //  setBlock(await alchemy.core.getBlock(blockNumber));
    }

    getBlockNumber();
  });

  async function getBlock() {
    // setBlock(await alchemy.core.getBlock(blockNumber));
    setBlockDetails(await alchemy.core.getBlockWithTransactions(11581555));
  }
  //console.log("Block==>", block);
  console.log("BlocK DETAils=>", blockDetails);
  //////////////////////////////////////////////////////////////////////////////
  function pagadores() {
    let updatedValue = [];
    blockDetails.transactions.forEach((tx) => {
      updatedValue.push({ from: tx.from, to: tx.to, value: tx.value._hex });

      setSenders(updatedValue);
    });
  }

  console.log("Pagadores=>", senders);
  //////////////////////////////////////////////////////////////////////////
  async function getCode() {
    // esa funcion retorna el codico de un  contracto
    //const numberBlockNumber = Number(blockNumber);
    const numberBlockNumber = 11581555;
    let blokes = [];
    //let addresses = [];
    for (let i = numberBlockNumber; i > numberBlockNumber - 1; i--) {
      let bloke = await alchemy.core.getBlockWithTransactions(i);
      blokes.push(bloke);
      setBlockDetails2(blokes);
      console.log("bloques===>", blockDetails2);
    }
    for (let i = 0; i <= blockDetails2.length - 1; i++) {
      console.log("i==", i);
      blockDetails2[i].transactions.forEach((tx) => {
        if (tx.to === null) {
          //addresses.push(tx.creates);
          setCode(tx.creates); //solo corre el utimo
        }
        console.log("no hay en ese");
      });
    }
    console.log("addresses==>", code);
    let response = await alchemy.core.getCode(code);
    console.log("code==>", response);
  }
  async function getGasPrice() {
    const gasPrice = await alchemy.core.getGasPrice();
    console.log("gasPrice==>", gasPrice);
  }
  ///////////////////////////////////////////////////
  async function estimateGas() {
    // aqui la estimacion del gas que vas a gastar por una transacción en un contracto

    const response = await alchemy.core.estimateGas({
      // Wrapped ETH address
      to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      //to: "0x1E025340D6F75A2a4ef81139049cfbf976782EeB",
      // `function deposit() payable`
      //data: "0xd0e30db0",
      //`function withdraw(uint256) payable`
      data: "0x2e1a7d4d",
      // 1 ether
      //value: Utils.parseEther("1.0"),
    });
    console.log(response);
  }
  ////////////////////////////////
  async function findContractDeployer() {
    //ojo, tarda mucho buscando... usar otra forma en alchemy
    //Assign the contract address to a variable
    let address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

    //The response fetches the contract deployer of the above address
    let response = await alchemy.core.findContractDeployer(address);

    //Logging the response to the console
    console.log(response);
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async function getTokenBalances() {
    //Initialize variables for the parameters
    let vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    let usdcContract = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

    //Call the method to return the token balances for this address
    let response = await alchemy.core.getTokenBalances(vitalikAddress, [
      usdcContract,
    ]);

    //Logging the response to the console
    console.log(response);
  }
  //////////////////////////////////////////////////////////////////////////////////////
  async function getTokensForOwner() {
    //Define the owner address or name
    // const ownerAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const ownerAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

    //The response returns the tokens the address owns and relevant metadata.
    let response = await alchemy.core.getTokensForOwner(ownerAddress);

    //Logging the response to the console
    console.log(response);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  async function getTransactionCount() {
    //Initialize variables for the parameters
    const address = "vitalik.eth";

    //Call the method
    let response = await alchemy.core.getTransactionCount(address);

    //Logging the response to the console
    console.log(response);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async function getTransactionReceipt() {
    //Initialize variables for the parameters
    const tx =
      //  "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b";

      "0x99aa0ecf4fe0a3fc11fc133f68c51a493b37fa35547a663b081ddef548aa5853";

    //Call the method to fetch the transaction receipt of the tx
    let response = await alchemy.core.getTransactionReceipt(tx);

    //Logging the response to the console
    console.log(response);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async function getTransactionReceipts() {
    // devuelve directamente las transacciones de un bloque especifico.
    //Define the params object
    const params = {
      // blockNumber
      //"0x18760312114f3fdf11f9d5846245995835aa59994d5fc4203faee52d2f7eaabe"
      blockNumber:
        "0x5efe0ca823940ef0892ebc5caab1c214e58c0e0a1da10775bd18d8113e2e3f18",
      //18336174
    };

    //The response returns the transaction receipts of the `blockNumber`
    let response = await alchemy.core.getTransactionReceipts(params);

    //Logging the response to the console
    console.log(response);
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  async function isContractAddress() {
    const result = await alchemy.core.isContractAddress(
      //"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      "0x1E025340D6F75A2a4ef81139049cfbf976782EeB"
    ); // Wrapped ETH address

    // Logging the response to the console
    console.log(result);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <div>Block Number: {blockNumber}</div>
      <div>Block:{blockDetails?.parentHash} </div>
      <button onClick={getBlock}>getBlock</button>
      <button onClick={pagadores}>Pagadores</button>
      <button onClick={getCode}>getCode</button>
      <button onClick={getGasPrice}>getGasPrice</button>
      <button onClick={estimateGas}>estimateGas</button>
      <button onClick={findContractDeployer}>findContractDeployer</button>
      <button onClick={getTokenBalances}>getTokenBalances</button>
      <button onClick={getTokensForOwner}>getTokensForOwner</button>
      <button onClick={getTransactionCount}>getTransactionCount</button>
      <button onClick={getTransactionReceipt}>getTransactionReceipt</button>
      <button onClick={getTransactionReceipts}>getTransactionReceipts</button>
      <button onClick={isContractAddress}>isContractAddress</button>
    </div>
  );
}

export default App;
