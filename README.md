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
  UserBloc() : super(const UserState()) {
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
  ProductBloc() : super(const ProductState()) {
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
  const factory ProductState({
    @Default(GetProductState.idle()) GetProductState productState,
  }) = _ProductState;
}

@freezed
abstract class GetProductState with _$ProductState {
  const factory GetProductState.idle() = _GetProductIdleState;
  const factory GetProductState.loading() = GetProductLoadingState;
  const factory GetProductState.error() = GetProductErrorState;
  const factory GetProductState.done() = GetProductDoneState;
}
```

## Example: Creating a "User" Cubit

When you run the Cubit command and enter "user" as the Cubit name, it will create two files:

### user_cubit.dart

```dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part 'user_cubit.freezed.dart';
part 'user_state.dart';

@injectable
class UserCubit extends Cubit<UserState> {
  UserCubit() : super(const UserState());

  void init() {
    // TODO: Implement init logic
  }
}
```

### user_state.dart

```dart
part of 'user_cubit.dart';

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

## How to Use

### Method 1: Right-click on Folder (Recommended)

1. **Navigate to your bloc folder**: Go to your Flutter project's bloc folder (e.g., `lib/bloc/`, `lib/src/bloc/`)
2. **Right-click on the folder**: Right-click on the bloc folder where you want to create the files
3. **Select command**: Choose either "GM: New Bloc" or "GM: New Cubit" from the context menu
4. **Enter name**: Type your BLoC/Cubit name (e.g., "user", "product", "auth")
5. **Files created**: Files will be created in the selected folder
   - **BLoC**: 3 files (bloc.dart, event.dart, state.dart)
   - **Cubit**: 2 files (cubit.dart, state.dart)

### Method 2: Command Palette

1. **Open Command Palette**: Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. **Run command**: Type "GM: New Bloc" or "GM: New Cubit" and select it
3. **Enter name**: Type your BLoC/Cubit name (e.g., "user", "product", "auth")
4. **Files created**: Files will be created in the current directory

## Features

- ✅ **BLoC & Cubit Generation**: Create both BLoC and Cubit files with proper templates
- ✅ **Advanced State Management**: Nested state structure with comprehensive state types (idle, loading, error, done)
- ✅ **Freezed Integration**: Full support for Freezed annotations and code generation
- ✅ **Injectable Support**: Automatic dependency injection setup with Injectable
- ✅ **Smart Naming**: Automatic file naming with proper casing (snake_case to PascalCase conversion)
- ✅ **Input Validation**: Must start with letter, alphanumeric + underscore only
- ✅ **Overwrite Protection**: Asks before overwriting existing files
- ✅ **Context-Aware**: Creates files in current directory or selected folder
- ✅ **Auto File Opening**: Opens the main bloc/cubit file after creation
- ✅ **Flutter Project Detection**: Works optimally in Flutter/Dart projects
- ✅ **Context Menu Integration**: Right-click on folders to generate files
- ✅ **Command Palette Support**: Available through VS Code command palette
