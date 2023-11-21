// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";
import fs from "fs";

// import { ExampleHardhatRuntimeEnvironmentField } from "./types/abi-extractor";

import { useEnvironment } from "./helpers";

const ABI_PATH_DEFAULT = "abi";
const TASK_EXTRACT_ABI = "extract-abi";
const ABI_PATH_TEST = "somepath";
const sourceNames = ["Lock"];

describe("Integration tests examples", function () {
  // describe("Hardhat Runtime Environment extension", function () {
  //   useEnvironment("hardhat-project");

  //   it("Should add the example field", function () {
  //     assert.instanceOf(
  //       this.hre.example,
  //       ExampleHardhatRuntimeEnvironmentField
  //     );
  //   });

  //   it("The example field should say hello", function () {
  //     assert.equal(this.hre.example.sayHello(), "hello");
  //   });
  // });

  describe("HardhatConfig extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the abi path to the config", function () {
      assert.equal(
        this.hre.config.paths.abi,
        path.join(process.cwd(), ABI_PATH_TEST)
      );
    });
  });

  describe("ABI extraction", function () {
    useEnvironment("hardhat-project");

    it("Should extract ABI in json format", async function () {
      await this.hre.run(TASK_EXTRACT_ABI, {
        json: true,
      });

      const abiDirectory = path.join(process.cwd(), ABI_PATH_TEST);
      assert.isTrue(fs.existsSync(abiDirectory));

      for (const sourceName of sourceNames) {
        const abiFilePath = `${abiDirectory}/${sourceName}.json`;

        assert.isTrue(
          fs.existsSync(abiFilePath),
          `File ${sourceName} does not exist`
        );
      }
    });

    it("Should extract ABI in ts format", async function () {
      await this.hre.run(TASK_EXTRACT_ABI, {
        ts: true,
      });
    });
  });
});

// describe("Unit tests examples", function () {
//   describe("ExampleHardhatRuntimeEnvironmentField", function () {
//     describe("sayHello", function () {
//       it("Should say hello", function () {
//         const field = new ExampleHardhatRuntimeEnvironmentField();
//         assert.equal(field.sayHello(), "hello");
//       });
//     });
//   });
// });
