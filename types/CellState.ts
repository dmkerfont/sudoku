export interface CellState {
    columnNumber: number;
    rowNumber: number;
    boxNumber: number;
    pencilMarks: number[];
    showError: boolean;
    value?: number;
}