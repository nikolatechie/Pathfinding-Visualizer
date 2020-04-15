import React from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {depthFirstSearch} from '../PathfindingAlgorithms/dfs';
import {breadthFirstSearch} from '../PathfindingAlgorithms/bfs';
import {dijkstrasAlgo} from '../PathfindingAlgorithms/dijkstra';
import {aStarSearch} from '../PathfindingAlgorithms/astar';
import {bidirectionalSearch} from '../PathfindingAlgorithms/bidirectionalSearch';

var ROWS = 0;
var COLS = 53;
var START_NODE_ROW = 9;
var START_NODE_COL = 9;
var FINISH_NODE_ROW = 9;
var FINISH_NODE_COL = 43;

export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            mouseIsPressed: false,
            crossingCorners: false,
            animationInProgress: false,
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const grid = getInitialGrid();
        this.setState({grid});
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
        const grid = getInitialGrid();
        this.setState({grid});
        calculateDimensions();
        this.dimensionReset(); // remove previous paths
    }

    dimensionReset() {
        const {grid} = this.state;

        for (let row = 0; row < grid.length; ++row) {
            for (let col = 0; col < grid[0].length; ++col) {
                if (!grid[row][col].isStart && !grid[row][col].isFinish)
                    document.getElementById(`node-${row}-${col}`).className = 'node';
            }
        }
    }

    toggleCheckbox = () => {
        this.setState({crossingCorners: !this.state.crossingCorners});
    }

    toggleButtons = () => { // enabling/disabling buttons depending on the animation
        let buttons = document.querySelectorAll('button');

        for (let i = 0; i < buttons.length; ++i) {
            if (this.state.animationInProgress)
                buttons[i].style = 'opacity: 1';
            else
                buttons[i].style = 'opacity: 0.65';
        }

        this.setState({animationInProgress: !this.state.animationInProgress});
    }

    handleMouseDown(row, col) { // put/remove a wall
        const oldNodeIsWall = this.state.grid[row][col].isWall;
        const newGrid = this.state.grid;
        newGrid[row][col] = createNode(row, col);
        newGrid[row][col].isWall = !oldNodeIsWall;
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) { // put/remove a wall
        if (!this.state.mouseIsPressed) return; // or do nothing if mouse is not pressed
        const oldNodeIsWall = this.state.grid[row][col].isWall;
        const newGrid = this.state.grid;
        newGrid[row][col] = createNode(row, col);
        newGrid[row][col].isWall = !oldNodeIsWall;
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateFoundPath(path) {
        for (let i = 1; i < path.length-1; ++i) {
            const node = path[i];
            
            setTimeout(() => { // coloring the found path
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, 25*i);
        }
    }

    getPath(finishNode) { // between start and finish node
        const path = [];
        let node = finishNode;

        while (node !== null) {
            path.push(node);
            node = node.previousNode;
        }

        return path;
    }

    createRandomGrid() {
        this.removePaths(); // clear paths from previous search
        const grid = getInitialGrid();
        const NUMBER_OF_OBSTACLES = Math.floor((ROWS * COLS) / 5);

        for (let i = 0; i < NUMBER_OF_OBSTACLES; ++i) { // randomly choosing coordinates of walls
            let x = Math.floor(Math.random() * ROWS);
            let y = Math.floor(Math.random() * COLS);

            if (!grid[x][y].isWall && !grid[x][y].isStart && !grid[x][y].isFinish) {
                grid[x][y] = createNode(x, y);
                grid[x][y].isWall = true;
            }
        }

        this.setState({grid});
    }

    resetGrid() { // resetting everything
        const grid = getInitialGrid();

        for (let row = 0; row < ROWS; ++row) {
            for (let col = 0; col < COLS; ++col) {
                if (!(row === START_NODE_ROW && col === START_NODE_COL) && !(row === FINISH_NODE_ROW && col === FINISH_NODE_COL))
                    document.getElementById(`node-${row}-${col}`).className = 'node';
            }
        }

        this.setState({grid});
    }

    getWalls() { // get indices of all walls in a grid
        const {grid} = this.state;
        const walls = [];

        for (let row = 0; row < ROWS; ++row) {
            for (let col = 0; col < COLS; ++col) {
                if (grid[row][col].isWall)
                    walls.push([row, col]);

                if (!grid[row][col].isStart && !grid[row][col].isFinish)
                    document.getElementById(`node-${row}-${col}`).className = 'node';
            }
        }

        return walls;
    }

    removePaths() { // clears paths, walls stay there
        const initialGrid = getInitialGrid();
        const walls = this.getWalls();

        for (let i = 0; i < walls.length; ++i) {
            const [row, col] = walls[i];
            initialGrid[row][col].isWall = true;
            document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
        }

        this.setState({grid: initialGrid});
    }

    dijkstra() {
        this.toggleButtons(); // disable buttons
        this.removePaths(); // clear paths from previous search
        const {grid} = this.state;
        const checkboxVal = (document.getElementById('check').checked === true); // 4 additional neighbors
        const visitedNodesInOrder = dijkstrasAlgo(grid, START_NODE_ROW, START_NODE_COL, checkboxVal);
        const path = this.getPath(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);

        // animation
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateFoundPath(path);
                }, 20 * i);

                setTimeout(() => { // wait until animation ends
                    this.toggleButtons(); // and then activate buttons
                }, 20 * i + 25 * (path.length + 1));

                return;
            }

            setTimeout(() => {
                for (let j = 0; j < visitedNodesInOrder[i].length; ++j) {
                    const node = visitedNodesInOrder[i][j];
                    const row = node.row;
                    const col = node.col;

                    if (!grid[row][col].isFinish)
                        document.getElementById(`node-${row}-${col}`).className = 'node node-explore';
                }
            }, 20 * i);
        }
    }

    aStar() {
        this.toggleButtons(); // disable buttons
        this.removePaths(); // clear paths from previous search
        const {grid} = this.state;
        const checkboxVal = (document.getElementById('check').checked === true); // 4 additional neighbors
        const visitedNodesInOrder = aStarSearch(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, checkboxVal);
        const path = this.getPath(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);

        // animation
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateFoundPath(path);
                }, 34 * i);

                setTimeout(() => {
                    this.toggleButtons();
                }, 34 * i + 25 * (path.length + 1));

                return;
            }

            setTimeout(() => {
                for (let j = 0; j < visitedNodesInOrder[i].length; ++j) {
                    const [row, col] = visitedNodesInOrder[i][j];
                    document.getElementById(`node-${row}-${col}`).className = 'node node-explore';
                }
            }, 34 * i);
        }
    }

    bfs() {
        this.toggleButtons(); // disable buttons
        this.removePaths(); // clear paths from previous searches
        const {grid} = this.state;
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const checkboxVal = (document.getElementById('check').checked === true); // 4 additional neighbors
        const visitedNodesInOrder = breadthFirstSearch(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, checkboxVal);
        const path = this.getPath(finishNode);

        // animation
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateFoundPath(path);
                }, 15 * i);

                setTimeout(() => { // wait until animation ends
                    this.toggleButtons(); // and then activate buttons
                }, 15 * i + 25 * (path.length + 1));

                return;
            }

            setTimeout(() => {
                for (let j = 0; j < visitedNodesInOrder[i].length; ++j) {
                    const [row, col] = visitedNodesInOrder[i][j];
                    document.getElementById(`node-${row}-${col}`).className = 'node node-explore';
                }
            }, 15 * i);
        }
    }

    bidirectionalSearch() {
        this.toggleButtons(); // disable buttons
        this.removePaths(); // clear paths from previous search
        const {grid} = this.state;
        const checkboxVal = (document.getElementById('check').checked === true); // 4 additional neighbors
        let [visitedNodesInOrder, leftNode, rightNode] = bidirectionalSearch(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, checkboxVal);
        let path = [];

        while (!rightNode.isFinish) {
            path.push(rightNode); // getting shortest path from right part
            rightNode = rightNode.previousNode;
        }

        path.push(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
        path.reverse();

        while (!leftNode.isStart) {
            path.push(leftNode); // getting shortest path from left part
            leftNode = leftNode.previousNode;
        }

        path.push(grid[START_NODE_ROW][START_NODE_COL]);

        // animation
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateFoundPath(path);
                }, 25 * i);

                setTimeout(() => { // wait until animation ends
                    this.toggleButtons(); // and then activate buttons
                }, 25 * i + 25 * (path.length + 1));

                return;
            }

            setTimeout(() => {
                for (let j = 0; j < visitedNodesInOrder[i].length; ++j) {
                    const [row, col] = visitedNodesInOrder[i][j];
                    document.getElementById(`node-${row}-${col}`).className = 'node node-explore';
                }
            }, 25 * i);
        }
    }

    dfs() {
        this.toggleButtons(); // disable buttons
        this.removePaths(); // clear paths from previous search
        const {grid} = this.state;
        const checkboxVal = (document.getElementById('check').checked === true); // 4 additional neighbors
        const visitedNodesInOrder = depthFirstSearch(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL, checkboxVal);
        const path = this.getPath(grid[FINISH_NODE_ROW][FINISH_NODE_COL]);

        // animation
        for (let i = 1; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateFoundPath(path);
                }, 30 * i);

                setTimeout(() => { // wait until animations ends
                    this.toggleButtons(); // and then activate buttons
                }, 30 * i + 25 * (path.length + 1));

                return;
            }

            const node = visitedNodesInOrder[i];

            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-explore';
            }, 30 * i);
        }
    }

    render() {
        const {grid, mouseIsPressed} = this.state;

        return (
            <>
                <div className='button-container'>
                    <h2 id='bar-title'>Pathfinding Visualizer</h2>
                    <button className='grid-buttons' disabled={this.state.animationInProgress} onClick={() => this.resetGrid()}>RESET GRID</button>
                    <button className='grid-buttons' disabled={this.state.animationInProgress} onClick={() => this.removePaths()}>CLEAR PATHS</button>
                    <label className='corner-label'>
                        Allow crossing corners
                        <input type='checkbox' id='check' checked={this.state.crossingCorners} onChange={this.toggleCheckbox}/>
                    </label>
                    <button className='algo-buttons' disabled={this.state.animationInProgress} onClick={() => this.dijkstra()}>Dijkstra's algo</button>
                    <button className='algo-buttons' disabled={this.state.animationInProgress} onClick={() => this.aStar()}>A* Search</button>
                    <button className='algo-buttons' disabled={this.state.animationInProgress} onClick={() => this.bidirectionalSearch()}>Bidirectional Search</button>
                    <button className='algo-buttons' disabled={this.state.animationInProgress} onClick={() => this.bfs()}>BFS</button>
                    <button className='algo-buttons' disabled={this.state.animationInProgress} onClick={() => this.dfs()}>DFS</button>
                    <button className='additional-buttons' disabled={this.state.animationInProgress} onClick={() => this.createRandomGrid()}>CREATE RANDOM GRID</button>
                </div>

                <div className='grid'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div className='rows-distinct'
                                key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isStart, isFinish, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row,col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <div className='credits'>
                    <p>&copy; Pathfinding Visualizer created by <a id='my-github' href='https://github.com/nikolatechie'>Nikola Grujic</a></p>
                </div>
            </>
        );
    }
}

const calculateDimensions = () => {
    ROWS = Math.floor((window.innerHeight - 200) / 28); // calculating number
    COLS = Math.floor((window.innerWidth - 50) / 28); // of rows and columns
    START_NODE_ROW = Math.floor(ROWS / 2); // depending on the screen size
    if (ROWS % 2 !== 1) --START_NODE_ROW; // and calculating positions
    FINISH_NODE_ROW = START_NODE_ROW; // of cells for the starting and
    START_NODE_COL = Math.floor(COLS / 6); // finishing node
    FINISH_NODE_COL = COLS - START_NODE_COL - 1;
}

const getInitialGrid = () => {
    const grid = [];
    calculateDimensions();

    for (let row = 0; row < ROWS; ++row) {
        const curRow = [];

        for (let col = 0; col < COLS; ++col) {
            curRow.push(createNode(row, col));
        }

        grid.push(curRow);
    }

    return grid;
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};