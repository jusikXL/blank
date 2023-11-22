# hardhat-ts-plugin-abi-extractor

ABI extractor supporting json and ts (wagmi) formats

[Hardhat project](https://github.com/manuvantara/project-royex/tree/master/contracts) plugin example.

## What

This plugin seamlessly extracts the ABI of specified smart contracts into your chosen folder. It supports various formats, including JSON and TypeScript, with a special focus on TypeScript integration using [Wagmi](https://wagmi.sh/react/typescript#type-inference).

## Installation

```bash
npm install hardhat-ts-plugin-abi-extractor
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-ts-plugin-abi-extractor");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-ts-plugin-abi-extractor";
```

## Tasks

This plugin adds the extract-abi task to Hardhat:

```shell
npx hardhat help extract-abi
```

## Configuration

Key Configuration Fields:
`contractsToExtractAbi`: Specify the names of the contracts for which you want to extract the ABI. This field extends the `HardhatUserConfig`.

`abi`: Define the directory path where the extracted ABI files will be stored ("abi" by default). This path is a part of the `ProjectPathsUserConfig` object.

`clientAbiFile`: Set the path to an existing file that will be updated with the combined ABI data from the specified contracts in `contractsToExtractAbi`.

This is an example of how to set it:

```js
module.exports = {
  contractsToExtractAbi: ["Lock", "Lock2"],
  paths: {
    abi: "somepath",
    clientAbiFile: "somepath/client.ts",
  },
};
```

## Usage

You need to take no additional steps for this plugin to work.
