import { EditorElementHistoryData } from './editor-history-pre-serialize.class';

export class EditorHistoryManager {
  public static MAX_UNDO_LENGTH = 100;
  public static MAX_REDO_LENGTH = 100;

  private get isUndoListFull(): boolean {
    return this.undoHistory.length >= EditorHistoryManager.MAX_UNDO_LENGTH;
  }

  private get isRedoListFull(): boolean {
    return this.redoHistory.length >= EditorHistoryManager.MAX_REDO_LENGTH;
  }

  public currentState: EditorElementHistoryData[] = [];
  public undoHistory: EditorElementHistoryData[][] = [];
  public redoHistory: EditorElementHistoryData[][] = [];

  public reset(currentState: EditorElementHistoryData[]): void {
    this.undoHistory = [];
    this.redoHistory = [];
    this.currentState = this.avoidMemoryReferenceToHistory(currentState);
  }

  public append(data: EditorElementHistoryData[]): EditorElementHistoryData[] {
    const normalizedData = this.avoidMemoryReferenceToHistory(data);

    if (this.isUndoListFull) {
      this.undoHistory.shift();
    }
    this.undoHistory.push(this.currentState);
    this.currentState = normalizedData;
    this.redoHistory.splice(0);
    return data;
  }

  public hasUndo(): boolean {
    return Boolean(this.undoHistory?.length);
  }

  public undo(): EditorElementHistoryData[] {
    if (this.currentState) {
      if (this.isRedoListFull) {
        this.redoHistory.shift();
      }
      this.redoHistory.push(this.currentState);
    }
    const historyItem = this.undoHistory.pop();
    this.currentState = this.avoidMemoryReferenceToHistory(historyItem);
    return historyItem;
  }

  public hasRedo(): boolean {
    return Boolean(this.redoHistory?.length);
  }

  public redo(): EditorElementHistoryData[] {
    if (this.currentState) {
      this.undoHistory.push(this.currentState);
    }
    const item = this.redoHistory.pop();
    this.currentState = this.avoidMemoryReferenceToHistory(item);
    return item;
  }

  private avoidMemoryReferenceToHistory(data: EditorElementHistoryData[]): EditorElementHistoryData[] {
    return JSON.parse(JSON.stringify(data));
  }
}
