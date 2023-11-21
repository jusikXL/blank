import { ArgumentType } from "hardhat/types";
import { ManuvantaraPluginError } from "../errors";

export const StringArgument: ArgumentType<string> = {
  name: "string",
  validate: (argName, argumentValue) => {
    if (typeof argumentValue !== "string") {
      throw new ManuvantaraPluginError(
        `Argument ${argName} is not of type string`
      );
    }
  },
};

export const StringsArgument: ArgumentType<string[]> = {
  name: "string[]",
  validate: (argName, argumentValue) => {
    if (!Array.isArray(argumentValue)) {
      throw new ManuvantaraPluginError(`Argument ${argName} is not an array`);
    }
    if (!argumentValue.every((item) => typeof item === "string")) {
      throw new ManuvantaraPluginError(
        `Argument ${argName} should be an array of strings`
      );
    }
  },
};
