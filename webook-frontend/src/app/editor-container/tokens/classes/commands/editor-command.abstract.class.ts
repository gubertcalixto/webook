export abstract class EditorCommand {

  public undo(): void { }

  abstract execute(...args: any[]): void;
}

