import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";
import { promisify } from "util";

export async function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");
  const globPromise = promisify(glob);

  try {
    const files = await globPromise("**/**.test.ts", { cwd: testsRoot });

    // Add files to the test suite
    files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

    return new Promise<void>((resolve, reject) => {
      try {
        // Run the mocha test
        mocha.run((failures: number) => {
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`));
          } else {
            resolve();
          }
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  } catch (err) {
    console.error("Error loading test files:", err);
    throw err;
  }
}
