import  React from 'react';
import Square from "./Square";
import '../App.css';
interface BoardProps {
    squares: string[];
    onSelect: (squareNumber: number) => void
}

const Board = (props: BoardProps) => {
    const {squares, onSelect} = props;
    //let buttonsRef = useRef(Array(9).fill(React.createRef()));
    const renderSquare = (i: number) => {
        return (
            <Square index={i} value={squares[i]} onSelect={onSelect}/>
        );
    };
    return (
            <table>
                <tbody>
                <tr className="board-row">
                    <td>{renderSquare(0)}</td>
                    <td>{renderSquare(1)}</td>
                    <td>{renderSquare(2)}</td>
                </tr>
                <tr className="board-row">
                    <td>{renderSquare(3)}</td>
                    <td>{renderSquare(4)}</td>
                    <td>{renderSquare(5)}</td>
                </tr>
                <tr className="board-row">
                    <td>{renderSquare(6)}</td>
                    <td>{renderSquare(7)}</td>
                    <td>{renderSquare(8)}</td>
                </tr>
                </tbody>
            </table>
    );
}
export default Board;
