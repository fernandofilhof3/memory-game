import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-victory',
    templateUrl: './modal-victory.component.html',
    styleUrls: ['./modal-victory.component.scss']
})
export class ModalVictoryComponent implements OnInit {

    public text: string;

    constructor(
        private dialogRef: MatDialogRef<ModalVictoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit() {
        if (this.data)
            this.text = this.data.body;
  }

}
