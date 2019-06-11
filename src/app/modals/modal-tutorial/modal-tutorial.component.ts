import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-tutorial',
  templateUrl: './modal-tutorial.component.html',
  styleUrls: ['./modal-tutorial.component.scss']
})
export class ModalTutorialComponent implements OnInit {
  public stepTitle: string;
  public stepBody: string;
  public stepDescription: string;
  public imgUrl: string = 'assets/images/pokemons/charmander.png';
  public showDescription: boolean = true;
  private currentStep: number = 1;

  constructor(
    private dialogRef: MatDialogRef<ModalTutorialComponent>,
  ) { }

  ngOnInit() {
    this.stepTitle = 'Cartas';
    this.stepBody = `Cada carta representa um pokémon e possui duas caracteristicas.
    <strong> Ataque </strong> e <strong> Habilidade</strong>`;
    this.stepDescription = `<strong>Ataque:</strong> 2 <p> <strong>Habilidade:</strong> Burn<p/>`;
  }

  public nextStep() {
    this.currentStep ++;
    if (this.currentStep === 2) {
      this.stepTitle = 'Jogador';
      this.showDescription = false;
      this.stepBody = `O jogador é representado por uma barra de vida encontrada no canto inferior direito da tela.
      <br/>A barra possui <strong>24 de HP</strong> e diminui toda vez que você erra ao formar um par.`;
    } else if (this.currentStep === 3) {
      this.stepTitle = 'Mecânica';
      this.showDescription = false;
      this.stepBody = `Ao virar uma carta, você entra em batalha com o pokémon, caso você erre ao formar o par irá receber
      como dano, o ataque do pokemon da primeira carta <br/> Ex: Você virou um <strong>Pikachu</strong> e um <strong>Eevee</strong>,
       você irá receber 2 de dano do <strong>Pikachu</strong>. Caso forme um par você não receberá dano.`;
    } else if (this.currentStep === 4) {
      this.stepTitle = 'Mecânica';
      this.showDescription = false;
      this.stepBody = `Errar um par também pode fazer com que um pokémon use sua habilidade
      cada habilidade muda com o pokémon e variam de causar dano extra até reembaralhar as cartas no tabuleiro.`;
    } else if (this.currentStep === 5) {
      this.stepTitle = 'Tutorial';
      this.showDescription = false;
      this.stepBody = `Bem isso é tudo. Boa sorte!`;
    } else
      this.dialogRef.close();
  }

}
