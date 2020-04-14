## Pathfinding Visualizer
Application for visualizing several pathfinding algorithms: Dijkstra's SSSP algorithm, A* search, Bidirectional search, BFS and DFS. There is also a checkbox that, when it's checked, allows the algorithm to cross corners (cross diagonally). You can put walls in the grid so that algorithm can <b>not</b> cross it.
See how it works: https://nikolatechie.github.io/Pathfinding-Visualizer

## Algorithms used in the app
<b>Dijkstra's algorithm</b> (guarantees the shortest path): the most used pathfinding algorithm because of its simplicity and speed.
<br><b>A* search</b> (guarantees the shortest path): algorithm that uses heuristics to find the shortest path much faster than Dijkstra's algo.
<br><b>Bidirectional search</b> (guarantees the shortest path): explores from both start and the finish node simultaneously in a BFS manner.
<br><b>BFS -> Breadth-first search</b> (guarantees the shortest path): very simple algorithm that visits all non-visited neighbors at every step.
<br><b>DFS -> Depth-first search</b> (does <b>NOT</b> guarantee the shortest path): simple recursive algorithm that visits nodes without trying to find the shortest path.

## Additional features
To make it easier to see how the algorithm works, I've created a few functions such as <b>RESET GRID</b> that removes both paths and walls from the grid, <b>CLEAR PATHS</b> that removes paths of the previous animation, and <b>CREATE RANDOM GRID</b> that creates a randomly generated grid so you don't have to draw walls to see how different algorithms behave.
