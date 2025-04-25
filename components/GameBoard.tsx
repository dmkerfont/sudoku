import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { SudokuBox } from './SudokuBox';
import { GameState } from '@/hooks/useGameState';
import { useBoardSizeContext } from '@/hooks/context/BoardSizeContext';

export interface GameBoardProps {
    gameState: GameState;
    isMobileLayout: boolean;
}

export const GameBoard = (props: GameBoardProps) => {
    const { gameState } = props;

    // when the game board lays out, lets capture the size
    const { setBoardSize } = useBoardSizeContext();

    const onBoardLayoutEvent = (event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        console.log(
            `height: ${height}, width: ${width}, cellHeight: ${height / 9}, cellWidth: ${width / 9}`
        );
        setBoardSize(height);
    };

    return (
        <View style={styles.mainViewContainer}>
            <View
                style={[
                    styles.mainAspectBox,
                    {
                        maxWidth: props.isMobileLayout ? 600 : 800,
                    },
                ]}
            >
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
        borderColor: '#505050',
        borderRadius: 4,
    },
    mainViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    mainAspectBox: {
        aspectRatio: 1,
        width: '100%',
        justifyContent: 'center',
    },
});
