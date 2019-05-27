import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-victory',
    templateUrl: './modal-victory.component.html',
    styleUrls: ['./modal-victory.component.scss']
})
export class ModalVictoryComponent implements OnInit {

    public text: string;
    public title: string;

    constructor(
        private dialogRef: MatDialogRef<ModalVictoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
        this.setModalText();
  }

  private setModalText() {
    if (this.data.win) {
        this.title = 'Parabéns!';
        this.text = 'Parabéns você capturou todos!';
    } else {
        this.title = 'Derrota';
        this.text = 'Você não ganhou dessa vez, mas não desista.';
    }
  }

}
