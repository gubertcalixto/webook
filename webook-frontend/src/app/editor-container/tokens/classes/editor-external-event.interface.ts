import { Subject } from 'rxjs';

export interface IEditorExternalEvent {
    hasUndo: boolean;
    hasRedo: boolean;
    eventSubject: Subject<string>;
}