# Changelog

All notable changes to the GM BLoC Generator extension will be documented in this file.

## [0.0.8] - 2025-08-06

### Fixed

- Fixed "command 'gm.extension.new-bloc' not found" error completely
- Extension now always registers commands regardless of Flutter project detection
- Improved command registration by separating it from Flutter project validation
- Enhanced activation logging for better debugging

### Changed

- **BREAKING**: Updated BLoC state template structure
- BLoC constructor now uses `super(const ${Name}State())` instead of `super(const ${Name}State.idle())`
- State template now includes nested state management pattern with `Get${Name}State`
- Added comprehensive state management with idle, loading, error, and done states
- Improved state structure for better scalability and maintainability

### Added

- Better extension activation flow with command registration priority
- Enhanced console logging for debugging extension issues
- More robust error handling and user feedback
- Improved template structure for both BLoC and Cubit patterns

### Template Examples

#### New BLoC State Template (v0.0.8+):

```dart
@freezed
class UserState with _$UserState {
  const factory UserState({
    @Default(GetUserState.idle()) GetUserState userState,
  }) = _UserState;
}

@freezed
abstract class GetUserState with _$UserState {
  const factory GetUserState.idle() = _GetUserIdleState;
  const factory GetUserState.loading() = GetUserLoadingState;
  const factory GetUserState.error() = GetUserErrorState;
  const factory GetUserState.done() = GetUserDoneState;
}
```

#### Old BLoC State Template (v0.0.7 and below):

```dart
@freezed
class UserState with _$UserState {
  const factory UserState.idle() = UserIdleState;
  const factory UserState.done() = UserDoneState;
}
```

## [0.0.7] - 2025-01-XX

### Fixed

- Fixed extension compatibility issues between VS Code and Cursor
- Improved command registration and activation events

## [0.0.6] - 2024-01-XX

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
