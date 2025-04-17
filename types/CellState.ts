import { Cell } from './Cell';

export interface CellState extends Cell {
    pencilMarks: number[];
    showError: boolean;
}
