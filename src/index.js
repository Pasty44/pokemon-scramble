import { useState, StrictMode } from 'react';
import ReactDOM from "react-dom";
import './styles/general.css';
import './styles/game.css';
import './styles/setup.css';
import Game from './screens/Game.jsx';
import Setup from './screens/Setup.jsx';

export default function App() {
    const [pokemonList, setPokemonList] = useState(null);

    const reset = () => {
        setPokemonList(null);
    };

    const startGame = (list) => {
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
