import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { SudokuBox } from './SudokuBox';
import { NumberSelector } from './NumberSelector';
import { EraserButton } from './EraserButton';
import { PencilMarkButton } from './PencilMarkButton';
import { GameState } from '@/hooks/useGameState';
import { useCellSizeContext } from '@/hooks/context/CellSizeContext';

export interface GameBoardProps {
    gameState: GameState;
}

export const GameBoard = (props: GameBoardProps) => {
    const { gameState } = props;

    // Track the computed size of each sudoku cell on the game board
    const { setCellSize } = useCellSizeContext();
    const onBoardLayoutEvent = (event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        console.log(
            `height: ${height}, width: ${width}, cellHeight: ${height / 9}, cellWidth: ${width / 9}`
        );
        setCellSize(Math.floor(height / 9));
    };

    return (
        <View style={{ flexDirection: 'row', height: '80%' }}>
            <View style={styles.gameBoard} onLayout={onBoardLayoutEvent}>
                <SudokuBox boxNumber={0} gameState={gameState} />
                <SudokuBox boxNumber={1} gameState={gameState} />
                <SudokuBox boxNumber={2} gameState={gameState} />
                <SudokuBox boxNumber={3} gameState={gameState} />
                <SudokuBox boxNumber={4} gameState={gameState} />
                <SudokuBox boxNumber={5} gameState={gameState} />
                <SudokuBox boxNumber={6} gameState={gameState} />
                <SudokuBox boxNumber={7} gameState={gameState} />
                <SudokuBox boxNumber={8} gameState={gameState} />
            </View>

            <NumberSelector
                onNumberSelect={gameState.selectNumber}
                selectedNumber={gameState.selectedNumber}
                getSelectedNumberCount={gameState.getSelectedNumberCount}
                style={styles.marginLeft16}
            />

            <View style={[styles.column, styles.marginLeft16]}>
                <EraserButton
                    onEraserToggle={gameState.toggleEraser}
                    isSelected={gameState.isEraserEnabled}
                />
                <PencilMarkButton
                    onPencilMarkToggle={gameState.togglePencilMarks}
                    isSelected={gameState.pencilMarksEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameBoard: {
        aspectRatio: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',

        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 4,
    },
    marginLeft16: {
        marginLeft: 16,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});
