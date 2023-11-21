import { subtask } from "hardhat/config";
import { ManuvantaraPluginError } from "../../errors";
import { TASK_GET_SELECTED_ARTIFACTS } from "../task-names";

subtask(TASK_GET_SELECTED_ARTIFACTS).setAction(async function (args, hre) {
  const selectedNames = hre.config.contractsToExtractAbi;

  const artifactPromises = selectedNames.map((selectedName) =>
    hre.artifacts.readArtifact(selectedName)
  );

  let artifacts;
  try {
    artifacts = await Promise.all(artifactPromises);
  } catch {
    throw new ManuvantaraPluginError(
      "Could not find artifacts for selected contracts"
    );
  }

  return artifacts;
});
