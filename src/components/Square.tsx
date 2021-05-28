import * as React from 'react';
import '../App.css';

const SPACE_KEY = 32;
const ENTER_KEY = 13;

const rowLabelsMap = new Map();
rowLabelsMap.set(0, 'First Row, First Column');
rowLabelsMap.set(1, 'First Row, Second Column');
rowLabelsMap.set(2, 'First Row, Third Column');
rowLabelsMap.set(3, 'Second Row, First Column');
rowLabelsMap.set(4, 'Second Row, Second Column');
rowLabelsMap.set(5, 'Second Row, Third Column');
rowLabelsMap.set(6, 'Third Row, First Column');
rowLabelsMap.set(7, 'Third Row, Second Column');
rowLabelsMap.set(8, 'Third Row, Third Column');

interface SquareProps {
    index: number;
    value: string;
    onSelect: (squareNumber: number) => void;
}

const Square = (props: SquareProps) => {
    const emptyInfo = <span className="hidden">Empty Square</span>;
    const {index, value, onSelect} = props;
    const clickHandler: React.MouseEventHandler = event => {
        event.stopPropagation();
        onSelect(index);
    };

    const isSpaceKey = (event: React.KeyboardEvent<Element>) => {
        return event.key === ' ' || event.code === 'Space' || event.which === SPACE_KEY;
    };

    const isEnterKey = (event: React.KeyboardEvent<Element>) => {
        return event.key === 'Enter' || event.code === 'Enter' || event.which === ENTER_KEY;
    };

    const isSpaceOrEnterKey = (event: React.KeyboardEvent<Element>) => {
        return isEnterKey(event) || isSpaceKey(event);
    };

    const keyUpHandler: React.KeyboardEventHandler = event => {
        event.stopPropagation();
        if(isSpaceOrEnterKey(event)) {
            onSelect(index);
        }
    };

    const getAriaLabel = () => {
        let label: string = rowLabelsMap.get(index);
        label = label + ', Value ' + ( value ? value : 'Empty');
        return label;
    };

    return (
        <div className="square-container">
            <div className="square" onClick={clickHandler} onKeyDown={keyUpHandler} aria-label={getAriaLabel()}>
                {value || emptyInfo}
            </div>
        </div>
    );
}

export default Square;
