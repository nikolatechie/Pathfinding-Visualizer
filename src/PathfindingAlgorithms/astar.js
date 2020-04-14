function createCell() {
    return {
        parent_i: -1,
        parent_j: -1,
        f: 0.0,
        g: 0.0,
        h: 0.0,
    }
}

function isValid(grid, row, col) {
    return (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].isWall);
}

export function aStarSearch(grid, startRow, startCol, finRow, finCol, checkboxVal) {
    let cellDetails = [];
    let visitedNodesInOrder = [];

    for (let i = 0; i < grid.length; ++i) {
        let cell = [];

        for (let j = 0; j < grid[0].length; ++j)
        {
            let newCell = createCell();
            newCell.f = Number.MAX_VALUE;
            newCell.g = Number.MAX_VALUE;
            newCell.h = Number.MAX_VALUE;
            cell.push(newCell);
        }

        cellDetails.push(cell);
    }

    const i = startRow, j = startCol;
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;
    let openList = [];
    openList.push([0.0, i, j]);
    var dirx = [-1, 0, 0, 1];
    var diry = [0, -1, 1, 0];

    if (checkboxVal) {
        dirx = [-1, 0, 0, 1, -1, -1, 1, 1];
        diry = [0, -1, 1, 0, -1, 1, -1, 1];
    }

    while (openList.length) {
        let i = openList[0][1], j = openList[0][2];
        openList.shift();
        grid[i][j].isVisited = true;
        let gNew, hNew, fNew;
        let newLvl = [];

        // check all possible directions and update the values
        for (let idx = 0; idx < dirx.length; ++idx) {
            let ii = i + dirx[idx];
            let jj = j + diry[idx];
            const withCheckbox = (idx < 4 || (idx > 3 && checkboxVal));

            if (isValid(grid, ii, jj) && withCheckbox) {
                if (grid[ii][jj].isFinish) {
                    cellDetails[ii][jj].parent_i = i;
                    cellDetails[ii][jj].parent_j = j;
                    grid[ii][jj].previousNode = grid[i][j];
                    if (newLvl.length) visitedNodesInOrder.push(newLvl);
                    return visitedNodesInOrder;
                }
                else if (!grid[ii][jj].isVisited) {
                    gNew = cellDetails[i][j].g + 1.0;
                    if (idx > 3 && withCheckbox) gNew += 0.4;
                    hNew = calculateHValue(ii, jj, finRow, finCol);
                    fNew = gNew + hNew;

                    if (cellDetails[ii][jj].f === Number.MAX_VALUE || cellDetails[ii][jj].f > fNew) {
                        openList.push([fNew, ii, jj]);
                        openList.sort((elemA, elemB) => elemA[0] - elemB[0]);
                        newLvl.push([ii, jj]);
                        cellDetails[ii][jj].f = fNew;
                        cellDetails[ii][jj].g = gNew;
                        cellDetails[ii][jj].h = hNew;
                        cellDetails[ii][jj].parent_i = i;
                        cellDetails[ii][jj].parent_j = j;
                        grid[ii][jj].previousNode = grid[i][j];
                    }
                }
            }
        }

        visitedNodesInOrder.push(newLvl);
    }

    return visitedNodesInOrder;
}

// heuristic; approximate distance between current node and finish node
function calculateHValue(i, j, finRow, finCol) {
    return Math.abs(finRow - i) + Math.abs(finCol - j);
}