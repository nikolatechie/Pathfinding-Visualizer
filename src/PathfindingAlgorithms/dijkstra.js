export function dijkstrasAlgo(grid, row, col, crossingCorners) {
    const visitedNodesInOrder = [];
    grid[row][col].distance = 0; // setting distance of the start node to 0
    const nodes = [];

    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[0].length; ++j) {
            if (!grid[i][j].isWall) // adding other nodes
                nodes.push([i, j]);
        }
    }

    // sort them by distance in non-descending order
    nodes.sort((nodeA, nodeB) => grid[nodeA[0]][nodeA[1]].distance - grid[nodeB[0]][nodeB[1]].distance);
    let dirx = [0, 0, -1, 1];
    let diry = [-1, 1, 0, 0];
    const n = nodes.length - 1;

    if (crossingCorners) { // 8 neighbor-nodes
        dirx = [-1, -1, -1, 0, 0, 1, 1, 1];
        diry = [-1, 0, 1, -1, 1, -1, 0, 1];
    }

    for (let i = 0; i < n; ++i) {
        const [row, col] = nodes.shift(); // gets the closest node
        grid[row][col].isVisited = true; // and sets it to visited
        if (grid[row][col].isFinish) break; // no need for further search because we only care about path from start to finish node
        const exploredNodes = [];

        for (let j = 0; j < dirx.length; ++j) {
            const newRow = row + dirx[j];
            const newCol = col + diry[j];
            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) continue;
            if (grid[newRow][newCol].isVisited || grid[newRow][newCol].isWall) continue;

            if (grid[row][col].distance + 1 < grid[newRow][newCol].distance) {
                grid[newRow][newCol].distance = grid[row][col].distance+1;
                grid[newRow][newCol].previousNode = grid[row][col];
                exploredNodes.push(grid[newRow][newCol]); // save added nodes one by one
            }
        }

        if (exploredNodes.length) visitedNodesInOrder.push(exploredNodes);
        // and sort them again by distance in non-descending order
        nodes.sort((nodeA, nodeB) => grid[nodeA[0]][nodeA[1]].distance - grid[nodeB[0]][nodeB[1]].distance);
    }

    return visitedNodesInOrder;
}