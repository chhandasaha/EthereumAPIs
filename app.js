const express = require("express");
const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");
const contractABI = MyContract.abi;
const contractAddress = "0xa5fabA28d20a2958A06F3f993C58D9eA093c3876"; // Enter your contract address here
const rpcEndpoint = "http://127.0.0.1:8545"; // Enter your RPC server endpoint URL here

const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

app.get("/number", async (req, res) => {
  const number = await contract.methods.getNumber().call();
  res.json({ number });
});

app.post("/number", async (req, res) => {
  const { number } = req.body;
  const accounts = await web3.eth.getAccounts();
  const result = await contract.methods
    .setNumber(number)
    .send({ from: accounts[0] });
  const reslt = result;
  res.json({ res: reslt, message: "number set successfully" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
