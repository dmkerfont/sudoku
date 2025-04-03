
export interface GridUtilities {
    getRowCells: <T>(grid: T[][], row: number) => T[];
    getColumnCells: <T>(grid: T[][], column: number) => T[];
    getBlockCells: <T>(grid: T[][], blockNumber: number) => T[];
    getBlockNumber: (rowNumber: number, columnNumber: number) => number;
    updateGridCell: <T>(grid: T[][], row: number, column: number, state: T) => T[][];
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

    const getBlockCells = <T>(grid: T[][], blockNumber: number): T[] => {
        let columnStart: number = 0;
        let rowStart: number = 0;

        if ([0,1,2].includes(blockNumber)) {
            rowStart = 0;
        }
        if ([3,4,5].includes(blockNumber)) {
            rowStart = 3;
        }
        if ([6,7,8].includes(blockNumber)) {
            rowStart = 6;
        }

        if ([0,3,6].includes(blockNumber)) {
            columnStart = 0;
        }
        if ([1,4,7].includes(blockNumber)) {
            columnStart = 3;
        }
        if ([2,5,8].includes(blockNumber)) {
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

    const getBlockNumber = (rowNumber: number, columnNumber: number): number => {
        const blockNumber = Math.floor(rowNumber / 3) * 3 + Math.floor(columnNumber / 3);
        return blockNumber;
    }

    const updateGridCell = <T>(grid: T[][], row: number, column: number, state: T): T[][] => {
        const newGrid = grid.map(row => [...row]);
        newGrid[row][column] = state;
        return newGrid;
    }

    return {
        getBlockCells,
        getBlockNumber,
        getColumnCells,
        getRowCells,
        updateGridCell
    }
}

