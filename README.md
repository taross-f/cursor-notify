# VS Code Notify

A Visual Studio Code extension that sends desktop notifications for various events.

## Features

- 🔔 Send custom desktop notifications
- 👀 Watch Composer task completion
- 🎨 Custom icon support
- 🖥️ macOS support (minimum requirement)

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Cmd+P`
3. Type `ext install vscode-notify`
4. Press Enter

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/vscode-notify
cd vscode-notify

# Install dependencies
bun install

# Build
bun run build

# Package
bun x vsce package
```

## Usage

### Send Custom Notification

1. Press `Cmd+Shift+P`
2. Type `Send Notification`
3. Enter title and message

### Watch Composer Task

1. Press `Cmd+Shift+P`
2. Type `Watch Composer Task`
3. The extension will notify you when the task completes

## Requirements

- VS Code 1.60.0+
- macOS

## License

MIT 