import { useState, StrictMode } from "react";
import ReactDOM from "react-dom";
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

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
