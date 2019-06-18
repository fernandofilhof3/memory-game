import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-skill-alert',
  templateUrl: './modal-skill-alert.component.html',
  styleUrls: ['./modal-skill-alert.component.scss']
})
export class ModalSkillAlertComponent implements OnInit {
  public pokemon: string = '';
  public skill: string = '';
  public scape: boolean = false;
  public modalSkill: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalSkillAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
   }

  ngOnInit() {
    if (this.data && !this.data.scape) {
      this.skill = this.data.skill;
      this.pokemon = this.data.pokemon;
      this.modalSkill = true;
    } else if (this.data && this.data.scape) {
      this.pokemon = this.data.pokemon;
      this.scape = this.data.scape;
    }
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

}
