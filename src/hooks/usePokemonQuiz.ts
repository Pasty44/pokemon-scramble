import { useEffect, useRef, useState } from "react";
import { shufflePokemon, getRandomPokemon } from "scripts/util";
import { TPokemon } from "pokemon/types";

export type TPokemonQuiz = {
  goNext: () => void;
  currentStreak: number;
  incrementCurrentStreak: () => void;
  resetCurrentStreak: () => void;
  resetQuiz: () => void;
  longestStreak: number;
  currentPokemon: TPokemon;
};

function usePokemonQuiz(pokemon: Array<TPokemon>): TPokemonQuiz {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const currentPokemonList = useRef<Array<TPokemon>>(pokemon);
  const [currentPokemon, setCurrentPokemon] = useState<TPokemon>(pokemon[0]);

  useEffect(() => {
    currentPokemonList.current = shufflePokemon([...pokemon]);
    setCurrentPokemon(getRandomPokemon(currentPokemonList.current));
  }, [pokemon]);

  const goNext = (): void => {
    if (currentPokemonList.current.length <= 0) {
      currentPokemonList.current = shufflePokemon([...pokemon]);
    }
    setCurrentPokemon(getRandomPokemon(currentPokemonList.current));
  };

  const incrementCurrentStreak = (): void => {
    setCurrentStreak((curr) => curr + 1);
    if (currentStreak + 1 > longestStreak) {
      setLongestStreak((curr) => curr + 1);
    }
  };

  const resetCurrentStreak = (): void => {
    setCurrentStreak(0);
  };

  const resetQuiz = (): void => {
    currentPokemonList.current = shufflePokemon([...pokemon]);
    setCurrentPokemon(getRandomPokemon(currentPokemonList.current));
    setCurrentStreak(0);
    setLongestStreak(0);
  };

  return {
    goNext,
    currentStreak,
    incrementCurrentStreak,
    resetCurrentStreak,
    resetQuiz,
    longestStreak,
    currentPokemon,
  };
}

export default usePokemonQuiz;
