import { CellState } from '@/types/CellState';
import { useGridUtilities } from './useGridUtilities';
import { Cell } from '@/types/Cell';

export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
    Extreme = 'Extreme',
}

export interface GameBoard {
    difficulty: Difficulty;
    gameGrid: CellState[][];
    solvedGrid: Cell[][];
}

export interface UseGenerateBoardObj {
    generateGameBoard: (difficulty: Difficulty) => GameBoard;
}

export const useGenerateBoard = (): UseGenerateBoardObj => {
    const GridUtilities = useGridUtilities();

    const initEmptyGrid = (): CellState[][] => {
        const grid: CellState[][] = [];
        for (let r = 0; r < 9; r++) {
            grid[r] = [];
            for (let c = 0; c < 9; c++) {
                grid[r][c] = {
                    box: GridUtilities.getBoxNumber(r, c),
                    row: r,
                    column: c,
                    pencilMarks: [],
                    showError: false,
                    value: 0,
                };
            }
        }

        return grid;
    };

    const isValueAllowed = (
        value: number,
        r: number,
        c: number,
        grid: Cell[][]
    ): boolean => {
        const GridUtilities = useGridUtilities();
        const boxNumber = GridUtilities.getBoxNumber(r, c);

        const boxCells = GridUtilities.getBoxCells(grid, boxNumber);
        const rowCells = GridUtilities.getRowCells(grid, r);
        const columnCells = GridUtilities.getColumnCells(grid, c);

        const existsAlready =
            [...boxCells, ...rowCells, ...columnCells].find(
                c => c.value === value
            ) !== undefined;
        return !existsAlready;
    };

    // This was from chat gpt, looks good but perhaps add some tests.
    function shuffleArray<T>(array: T[]): T[] {
        const shuffled = array.slice(); // make a copy
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
        }
        return shuffled;
    }

    /** Recursively tries all combinations of numbers to solve a grid.
      Returns true if the grid is solved. Trying all numbers 1-9 unsuccessfully
      will revert cell back to 0.

      TODO: add randomness so we get a new board every time!
   */
    const solveGrid = (grid: CellState[][]): boolean => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (!grid[r][c].value) {
                    const values = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    for (let value of values) {
                        if (isValueAllowed(value, r, c, grid)) {
                            grid[r][c].value = value;
                            if (solveGrid(grid)) {
                                return true;
                            }
                            // backtrack
                            grid[r][c].value = 0;
                        }
                    }
                    // 1-9 didn't work
                    return false;
                }
            }
        }
        return true;
    };

    const hasUniqueSolution = (grid: Cell[][]): boolean => {
        let solutionCount = 0;

        const solveAndCount = (grid: Cell[][]): boolean => {
            // Find the first empty cell
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (!grid[row][col].value) {
                        // Try every possible number (1-9)
                        for (let value = 1; value <= 9; value++) {
                            if (isValueAllowed(value, row, col, grid)) {
                                grid[row][col].value = value;
                                // Recurse and check for the next empty cell
                                if (solveAndCount(grid)) {
                                    // If more than one solution found, stop
                                    if (solutionCount > 1) {
                                        return false;
                                    }
                                    solutionCount++;
                                }
                                grid[row][col].value = 0; // Undo choice
                            }
                        }
                        return false; // No valid value found, backtrack
                    }
                }
            }

            // If no empty cells, solution found
            return true;
        };

        // Clone grid to avoid modifying the original
        const clonedGrid = GridUtilities.cloneGrid(grid);
        solveAndCount(clonedGrid);

        return solutionCount === 1;
    };

    const createGameGrid = (
        grid: Cell[][],
        difficulty: Difficulty
    ): CellState[][] => {
        // min/max number of clues to be left on the board
        const difficultyMap: Record<Difficulty, { min: number; max: number }> =
        {
            Easy: { min: 36, max: 49 },
            Medium: { min: 32, max: 35 },
            Hard: { min: 28, max: 31 },
            Extreme: { min: 17, max: 27 },
        };

        const clonedGrid = GridUtilities.cloneGrid(grid);
        const gameGrid: CellState[][] = clonedGrid.map(row =>
            row.map(cell => {
                const cellState: CellState = {
                    ...cell,
                    pencilMarks: [],
                    showError: false,
                };

                return cellState;
            })
        );

        const { min, max } = difficultyMap[difficulty];
        console.log(
            `goal: ${min}-${max} cells remaining for ${difficulty} puzzle`
        );

        const cellsToTry = gameGrid.flat().filter((item) => item.value > 0);
        while (cellsToTry.length > min) {
            const randomIndex = Math.floor(Math.random() * cellsToTry.length);
            const randomRow = cellsToTry[randomIndex].row;
            const randomColumn = cellsToTry[randomIndex].column;

            if (gameGrid[randomRow][randomColumn].value != 0) {
                // store it in case we must put it back
                const backup = gameGrid[randomRow][randomColumn].value;
                gameGrid[randomRow][randomColumn].value = 0;

                // Check if the puzzle still has a unique solution after removal
                if (hasUniqueSolution(gameGrid)) {
                    console.log(
                        'has unique solution, value removed successfully'
                    );
                } else {
                    console.log(
                        'does not have unique solution, restoring value'
                    );
                    gameGrid[randomRow][randomColumn].value = backup; // Restore the value
                }
            }

            cellsToTry.splice(randomIndex, 1);
        }

        const remainingCells = gameGrid.flat().filter((item) => item.value > 0).length;
        if (remainingCells > max) {
            console.log(`${remainingCells} remaining, max was ${max}, trying again...`);
            return createGameGrid(grid, difficulty);
        }
        return gameGrid;
    };

    const generateGameBoard = (difficulty: Difficulty): GameBoard => {
        const grid = initEmptyGrid();

        solveGrid(grid);
        // GridUtilities.printGrid(grid, cell => cell.value.toString());

        const gameGrid = createGameGrid(grid, difficulty);
        // GridUtilities.printGrid(gameGrid, cell => cell.value.toString());

        return {
            difficulty,
            gameGrid,
            solvedGrid: grid,
        };
    };

    return {
        generateGameBoard,
    };
};
