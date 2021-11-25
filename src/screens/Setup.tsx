import { useState } from 'react';
import pokemon from 'pokemon/all';
import { TPokemon } from 'pokemon/types';

export interface ISetupProps {
    startGame: (list: Array<TPokemon>) => void;
};

export default function Setup({ startGame }: ISetupProps) {
    const [gens, setGens] = useState<{ [key: number]: boolean}>(() => {
        return Object.keys(pokemon).reduce((acc, curr, index) => {
            if (index === 0) acc[curr as unknown as number] = true;
            else acc[curr as unknown as number] = false;
            return acc;
        }, ({} as { [key: number]: boolean}));
    });
    
    const onClickStart = () => {
        if (Object.keys(gens).every(key => gens[key as unknown as number] === false)) {
            return alert('You need to select at least 1 generation');
        }

        startGame(Object.keys(gens).reduce((acc, curr) => {
            if (!!gens[curr as unknown as number]) {
                return [...acc, ...pokemon[curr as unknown as number]];
            }
            else return acc;
        }, ([] as Array<TPokemon>)));
    };
    
    return (
        <>
            <img
                id='logo'
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt='pokemon scramble logo'
            />

            <div id='instructions' className='my-1'>
                Select which generations are included in the game. Then try to
                work out the scrambled pokemon name!
            </div>

            <div id='genCheckboxContainer'>
                {
                    Object.keys(pokemon).map(key => (
                        <div
                            className='genCheckbox noSelect'
                            key={key}
                            onClick={() => setGens({ ...gens, [key]: !gens[key as unknown as number]})}
                            style={{
                                border: `3px solid ${!!gens[key as unknown as number] ? 'black' : 'grey'}`,
                                color: !!gens[key as unknown as number] ? 'black' : 'grey',
                            }}
                        >
                            GEN {key}
                        </div>
                    ))
                }
            </div>

            <button id='startBtn' className='my-1 noSelect' onClick={onClickStart}>
                START GAME
            </button>
        </>
    );
};
