# Changelog

All notable changes to the GM BLoC Generator extension will be documented in this file.

## [1.0.0] - 2025-08-20

### Fixed

- **CRITICAL**: Fixed Freezed generation error that caused `'_$Get{Name}StateImpl' is missing implementations` error
- Corrected inconsistent state factory naming in generated templates
- Fixed state factory naming pattern from `_Get${Name}IdleState` to proper freezed convention
- Resolved Xcode compilation errors related to freezed generated code

### Changed

- **BREAKING**: Updated state template structure for better consistency
- State factory constructors now use consistent naming pattern
- Improved freezed annotation compatibility
- Enhanced state template generation to prevent freezed errors

### Added

- Better error prevention in generated freezed code
- Improved state factory naming consistency
- Enhanced template validation

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

#### Fixed State Template (v1.0.0+):

```dart
@freezed
abstract class GetUserState with _$GetUserState {
  const factory GetUserState.idle() = UserIdleState;
  const factory GetUserState.loading() = UserLoadingState;
  const factory GetUserState.error() = UserErrorState;
  const factory GetUserState.done() = UserDoneState;
}
```

#### Broken State Template (v0.0.8 and below - CAUSES FREEZED ERROR):

```dart
@freezed
abstract class GetUserState with _$GetUserState {
  const factory GetUserState.idle() = _GetUserIdleState;  // ❌ This causes freezed error
  const factory GetUserState.loading() = GetUserLoadingState;
  const factory GetUserState.error() = GetUserErrorState;
  const factory GetUserState.done() = GetUserDoneState;
}
```

#### Full State Template Structure:

```dart
@freezed
class UserState with _$UserState {
  const factory UserState({
    @Default(GetUserState.idle()) GetUserState userState,
  }) = _UserState;
}

@freezed
abstract class GetUserState with _$GetUserState {
  const factory GetUserState.idle() = UserIdleState;
  const factory GetUserState.loading() = UserLoadingState;
  const factory GetUserState.error() = UserErrorState;
  const factory GetUserState.done() = UserDoneState;
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
