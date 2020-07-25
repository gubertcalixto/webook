import { EditorElementInstanceFrame } from '../element/element-instance/editor-element-instance-frame.class';
import { EditorCommand } from './editor-command.abstract.class';

export class EditorCopyCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // get selected component
    // copy component;
  }
}

export class EditorCutCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // Do Backup
    // Execute CopyCommand
    // Remove component from DOM
  }
}

export class EditorPasteCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // Do Backup
    // Get from copy
    // Render component in DOM
  }
}

export class EditorUndoCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // Get From History and eliminate from it
    // Do undo process
  }
}
export class EditorRedoCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // Get forward History
    // Do redo process
  }
}

export class EditorDeleteCommand extends EditorCommand {
  public execute(): void {
    // TODO
    // Get Selected Component
    // Remove from the DOM
  }
}

export class EditorUpdateFrameCommand extends EditorCommand {
  public execute(frame: EditorElementInstanceFrame): void {
    // TODO
    // Get Component
    // Update it's frame
  }
}

export class EditorUpdateDataCommand extends EditorCommand {
  public execute(data?: any): void {
    // TODO
    // Get  Component
    // Update it's data
  }
}

export class EditorAddElementCommand extends EditorCommand {
  public execute(data?: any): void {
    // TODO
    // Get Component
    // Render Component
  }
}
export class EditorDuplicateElementCommand extends EditorCommand {
  public execute(data?: any): void {
    // TODO
    // Get Component
    // Duplicate Component
  }
}

