export function depthFirstSearch(grid, row, col, finRow, finCol, crossingCorners) {
    const visitedNodesInOrder = [];
    dfs(grid, row, col, finRow, finCol, visitedNodesInOrder, crossingCorners);
    return visitedNodesInOrder;
}

function dfs(grid, row, col, finRow, finCol, visitedNodesInOrder, crossingCorners) {
    let node = grid[row][col];
    node.isVisited = true;
    if (node.isFinish) return; // traverse until finish node is reached
    visitedNodesInOrder.push(node);
    let dirx = [-1, 0, 1, 0];
    let diry = [0, 1, 0, -1];

    if (crossingCorners) { // 8 neighbor-nodes
        dirx = [-1, -1, -1, 0, 0, 1, 1, 1];
        diry = [-1, 0, 1, -1, 1, -1, 0, 1];
    }

    for (let i = 0; i < dirx.length && !grid[finRow][finCol].isVisited; ++i) {
        const newRow = row+dirx[i];
        const newCol = col+diry[i];

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && !grid[newRow][newCol].isVisited && !grid[newRow][newCol].isWall) {
            grid[newRow][newCol].previousNode = node;
            dfs(grid, newRow, newCol, finRow, finCol, visitedNodesInOrder, crossingCorners);
        }
    }
}