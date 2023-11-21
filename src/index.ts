import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";
import "./tasks/extract-abi";

import "./types/abi-extractor";
// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./types/type-extensions";
import { ABI_PATH_DEFAULT } from "./constants";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    // We apply our default config here. Any other kind of config resolution
    // or normalization should be placed here.
    //
    // `config` is the resolved config, which will be used during runtime and
    // you should modify.
    // `userConfig` is the config as provided by the user. You should not modify
    // it.
    //
    // If you extended the `HardhatConfig` type, you need to make sure that
    // executing this function ensures that the `config` object is in a valid
    // state for its type, including its extensions. For example, you may
    // need to apply a default value, like in this example.
    const userPath = userConfig.paths?.abi;

    let abiPath: string;
    if (userPath === undefined) {
      abiPath = path.join(config.paths.root, ABI_PATH_DEFAULT);
    } else {
      if (path.isAbsolute(userPath)) {
        abiPath = userPath;
      } else {
        // We resolve relative paths starting from the project's root.
        // Please keep this convention to avoid confusion.
        abiPath = path.normalize(path.join(config.paths.root, userPath));
      }
    }

    config.paths.abi = abiPath;
  }
);

// extendEnvironment((hre) => {
//   // We add a field to the Hardhat Runtime Environment here.
//   // We use lazyObject to avoid initializing things until they are actually
//   // needed.
//   hre.example = lazyObject(() => new ExampleHardhatRuntimeEnvironmentField());
// });
