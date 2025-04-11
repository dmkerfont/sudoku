import { CellState } from "@/types/CellState";
import { useEffect, useState } from "react";
import { Alert, Platform } from 'react-native';
import { useGridUtilities } from "./useGridUtilities";
import { Difficulty, useGenerateBoard } from "./useGenerateBoard";
import { Cell } from "@/types/Cell";

export interface GameState {
    initializeGame: VoidFunction;
    onCellPress: (cell: CellState) => void;
    resetGame: VoidFunction;
    selectNumber: (num: number) => void;
    toggleEraser: VoidFunction;
    togglePencilMarks: VoidFunction;
    validateBoard: VoidFunction;
    getBoxCells: (boxNumber: number) => CellState[];
    shouldHighlight: (cell: CellState) => boolean;
    showWinner: boolean;
    isEraserEnabled: boolean;
    isLoading: boolean;
    pencilMarksEnabled: boolean;
    selectedNumber: number | null;
};

export const useGameState = (): GameState => {
    const [solvedGrid, setSolvedGrid] = useState<Cell[][]>([]);
    const [initialGameBoard, setInitialGameBoard] = useState<CellState[][]>([]);
    const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEraserEnabled, setEraserEnabled] = useState(false);
    const [pencilMarksEnabled, setPencilMarksEnabled] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
    const [showWinner, setShowWinner] = useState(false);

    const GridUtilities = useGridUtilities();
    const { generateGameBoard } = useGenerateBoard();

    useEffect(() => {
        initializeGame();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if(!isLoading && isPuzzleComplete()){
            setShowWinner(true);
        }
    }, [gameBoard]);


    const initializeGame = () => {
        setShowWinner(false);

        const gameBoard = generateGameBoard(Difficulty.Easy);
        // Source of truth
        setSolvedGrid(gameBoard.solvedGrid);
        setInitialGameBoard(gameBoard.gameGrid);
        const clonedGameGrid = GridUtilities.cloneGrid(gameBoard.gameGrid);
        setGameBoard(clonedGameGrid);    
    };

    const validateBoard = () => {
        clearErrors();
        let hasErrors = false;

        // TODO: look for errors and mark error state in corresponding cells

        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                if(gameBoard[r][c].showError){
                    hasErrors = true;
                    break;
                }
            }
            if(hasErrors) break;
        }

        Platform.select({
            web: () => {
                window.alert(hasErrors ? 'Board contains errors!': 'Board is valid!');
            },
            default: () => {
                Alert.alert(hasErrors ? 'Board contains errors!': 'Board is valid!');
            }
        })();
    };

    const clearErrors = () => {
        setGameBoard((board) => {
            const newBoard = board.map(row => {
                const newRow = row.map(item => ({...item, showError: false}));
                return newRow;
            })
            return newBoard;
        });
    };

    const updateCell = (state: CellState) => {
        setGameBoard((prevGrid) => GridUtilities.updateGridCell(prevGrid, state.row, state.column, state));
    }

    const onCellPress = (cell: CellState): void => {
        clearErrors();

        if(isEraserEnabled){
            const update: CellState = {
                ...cell,
                pencilMarks: [],
                showError: false,
                value: 0
            }
            updateCell(update);
            return;
        }
        else if(pencilMarksEnabled && selectedNumber) {
            let pencilMarks = gameBoard[cell.row][cell.column].pencilMarks;

            if(pencilMarks.includes(selectedNumber)){
                pencilMarks = pencilMarks.filter(num => num !== selectedNumber);
            } else if(cell.value === 0) {
                pencilMarks.push(selectedNumber);
            }

            const update: CellState = {
                ...gameBoard[cell.row][cell.column],
                pencilMarks 
            };
            updateCell(update);
        }
        else if(selectedNumber){
            // do nothing if number is already set
            if(cell.value === selectedNumber){
                return;
            }
            
            // check row for errors
            const rowCells = GridUtilities.getRowCells(gameBoard, cell.row);
            const rowMatch = rowCells.find((c) => c.value === selectedNumber);
            rowMatch && updateCell({
                ...rowMatch,
                showError: true
            });

            // check column for errors
            const columnCells = GridUtilities.getColumnCells(gameBoard, cell.column);
            const columnMatch = columnCells.find((c) => c.value === selectedNumber);
            columnMatch && updateCell({
                ...columnMatch,
                showError: true
            });

            // check box for errors
            const boxCells = GridUtilities.getBoxCells(gameBoard, cell.box);
            const boxMatch = boxCells.find((c) => c.value === selectedNumber);
            boxMatch && updateCell({
                ...boxMatch,
                showError: true
            });

            // no errors
            if(!rowMatch && !columnMatch && !boxMatch){                        
                const currentValue = gameBoard[cell.row][cell.column].value;
                const update: CellState = {
                    ...gameBoard[cell.row][cell.column],
                    value: (currentValue === selectedNumber) ? 0 : selectedNumber,
                    pencilMarks: []
                };
                updateCell(update);
                setGameBoard((board => removeAffectedPencilMarks(update, board)));                
            }
        }
    }
    
    const removeAffectedPencilMarks = (affectedByCell: CellState, grid: CellState[][]): CellState[][] => {
        const boxCells = GridUtilities.getBoxCells(grid, affectedByCell.box);
        const columnCells = GridUtilities.getColumnCells(grid, affectedByCell.column);
        const rowCells = GridUtilities.getRowCells(grid, affectedByCell.row);

        let affectedCells = [...boxCells, ...columnCells, ...rowCells];
        // we can filter out the affectedByCell as its included 3 time here - slight efficiency
        affectedCells = affectedCells.filter(c => c.row !== affectedByCell.row || c.column !== affectedByCell.column);

        return GridUtilities.updateManyCells(grid, affectedCells, (c) => {
            c.pencilMarks = c.pencilMarks.filter(pm => pm !== affectedByCell.value)
            return c;
        });
    }

    const resetGame = (): void => {
        const gridCopy = initialGameBoard.map(row => [...row]);
        setGameBoard(gridCopy);
    }

    const selectNumber = (num: number) => {
        setSelectedNumber(num);
        setEraserEnabled(false);
    };

    const toggleEraser = () => {
        setEraserEnabled(isEnabled => !isEnabled);
    }

    const shouldHighlight = (cell: CellState): boolean => {
        return selectedNumber === cell.value 
            || cell.pencilMarks.includes(selectedNumber ?? 0);
    }
    
    const isPuzzleComplete = (): boolean => {
        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                if(gameBoard[r][c].value !== solvedGrid[r][c].value){
                    return false;
                }
            }
        }

        return true;
    }

    return ({
        initializeGame,
        onCellPress,
        resetGame,
        selectNumber,
        toggleEraser,
        togglePencilMarks: () => setPencilMarksEnabled(enabled => !enabled),
        validateBoard,
        getBoxCells: (boxNumber: number) => GridUtilities.getBoxCells(gameBoard, boxNumber),
        shouldHighlight,
        showWinner,
        isEraserEnabled,
        isLoading,
        pencilMarksEnabled,
        selectedNumber,
    });
};