import { Component, OnInit } from '@angular/core';
import { PokemonsCards } from '../const/pokemons.const';
import { Card } from '../models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalVictoryComponent } from '../modals/modal-victory/modal-victory.component';
import { ModalGameStartComponent } from '../modals/modal-game-start/modal-game-start.component';
import { Player } from '../models/player.model';
import { ModalTutorialComponent } from '../modals/modal-tutorial/modal-tutorial.component';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

    public pokemonConst = PokemonsCards;
    public cardList: Card[][] = [];
    public player: Player = new Player();
    public hp: number = 10;
    public firstCard: Card;
    public secondCard: Card;

    public reset: boolean = false;
    public start: boolean = false;
    private pairsFounded: number = 0;

    constructor(
        private dialogRef: MatDialog
    ) { }

    ngOnInit() {
        this.createDeck();
        this.openModalTutorial();
    }

    public setCardValue(card: any) {
        if (!this.firstCard || !this.secondCard) {
            if (!this.firstCard)
                this.firstCard = card;
            else {
                this.secondCard = card;
                this.checkPair(card);
            }
        } else {
            card.fliped = false;
        }

    }

    private createDeck() {
        let addedCards = [];
        this.cardList = [];
        for (let i = 0; i < 3; i++) {
            this.cardList[i] = [];
            for (let j = 0; j < 6; j++) {
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

    }

    private checkPair(card: Card) {
        if (this.firstCard.id === this.secondCard.id) {
            this.firstCard = null;
            this.secondCard = null;
            this.pairsFounded++;
            this.checkWinCondition();
        } else {
            this.player.hp -= card.attack;
            this.checkWinCondition();
            setTimeout(() => {
                this.firstCard.fliped = false;
                this.secondCard.fliped = false;
                this.firstCard = null;
                this.secondCard = null;
            }, 850);
        }
    }

    private checkWinCondition() {
        let dialog;
        if (this.pairsFounded === 8 && this.player.hp > 0) {
            setTimeout(() => {
                dialog = this.dialogRef.open(ModalVictoryComponent, {
                    data: { win: true }
                });
                dialog.afterClosed().subscribe(ok => {
                    if (ok)
                        this.resetGame();
                });
            }, 470);

        } else if (this.player.hp <= 0) {
            setTimeout(() => {


                dialog = this.dialogRef.open(ModalVictoryComponent, {
                    data: { win: false }
                });
                dialog.afterClosed().subscribe(ok => {
                    if (ok)
                        this.resetGame();
                });
            }, 470);
        }
    }


    private resetGame() {
        this.reset = true;
        this.pairsFounded = 0;
        this.player.hp = 10;
        setTimeout(() => {
            this.createDeck();
        }, 400);
    }

    private openModalTutorial() {
        this.dialogRef.open(ModalGameStartComponent).afterClosed().subscribe(ok => {
            if (ok) {
                this.dialogRef.open(ModalTutorialComponent);
            }
        });
    }

    private randomInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
