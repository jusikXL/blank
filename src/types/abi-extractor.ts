import { ArgumentType } from "hardhat/types";

export const StringArgument: ArgumentType<string> = {
  name: "string",
  validate: (argName, argumentValue) => {
    if (typeof argumentValue !== "string") {
      throw new Error(`Argument ${argName} is not of type string`);
    }
  },
};
