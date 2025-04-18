import { GameBoard } from '@/components/GameBoard';
import { WinnerModal } from '@/components/WinnerModal';
import { CellSizeContextProvider } from '@/hooks/context/CellSizeContext';
import { useGameState } from '@/hooks/useGameState';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Index() {
    const gameState = useGameState();

    if (gameState.isLoading) {
        return (
            <View style={styles.pageContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <CellSizeContextProvider>
            <View style={styles.pageContainer}>
                <View style={styles.headerButtonsContainer}>
                    <TouchableOpacity
                        style={styles.flex1}
                        onPress={gameState.initializeGame}
                    >
                        <Text style={styles.headerButton}>New Board</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.flex1}
                        onPress={gameState.resetGame}
                    >
                        <Text style={styles.headerButton}>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.flex1}
                        onPress={gameState.validateBoard}
                    >
                        <Text style={styles.headerButton}>Validate</Text>
                    </TouchableOpacity>
                </View>

                <GameBoard gameState={gameState} />

                <WinnerModal
                    show={gameState.showWinner}
                    onNewGamePress={gameState.initializeGame}
                />
            </View>
        </CellSizeContextProvider>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    flex1: {
        flex: 1,
    },
    headerButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '40%',
    },
    headerButton: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        flex: 1,
        textAlign: 'center',
    },
});
