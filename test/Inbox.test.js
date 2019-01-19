const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["hello there!!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("inbox", () => {
  it("should deploy a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("should have the default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "hello there!!");
  });
  it("should change message variable", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
