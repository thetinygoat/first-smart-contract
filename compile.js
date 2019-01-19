const path = require("path");
const fs = require("fs");
const solc = require("solc");
const contractPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(contractPath, "utf8");

console.log("compiling...");
module.exports = solc.compile(source, 1).contracts[":Inbox"];
