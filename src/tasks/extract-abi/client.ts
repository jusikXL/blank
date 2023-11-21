import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import { selectedNames } from "../../constants";
import { toConstantCase } from "../../helpers";
import { ManuvantaraPluginError } from "../../errors";
import fs from "fs";
import "./get-selected-artifacts";

subtask("extract-abi-client").setAction(async function (args, hre) {
  const clientAbiFilePath = hre.config.paths.abi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run("get-selected-artifacts", {
    selectedNames: selectedNames,
  });

  // write abi file
  const contents = artifacts
    .map(({ abi }, index) => {
      const constantName = toConstantCase(selectedNames[index]) + "_ABI";
      return `export const ${constantName} = ${JSON.stringify(abi)} as const;`;
    })
    .join("\n");

  try {
    await fs.promises.writeFile(clientAbiFilePath, contents);
  } catch {
    throw new ManuvantaraPluginError("Path to client abi file does not exist");
  }
});
