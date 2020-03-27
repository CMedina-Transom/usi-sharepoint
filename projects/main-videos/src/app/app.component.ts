import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'shared-lib';
import { SharepointIntegrationService } from 'shared-lib';
import { MainFormDialogComponent } from './components/dialogs/main-form-dialog/main-form-dialog.component';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'mvs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog,
    private message: MessageService,
    private sis: SharepointIntegrationService
  ) { }
  bandAllVideos = false;
  globalId = 0;
  // Custom public methods
  ngOnInit() {
    this.readGlobal();
  }
  readGlobal()
  {
    const data = {
      select: ['Id', 'Lista', 'MostrarTodos'],
      filter: ['Lista eq \'MainVideos\''],
      top: 1
    };

    this.sis.read('Global', data).subscribe((response: any) => {
      console.log(response);
      if (response.value[0].MostrarTodos)
      {
        this.bandAllVideos = true;
      }
      else
      {
        this.bandAllVideos = false;
      }
      this.globalId=response.value[0].Id;
    });
  }
  oncheckChange()
  {
    this.bandAllVideos=!this.bandAllVideos
    const data: any = {
      __metadata: { type: 'SP.Data.GlobalListItem' },
      Id: this.globalId,
      MostrarTodos: this.bandAllVideos
    };
    this.sis.getFormDigest().pipe(
      switchMap(formDigest => {
        return this.sis.save('Global', data, formDigest);
      })
    ).subscribe();
  }
  onAdd() {
    const dialogRef = this.dialog.open(MainFormDialogComponent, {
      disableClose: true,
      width:'800px'

    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.message.genericSaveMessage();
        }
      });
  }

}
