import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-generations',
  imports: [MatButtonModule, MatListModule, MatDividerModule],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.css'
})
export class GenerationsComponent {

  generations: any[] = [];

  constructor(private pokemonSrv: PokemonService) {
    
    // 4- Traitement de la requête dans le composant
    this.pokemonSrv.getGenerations().subscribe({
      next: (data: any) => {
        if (data.results) {
          this.generations = data.results;
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
