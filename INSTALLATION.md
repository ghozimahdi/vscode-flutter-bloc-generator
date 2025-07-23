# GM BLoC Generator - Installation Guide

This guide is for developers who want to install, develop, or modify the GM BLoC Generator extension.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- VS Code
- TypeScript knowledge (for development)

## Installation for Development

### 1. Clone the Repository
```bash
git clone <repository-url>
cd gm-bloc-vscode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile the Extension
```bash
npm run compile
```

### 4. Run in Development Mode
1. Open the project in VS Code
2. Press `F5` to run the extension in a new Extension Development Host window
3. The extension will be loaded in the new window

## Development Workflow

### Watch Mode (Auto-compile)
```bash
npm run watch
```
This will automatically recompile the extension when you make changes to the TypeScript files.

### Manual Compilation
```bash
npm run compile
```

### Create VSIX Package
```bash
npm install -g vsce
vsce package
```

## Project Structure

```
gm-bloc-vscode/
├── src/
│   └── extension.ts          # Main extension code
├── out/                      # Compiled JavaScript files
├── package.json              # Extension configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # User documentation (demo)
├── INSTALLATION.md           # This file (developer guide)
├── demo.md                   # Example usage
└── LICENSE                   # MIT License
```

## Key Files

### package.json
- Extension metadata and configuration
- Command definitions
- Menu contributions
- Activation events

### src/extension.ts
- Main extension logic
- Command handlers
- File generation templates
- Flutter project detection

### tsconfig.json
- TypeScript compiler options
- Output directory configuration

## Testing

### Test in Development Host
1. Press `F5` to open Extension Development Host
2. Open a Flutter project
3. Right-click on a folder
4. Test "Create BLoC Files" command

### Debug
1. Open Developer Tools (`Cmd+Option+I` on macOS)
2. Check console for logs
3. Use breakpoints in extension.ts

## Building for Distribution

### Create VSIX Package
```bash
vsce package
```

### Install Locally
```bash
code --install-extension gm-bloc-generator-0.1.1.vsix
```

### Uninstall
```bash
code --uninstall-extension gm-bloc-generator
```

## Troubleshooting

### Extension Not Appearing
1. Check if compilation was successful
2. Restart VS Code completely
3. Check Developer Tools for errors

### Command Not Working
1. Verify Flutter project has `pubspec.yaml`
2. Check activation events in package.json
3. Look for errors in Output panel

### TypeScript Errors
1. Run `npm run compile` to see errors
2. Check tsconfig.json configuration
3. Ensure all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 