import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@oath/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
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
    private nzNotificationService: NzNotificationService
  ) {
    this.subs.push(this.userPreferencesService.getUserPreferences().subscribe((userPreferences) => {
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
    }, () => {
      this.isSaving = false;
      this.errorDuringSave = true;
    }));
  }

  public deleteAccount(): void {
    this.userService.deleteUser();
  }

  public deleteDocuments(): void {
    const deleteCallback = () => {
      this.subs.push(this.documentService.deleteAllMyDocument().subscribe(res => {
        this.nzNotificationService.success('Ação Concluida', 'Todos seus documentos foram deletados', {
          nzPlacement: 'topRight'
        });
      }));
    };
    this.nzModal.confirm({
      nzTitle: 'Você tem certeza que deseja apagar todos seus documentos?',
      nzContent: 'Todos seus documentos serão apagados, incluindo os privados.',
      nzOkText: 'Sim, tenho certeza',
      nzOkType: 'danger',
      nzOnOk: () => deleteCallback(),
      nzCancelText: 'Cancelar',
    });
  }
}
