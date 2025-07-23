import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return;
  }

  const pubspecPath = path.join(workspaceFolders[0].uri.fsPath, "pubspec.yaml");
  if (!fs.existsSync(pubspecPath)) {
    return;
  }

  const pubspecContent = fs.readFileSync(pubspecPath, "utf8");
  const isFlutterProject = pubspecContent.includes("flutter:");

  if (!isFlutterProject) {
    console.log(
      "GM BLoC Generator: Not a Flutter project, skipping activation."
    );
    return;
  }

  console.log("GM BLoC Generator is now active!");

  let disposable = vscode.commands.registerCommand(
    "gm-bloc-generator.createBloc",
    async (uri?: vscode.Uri) => {
      // Get the current workspace folder
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      // Prompt user for bloc name
      const blocName = await vscode.window.showInputBox({
        prompt: "Enter BLoC name (e.g., user, product, auth)",
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

  context.subscriptions.push(disposable);
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
  ${Name}Bloc() : super(const ${Name}State.idle()) {
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
  const factory ${Name}State.idle() = ${Name}IdleState;
  const factory ${Name}State.done() = ${Name}DoneState;
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

export function deactivate() {}
