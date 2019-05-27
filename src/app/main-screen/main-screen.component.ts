import { Component, OnInit } from '@angular/core';
import { PokemonsCards } from '../const/pokemons.const';
import { Card, CardSkill } from '../models/card.model';
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
    public firstCard: Card;
    public secondCard: Card;
    private pairsFounded: number = 0;

    public hp: number = 13;
    public reset: boolean = false;
    public start: boolean = false;
    private currentRound: number = 0;

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
        } else {
            this.applyDamage(this.firstCard.skill);
            setTimeout(() => {
                this.firstCard.fliped = false;
                this.secondCard.fliped = false;
                this.firstCard = null;
                this.secondCard = null;
            }, 850);
        }
        this.checkWinCondition();
    }

    private checkWinCondition() {
        let dialog;
        if (this.pairsFounded === 9 && this.player.hp > 0) {
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

    private applyDamage(skill: CardSkill) {
        if (skill.burn) {
            this.player.hp -= skill.damage;
            this.player.status = 1;
        } else if (skill.confusion) {
            // console.log(skill);
        } else if (skill.multiStrike) {
            const hits = this.randomInterval(1, 3);
            this.player.hp -= skill.damage * hits;
        } else if (skill.teleport) {
            // console.log(skill);
        } else
            this.player.hp -= skill.damage;

    }

    private checkPlayerStatus() {
        if (this.player.status === 1) {
            this.player.hp --;

        }
    }


    private resetGame() {
        this.reset = true;
        this.pairsFounded = 0;
        this.player = new Player();
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
