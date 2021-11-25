import { useState, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'Styles/general.css';
import 'Styles/game.css';
import 'Styles/setup.css';
import Game from './screens/Game';
import Setup from './screens/Setup';

export default function App() {
    const [pokemonList, setPokemonList] = useState(null);

    const reset = () => {
        setPokemonList(null);
    };

    const startGame = (list: any) => {
        setPokemonList(list);
    };

    if (pokemonList === null) {
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
