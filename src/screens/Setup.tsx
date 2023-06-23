import { useState } from "react";
import pokemon from "pokemon/all";
import { TPokemon } from "pokemon/types";

export interface ISetupProps {
  startGame: (list: Array<TPokemon>) => void;
}

export default function Setup({ startGame }: ISetupProps) {
  const [gens, setGens] = useState<{ [key: string]: boolean }>(() => {
    return Object.keys(pokemon).reduce((acc, curr, index) => {
      if (index === 0) acc[curr] = true;
      else acc[curr] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  });

  const onClickStart = () => {
    if (Object.keys(gens).every((key) => gens[key] === false)) {
      return alert("You need to select at least 1 generation");
    }

    startGame(
      Object.keys(gens).reduce((acc, curr) => {
        if (!!gens[curr]) {
          return [...acc, ...pokemon[curr]];
        } else return acc;
      }, [] as Array<TPokemon>)
    );
  };

  return (
    <>
      <img
        id="logo"
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="pokemon scramble logo"
      />

      <div id="instructions" className="my-1">
        Select which generations are included in the game. Then try to work out
        the scrambled pokemon name!
      </div>

      <div id="genCheckboxContainer">
        {Object.keys(pokemon).map((key) => (
          <div
            className="genCheckbox noSelect"
            key={key}
            onClick={() => setGens({ ...gens, [key]: !gens[key] })}
            style={{
              border: `3px solid ${!!gens[key] ? "black" : "grey"}`,
              color: !!gens[key] ? "black" : "grey",
            }}
          >
            GEN {key}
          </div>
        ))}
      </div>

      <button id="startBtn" className="my-1 noSelect" onClick={onClickStart}>
        START GAME
      </button>
    </>
  );
}
