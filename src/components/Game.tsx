import React, {useState} from 'react';
import Board from "./Board";
import '../App.css';

const SPACE_KEY = 32;
const ENTER_KEY = 13;

const Game = () => {
    const [state, setState] = useState({
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: true,
        gameReset: false
    });

    const calculateWinner = (squares: string[]): (string | undefined) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return undefined;
    };

    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const currentSquares = current.squares.slice();

    const winner = calculateWinner(state.history[state.history.length - 1].squares);
    let status;
    if (winner) {
        status = `Game Over. Winner is Player ${winner}`;
    } else {
        status = "Player " + (state.xIsNext ? "X" : "0") + ' turn';
    }

    const onSelect = (i: number) => {
        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }

        currentSquares[i] = state.xIsNext ? 'X' : '0';
        setState({
            history: history.concat([
                {
                    squares: currentSquares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !state.xIsNext,
            gameReset: false
        });
    }

    const isSpaceKey = (event: React.KeyboardEvent<Element>) => {
        return event.key === ' ' || event.code === 'Space' || event.which === SPACE_KEY;
    };

    const isEnterKey = (event: React.KeyboardEvent<Element>) => {
        return event.key === 'Enter' || event.code === 'Enter' || event.which === ENTER_KEY;
    };

    const isSpaceOrEnterKey = (event: React.KeyboardEvent<Element>) => {
        return isEnterKey(event) || isSpaceKey(event);
    };

    const resetButtonHandler: React.KeyboardEventHandler = event => {
        event.stopPropagation();
        if (isSpaceOrEnterKey(event)) {
            resetGame();
        }
    };

    const clickHandler: React.MouseEventHandler = event => {
        event.stopPropagation();
        resetGame();
    };

    const resetGame = () => {
        setState({
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            gameReset: true
        });

    };
    return (
        <div className="container">
            <header>
                <h1>Welcome to Tic Tac Toe</h1>
            </header>
            <main>
                <div className="game">
                    <button className="reset-button" onClick={clickHandler} onKeyUp={resetButtonHandler}>New Game
                    </button>
                    <div className="game-info" aria-live="assertive" role="status" style={{"display": "none"}}>
                        {status}
                    </div>
                    <div className="game-board">
                        <Board squares={currentSquares} onSelect={onSelect}/>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Game;
