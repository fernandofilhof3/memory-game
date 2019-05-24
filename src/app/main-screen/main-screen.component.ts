import { Component, OnInit } from '@angular/core';
import { PokemonsCards } from '../const/pokemons.const';
import { Card } from '../models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalVictoryComponent } from '../modals/modal-victory/modal-victory.component';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

    public pokemonConst = PokemonsCards;
    public cardList: Card[][] = [];
    public firstCard: Card;
    public secondCard: Card;

    private pairsFounded: number = 0;
    private totalPairs: number = 0;

    constructor(
        private dialogRef: MatDialog
    ) { }

    ngOnInit() {
        this.createDeck();
    }

    public setCardValue(card: any) {
        if (!this.firstCard || !this.secondCard) {
            if (!this.firstCard)
                this.firstCard = card;
            else {
                this.secondCard = card;
                this.checkPair();
            }
        } else {
            card.fliped = false;
        }

    }

    private createDeck() {
        let addedCards = [];
        this.cardList = [];
        for (let i = 0; i < 4; i++) {
            this.cardList[i] = [];
            for (let j = 0; j < 4; j++) {
                let card = null,
                    min = 0,
                    max = PokemonsCards.length - 1;
                do {
                    card = PokemonsCards[this.randomInterval(min, max)];
                } while (addedCards.filter((x) => x.id === card.id).length >= 2)
                this.cardList[i][j] = card;
                addedCards.push(card);
            }
        }
        console.log(this.cardList);
        
    }

    private checkPair() {
        if (this.firstCard.id === this.secondCard.id) {
            this.firstCard = null;
            this.secondCard = null;
            this.pairsFounded++;
            this.checkWinCondition();
        } else {
            setTimeout(() => {
                this.firstCard.fliped = false;
                this.secondCard.fliped = false;
                this.firstCard = null;
                this.secondCard = null;
            }, 850);
        }
    }

    private checkWinCondition() {
        console.log(this.pairsFounded);
        let dialog;
        if (this.pairsFounded === 2) {
            setTimeout(() => {
                dialog = this.dialogRef.open(ModalVictoryComponent, {
                    data: {
                        body: 'Parabens você capturou todos!'
                    }
                });
                dialog.afterClosed().subscribe(ok => {
                    if (ok)
                        this.resetGame();
                });
            }, 470);
        }
    }

    private resetGame() {
        console.log('RESET GAME');
        this.pairsFounded = 0;
        this.createDeck();
    }

    private randomInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
