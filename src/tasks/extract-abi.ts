import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { subtask, task } from "hardhat/config";
import { ManuvantaraPluginError } from "../errors";
import { StringArgument } from "../types/abi-extractor";
import { TASK_EXTRACT_ABI, sourceNames } from "../constants";
import path from "path";
import fs from "fs";

task(TASK_EXTRACT_ABI, "Extracts ABI of the contracts")
  .addFlag("json", "Extracts ABI in json format")
  .addFlag(
    "ts",
    "Extracts ABI in ts format" //https://wagmi.sh/react/typescript#type-inference
  )
  .setAction(async function (args, hre) {
    try {
      await hre.run(TASK_COMPILE);
    } catch {
      throw new ManuvantaraPluginError("Could not compile the project");
    }

    const abiDirectory = hre.config.paths.abi;

    console.log(args);

    // TODO: switch case
    if (args.json) {
      await hre.run("extract-abi-json", { abiDirectory });
    }
  });

subtask("extract-abi-json")
  .addParam(
    "abiDirectory",
    "path where to extract abi to",
    undefined,
    StringArgument
  )
  .setAction(async function (args, hre) {
    const { abiDirectory } = args;

    const outputs = await Promise.all(
      sourceNames.map(async (sourceName) => {
        const { abi } = await hre.artifacts.readArtifact(sourceName);
        return { sourceName, abi };
      })
    );

    for (const { sourceName, abi } of outputs) {
      const destination = path.resolve(abiDirectory, sourceName) + ".json";

      // TODO: async
      // TODO: do not create directory if it already exists
      //fs.mkdirSync(path.dirname(destination));
      fs.writeFileSync(
        `${abiDirectory}/${sourceName}.json`,
        JSON.stringify(abi)
      );
    }
  });

// subtask(
//   'export-abi-json'
// ).addParam(
//   'abiGroupConfig', 'a single abi-exporter config object', undefined, types.any
// ).setAction(async function (args, hre) {

// abiScope.task("json", "").setAction(async (args, hre) => {
//   try {
//     await hre.run(TASK_COMPILE);
//   } catch (e) {
//     throw new HardhatPluginError("extract-abi", e.message);
//   }

//   console.log(`Check out ABI files at /abi`);
// });

// abiScope
//   .task("ts", "Extracts ABI in a format of ts files of each contract")
//   .setAction(async (args, hre) => {
//     try {
//       await hre.run(TASK_COMPILE);
//     } catch (e) {
//       throw new HardhatPluginError("extract-abi", e.message);
//     }

//     for (const sourceName of sourceNames) {
//       const { abi } = await hre.artifacts.readArtifact(sourceName);

//       const content = `export const ${toConstantCase(
//         sourceName
//       )}_ABI = ${JSON.stringify(abi)} as const;`;

//       fs.writeFileSync(`./abi/${sourceName}.ts`, content);
//     }

//     console.log(`Check out ABI files at /abi`);
//   });

// abiScope
//   .task("client", "Extracts ABI for client purposes")
//   .setAction(async (args, hre) => {
//     try {
//       await hre.run(TASK_COMPILE);
//     } catch (e) {
//       throw new HardhatPluginError("extract-abi", e.message);
//     }

//     let contents = "";
//     for (const sourceName of sourceNames) {
//       const { abi } = await hre.artifacts.readArtifact(sourceName);

//       contents += `export const ${toConstantCase(
//         sourceName
//       )}_ABI = ${JSON.stringify(abi)} as const;\n`;
//     }

//     fs.writeFileSync(`../web/src/config/contracts.ts`, contents);
//     console.log(`/web/src/config/contracts.ts`);
//   });
