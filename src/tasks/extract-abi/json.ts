import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import {
  TASK_EXTRACT_ABI_JSON,
  TASK_GET_SELECTED_ARTIFACTS,
} from "../task-names";
import fs from "fs";

subtask(TASK_EXTRACT_ABI_JSON).setAction(async function (args, hre) {
  const abiPath = hre.config.paths.abi;
  const selectedNames = hre.config.contractsToExtractAbi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run(TASK_GET_SELECTED_ARTIFACTS);

  // create abi directory if it doesn't exist
  await fs.promises.mkdir(abiPath, { recursive: true });

  // write abi files
  const writePromises = artifacts.map(({ abi }, index) =>
    fs.promises.writeFile(
      `${abiPath}/${selectedNames[index]}.json`,
      JSON.stringify(abi)
    )
  );

  await Promise.all(writePromises);
});
