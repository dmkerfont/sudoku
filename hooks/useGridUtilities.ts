import { Cell } from "@/types/Cell";

export interface GridUtilities {
    getRowCells: <T>(grid: T[][], row: number) => T[];
    getColumnCells: <T>(grid: T[][], column: number) => T[];
    getBoxCells: <T>(grid: T[][], box: number) => T[];
    getBoxNumber: (rowNumber: number, columnNumber: number) => number;
    updateGridCell: <T>(grid: T[][], row: number, column: number, state: T) => T[][];
    updateManyCells: <T extends Cell>(grid: T[][], cells: T[], predicate: (start: T) => T ) => T[][];
}

export const useGridUtilities = (): GridUtilities => {
    const getRowCells = <T>(grid: T[][], row: number): T[] => {
        return grid[row];
    };

    const getColumnCells = <T>(grid: T[][], column: number): T[] => {
        const cells: T[] = [];

        for(let r = 0; r < 9; r++){
            cells.push(grid[r][column]);
        }

        return cells;
    }    

    const getBoxCells = <T>(grid: T[][], boxNumber: number): T[] => {
        let columnStart: number = 0;
        let rowStart: number = 0;

        if ([0,1,2].includes(boxNumber)) {
            rowStart = 0;
        }
        if ([3,4,5].includes(boxNumber)) {
            rowStart = 3;
        }
        if ([6,7,8].includes(boxNumber)) {
            rowStart = 6;
        }

        if ([0,3,6].includes(boxNumber)) {
            columnStart = 0;
        }
        if ([1,4,7].includes(boxNumber)) {
            columnStart = 3;
        }
        if ([2,5,8].includes(boxNumber)) {
            columnStart = 6;
        }

        const cells: T[]= [];
        for(let r = rowStart; r < rowStart + 3; r++){
            for(let c = columnStart; c < columnStart + 3; c++){
                cells.push(grid[r][c]);
            }
        }

        return cells;
    }

    const getBoxNumber = (rowNumber: number, columnNumber: number): number => {
        const boxNumber = Math.floor(rowNumber / 3) * 3 + Math.floor(columnNumber / 3);
        return boxNumber;
    }

    const updateGridCell = <T>(grid: T[][], row: number, column: number, state: T): T[][] => {
        const newGrid = grid.map(row => [...row]);
        newGrid[row][column] = state;
        return newGrid;
    }

    const updateManyCells = <T extends Cell>(grid: T[][], cells: T[], update: (cell: T) => T): T[][] => {
        const newGrid = grid.map(row => {
            const newRow = row.map(cell => ({...cell}));
            return newRow;
        });

        for(let cell of cells){     
            newGrid[cell.row][cell.column] = update(cell);
        }

        return newGrid;
    }

    return {
        getBoxCells,
        getBoxNumber,
        getColumnCells,
        getRowCells,
        updateGridCell,

        updateManyCells
    }
}

