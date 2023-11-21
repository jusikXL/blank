import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import { selectedNames } from "../../constants";
import { toConstantCase } from "../../helpers";
import fs from "fs";
import "./get-selected-artifacts";

subtask("extract-abi-ts").setAction(async function (args, hre) {
  const abiPath = hre.config.paths.abi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run("get-selected-artifacts", {
    selectedNames: selectedNames,
  });

  // create abi directory if it doesn't exist
  await fs.promises.mkdir(abiPath, { recursive: true });

  // write abi files
  const writePromises = artifacts.map(({ abi }, index) => {
    const selectedName = selectedNames[index];

    const content = `export const ${toConstantCase(
      selectedName
    )}_ABI = ${JSON.stringify(abi)} as const;\n`;

    fs.promises.writeFile(`${abiPath}/${selectedName}.ts`, content);
  });

  await Promise.all(writePromises);
});
