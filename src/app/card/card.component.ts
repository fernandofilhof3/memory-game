import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public card: { id: number, imgUrl: number, fliped: boolean };
  @Output() public onClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public flipCard() {
    if (!this.card.fliped)
      this.card.fliped = true;
    else
      this.card.fliped = false;
  }

  public clickCard() {
    this.flipCard();
    this.onClick.emit();
  }

}
