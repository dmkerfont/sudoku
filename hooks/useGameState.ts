import { CellState } from "@/types/CellState";
import { useEffect, useState } from "react";
import { Alert, Platform } from 'react-native';
import { useGridUtilities } from "./useGridUtilities";

export interface GameState {
    initializeGame: VoidFunction;
    onCellPress: (cell: CellState) => void;
    resetGame: VoidFunction;
    selectNumber: (num: number) => void;
    selectEraser: VoidFunction;
    togglePencilMarks: VoidFunction;
    validateBoard: VoidFunction;
    getBlockCells: (blockNumber: number) => CellState[];
    shouldHighlight: (cell: CellState) => boolean;
    isEraserEnabled: boolean;
    isLoading: boolean;
    pencilMarksEnabled: boolean;
    selectedNumber: number | null;
};

export const useGameState = (): GameState => {
    const [initialBoard, setInitialBoard] = useState<CellState[][]>([]);
    const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEraserEnabled, setEraserEnabled] = useState(false);
    const [pencilMarksEnabled, setPencilMarksEnabled] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(1);

    const GridUtilities = useGridUtilities();    

    useEffect(() => {
        initializeGame();
        setIsLoading(false);
    }, []);

    const initializeGame = () => {
        const grid: CellState[][] = [];
        // generate 81 values
        for (let r = 0; r < 9; r++){
            // init new row
            grid[r] = [];

            for (let c = 0; c < 9; c++){
                // random number 0-9 for now
                const val = Math.floor(Math.random() * 10);
                const cellState: CellState = {
                    value: val,
                    columnNumber: c,
                    rowNumber: r,
                    boxNumber: GridUtilities.getBlockNumber(r, c),
                    showError: false,
                    pencilMarks: [],
                }
                grid[r][c] = cellState;     
            }
        }

        setInitialBoard(grid);
        const gridCopy = grid.map(row => [...row]);
        setGameBoard(gridCopy);
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
        setGameBoard((prevGrid) => GridUtilities.updateGridCell(prevGrid, state.rowNumber, state.columnNumber, state));
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
        }
        else if(pencilMarksEnabled && selectedNumber && cell.value === 0) {
            let pencilMarks = gameBoard[cell.rowNumber][cell.columnNumber].pencilMarks;

            if(pencilMarks.includes(selectedNumber)){
                pencilMarks = pencilMarks.filter(num => num !== selectedNumber);
            } else {
                pencilMarks.push(selectedNumber);
            }

            const update: CellState = {
                ...gameBoard[cell.rowNumber][cell.columnNumber],
                pencilMarks
            };
            updateCell(update);
        }
        else if(selectedNumber){
            // deselect if the cell matches
            if(cell.value === selectedNumber){
                const update: CellState = {
                    ...gameBoard[cell.rowNumber][cell.columnNumber],
                    showError: false,
                    value: 0
                };
                updateCell(update);
                return;
            }
            
            // check row for errors
            const rowCells = GridUtilities.getRowCells(gameBoard, cell.rowNumber);
            const rowMatch = rowCells.find((c) => c.value === selectedNumber);
            rowMatch && updateCell({
                ...rowMatch,
                showError: true
            });

            // check column for errors
            const columnCells = GridUtilities.getColumnCells(gameBoard, cell.columnNumber);
            const columnMatch = columnCells.find((c) => c.value === selectedNumber);
            columnMatch && updateCell({
                ...columnMatch,
                showError: true
            });

            const boxCells = GridUtilities.getBlockCells(gameBoard, cell.boxNumber);
            const boxMatch = boxCells.find((c) => c.value === selectedNumber);
            boxMatch && updateCell({
                ...boxMatch,
                showError: true
            });

            // no errors
            if(!rowMatch && !columnMatch && !boxMatch){
                // first lets remove any pencil marks from row/col/box
                const boxCells = GridUtilities.getBlockCells(gameBoard, cell.boxNumber);
                const columnCells = GridUtilities.getColumnCells(gameBoard, cell.columnNumber);
                const rowCells = GridUtilities.getRowCells(gameBoard, cell.rowNumber);

                // lets combine all of the cells to be affected
                let cells = [...boxCells, ...columnCells, ...rowCells];
                // exclude the pressed cell
                cells = cells.filter(c => c.rowNumber !== cell.rowNumber && c.columnNumber !== cell.columnNumber);

                setGameBoard((board) => {
                    const newBoard = board.map(row => {
                        const newRow = row.map(c => ({...c, pencilMarks: c.pencilMarks.filter(num => num !== selectedNumber)}));
                        return newRow;
                    })
                    return newBoard;
                });

                // finally, update value of tapped cell.
                const currentValue = gameBoard[cell.rowNumber][cell.columnNumber].value;
                const update: CellState = {
                    ...gameBoard[cell.rowNumber][cell.columnNumber],
                    value: (currentValue === selectedNumber) ? 0 : selectedNumber,
                    pencilMarks: []
                };
                updateCell(update);
            }
        }
    }

    const resetGame = (): void => {
        const gridCopy = initialBoard.map(row => [...row]);
        setGameBoard(gridCopy);
    }

    const selectNumber = (num: number) => {
        setSelectedNumber(num);
        setEraserEnabled(false);
    };

    const selectEraser = () => {
        setSelectedNumber(null);
        setEraserEnabled(true);
    }

    const shouldHighlight = (cell: CellState): boolean => {
        return selectedNumber === cell.value 
            || cell.pencilMarks.includes(selectedNumber ?? 0);
    }
    

    return ({
        initializeGame,
        onCellPress,
        resetGame,
        selectNumber,
        selectEraser,
        togglePencilMarks: () => setPencilMarksEnabled(enabled => !enabled),
        validateBoard,
        getBlockCells: (blockNumber: number) => GridUtilities.getBlockCells(gameBoard, blockNumber),
        shouldHighlight,
        isEraserEnabled,
        isLoading,
        pencilMarksEnabled,
        selectedNumber,
    });
};