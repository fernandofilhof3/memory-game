import { Component, OnInit, OnChanges } from '@angular/core';
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
    public avatarAnimation: string = '';

    public statusList: string[] = [];
    public hp: number = 20;
    public reset: boolean = false;
    public start: boolean = false;

    private effects = {
        currentRound: 0,
        effectDuration: 0
    };

    constructor(
        private dialogRef: MatDialog
    ) { }

    ngOnInit() {
        this.createDeck();
        this.openModalTutorial();
    }

    private openModalTutorial() {
        this.dialogRef.open(ModalGameStartComponent).afterClosed().subscribe(ok => {
            if (ok) {
                this.dialogRef.open(ModalTutorialComponent);
            }
        });
    }

    private createDeck() {
        let addedCards = [];
        this.cardList = [];
        let iMax = 2;
        let jMax = 5;
        for (let i = 0; i <= iMax; i++) {
            this.cardList[i] = [];
            let canNext = false;
            for (let j = 0; j <= jMax; j++) {
                let card = null,
                    min = 0,
                    max = PokemonsCards.length - 1;
                do {
                    card = PokemonsCards[this.randomInterval(min, max)];

                    let cardAmount = addedCards.filter((x) => x.id === card.id).length;
                    canNext = cardAmount === 1 || (cardAmount === 0 && !(i === iMax && j === (jMax - 2)));
                } while (!canNext);
                this.cardList[i][j] = card;
                addedCards.push(card);
            }
        }
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


    private checkPair(card: Card) {
        if (this.firstCard.id === this.secondCard.id) {
            this.firstCard = null;
            this.secondCard = null;
            this.pairsFounded++;
            this.checkWinCondition();
        } else {
            setTimeout(() => {
                this.checkPokemonSkill(this.firstCard.skill);
                this.checkWinCondition();
                this.secondCard.fliped = false;
                this.secondCard = null;
            }, 850);
        }
        this.effects.currentRound++;
        this.checkPlayerStatus();
    }

    private applyDamage(damage: number, skill?: string) {
        this.player.hp -= damage;
        this.avatarAnimation = skill ? skill : 'strike';
        setTimeout(() => {
            this.avatarAnimation = '';
        }, 400);
    }

    private resetFirstcard() {
        setTimeout(() => {
            this.firstCard.fliped = false;
            this.firstCard = null;
        }, 400);
    }

    private checkPokemonSkill(skill: CardSkill) {
        this.applyDamage(skill.damage);
        if (skill.burn) {
            const chance = this.randomInterval(0, 3);
            if (chance > 0) {
                this.player.status = 1;
                this.statusList.push(skill.imgUrl);
                this.effects.effectDuration = this.effects.currentRound + skill.duration;
            }
            this.resetFirstcard();
        } else if (skill.confusion) {
            const chance = this.randomInterval(0, 2);
            this.firstCard.fliped = false;
            this.firstCard = null;

        } else if (skill.multiStrike) {
            const hits = this.randomInterval(2, 3);
            this.applyDamage(skill.damage * hits);
            this.resetFirstcard();

        } else if (skill.teleport) {
            console.log(skill);
        } else {
            this.resetFirstcard();
        }
    }

    // ON TURN START
    private checkPlayerStatus() {
        if (this.player.status === 1) {
            this.applyEffects(1);
        }
        else if (this.player.status === 2)
            this.applyEffects(2);
    }

    private applyEffects(damage: number) {
        if (this.effects.effectDuration > this.effects.currentRound) {
            this.applyDamage(damage);
        }
        else {
            this.player.status = 0;
            this.statusList = [];
        }
    }


    private resetGame() {
        this.reset = true;
        this.pairsFounded = 0;
        this.statusList = [];
        this.player = new Player();
        setTimeout(() => {
            this.createDeck();
        }, 400);
    }

    // ON TURN END
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
                return;
            }, 470);
        }
    }



    private randomInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
