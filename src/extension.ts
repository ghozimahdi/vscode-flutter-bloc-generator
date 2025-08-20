import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

function registerCommands(context: vscode.ExtensionContext) {
  // Register BLoC command
  let disposable = vscode.commands.registerCommand(
    "gm.extension.new-bloc",
    async (uri?: vscode.Uri) => {
      // Get the current workspace folder
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      // Prompt user for bloc name
      const blocName = await vscode.window.showInputBox({
        prompt: "Enter BLoC name (e.g., user, product, search_suggestion)",
        placeHolder: "user",
        validateInput: (value) => {
          if (!value || value.trim() === "") {
            return "BLoC name cannot be empty";
          }
          if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
            return "BLoC name must start with a letter and contain only letters, numbers, and underscores";
          }
          return null;
        },
      });

      if (!blocName) {
        return;
      }

      // Get the directory where to create the files
      let targetDir: string;

      // Use the URI from context menu if available, otherwise use active editor
      if (uri) {
        // Check if it's a file or folder
        const stat = await vscode.workspace.fs.stat(uri);
        if (stat.type === vscode.FileType.Directory) {
          targetDir = uri.fsPath;
        } else {
          targetDir = path.dirname(uri.fsPath);
        }
      } else {
        // Check if there's an active editor
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          targetDir = path.dirname(activeEditor.document.uri.fsPath);
        } else {
          // Use the first workspace folder
          targetDir = workspaceFolders[0].uri.fsPath;
        }
      }

      // Create the bloc files
      try {
        await createBlocFiles(blocName, targetDir);
        vscode.window.showInformationMessage(
          `BLoC files created successfully: ${blocName}_bloc.dart, ${blocName}_event.dart, ${blocName}_state.dart`
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to create BLoC files: ${error}`);
      }
    }
  );

  // Register Cubit command
  let cubitDisposable = vscode.commands.registerCommand(
    "gm.extension.new-cubit",
    async (uri?: vscode.Uri) => {
      // Get the current workspace folder
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      // Prompt user for cubit name
      const cubitName = await vscode.window.showInputBox({
        prompt: "Enter Cubit name (e.g., user, product, search_suggestion)",
        placeHolder: "user",
        validateInput: (value) => {
          if (!value || value.trim() === "") {
            return "Cubit name cannot be empty";
          }
          if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
            return "Cubit name must start with a letter and contain only letters, numbers, and underscores";
          }
          return null;
        },
      });

      if (!cubitName) {
        return;
      }

      // Get the directory where to create the files
      let targetDir: string;

      // Use the URI from context menu if available, otherwise use active editor
      if (uri) {
        // Check if it's a file or folder
        const stat = await vscode.workspace.fs.stat(uri);
        if (stat.type === vscode.FileType.Directory) {
          targetDir = uri.fsPath;
        } else {
          targetDir = path.dirname(uri.fsPath);
        }
      } else {
        // Check if there's an active editor
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          targetDir = path.dirname(activeEditor.document.uri.fsPath);
        } else {
          // Use the first workspace folder
          targetDir = workspaceFolders[0].uri.fsPath;
        }
      }

      // Create the cubit files
      try {
        await createCubitFiles(cubitName, targetDir);
        vscode.window.showInformationMessage(
          `Cubit files created successfully: ${cubitName}_cubit.dart, ${cubitName}_state.dart`
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to create Cubit files: ${error}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(cubitDisposable);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("GM BLoC Generator: Extension activation started");
  
  // Always register commands first
  registerCommands(context);
  
  // Check if it's a Flutter project for additional features
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    console.log("GM BLoC Generator: No workspace folder found, but commands are registered");
    return;
  }

  const pubspecPath = path.join(workspaceFolders[0].uri.fsPath, "pubspec.yaml");
  if (!fs.existsSync(pubspecPath)) {
    console.log("GM BLoC Generator: No pubspec.yaml found, but commands are registered");
    return;
  }

  const pubspecContent = fs.readFileSync(pubspecPath, "utf8");
  const isFlutterProject = pubspecContent.includes("flutter:");

  if (!isFlutterProject) {
    console.log("GM BLoC Generator: Not a Flutter project, but commands are registered");
    return;
  }

  console.log("GM BLoC Generator: Flutter project detected, extension is fully active!");
}

async function createBlocFiles(
  blocName: string,
  targetDir: string
): Promise<void> {
  const name = blocName.toLowerCase();
  // Convert snake_case to PascalCase for class names
  const Name = blocName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  // BLoC file template
  const blocTemplate = `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part '${name}_bloc.freezed.dart';
part '${name}_event.dart';
part '${name}_state.dart';

@injectable
class ${Name}Bloc extends Bloc<${Name}Event, ${Name}State> {
  ${Name}Bloc() : super(const ${Name}State()) {
    on<_InitEvent>(_initEvent);
  }

  Future<void> _initEvent(
    _InitEvent event,
    Emitter<${Name}State> emit,
  ) async {}
}
`;

  // Event file template
  const eventTemplate = `part of '${name}_bloc.dart';

@freezed
class ${Name}Event with _$${Name}Event {
  const factory ${Name}Event.init() = _InitEvent;
}
`;

  // State file template
  const stateTemplate = `part of '${name}_bloc.dart';

@freezed
class ${Name}State with _$${Name}State {
  const factory ${Name}State({
    @Default(Get${Name}State.idle()) Get${Name}State ${pascalToCamelCase(Name)}State,
  }) = _${Name}State;
}

@freezed
abstract class Get${Name}State with _$Get${Name}State {
  const factory Get${Name}State.idle() = _Get${Name}IdleState;
  const factory Get${Name}State.loading() = Get${Name}LoadingState;
  const factory Get${Name}State.error() = Get${Name}ErrorState;
  const factory Get${Name}State.done() = Get${Name}DoneState;
}
`;

  // Create the files
  const blocFilePath = path.join(targetDir, `${name}_bloc.dart`);
  const eventFilePath = path.join(targetDir, `${name}_event.dart`);
  const stateFilePath = path.join(targetDir, `${name}_state.dart`);

  // Check if files already exist
  if (
    fs.existsSync(blocFilePath) ||
    fs.existsSync(eventFilePath) ||
    fs.existsSync(stateFilePath)
  ) {
    const overwrite = await vscode.window.showWarningMessage(
      "Some BLoC files already exist. Do you want to overwrite them?",
      "Yes",
      "No"
    );
    if (overwrite !== "Yes") {
      return;
    }
  }

  // Write files
  fs.writeFileSync(blocFilePath, blocTemplate);
  fs.writeFileSync(eventFilePath, eventTemplate);
  fs.writeFileSync(stateFilePath, stateTemplate);

  // Open the bloc file in the editor
  const blocUri = vscode.Uri.file(blocFilePath);
  await vscode.window.showTextDocument(blocUri);
}

async function createCubitFiles(
  cubitName: string,
  targetDir: string
): Promise<void> {
  const name = cubitName.toLowerCase();
  // Convert snake_case to PascalCase for class names
  const Name = cubitName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  // Cubit file template
  const cubitTemplate = `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';

part '${name}_cubit.freezed.dart';
part '${name}_state.dart';

@injectable
class ${Name}Cubit extends Cubit<${Name}State> {
  ${Name}Cubit() : super(const ${Name}State());

  void init() {
    // TODO: Implement init logic
  }
}
`;

  // State file template
  const stateTemplate = `part of '${name}_cubit.dart';

@freezed
class ${Name}State with _$${Name}State {
  const factory ${Name}State({
    @Default(Get${Name}State.idle()) Get${Name}State ${pascalToCamelCase(Name)}State,
  }) = _${Name}State;
}

@freezed
abstract class Get${Name}State with _$Get${Name}State {
  const factory Get${Name}State.idle() = _Get${Name}IdleState;
  const factory Get${Name}State.loading() = Get${Name}LoadingState;
  const factory Get${Name}State.error() = Get${Name}ErrorState;
  const factory Get${Name}State.done() = Get${Name}DoneState;
}
`;

  // Create the files
  const cubitFilePath = path.join(targetDir, `${name}_cubit.dart`);
  const stateFilePath = path.join(targetDir, `${name}_state.dart`);

  // Check if files already exist
  if (fs.existsSync(cubitFilePath) || fs.existsSync(stateFilePath)) {
    const overwrite = await vscode.window.showWarningMessage(
      "Some Cubit files already exist. Do you want to overwrite them?",
      "Yes",
      "No"
    );
    if (overwrite !== "Yes") {
      return;
    }
  }

  // Write files
  fs.writeFileSync(cubitFilePath, cubitTemplate);
  fs.writeFileSync(stateFilePath, stateTemplate);

  // Open the cubit file in the editor
  const cubitUri = vscode.Uri.file(cubitFilePath);
  await vscode.window.showTextDocument(cubitUri);
}

export function deactivate() {}

function pascalToCamelCase(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}