import * as assert from "assert";
import * as vscode from "vscode";
import { notify, activate, deactivate } from "../../extension";
import * as sinon from "sinon";
import * as path from "path";

// We can't easily mock node-notifier in VSCode extension tests
// so we'll just test that the function doesn't throw an error

suite("VSCode Notify Extension Test Suite", () => {
  const sandbox = sinon.createSandbox();

  setup(() => {
    // Set up test environment before each test
    sandbox.stub(vscode.window, "showInformationMessage").resolves();
  });

  teardown(() => {
    // Clean up after each test
    sandbox.restore();
  });

  test("Extension activation", async () => {
    const context = {
      subscriptions: [],
      extensionPath: "",
      extensionUri: vscode.Uri.file(""),
      globalState: new MockMemento(),
      workspaceState: new MockMemento(),
      environmentVariableCollection: {},
      extensionMode: vscode.ExtensionMode.Test,
      storageUri: vscode.Uri.file(""),
      globalStorageUri: vscode.Uri.file(""),
      logUri: vscode.Uri.file(""),
      storagePath: "",
      globalStoragePath: "",
      logPath: "",
      asAbsolutePath: (p: string) => p,
      secrets: {
        store: () => Promise.resolve(),
        get: () => Promise.resolve(""),
        delete: () => Promise.resolve(),
      },
    } as unknown as vscode.ExtensionContext;

    // Test activation
    await activate(context);
    assert.strictEqual(
      context.subscriptions.length,
      2,
      "Should register 2 commands"
    );
  });

  test("notify function parameters", async () => {
    const title = "Test Title";
    const message = "Test Message";
    const icon = path.join(__dirname, "../../../assets/icon.png");

    try {
      await notify(title, message, icon);
      assert.ok(true, "Notification sent successfully");
    } catch (error) {
      assert.fail("Should not throw an error");
    }
  });

  test("notify function without icon", async () => {
    const title = "Test Title";
    const message = "Test Message";

    try {
      await notify(title, message);
      assert.ok(true, "Notification sent successfully without icon");
    } catch (error) {
      assert.fail("Should not throw an error");
    }
  });

  test("sendNotification command registration", async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(
      commands.includes("vscode-notify.sendNotification"),
      "sendNotification command should be registered"
    );
  });

  test("watchComposer command registration", async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(
      commands.includes("vscode-notify.watchComposer"),
      "watchComposer command should be registered"
    );
  });

  test("deactivate function", () => {
    assert.doesNotThrow(() => {
      deactivate();
    }, "Deactivate should not throw an error");
  });
});

// Mock implementation of vscode.Memento
class MockMemento implements vscode.Memento {
  private storage = new Map<string, any>();

  get<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  update(key: string, value: any): Thenable<void> {
    this.storage.set(key, value);
    return Promise.resolve();
  }

  keys(): readonly string[] {
    return Array.from(this.storage.keys());
  }
}
