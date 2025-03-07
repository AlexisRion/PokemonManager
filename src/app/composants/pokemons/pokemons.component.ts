import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  imports: [TitleCasePipe, MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css'
})
export class PokemonsComponent {

  listPokemons: any[] = [];
  nbPokemons: number = 0;
  urlNext: string = '';
  urlPrev: string = '';

  constructor(private pokemonSrv: PokemonService) {
    this.loadPokemons();
  }

  loadPokemons() {
    this.listPokemons = [];
    this.pokemonSrv.getPokemons().subscribe({
      next: (data: any) => {
        console.log(data);

        this.nbPokemons = data.count;
        this.urlNext = data.next;
        this.urlPrev = data.prev;
        if (data.results && data.results.length > 0) {
          for (let elem of data.results) {
            this.pokemonSrv.getPokemonByUrl(elem.url).subscribe({
              next: (poke: any) => {
                let pokemon = {
                  name: poke.name,
                  img: poke.sprites.other.showdown.front_default,
                  types: poke.types,
                  height: poke.height,
                  weight: poke.weight
                };
                this.listPokemons.push(pokemon);

              }, error: (err) => {
                console.log(err);
              }
            });
          }
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  loadPokemonsByUrl(url: string) {
    this.listPokemons = [];
    this.pokemonSrv.getPokemonsByUrl(url).subscribe({
      next: (data: any) => {
        this.nbPokemons = data.count;
        this.urlNext = data.next;
        this.urlPrev = data.prev;
        if (data.results && data.results.length > 0) {
          for (let elem of data.results) {
            this.pokemonSrv.getPokemonByUrl(elem.url).subscribe({
              next: (poke: any) => {
                let pokemon = {
                  name: poke.name,
                  img: poke.sprites.other.showdown.front_default,
                  types: poke.types,
                  height: poke.height,
                  weight: poke.weight
                };
                this.listPokemons.push(pokemon);

              }, error: (err) => {
                console.log(err);
              }
            });
          }
        }
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  loadNextPokemons() {
    if (this.urlNext)
     this.loadPokemonsByUrl(this.urlNext); 
  }

  loadPrevPokemons() {
    if (this.urlPrev)
      this.loadPokemonsByUrl(this.urlPrev);
  }
}
