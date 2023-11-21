import { subtask } from "hardhat/config";
import { ManuvantaraPluginError } from "../../errors";
import { StringsArgument } from "../../types/abi-extractor";

subtask("get-selected-artifacts")
  .addParam("selectedNames", "Selected contracts", undefined, StringsArgument)
  .setAction(async function (args, hre) {
    const { selectedNames }: { selectedNames: string[] } = args;

    const artifactPromises = selectedNames.map((selectedName) =>
      hre.artifacts.readArtifact(selectedName)
    );

    let artifacts;
    try {
      artifacts = await Promise.all(artifactPromises);
    } catch {
      throw new ManuvantaraPluginError(
        "Could not find artifacts for all selected contracts"
      );
    }

    return artifacts;
  });
