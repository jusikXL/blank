import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import {
  TASK_EXTRACT_ABI_CLIENT,
  TASK_GET_SELECTED_ARTIFACTS,
} from "../task-names";
import { toConstantCase } from "../../helpers";
import { ManuvantaraPluginError } from "../../errors";
import fs from "fs";
import "./get-selected-artifacts";

subtask(TASK_EXTRACT_ABI_CLIENT).setAction(async function (args, hre) {
  const clientAbiFilePath = hre.config.paths.clientAbiFile;
  const selectedNames = hre.config.contractsToExtractAbi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run(TASK_GET_SELECTED_ARTIFACTS);

  // write abi file
  const contents = artifacts
    .map(({ abi }, index) => {
      const constantName = toConstantCase(selectedNames[index]) + "_ABI";
      return `export const ${constantName} = ${JSON.stringify(abi)} as const;`;
    })
    .join("\n");

  if (fs.existsSync(clientAbiFilePath)) {
    await fs.promises.writeFile(clientAbiFilePath, contents);
  } else {
    throw new ManuvantaraPluginError("Path to client abi file does not exist");
  }
});
