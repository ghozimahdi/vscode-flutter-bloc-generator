# GM BLoC Generator Demo

This demo shows what files are generated when you use the GM BLoC Generator extension.

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

1. **Install the extension**: Install the `gm-bloc-generator-0.0.1.vsix` file
2. **Open Command Palette**: Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. **Run command**: Type "Create BLoC Files" and select it
4. **Enter name**: Type your BLoC name (e.g., "user", "product", "auth")
5. **Files created**: Three files will be created in the current directory

## Features

- ✅ Automatic file naming with proper casing
- ✅ Template-based generation with Freezed and Injectable
- ✅ Input validation (must start with letter, alphanumeric + underscore only)
- ✅ Overwrite protection (asks before overwriting existing files)
- ✅ Context-aware (creates files in current directory)
- ✅ Opens the main bloc file after creation 