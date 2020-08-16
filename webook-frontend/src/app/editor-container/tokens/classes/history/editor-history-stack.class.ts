import { EditorCommand } from '../commands/editor-command.abstract.class';

export class EditorHistoryManager {
  public commands: EditorCommand[] = [];
  public redoCommands: EditorCommand[] = [];

  public add(command: EditorCommand): void {
    this.commands.push(command);
    this.redoCommands = [];
  }

  public remove(): EditorCommand {
    const commandToRemove = this.commands.pop();
    this.redoCommands.push(commandToRemove);
    return commandToRemove;
  }

  public redo(): EditorCommand {
    const redoCommand = this.redoCommands.pop();
    if (redoCommand) {
      this.commands.push(redoCommand);
    }
    return redoCommand;
  }

  public getCurrent(shouldRemove?: boolean): EditorCommand {
    if (!shouldRemove) {
      return this.commands[this.commands.length - 1];
    }
    return this.remove();
  }
}
