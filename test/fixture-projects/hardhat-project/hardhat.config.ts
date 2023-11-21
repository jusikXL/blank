// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  paths: {
    abi: "somepath",
    clientAbiFile: "somepath/client.ts",
  },
  contractsToExtractAbi: ["Lock", "Lock2"],
};

export default config;
