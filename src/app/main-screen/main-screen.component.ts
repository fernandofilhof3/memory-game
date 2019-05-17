import { Component, OnInit } from '@angular/core';
import { PokemonsCards } from '../const/pokemons.const';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  public pokemonConst = PokemonsCards;
  public pokemonList: Array<any> = [];
  private card : Pokemon = new Pokemon();
  public firstCard: Pokemon = new Pokemon();
  public secondCard: Pokemon =  new Pokemon();
  constructor() { }

  ngOnInit() {
  }

  public setCardValue(card: any) {
    if (!this.firstCard.fliped) {
        this.firstCard.fliped = true;
        this.firstCard = card;
    } else {
        this.secondCard = card;
        this.checkPair(card);
    }

  }

  private checkPair(card: any) {
    if(this.firstCard.id === this.secondCard.id)
        console.log('Iguais');
    else {
        setTimeout(() => {
            this.firstCard.fliped = false;
            this.secondCard.fliped = false;
        }, 1000);
    }
  }

}
