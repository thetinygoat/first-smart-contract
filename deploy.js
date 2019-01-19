const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "stem payment put lawn visa gaze target record expect find velvet host",
  "https://rinkeby.infura.io/v3/423355a580e04fb29e9824a4510da044"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting deployment from account", accounts[0]);
  const res = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode, arguments: ["Hi, there!!"] })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("contract deployed to", res.options.address);
};
deploy();
