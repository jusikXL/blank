import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { task } from "hardhat/config";
import { ManuvantaraPluginError } from "../../errors";
import {
  TASK_EXTRACT_ABI,
  TASK_EXTRACT_ABI_CLIENT,
  TASK_EXTRACT_ABI_JSON,
  TASK_EXTRACT_ABI_TS,
} from "../task-names";

import "./json";
import "./ts";
import "./client";

task(TASK_EXTRACT_ABI, "Extracts ABI of the contracts")
  .addFlag("json", "Extracts ABI in json format")
  .addFlag(
    "ts",
    "Extracts ABI in ts format" //https://wagmi.sh/react/typescript#type-inference
  )
  .addFlag(
    "client",
    "Extracts ABI in ts format for client" //https://wagmi.sh/react/typescript#type-inference
  )
  .setAction(async function (args, hre) {
    try {
      await hre.run(TASK_COMPILE);
    } catch {
      throw new ManuvantaraPluginError("Could not compile the project");
    }

    const abiPath = hre.config.paths.abi;

    // TODO: switch case
    if (args.json) {
      await hre.run(TASK_EXTRACT_ABI_JSON, { abiPath });
    }
    if (args.ts) {
      await hre.run(TASK_EXTRACT_ABI_TS, { abiPath });
    }
    if (args.client) {
      await hre.run(TASK_EXTRACT_ABI_CLIENT);
    }
  });
