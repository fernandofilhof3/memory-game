import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnChanges } from '@angular/core';
import { DispositionCard } from '../models/disposition-card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() public card: DispositionCard;
  @Input() public reset: boolean;
  @Output() public onClick = new EventEmitter();

  @HostBinding('style.left.px') private left = 0;
  @HostBinding('style.top.px') private top = 0;

  constructor() { }

  ngOnInit() {
    this.left = (this.card.j * 120);
    this.top = (this.card.i * 180);
  }

  ngOnChanges() {
    if (this.reset && this.card.fliped)
      this.card.fliped = false;
  }

  public flipCard() {
    if (!this.card.fliped)
      this.card.fliped = true;
    else
      this.card.fliped = false;
  }

  public clickCard() {
    this.flipCard();
    this.onClick.emit(this.card);
  }

}
