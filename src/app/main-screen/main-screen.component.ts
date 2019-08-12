import { Component, OnInit, OnChanges, ViewChildren, QueryList } from '@angular/core';
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
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
    @ViewChildren(CardComponent) private cardQuery: QueryList<CardComponent>;

    private get cardsComponents() { return this.cardQuery.toArray(); }

    public pokemonConst = PokemonsCards;
    public cardList: DispositionCard[][] = [];
    public player: Player = new Player();
    public firstCard: DispositionCard;
    public secondCard: Card;
    private pairsFounded: number = 0;
    public avatarAnimation: string = '';

    public statusList: string[] = [];
    public hp: number = 24;
    public reset: boolean = false;
    public start: boolean = false;
    public changed: boolean = false;

    private iMax: number = 2;
    private jMax: number = 5;

    private exceptionList: Card[] = [];
    private captureMode: boolean = false;

    private effects = {
        currentRound: 0,
        effectDuration: 0
    };

    constructor(
        private dialogRef: MatDialog
    ) { }

    ngOnInit() {
        this.createDeck();
        // this.openModalTutorial();
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
        let cardAmount: any;
        for (let i = 0; i <= this.iMax; i++) {
            this.cardList[i] = [];
            let canNext = false;
            for (let j = 0; j <= this.jMax; j++) {
                let card = null,
                    min = 0,
                    max = PokemonsCards.length - 1;
                do {
                    cardAmount = null;
                    card = PokemonsCards[this.randomInterval(min, max)];

                    cardAmount = addedCards.filter((x) => x.id === card.id).length;
                    canNext = cardAmount === 1 || ((cardAmount === 0 && initialPairs < 9) && !(i === this.iMax && j === (this.jMax - 2)));
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
            this.cardList[card.i][card.j].fliped = true;
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

    private confusion() {
        let cardsChanged = this.exceptionList;
        let finished = false;
        do {
            // debugger;
            let originI = this.randomInterval(0, 2);
            let originJ = this.randomInterval(0, 5);
            let destinyI = this.randomInterval(0, 2);
            let destinyJ = this.randomInterval(0, 5);

            let cardOrigin = this.cardList[originI][originJ];
            let cardDestiny = this.cardList[destinyI][destinyJ];

            let originAmount = cardsChanged.filter(card => card.id === cardOrigin.id).length;
            let destinyAmount = cardsChanged.filter(card => card.id === cardDestiny.id).length;

            if (!cardsChanged.some(card => (card.id === cardOrigin.id && card.id === cardDestiny.id)) && cardOrigin.id !== cardDestiny.id && originAmount < 2 && destinyAmount < 2) {
                this.cardList[destinyI][destinyJ] = cardOrigin;
                this.cardList[originI][originJ] = cardDestiny;
                cardsChanged = [...cardsChanged, cardDestiny, cardOrigin];
                finished = cardsChanged.length < 18 ? false : true;
            }

        } while (!finished);
        this.exceptionList.forEach((card: DispositionCard) => {
            this.cardList[card.i][card.j].fliped = true;
        });

        setTimeout(() => {
            let pokemon = this.firstCard;
            this.firstCard.fliped = false;
            this.firstCard.animation = '';
            pokemon.skill.imgUrl = pokemon.imgUrl;
            setTimeout(() => {
                this.firstCard = null;
                this.arrayChanged();
                this.openModalSkill(pokemon.skill, pokemon.name);
            }, 250);
        }, 700);

        // this.arrayChanged();
        let teste = [];
        cardsChanged.forEach(element => {
            teste = [...teste, element.id];
        });
    }

    public setCardValue(card: any) {
        if ((!this.firstCard || !this.secondCard) && !this.captureMode) {
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

    public usePotion() {
        if (this.player.bag.potion > 0 && this.player.hp < this.hp) {
            this.player.hp + 3 > this.hp ? this.player.hp = 24 : this.player.hp += 3;
            this.player.bag.potion--;
        }
    }

    public usePokeball(type: string) {
        if (this.player.bag.pokeballs[type] < 1 || !this.firstCard || this.captureMode || this.secondCard)
            return false;
        this.player.bag.pokeballs[type]--;
        let imgBall = '';
        const possibilities = this.randomInterval(1, 100);
        this.captureMode = true;
        if (type === 'normal') {
            imgBall = 'assets/images/ui/pokeball.png';
            possibilities > 40 ? this.capturePokemon(false, imgBall) : this.capturePokemon(true, imgBall);
        } else if (type === 'super') {
            imgBall = 'assets/images/ui/superball.png';
            possibilities > 65 ? this.capturePokemon(false, imgBall) : this.capturePokemon(true, imgBall);
        } else if (type === 'ultra')
            this.capturePokemon(true, imgBall);
    }

    private capturePokemon(success: boolean, pokeballUrl: string) {
        // Do ANIMATION HERE

        let imgOrigin = this.firstCard.imgUrl;
        this.firstCard.animation = 'capture';
        if (!success) {
            this.firstCard.animation = 'capture try';
            this.firstCard.imgUrl = pokeballUrl;
            setTimeout(() => {
                this.firstCard.animation = '';
                this.firstCard.imgUrl = imgOrigin;
                this.captureMode = false;
                this.openModalSkill(null, this.firstCard.name, true);
            }, 1400);
        } else {
            let firstI = this.firstCard.i;
            let firstJ = this.firstCard.j;

            for (let i = 0; i < this.cardList.length; i++) {
                for (let j = 0; j < this.cardList[i].length; j++) {
                    if (this.cardList[i][j].id === this.firstCard.id && !this.cardList[i][j].fliped && (firstI !== i || firstJ !== j)) {
                        this.firstCard.animation = 'capture try';
                        this.firstCard.imgUrl = pokeballUrl;
                        setTimeout(() => {
                            this.firstCard.animation = 'gotcha';
                            setTimeout(() => {
                                this.firstCard.imgUrl = imgOrigin;
                                let card = this.getCardFromComponents(i, j);
                                card.flipCard();
                                this.firstCard.animation = '';
                                this.cardList[i][j].fliped = true;
                                this.cardList[i][j].i = i;
                                this.cardList[i][j].j = j;
                                this.captureMode = false;
                                this.setCardValue(this.cardList[i][j]);
                            }, 800);
                        }, 1400);
                        return;
                    }
                }
            }
        }
    }

    private getCardFromComponents(i: number, j: number) {
        const index = (i * (this.jMax + 1)) + j;
        return this.cardsComponents[index];
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
                if (this.player.hp > 0)
                    this.checkPokemonSkill(this.firstCard.skill);
                this.secondCard.fliped = false;
                this.secondCard = null;
            }, 850);
        }
        this.checkPlayerStatus();
        this.effects.currentRound++;
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
                        const chance = this.randomInterval(1, 3);
                        if (chance > 0 && !this.player.status.some((status) => status === 1)) {
                            this.player.status = [...this.player.status, 1];
                            this.statusList.push(skill.imgUrl);
                            this.effects.effectDuration = this.effects.currentRound + skill.duration;
                            this.openModalSkill(skill, this.firstCard.name);
                        }
                        this.resetFirstcard();
                    } else if (skill.name === 'confusion') {
                        const chance = this.randomInterval(1, 100);
                        if (chance > 0) {
                            this.confusion();
                        }
                        this.firstCard.fliped = false;
                        // this.firstCard = null;

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
        if (this.player.hp > 0) {
            if (this.player.status.some((status) => status === 1))
                this.applyEffects(1);
            else if (this.player.status.some((status) => status === 2))
                this.applyEffects(2);
            else if (this.player.status.some((status) => status === 3))
                this.applyEffects(2);
        }
    }

    private applyEffects(damage: number) {
        if (this.effects.effectDuration > this.effects.currentRound) {
            this.applyDamage(damage).subscribe();
        } else {
            this.player.status = [];
            this.statusList = [];
        }
    }

    private openModalSkill(skill?: any, pokemonName?: string, scape?: boolean) {
        if (scape) {
            this.dialogRef.open(ModalSkillAlertComponent, {
                data: {
                    pokemon: pokemonName,
                    scape: scape
                }
            });
        } else {
            this.dialogRef.open(ModalSkillAlertComponent, {
                data: {
                    skill: skill,
                    pokemon: pokemonName
                }
            });
        }

    }

    private resetGame() {
        this.reset = true;
        this.pairsFounded = 0;
        this.statusList = [];
        this.exceptionList = [];
        this.player = new Player();
        this.firstCard = null;
        this.secondCard = null;
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
            }, 470);
        }
    }

    private randomInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
