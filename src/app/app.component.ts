import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memory-game';
  cardObj = {cardImgUrl: 'assets/images/ui/pikachu.png', cardValue: 0};
}
