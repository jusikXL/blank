import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import {
  TASK_EXTRACT_ABI_TS,
  TASK_GET_SELECTED_ARTIFACTS,
} from "../task-names";
import { toConstantCase } from "../../helpers";
import fs from "fs";
import "./get-selected-artifacts";

subtask(TASK_EXTRACT_ABI_TS).setAction(async function (args, hre) {
  const abiPath = hre.config.paths.abi;
  const selectedNames = hre.config.contractsToExtractAbi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run(TASK_GET_SELECTED_ARTIFACTS);

  // create abi directory if it doesn't exist
  await fs.promises.mkdir(abiPath, { recursive: true });

  // write abi files
  const writePromises = artifacts.map(({ abi }, index) => {
    const selectedName = selectedNames[index];

    const content = `export const ${toConstantCase(
      selectedName
    )}_ABI = ${JSON.stringify(abi)} as const;\n`;

    return fs.promises.writeFile(`${abiPath}/${selectedName}.ts`, content);
  });

  await Promise.all(writePromises);
});
