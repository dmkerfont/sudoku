import { StyleSheet, View } from 'react-native';
import { SudokuCell } from './SudokuCell';
import { GameState } from '@/hooks/useGameState';

export interface SudokuBoxProps {
    gameState: GameState;
    boxNumber: number;
}

export const SudokuBox = (props: SudokuBoxProps) => {
    const { boxNumber, gameState } = props;

    const cells = gameState.getBoxCells(boxNumber).map((cell, index) => {
        return (
            <SudokuCell
                onPress={gameState.onCellPress}
                state={cell}
                key={index}
                showHighlight={gameState.shouldHighlight(cell)}
                isBold={gameState.isInitialCell(cell.row, cell.column)}
            />
        );
    });

    return <View style={styles.sudokuBox}>{cells}</View>;
};

const styles = StyleSheet.create({
    sudokuBox: {
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexBasis: '33.33%', // Ensures each block takes up 1/3 of the row
        height: '33.33%', // Makes the blocks square by setting their height to 1/3 of the container
        borderWidth: 1,
        boxSizing: 'border-box', // Ensure padding/border are included in the width/height
    },
});
