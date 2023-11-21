// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const ABI_PATH_TEST = "somepath";

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
    abi: ABI_PATH_TEST,
  },
};

export default config;
