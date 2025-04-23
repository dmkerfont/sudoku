import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { GameBoard } from '@/components/GameBoard';
import { useGameState } from '@/hooks/useGameState';
import { BoardSizeContextProvider } from '@/hooks/context/BoardSizeContext';
import { ButtonsContainer } from '@/components/ButtonsContainer';
import { WinnerModal } from '@/components/WinnerModal';
import { NewGameModal } from '@/components/NewGameModal';
import { Difficulty } from '@/hooks/useGenerateBoard';
import { useNavigation } from 'expo-router';

export default function App() {
    const navigation = useNavigation();

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const gameState = useGameState();

    const { width } = useWindowDimensions();
    const isMobileLayout = width < 768;

    const onNewGameSelected = (difficulty: Difficulty) => {
        gameState.initializeGame(difficulty);
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: gameState.difficulty.toString() });
    }, [navigation, gameState.difficulty]);

    if (gameState.isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    const renderBottomSheet = () => (
        <Modal
            visible={bottomSheetVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setBottomSheetVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setBottomSheetVisible(false)}
            >
                <View style={styles.bottomSheetContainer}>
                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            gameState.validateBoard();
                            setBottomSheetVisible(false);
                        }}
                    >
                        <Text>Validate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            gameState.resetGame();
                            setBottomSheetVisible(false);
                        }}
                    >
                        <Text>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            setBottomSheetVisible(false);
                            gameState.setShowNewGame(true);
                        }}
                    >
                        <Text>New Game</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <BoardSizeContextProvider>
            <View
                style={[
                    styles.container,
                    isMobileLayout
                        ? { flexDirection: 'column', justifyContent: 'center' }
                        : {
                              alignSelf: 'center',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              maxWidth: 800,
                          },
                ]}
            >
                {renderBottomSheet()}

                <GameBoard
                    gameState={gameState}
                    isMobileLayout={isMobileLayout}
                />

                <View style={{ margin: 16 }} />

                <ButtonsContainer
                    gameState={gameState}
                    isMobileLayout={isMobileLayout}
                    onMenuButtonPressed={() => setBottomSheetVisible(true)}
                />

                <WinnerModal
                    show={gameState.showWinner}
                    onNewGamePress={() => gameState.setShowNewGame(true)}
                />

                <NewGameModal
                    show={gameState.showNewGame}
                    onNewGameSelected={onNewGameSelected}
                    onRequestDismiss={() => gameState.setShowNewGame(false)}
                />
            </View>
        </BoardSizeContextProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        maxWidth: 600,
        width: '90%',
    },
    bottomSheetButton: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 8,
        alignItems: 'center',
    },
});
