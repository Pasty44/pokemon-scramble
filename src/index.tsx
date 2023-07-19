import { useState } from "react";
import { createRoot } from "react-dom/client";
import "styles/general.css";
import "styles/game.css";
import "styles/setup.css";
import Game from "screens/Game";
import Setup from "screens/Setup";
import { TPokemon } from "pokemon/types";

export default function App() {
  const [pokemonList, setPokemonList] = useState<Array<TPokemon> | undefined>();

  const reset = () => {
    setPokemonList(undefined);
  };

  const startGame = (list: Array<TPokemon>) => {
    setPokemonList(list);
  };

  if (pokemonList === undefined) {
    return <Setup {...{ startGame }} />;
  }

  return <Game {...{ pokemonList, reset }} />;
}

const domNode = document.getElementById("root");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
