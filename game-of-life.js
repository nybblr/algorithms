let getCell = (board, x, y) => (board[y] || [])[x];

let countNeighbors = (board, x, y) => {
    let offsets = [-1, 0, 1];
    let countAlive = 0;
    offsets.forEach(dy =>
        offsets.forEach(dx =>
            (dy || dx)
              && getCell(board, x + dx, y + dy)
              && countAlive++
        )
    );

    return countAlive;
};

let shouldLive = (cell, aliveCount) =>
    aliveCount === 3 ||
    (cell && aliveCount === 2)

let nextGeneration = board =>
    board.map((row, y) =>
        row.map((cell, x) =>
            shouldLive(cell, countNeighbors(board, x, y))
        )
    )

console.log(
    nextGeneration(
        [
            [false, true, false],
            [false, true, false],
            [false, true, false],
        ]
    )
);
