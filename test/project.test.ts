// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";
import fs from "fs";

import { useEnvironment } from "./helpers";

const TASK_EXTRACT_ABI = "extract-abi";

const ABI_PATH_TEST = "somepath";
const CLIENT_ABI_FILE_PATH_TEST = "somepath/client.ts";

const CONTRACTS_TO_EXTRACT_ABI = ["Lock", "Lock2"];

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

      for (const selectedName of CONTRACTS_TO_EXTRACT_ABI) {
        const abiFilePath = `${abiDirectory}/${selectedName}.json`;

        assert.isTrue(
          fs.existsSync(abiFilePath),
          `File ${selectedName} does not exist`
        );
      }
    });

    it("Should extract ABI in ts format", async function () {
      await this.hre.run(TASK_EXTRACT_ABI, {
        ts: true,
      });

      const abiDirectory = path.join(process.cwd(), ABI_PATH_TEST);
      assert.isTrue(fs.existsSync(abiDirectory));

      for (const selectedName of CONTRACTS_TO_EXTRACT_ABI) {
        const abiFilePath = `${abiDirectory}/${selectedName}.ts`;

        assert.isTrue(
          fs.existsSync(abiFilePath),
          `File ${selectedName} does not exist`
        );
      }
    });

    it("Should extract ABI in ts format for client", async function () {
      await this.hre.run(TASK_EXTRACT_ABI, {
        client: true,
      });

      assert.isTrue(
        fs.existsSync(CLIENT_ABI_FILE_PATH_TEST),
        `File does not exist`
      );
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
