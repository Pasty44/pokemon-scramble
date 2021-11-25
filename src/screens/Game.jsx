import { useCallback, useEffect, useRef, useState } from 'react';
import { shuffleArray, shuffleString } from 'scripts/util';

const INPUT_COLORS = {
    NEUTRAL: 'black',
    SUCCESS: '#00BB00',
    FAIL: '#DD0000'
};

export default function Game({ pokemonList, reset }) {
    const inputRef = useRef(null);
    const inputColor = useRef(INPUT_COLORS.NEUTRAL);

    // This is so we can clear timer on component unmounting to prevent crashes/memory leaks
    const newPokemonTimeout = useRef(null);
    useEffect(() => {
        return () => {
            if (!!newPokemonTimeout.current) clearTimeout(newPokemonTimeout.current);
        }
    }, []);

    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    // Create a shuffled copy of the list prop to iterate through
    const currentPokemonList = useRef(shuffleArray([...pokemonList]));
    const currentIndex = useRef(0);
    const getCurrentPokemonObj = () => ({
        ...currentPokemonList.current[currentIndex.current],
        name: currentPokemonList.current[currentIndex.current].name.toUpperCase(),
        shuffledName: shuffleString(currentPokemonList.current[currentIndex.current].name).toUpperCase()
    });

    const [canType, setCanType] = useState(true);
    const [userGuess, setUserGuess] = useState('');
    const [currentPokemon, setCurrentPokemon] = useState(getCurrentPokemonObj);
    
    const selectNewPokemon = () => {
        // When we reach the end, shuffle and start over
        if (currentIndex.current === currentPokemonList.current.length - 1) {
            currentPokemonList.current = shuffleArray(pokemonList);
            currentIndex.current = 0;
        }
        else {
            currentIndex.current += 1;
        }
        
        setUserGuess('');
        
        inputRef.current.focus();
        
        setCurrentPokemon(getCurrentPokemonObj());
    };

    // Select new pokemon after a delay
    const startNewPokemonTimer = useCallback(() => {
        newPokemonTimeout.current = setTimeout(() => {
            inputColor.current = INPUT_COLORS.NEUTRAL;
            selectNewPokemon();
            setCanType(true);
        }, 1600);
    }, []);
    
    const onType = (updatedGuess, cursorPosition) => {
        if (!canType) return;
        
        setUserGuess(updatedGuess);

        // Prevent weird React behaviour, where putting the cursor in the middle of the guess and
        // typing a character would jump the cursor to the end of the string
        setTimeout(() => {
            inputRef.current.selectionStart = cursorPosition;
            inputRef.current.selectionEnd = cursorPosition;
        }, 0);
        
        if (updatedGuess === currentPokemon.name) {
            inputColor.current = INPUT_COLORS.SUCCESS;
            setCanType(false);
            setCurrentStreak(curr => curr + 1);

            if (currentStreak + 1 > longestStreak) {
                setLongestStreak(curr => curr + 1);
            }
            
            startNewPokemonTimer();
        }
    };

    const skip = useCallback(() => {
        inputColor.current = INPUT_COLORS.FAIL;
        setCanType(false);
        setCurrentStreak(0);
        setUserGuess(currentPokemon.name);

        startNewPokemonTimer();
    }, [currentPokemon, startNewPokemonTimer]);

    return (
        <>
            <div id='spriteContainer'>
                {canType && <div id='spriteMask'>?</div>}
                <img src={currentPokemon.url} height='100%' width='100%' alt='pokemon sprite' />
            </div>

            <div className='my-3'>
                {currentPokemon.shuffledName}
            </div>

            <div id='streakContainer'>
                <div className='streak'>
                    <div className='streakType'>
                        Current streak
                    </div>
                    <div>: {currentStreak}</div>
                </div>
                <div className='streak'>
                    <div className='streakType'>
                        Longest streak
                    </div>
                    <div>: {longestStreak}</div>
                </div>
            </div>

            {currentPokemon.name.indexOf(' ') >-1 && (
                <div id='spaceWarning'>* This name contains a space</div>
            )}

            <input
                id='userGuess'
                className='my-1'
                value={userGuess}
                onChange={(e) => onType(e.target.value.toUpperCase(), e.target.selectionStart)}
                ref={inputRef}
                autoFocus
                autoComplete='off'
                style={{ color: inputColor.current }}
            />

            <button id='skipBtn' className='my-1 noSelect' onClick={skip}>
                I DON'T KNOW
            </button>

            <button id='resetBtn' className='my-1 noSelect' onClick={reset}>
                CHANGE GENS
            </button>
        </>
    );
}
