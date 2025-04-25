import { CellState } from '@/types/CellState';
import { useEffect, useState } from 'react';
import { Alert, Platform, ViewStyle } from 'react-native';
import { useGridUtilities } from './useGridUtilities';
import { Difficulty, useGenerateBoard } from './useGenerateBoard';
import { Cell } from '@/types/Cell';
import { PenColors } from '@/types/PenColors';
import { HightlightColors } from '@/types/HighlightColors';

export interface GameState {
    initializeGame: (difficulty: Difficulty) => void;
    onCellPress: (cell: CellState) => void;
    resetGame: VoidFunction;
    selectNumber: (num: number) => void;
    toggleEraser: VoidFunction;
    togglePencilMarks: VoidFunction;
    validateBoard: VoidFunction;
    getBoxCells: (boxNumber: number) => CellState[];
    shouldHighlight: (cell: CellState) => boolean;
    getSelectedNumberCount: (selectedNumber: number) => number;
    isInitialCell: (row: number, column: number) => boolean;
    setPenColor: (color: PenColors) => void;
    setHighlightColor: (color: HightlightColors) => void;
    showWinner: boolean;
    isEraserEnabled: boolean;
    isLoading: boolean;
    pencilMarksEnabled: boolean;
    selectedNumber: number | null;
    difficulty: Difficulty;
    errorCells: Cell[];
    penColor: PenColors;
    highlightColor: HightlightColors;
}

export const useGameState = (): GameState => {
    // settings
    const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [isEraserEnabled, setEraserEnabled] = useState(false);
    const [pencilMarksEnabled, setPencilMarksEnabled] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
    const [penColor, setPenColor] = useState<PenColors>(PenColors.blue);
    const [highlightColor, setHighlightColor] = useState<HightlightColors>(HightlightColors.skyBlue);

    // game board
    const [solvedGrid, setSolvedGrid] = useState<Cell[][]>([]);
    const [initialGameBoard, setInitialGameBoard] = useState<CellState[][]>([]);
    const [gameBoard, setGameBoard] = useState<CellState[][]>([]);

    // shows invalid cells - until corrected
    const [errorCells, setErrorCells] = useState<Cell[]>([]);
    // for highlighting conflicts upon entry, not necessarily invalid, these errors will be short-lived till next cell press
    const [conflictingCells, setConflictingCells] = useState<Cell[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [showWinner, setShowWinner] = useState(false);

    const GridUtilities = useGridUtilities();
    const { generateGameBoard } = useGenerateBoard();

    useEffect(() => {
        initializeGame(Difficulty.Easy);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setShowWinner(isPuzzleComplete(gameBoard, solvedGrid));
        }
    }, [isLoading, gameBoard, solvedGrid]);

    const initializeGame = (difficulty: Difficulty) => {
        setCurrentDifficulty(difficulty);
        setErrorCells([]);
        setConflictingCells([]);

        const gameBoard = generateGameBoard(difficulty);
        // Source of truth
        setSolvedGrid(gameBoard.solvedGrid);
        setInitialGameBoard(gameBoard.gameGrid);
        const clonedGameGrid = GridUtilities.cloneGrid(gameBoard.gameGrid);
        setGameBoard(clonedGameGrid);
    };

    const validateBoard = () => {
        setConflictingCells([]);
        const errors: Cell[] = [];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                // if not matching the actual value and not 0
                if (
                    gameBoard[r][c].value !== solvedGrid[r][c].value &&
                    gameBoard[r][c].value !== 0
                ) {
                    errors.push({
                        box: gameBoard[r][c].box,
                        column: gameBoard[r][c].column,
                        row: gameBoard[r][c].row,
                        value: gameBoard[r][c].value
                    });
                }
            }
        }

        setErrorCells(errors);

        Platform.select({
            web: () => {
                window.alert(
                    errors.length > 0 ? 'Board contains errors!' : 'Board is valid!'
                );
            },
            default: () => {
                Alert.alert(
                    errors.length > 0 ? 'Board contains errors!' : 'Board is valid!'
                );
            },
        })();
    };

    const updateCell = (state: CellState) => {
        setGameBoard(prevGrid =>
            GridUtilities.updateGridCell(
                prevGrid,
                state.row,
                state.column,
                state
            )
        );
    };

    const onCellPress = (cell: CellState): void => {
        setConflictingCells([]);

        // don't modify these cells
        const isInitialCell = initialGameBoard[cell.row][cell.column].value > 0;
        if (isInitialCell) {
            return;
        }

        if (isEraserEnabled) {
            const update: CellState = {
                ...cell,
                pencilMarks: [],
                value: 0,
            };
            updateCell(update);

            // remove this erased cell from errors list
            setErrorCells((cells) => cells.filter(c => {
                const erasedCell = gameBoard[cell.row][cell.column];
                return erasedCell.row != c.row || erasedCell.column != c.column;
            }))
            return;
        } else if (pencilMarksEnabled && selectedNumber) {
            let pencilMarks = gameBoard[cell.row][cell.column].pencilMarks;

            if (pencilMarks.includes(selectedNumber)) {
                pencilMarks = pencilMarks.filter(num => num !== selectedNumber);
            } else if (cell.value === 0) {
                pencilMarks.push(selectedNumber);
            }

            const update: CellState = {
                ...gameBoard[cell.row][cell.column],
                pencilMarks,
            };
            updateCell(update);
        } else if (selectedNumber) {
            // do nothing if number is already set
            if (cell.value === selectedNumber) {
                return;
            }

            // check row for errors
            const rowCells = GridUtilities.getRowCells(gameBoard, cell.row);
            const rowMatch = rowCells.find(c => c.value === selectedNumber);
            rowMatch && setConflictingCells(conflicts => [...conflicts, { ...rowMatch }]);

            // check column for errors
            const columnCells = GridUtilities.getColumnCells(
                gameBoard,
                cell.column
            );
            const columnMatch = columnCells.find(
                c => c.value === selectedNumber
            );
            columnMatch && setConflictingCells(conflicts => [...conflicts, { ...columnMatch }]);

            // check box for errors
            const boxCells = GridUtilities.getBoxCells(gameBoard, cell.box);
            const boxMatch = boxCells.find(c => c.value === selectedNumber);
            boxMatch && setConflictingCells(conflicts => [...conflicts, { ...boxMatch }]);

            // no errors
            if (!rowMatch && !columnMatch && !boxMatch) {
                const currentValue = gameBoard[cell.row][cell.column].value;
                const update: CellState = {
                    ...gameBoard[cell.row][cell.column],
                    value: currentValue === selectedNumber ? 0 : selectedNumber,
                    pencilMarks: [],
                };
                updateCell(update);
                setGameBoard(board => removeAffectedPencilMarks(update, board));

                // remove this good cell from errors list
                setErrorCells((cells) => cells.filter(c => {
                    const goodCell = gameBoard[cell.row][cell.column];
                    return goodCell.row != c.row || goodCell.column != c.column;
                }))
            }
        }
    };

    const removeAffectedPencilMarks = (
        affectedByCell: CellState,
        grid: CellState[][]
    ): CellState[][] => {
        const boxCells = GridUtilities.getBoxCells(grid, affectedByCell.box);
        const columnCells = GridUtilities.getColumnCells(
            grid,
            affectedByCell.column
        );
        const rowCells = GridUtilities.getRowCells(grid, affectedByCell.row);

        let affectedCells = [...boxCells, ...columnCells, ...rowCells];
        // we can filter out the affectedByCell as its included 3 time here - slight efficiency
        affectedCells = affectedCells.filter(
            c =>
                c.row !== affectedByCell.row ||
                c.column !== affectedByCell.column
        );

        return GridUtilities.updateManyCells(grid, affectedCells, c => {
            c.pencilMarks = c.pencilMarks.filter(
                pm => pm !== affectedByCell.value
            );
            return c;
        });
    };

    const resetGame = (): void => {
        const gridCopy = GridUtilities.cloneGrid(initialGameBoard);
        setErrorCells([]);
        setConflictingCells([]);
        setGameBoard(gridCopy);
    };

    const selectNumber = (num: number) => {
        setSelectedNumber(num);
        setEraserEnabled(false);
    };

    const toggleEraser = () => {
        setEraserEnabled(isEnabled => !isEnabled);
    };

    const shouldHighlight = (cell: CellState): boolean => {
        return (
            selectedNumber === cell.value ||
            cell.pencilMarks.includes(selectedNumber ?? 0)
        );
    };

    const isPuzzleComplete = (board: CellState[][], solution: Cell[][]): boolean => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c].value !== solution[r][c].value) {
                    return false;
                }
            }
        }

        return true;
    };

    const getSelectedNumberCount = (num: number): number => {
        const cells = gameBoard.flatMap(row => row.flatMap(cell => cell));
        return cells.filter(cell => cell.value === num).length;
    };

    return {
        onCellPress,
        initializeGame,
        resetGame,
        selectNumber,
        toggleEraser,
        togglePencilMarks: () => setPencilMarksEnabled(enabled => !enabled),
        validateBoard,
        getBoxCells: (boxNumber: number) =>
            GridUtilities.getBoxCells(gameBoard, boxNumber),
        shouldHighlight,
        getSelectedNumberCount,
        isInitialCell: (row: number, column: number) => initialGameBoard[row][column].value > 0,
        setPenColor,
        setHighlightColor,
        penColor,
        highlightColor,
        errorCells: [...errorCells, ...conflictingCells],
        isEraserEnabled,
        isLoading,
        pencilMarksEnabled,
        selectedNumber,
        difficulty: currentDifficulty,
        showWinner
    };
};
