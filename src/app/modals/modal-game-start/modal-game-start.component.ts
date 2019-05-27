import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-game-start',
  templateUrl: './modal-game-start.component.html',
  styleUrls: ['./modal-game-start.component.scss']
})
export class ModalGameStartComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalGameStartComponent>,
  ) { }

  ngOnInit() {
  }

}
