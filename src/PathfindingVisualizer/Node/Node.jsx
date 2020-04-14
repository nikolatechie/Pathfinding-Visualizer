import React from 'react';
import './Node.css';

export default class Node extends React.Component {
    render() {
        const {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const extraClassName = isStart
        ? 'node-start'
        : isFinish
        ? 'node-finish'
        : isWall
        ? 'node-wall'
        : '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}