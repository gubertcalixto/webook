import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wb-danger-zone-preferences',
  templateUrl: './danger-zone-preferences.component.html',
  styleUrls: ['./danger-zone-preferences.component.scss']
})
export class DangerZonePreferencesComponent {
  constructor(private modal: NzModalService) { }

  public deleteAccount(): void {
    const deleteCallback = () => {
      // TODO
      console.log('TODO - Delete Account');
    };
    this.modal.confirm({
      nzTitle: 'Você tem certeza que deseja apagar sua conta?',
      nzContent: 'Sua conta será apagada, bem como todos seus documentos. Contudo as suas ações dentro do site ainda serão mantidas.',
      nzOkText: 'Sim, tenho certeza',
      nzOkType: 'danger',
      nzOnOk: () => deleteCallback(),
      nzCancelText: 'Cancelar',
    });
  }

  public deleteDocuments(): void {
    const deleteCallback = () => {
      // TODO
      console.log('TODO - Delete Documents');
    };
    this.modal.confirm({
      nzTitle: 'Você tem certeza que deseja apagar todos seus documentos?',
      nzContent: 'Todos seus documentos serão apagados, incluindo os privados.',
      nzOkText: 'Sim, tenho certeza',
      nzOkType: 'danger',
      nzOnOk: () => deleteCallback(),
      nzCancelText: 'Cancelar',
    });
  }
}
