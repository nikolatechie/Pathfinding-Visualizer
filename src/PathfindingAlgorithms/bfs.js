export function breadthFirstSearch(grid, row, col, finRow, finCol, crossingCorners) {
    const visitedNodesInOrder = [];
    const q = [];
    q.push([row, col]);
    let dirx = [-1, 1, 0, 0];
    let diry = [0, 0, -1, 1];

    if (crossingCorners) { // 8 neighbor-nodes
        dirx = [-1, -1, -1, 0, 0, 1, 1, 1];
        diry = [-1, 0, 1, -1, 1, -1, 0, 1];
    }

    while (q.length) {
        if (grid[finRow][finCol].isVisited) break; // stop further search when a path is found
        const [row, col] = q.shift();
        grid[row][col].isVisited = true;
        const newLvl = []; // save neighbor-nodes of the current node

        for (let i = 0; i < dirx.length; ++i) {
            const newRow = row + dirx[i];
            const newCol = col + diry[i];

            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && !grid[newRow][newCol].isVisited && !grid[newRow][newCol].isWall) {
                q.push([newRow, newCol]);
                if (!(newRow === finRow && newCol === finCol)) newLvl.push([newRow, newCol]);
                grid[newRow][newCol].isVisited = true;
                grid[newRow][newCol].previousNode = grid[row][col];
            }
        }

        if (!newLvl.empty) visitedNodesInOrder.push(newLvl);
    }

    return visitedNodesInOrder;
}