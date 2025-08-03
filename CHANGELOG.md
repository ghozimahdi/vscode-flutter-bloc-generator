# Changelog

All notable changes to the GM BLoC Generator extension will be documented in this file.

## [0.0.6] - 2024-01-XX

### Fixed
- Fixed VS Code compatibility issues (works in Cursor but not VS Code)
- Changed activation event from `workspaceContains:**/pubspec.yaml` to `onStartupFinished`
- Removed restrictive `when` conditions from command palette
- Improved Flutter project detection within commands
- Enhanced error messages for better user guidance

### Changed
- Extension now activates on startup instead of requiring pubspec.yaml detection
- Commands are always available in command palette
- Flutter project validation moved to command execution time
- Better error handling and user feedback

## [0.0.5] - 2024-01-XX

### Fixed
- Fixed "command 'gm.extension.new-bloc' not found" error
- Improved command registration and activation
- Enhanced error handling for extension activation
- Fixed marketplace installation issues

### Changed
- Updated extension activation events
- Improved Flutter project detection
- Enhanced user feedback and error messages

### Added
- Better troubleshooting documentation
- Improved installation guide
- Added development mode instructions

## [0.0.4] - 2024-01-XX

### Added
- Initial release of GM BLoC Generator
- BLoC file generation (bloc.dart, event.dart, state.dart)
- Cubit file generation (cubit.dart, state.dart)
- Context menu integration
- Command palette integration
- Freezed and Injectable support
- Flutter project detection

### Features
- Generate BLoC files with proper templates
- Generate Cubit files with proper templates
- Input validation for BLoC/Cubit names
- Overwrite protection for existing files
- Automatic file opening after generation
- Support for snake_case to PascalCase conversion

## Installation Notes

### For Users
- Install from VS Code Marketplace: Search "GM BLoC Generator"
- Install from VSIX: Download and use "Install from VSIX..."
- Development mode: Clone repo and press F5

### For Developers
- Clone repository
- Run `npm install`
- Run `npm run compile`
- Press F5 for development mode

## Known Issues

- Extension only activates in Flutter projects (by design)
- Requires `pubspec.yaml` file in workspace
- Commands only appear when right-clicking on folders

## Support

- GitHub Issues: [Report Issues](https://github.com/ghozimahdi/vscode-flutter-bloc-generator/issues)
- Email: ghozi.dev@gmail.com
- Development Mode: Use for testing and debugging 