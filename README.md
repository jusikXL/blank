# hardhat-ts-plugin-abi-extractor

ABI extractor supporting json, ts (wagmi) formats

[Hardhat](https://github.com/manuvantara/project-royex/tree/master/contracts) plugin example.

## What

Plugin extracts ABI of the selected contracts in a desirable format (json, ts wagmi)

## Installation

```bash
npm install hardhat-ts-plugin-abi-extractor
```

Import the plugin in your `hardhat.config.js`:

```js
require("<your plugin npm package name>");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "<your plugin npm package name>";
```

## Tasks

This plugin adds the extract-abi task to Hardhat:

```shell
npx hardhat help extract-abi
```

## Configuration

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`abi` field and `clientAbiFile` field. In addition, this plugin extends `HardhatUserConfig` with `contractsToExtractAbi` field, where you can specify for which contracts you would like to extract ABI.

`abi` is a path to the directory where abi files are supposed to be stored.
`clientAbiFile` is a path to the file (which should exist before) that will be overridden with the packed abi files from `contractsToExtractAbi`

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

There are no additional steps you need to take for this plugin to work.
