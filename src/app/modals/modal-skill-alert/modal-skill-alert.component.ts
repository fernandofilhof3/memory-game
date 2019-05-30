import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-skill-alert',
  templateUrl: './modal-skill-alert.component.html',
  styleUrls: ['./modal-skill-alert.component.scss']
})
export class ModalSkillAlertComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalSkillAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1800);
  }

}
