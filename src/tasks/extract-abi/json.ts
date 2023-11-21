import { subtask } from "hardhat/config";
import { Artifact } from "hardhat/types";
import { selectedNames } from "../../constants";
import fs from "fs";

subtask("extract-abi-json").setAction(async function (args, hre) {
  const abiPath = hre.config.paths.abi;

  // get artifacts
  const artifacts: Artifact[] = await hre.run("get-selected-artifacts", {
    selectedNames: selectedNames,
  });

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
