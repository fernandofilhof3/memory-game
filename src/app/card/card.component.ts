import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: { cardImgUrl: string, cardValue: number };
  public flipCard = false;
  constructor() { }

  ngOnInit() {
  }

  rotateCard() {
    if (!this.flipCard)
      this.flipCard = true;
    else
      this.flipCard = false;
  }

}
