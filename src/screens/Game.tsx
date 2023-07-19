import { useCallback, useEffect, useRef, useState } from "react";
import usePokemonQuiz from "hooks/usePokemonQuiz";
import { TPokemon } from "pokemon/types";

const INPUT_COLORS = {
  NEUTRAL: "#000000",
  SUCCESS: "#00BB00",
  FAIL: "#DD0000",
};

export interface IGameProps {
  pokemonList: Array<TPokemon>;
  reset: () => void;
}

export default function Game({ pokemonList, reset }: IGameProps) {
  const quiz = usePokemonQuiz(pokemonList);
  const inputRef = useRef<any>(null);
  const inputColor = useRef(INPUT_COLORS.NEUTRAL);

  const newPokemonTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // This is so we can clear timer on component unmounting to prevent crashes/memory leaks
  useEffect(() => {
    return () => {
      if (!!newPokemonTimeout.current) clearTimeout(newPokemonTimeout.current);
    };
  }, []);

  const [canType, setCanType] = useState(true);
  const [userGuess, setUserGuess] = useState("");

  // Select new pokemon after a delay
  const startNewPokemonTimer = useCallback(() => {
    const selectNewPokemon = () => {
      setUserGuess("");
      inputRef.current.focus();
      quiz.goNext();
      inputColor.current = INPUT_COLORS.NEUTRAL;
      setCanType(true);
    };

    newPokemonTimeout.current = setTimeout(selectNewPokemon, 2000);
  }, [quiz]);

  const onType = (updatedGuess: string, cursorPosition: number | null) => {
    if (!canType) return;

    setUserGuess(updatedGuess);

    // Prevent weird React behaviour, where putting the cursor in the middle of the guess and
    // typing a character would jump the cursor to the end of the string
    setTimeout(() => {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    }, 0);

    if (updatedGuess === quiz.currentPokemon.name) {
      inputColor.current = INPUT_COLORS.SUCCESS;
      setCanType(false);
      quiz.incrementCurrentStreak();
      startNewPokemonTimer();
    }
  };

  const skip = useCallback(() => {
    inputColor.current = INPUT_COLORS.FAIL;
    setCanType(false);
    quiz.resetCurrentStreak();
    setUserGuess(quiz.currentPokemon.name);
    startNewPokemonTimer();
  }, [quiz, startNewPokemonTimer]);

  return (
    <>
      <div id="spriteContainer">
        {canType && <div id="spriteMask">?</div>}
        <img
          src={quiz.currentPokemon.url}
          height="100%"
          width="100%"
          alt="pokemon sprite"
        />
      </div>

      <div className="my-3">{quiz.currentPokemon.shuffledName}</div>

      <div id="streakContainer">
        <div className="streak">
          <div className="streakType">Current streak</div>
          <div>: {quiz.currentStreak}</div>
        </div>
        <div className="streak">
          <div className="streakType">Longest streak</div>
          <div>: {quiz.longestStreak}</div>
        </div>
      </div>

      {quiz.currentPokemon.name.indexOf(" ") > -1 && (
        <div id="spaceWarning">* This name contains a space</div>
      )}

      <input
        id="userGuess"
        className="my-1"
        value={userGuess}
        onChange={(e) =>
          onType(e.target.value.toUpperCase(), e.target.selectionStart)
        }
        ref={inputRef}
        autoFocus
        autoComplete="off"
        style={{ color: inputColor.current }}
      />

      <button id="skipBtn" className="my-1 noSelect" onClick={skip}>
        I DON'T KNOW
      </button>

      <button id="resetBtn" className="my-1 noSelect" onClick={reset}>
        CHANGE GENS
      </button>
    </>
  );
}
