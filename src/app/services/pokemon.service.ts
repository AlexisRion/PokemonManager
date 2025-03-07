import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlGenerations: string = 'https://pokeapi.co/api/v2/generation/';
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon/';

  // 2- Injection du module HttpClient dans le service
  constructor(private http: HttpClient) { }

  // 3- Préparation de la requête Http GET à envoyer sur l'url de PokeApi
  getGenerations() {
    return this.http.get(this.urlGenerations);
  }

  getPokemons() {
    return this.http.get(this.urlPokemon);
  }

  getPokemonsByUrl(url: string) {
    return this.http.get(url);
  }

  getPokemonByUrl(url: string) {
    return this.http.get(url);
  } 
}
