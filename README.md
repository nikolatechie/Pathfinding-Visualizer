#Pathfinding Visualizer
Application for visualizing several pathfinding algorithms: Dijkstra's SSSP algorithm, A* search, Bidirectional search, BFS and DFS. There is also a checkbox that, when it's checked, allows the algorithm to cross corners (cross diagonally). You can put walls in the grid so that algorithm can **not** cross it. See how it works: https://nikolatechie.github.io/Pathfinding-Visualizer

#Algorithms used in the app
**Dijkstra's algorithm** (guarantees the shortest path): the most used pathfinding algorithm because of its simplicity and speed.
**A* search** (guarantees the shortest path): algorithm that uses heuristics to find the shortest path much faster than Dijkstra's algo.
**Bidirectional search** (guarantees the shortest path): explores from both start and the finish node simultaneously in a BFS manner.
**BFS** -> Breadth-first search (guarantees the shortest path): very simple algorithm that visits all non-visited neighbors at every step.
**DFS** -> Depth-first search (*does NOT guarantee* the shortest path): simple recursive algorithm that visits nodes without trying to find the shortest path.

#Additional features
To make it easier to see how the algorithm works, I've created a few functions such as **RESET GRID** that removes both paths and walls from the grid, **CLEAR PATHS** that removes paths of the previous animation, and **CREATE RANDOM GRID** that creates a randomly generated grid so you don't have to draw walls to see how different algorithms behave.
