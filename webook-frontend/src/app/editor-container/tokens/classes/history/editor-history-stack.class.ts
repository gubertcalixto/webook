import { EditorCommand } from '../commands/editor-command.abstract.class';

export class EditorHistoryManager {
  public commands: EditorCommand[] = [];

  public add(command: EditorCommand): void {
    this.commands.push(command);
  }

  public remove(): EditorCommand {
    return this.commands.pop();
  }

  public getCurrent(shouldRemove?: boolean): EditorCommand {
    if (!shouldRemove) {
      return this.commands[this.commands.length - 1];
    }
    return this.remove();
  }
}
