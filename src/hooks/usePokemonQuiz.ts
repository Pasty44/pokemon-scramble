import { TPokemon } from "pokemon/types";

export type TPokemonQuiz = {
  currentPokemon: TPokemon;
};

export default (pokemon: Array<TPokemon>): TPokemonQuiz => {
  return { currentPokemon: pokemon[0] };
};
