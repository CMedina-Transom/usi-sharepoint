import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../app.component';


@Component({
  selector: 'mvswp-main-form-dialog',
  templateUrl: './main-form-dialog.component.html',
  styleUrls: ['./main-form-dialog.component.scss']
})
export class MainFormDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<MainFormDialogComponent>,
    ) { }
  onNoClick() {
   this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}


