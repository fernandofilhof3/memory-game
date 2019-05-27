import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-hp-bar',
  templateUrl: './hp-bar.component.html',
  styleUrls: ['./hp-bar.component.scss']
})
export class HpBarComponent implements OnInit, OnChanges {
  @Input() total: number;
  @Input() value: number;
  public percentage: number;
  public hpStatusColor: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    setTimeout(() => {
      this.percentage = (this.value * 100) / this.total;
      if (this.percentage > 45) {
        this.hpStatusColor = 145;
      } else if (this.percentage <= 45 && this.percentage > 20) {
        this.hpStatusColor = 55;
      } else if (this.percentage <= 20) {
        this.hpStatusColor = 0;
      }
    }, 400);
  }

}
