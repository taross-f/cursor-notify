import * as vscode from "vscode";
const notifier = require("node-notifier");
import * as path from "path";

/**
 * Send a desktop notification
 * @param title - The notification title
 * @param message - The notification message
 * @param icon - Optional path to an icon file
 * @returns A promise that resolves when the notification is shown
 */
export function notify(
  title: string,
  message: string,
  icon?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    notifier.notify(
      {
        title,
        message,
        icon: icon || path.join(__dirname, "../assets/icon.png"),
        sound: true,
        wait: false,
      },
      (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

/**
 * This method is called when your extension is activated
 * @param context - The extension context
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "vscode-notify" is now active!');

  // Send a test notification immediately
  notify("テスト通知", "VSCode拡張機能のテスト通知です").catch((error) => {
    vscode.window.showErrorMessage(`通知エラー: ${error}`);
  });

  // Register the command to send a notification
  let disposable = vscode.commands.registerCommand(
    "vscode-notify.sendNotification",
    async () => {
      // Get the title from the user
      const title = await vscode.window.showInputBox({
        placeHolder: "Enter notification title",
        prompt: "Enter the title for your notification",
      });

      if (!title) {
        return; // User cancelled
      }

      // Get the message from the user
      const message = await vscode.window.showInputBox({
        placeHolder: "Enter notification message",
        prompt: "Enter the message for your notification",
      });

      if (!message) {
        return; // User cancelled
      }

      try {
        await notify(title, message);
        vscode.window.showInformationMessage(
          `Notification sent: ${title} - ${message}`
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error sending notification: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }
  );

  // Composerの終了を監視するコマンド
  let composerWatcher = vscode.commands.registerCommand(
    "vscode-notify.watchComposer",
    async () => {
      const terminal = vscode.window.terminals.find((t) =>
        t.name.toLowerCase().includes("composer")
      );

      if (terminal) {
        terminal.processId.then(async (processId) => {
          if (processId) {
            const watcher = setInterval(async () => {
              try {
                process.kill(processId, 0); // プロセスの存在確認
              } catch (e) {
                // プロセスが終了している
                clearInterval(watcher);
                await notify(
                  "Composer Task Completed",
                  "Composer has finished its operation"
                );
              }
            }, 1000);
          }
        });
      }
    }
  );

  context.subscriptions.push(disposable, composerWatcher);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {}
