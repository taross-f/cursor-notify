# VSCode Notify

A Visual Studio Code extension that allows you to send desktop notifications.

## Features

- Send desktop notifications with customizable title and message
- Optional custom icon support
- Works on macOS (minimum requirement)

## Installation

### From Visual Studio Code Marketplace

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "VSCode Notify"
4. Click Install

### From Source

1. Clone this repository:
```bash
git clone https://github.com/yourusername/vscode-notify.git
cd vscode-notify
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Package the extension:
```bash
npm install -g vsce
vsce package
```

5. Install the extension from the .vsix file:
   - In VS Code, go to Extensions (Ctrl+Shift+X)
   - Click on the "..." menu in the top-right of the Extensions view
   - Select "Install from VSIX..."
   - Navigate to and select the .vsix file you created

## Usage

1. Open the Command Palette (Ctrl+Shift+P)
2. Type "Send Notification" and select the command
3. Enter a title and message when prompted
4. A desktop notification will be displayed

## Requirements

- Visual Studio Code 1.60.0 or higher
- macOS (minimum requirement)

## Extension Settings

This extension does not contribute any settings yet.

## Known Issues

None at this time.

## Release Notes

### 0.1.0

Initial release of VSCode Notify.

## License

MIT 