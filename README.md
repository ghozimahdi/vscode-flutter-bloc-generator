# GM BLoC Generator Demo

This demo shows what files are generated when you use the GM BLoC Generator extension.

## About

**GM BLoC Generator** is a VS Code extension that helps Flutter developers quickly generate BLoC (Business Logic Component) files with proper templates using Freezed and Injectable.

### Created by
**Ghozi Mahdi** - Flutter Developer from Indonesia 🇮🇩

### Support the Developer
If you find this extension helpful, consider supporting the development:

- ☕ **Buy me a coffee**: [Ko-fi](https://ko-fi.com/ghozimahdi)
- 💰 **Saweria**: [Saweria](https://saweria.co/ghozimahdi)
- ⭐ **GitHub Sponsors**: [GitHub Sponsors](https://github.com/sponsors/ghozimahdi)

## Example: Creating a "User" BLoC

When you run the extension and enter "user" as the BLoC name, it will create three files:

### user_bloc.dart
```dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'user_bloc.freezed.dart';
part 'user_event.dart';
part 'user_state.dart';

@injectable
class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(const UserState.idle()) {
    on<_InitEvent>(_initEvent);
  }

  Future<void> _initEvent(
    _InitEvent event,
    Emitter<UserState> emit,
  ) async {}
}
```

### user_event.dart
```dart
part of 'user_bloc.dart';

@freezed
class UserEvent with _$UserEvent {
  const factory UserEvent.init() = _InitEvent;
}
```

### user_state.dart
```dart
part of 'user_bloc.dart';

@freezed
class UserState with _$UserState {
  const factory UserState.idle() = UserIdleState;
  const factory UserState.done() = UserDoneState;
}
```

## Example: Creating a "Product" BLoC

When you run the extension and enter "product" as the BLoC name, it will create:

### product_bloc.dart
```dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'product_bloc.freezed.dart';
part 'product_event.dart';
part 'product_state.dart';

@injectable
class ProductBloc extends Bloc<ProductEvent, ProductState> {
  ProductBloc() : super(const ProductState.idle()) {
    on<_InitEvent>(_initEvent);
  }

  Future<void> _initEvent(
    _InitEvent event,
    Emitter<ProductState> emit,
  ) async {}
}
```

### product_event.dart
```dart
part of 'product_bloc.dart';

@freezed
class ProductEvent with _$ProductEvent {
  const factory ProductEvent.init() = _InitEvent;
}
```

### product_state.dart
```dart
part of 'product_bloc.dart';

@freezed
class ProductState with _$ProductState {
  const factory ProductState.idle() = ProductIdleState;
  const factory ProductState.done() = ProductDoneState;
}
```

## How to Use

### Method 1: Right-click on Folder (Recommended)
1. **Navigate to your bloc folder**: Go to your Flutter project's bloc folder (e.g., `lib/bloc/`, `lib/src/bloc/`)
2. **Right-click on the folder**: Right-click on the bloc folder where you want to create the files
3. **Select "Create BLoC Files"**: Choose the command from the context menu
4. **Enter BLoC name**: Type your BLoC name (e.g., "user", "product", "auth")
5. **Files created**: Three files will be created in the selected folder

### Method 2: Command Palette
1. **Open Command Palette**: Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. **Run command**: Type "Create BLoC Files" and select it
3. **Enter name**: Type your BLoC name (e.g., "user", "product", "auth")
4. **Files created**: Three files will be created in the current directory

## Features

- ✅ Automatic file naming with proper casing
- ✅ Template-based generation with Freezed and Injectable
- ✅ Input validation (must start with letter, alphanumeric + underscore only)
- ✅ Overwrite protection (asks before overwriting existing files)
- ✅ Context-aware (creates files in current directory)
- ✅ Opens the main bloc file after creation
- ✅ Only works in Flutter/Dart projects
- ✅ Appears in separate section in context menu 