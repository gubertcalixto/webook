import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@oath/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';

import { UserPreferencesService } from './user-preferences.service';

@Component({
  selector: 'wb-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPreferencesComponent implements OnDestroy {
  private subs: Subscription[] = [];
  private hasInitialPreference = false;
  public form: FormGroup;
  public errorDuringSave: boolean;
  public isLoading = true;
  public isSaving = false;

  constructor(
    public userPreferencesService: UserPreferencesService,
    public userService: UserService,
    public documentService: DocumentService,
    private fb: FormBuilder,
    private nzModal: NzModalService,
    private notificationService: NzNotificationService
  ) {
    this.subs.push(this.userPreferencesService.hasLoadedSubject.pipe(filter((loaded) => loaded)).subscribe(() => {
      const userPreferences = this.userPreferencesService.getUserPreferences();
      this.hasInitialPreference = Boolean(userPreferences);
      this.form = this.fb.group({
        autoplayAudios: [Boolean(userPreferences?.autoplayAudios)],
        autoplayVideos: [Boolean(userPreferences?.autoplayVideos)],
        invisibleMode: [Boolean(userPreferences?.invisibleMode)],
        newsletterActivated: [Boolean(userPreferences?.newsletterActivated)]
      });
      this.isLoading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  public save(): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    this.errorDuringSave = false;

    const autoplayAudios = this.form.get('autoplayAudios').value;
    const autoplayVideos = this.form.get('autoplayVideos').value;
    const invisibleMode = this.form.get('invisibleMode').value;
    const newsletterActivated = this.form.get('newsletterActivated').value;

    const request = this.hasInitialPreference
      ? this.userPreferencesService.updateUserPreferences(invisibleMode, newsletterActivated, autoplayAudios, autoplayVideos)
      : this.userPreferencesService.createUserPreferences(invisibleMode, newsletterActivated, autoplayAudios, autoplayVideos)

    this.subs.push(request.subscribe(() => {
      this.form.markAsPristine();
      this.isSaving = false;
      this.notificationService.success('Preferências Salvas', '');
    }, () => {
      this.isSaving = false;
      this.errorDuringSave = true;
      this.notificationService.error('Erro', 'Parece que aconteceu um problema ao salvar suas preferências. Tente mais tarde por favor');
    }));
  }

  public deleteAccount(): void {
    const deleteDocumentsFn = () => {
      return this.deleteDocumentsCall()
    }
    this.userService.deleteUser(deleteDocumentsFn);
  }

  public deleteDocuments(): void {
    this.nzModal.confirm({
      nzTitle: 'Você tem certeza que deseja apagar todos seus documentos?',
      nzContent: 'Todos seus documentos serão apagados, incluindo os privados.',
      nzOkText: 'Sim, tenho certeza',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteDocumentsCall().subscribe(),
      nzCancelText: 'Cancelar',
    });
  }

  private deleteDocumentsCall(): Observable<any> {
    return this.documentService.deleteAllMyDocument().pipe(
      first(),
      tap(() => {
        this.notificationService.success('Ação Concluida', 'Todos seus documentos foram deletados', {
          nzPlacement: 'topRight'
        });
      })
    );
  }
}
