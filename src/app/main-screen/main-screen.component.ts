import { Component, OnInit, OnChanges } from '@angular/core';
import { PokemonsCards } from '../const/pokemons.const';
import { Card, CardSkill } from '../models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalVictoryComponent } from '../modals/modal-victory/modal-victory.component';
import { ModalGameStartComponent } from '../modals/modal-game-start/modal-game-start.component';
import { Player } from '../models/player.model';
import { ModalTutorialComponent } from '../modals/modal-tutorial/modal-tutorial.component';
import { ModalSkillAlertComponent } from '../modals/modal-skill-alert/modal-skill-alert.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DispositionCard } from '../models/disposition-card.model';

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
    public hp: number = 26;
    public reset: boolean = false;
    public start: boolean = false;
    public changed: boolean = false;

    private exceptionList: Card[] = [];

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
        let initialPairs = 0;
        let iMax = 2;
        let jMax = 5;
        let cardAmount: any;
        for (let i = 0; i <= iMax; i++) {
            this.cardList[i] = [];
            let canNext = false;
            for (let j = 0; j <= jMax; j++) {
                let card = null,
                    min = 0,
                    max = PokemonsCards.length - 1;
                do {
                    cardAmount = null;
                    card = PokemonsCards[this.randomInterval(min, max)];

                    cardAmount = addedCards.filter((x) => x.id === card.id).length;
                    canNext = cardAmount === 1 || ((cardAmount === 0 && initialPairs < 9) && !(i === iMax && j === (jMax - 2)));
                } while (!canNext);
                initialPairs = cardAmount === 0 ? initialPairs + 1 : initialPairs;
                this.cardList[i][j] = card;
                addedCards.push(card);
            }
        }

    }

    private arrayChanged() {
        this.changed = !this.changed;
    }

    private teleport(card: Card) {
        console.log(this.exceptionList);

        let originCard: any = card;
        let destinyCard;
        let next = false;
        let i = this.randomInterval(0, 2);
        let j = this.randomInterval(0, 5);

        do {
            if (this.exceptionList.length > 0) {
                if (!this.exceptionList.some(exception => exception.id === this.cardList[i][j].id) && this.cardList[i][j].id !== originCard.id) {
                    destinyCard = this.cardList[i][j];
                    next = true;
                } else {
                    i = this.randomInterval(0, 2);
                    j = this.randomInterval(0, 5);
                }
            } else {
                if (this.cardList[i][j].id !== originCard.id) {
                    destinyCard = this.cardList[i][j];
                    next = true;
                } else {
                    i = this.randomInterval(0, 2);
                    j = this.randomInterval(0, 5);
                }
            }
        } while (!next);
        this.cardList[originCard.i][originCard.j] = destinyCard;
        this.cardList[i][j] = originCard;
        this.exceptionList.forEach((card: DispositionCard) => {
            this.cardList[card.i][card.j] = card;
        });

        setTimeout(() => {
            this.firstCard.fliped = false;
            this.firstCard.animation = '';
            setTimeout(() => {
                this.firstCard = null;
                this.arrayChanged();
                this.openModalSkill(originCard.skill, originCard.name);
            }, 250);
        }, 700);
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
            this.exceptionList = [...this.exceptionList, this.firstCard, this.secondCard];
            this.firstCard = null;
            this.secondCard = null;
            this.pairsFounded++;
            this.checkWinCondition();
        } else {
            setTimeout(() => {
                this.checkPokemonSkill(this.firstCard.skill);
                this.secondCard.fliped = false;
                this.secondCard = null;
            }, 850);
        }
        this.effects.currentRound++;
        this.checkPlayerStatus();
    }

    private applyDamage(damage: number, skill?: string) {
        return new Observable((subscriber) => {
            setTimeout(() => {
                this.player.hp -= damage;
                this.avatarAnimation = skill ? skill : 'strike';
                this.checkWinCondition();
                subscriber.next();
            }, 250);
            setTimeout(() => {
                this.avatarAnimation = '';
            }, 600);
        });
    }

    private resetFirstcard(time?: number) {
        setTimeout(() => {
            this.firstCard.fliped = false;
            this.firstCard = null;
        }, time ? time : 1200);
    }

    private checkPokemonSkill(skill: CardSkill) {
        this.applyDamage(skill.damage).pipe(
            tap(() => {
                if (this.player.hp > 0) {
                    if (skill.name === 'burn') {
                        const chance = this.randomInterval(0, 3);
                        if (chance > 0 && !this.player.status.some((status) => status === 1)) {
                            this.player.status = [...this.player.status, 1];
                            this.statusList.push(skill.imgUrl);
                            this.effects.effectDuration = this.effects.currentRound + skill.duration;
                            this.openModalSkill(skill, this.firstCard.name);
                        }
                        this.resetFirstcard();
                    } else if (skill.name === 'confusion') {
                        const chance = this.randomInterval(0, 5);
                        this.firstCard.fliped = false;
                        this.firstCard = null;

                    } else if (skill.name === 'multiStrike') {
                        const hits = this.randomInterval(2, 3);
                        this.applyDamage(skill.damage * hits).subscribe();
                        this.openModalSkill(skill, this.firstCard.name);
                        this.resetFirstcard();

                    } else if (skill.name === 'teleport') {
                        this.firstCard.animation = 'teleport'; // mudar classe
                        this.teleport(this.firstCard);

                    } else if (skill.name === 'poison') {
                        const chance = this.randomInterval(0, 4);
                        if (chance > 0 && !this.player.status.some((status) => status === 3)) {
                            this.player.status = [...this.player.status, 3];
                            this.statusList.push(skill.imgUrl);
                            this.effects.effectDuration = this.effects.currentRound + skill.duration;
                            this.openModalSkill(skill, this.firstCard.name);
                        }
                        this.resetFirstcard();

                    } else {
                        this.firstCard.fliped = false;
                        this.firstCard = null;
                    }
                }
            })
        ).subscribe();
    }

    // ON TURN START
    private checkPlayerStatus() {
        if (this.player.status.some((status) => status === 1))
            this.applyEffects(1);
        else if (this.player.status.some((status) => status === 2))
            this.applyEffects(2);
        else if (this.player.status.some((status) => status === 3))
            this.applyEffects(2);
    }

    private applyEffects(damage: number) {
        if (this.effects.effectDuration > this.effects.currentRound) {
            this.applyDamage(damage).subscribe();
            this.checkWinCondition();
        } else {
            this.player.status = [];
            this.statusList = [];
        }
    }

    private openModalSkill(skill?: any, pokemonName?: string) {
        this.dialogRef.open(ModalSkillAlertComponent, {
            data: {
                skill: skill,
                pokemon: pokemonName
            }
        });
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
