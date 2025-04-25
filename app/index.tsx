import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import { GameBoard } from '@/components/GameBoard';
import { useGameState } from '@/hooks/useGameState';
import { BoardSizeContextProvider } from '@/hooks/context/BoardSizeContext';
import { ButtonsContainer } from '@/components/ButtonsContainer';
import { WinnerModal } from '@/components/WinnerModal';
import { NewGameModal } from '@/components/NewGameModal';
import { useNavigation } from 'expo-router';
import { HamburgerModal } from '@/components/HamburgerModal';
import { Modals } from '@/types/Modals';
import { SettingsModal } from '@/components/SettingsModal';
import { HightlightColors } from '@/types/HighlightColors';
import { PenColors } from '@/types/PenColors';

export default function App() {
    const navigation = useNavigation();

    const gameState = useGameState();
    const [currentModal, setCurrentModal] = useState<Modals | null>(null);

    useEffect(() => {
        if (gameState.showWinner && currentModal !== Modals.Winner) {
            setCurrentModal(Modals.Winner);
        }
    }, [gameState.showWinner]);

    const { width } = useWindowDimensions();
    const isMobileLayout = width < 768;

    useLayoutEffect(() => {
        navigation.setOptions({ title: gameState.difficulty.toString() });
    }, [navigation, gameState.difficulty]);

    useEffect(() => {
        if (!gameState.isLoading) {
            setCurrentModal(Modals.NewGame);
        }
    }, [gameState.isLoading]);

    if (gameState.isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        );
    }

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
                <GameBoard
                    gameState={gameState}
                    isMobileLayout={isMobileLayout}
                />

                <View style={{ margin: 16 }} />

                <ButtonsContainer
                    gameState={gameState}
                    isMobileLayout={isMobileLayout}
                    onMenuButtonPressed={() => setCurrentModal(Modals.Menu)}
                />

                <WinnerModal
                    isVisible={currentModal === Modals.Winner}
                    onNewGamePress={() => setCurrentModal(Modals.NewGame)}
                    onRequestClose={() => setCurrentModal(null)}
                />

                <NewGameModal
                    isVisible={currentModal === Modals.NewGame}
                    onNewGameSelected={difficulty => {
                        setCurrentModal(null);
                        gameState.initializeGame(difficulty);
                    }}
                    onRequestClose={() => setCurrentModal(null)}
                />

                <SettingsModal
                    isVisible={currentModal === Modals.Settings}
                    penColor={gameState.penColor}
                    highlightColor={gameState.highlightColor}
                    setPenColor={gameState.setPenColor}
                    setHighlightColor={gameState.setHighlightColor}
                    onRequestClose={() => setCurrentModal(null)}
                />

                <HamburgerModal
                    isVisible={currentModal === Modals.Menu}
                    onNewGame={() => setCurrentModal(Modals.NewGame)}
                    onResetGame={() => {
                        gameState.resetGame();
                        setCurrentModal(null);
                    }}
                    onValidateBoard={() => {
                        gameState.validateBoard();
                        setCurrentModal(null);
                    }}
                    onShowSettings={() => setCurrentModal(Modals.Settings)}
                    onRequestClose={() => setCurrentModal(null)}
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
});
