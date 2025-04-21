import React, { useState } from 'react';
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

export default function App() {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const gameState = useGameState();

    const { width } = useWindowDimensions();
    const isMobileLayout = width < 768;

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
            animationType="slide"
            onRequestClose={() => setBottomSheetVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setBottomSheetVisible(false)}
            >
                <View style={styles.bottomSheetContainer}>
                    {['Button1', 'Button2', 'Button3'].map(label => (
                        <TouchableOpacity
                            key={label}
                            style={styles.bottomSheetButton}
                            onPress={() => {
                                console.log(`${label} pressed`);
                                setBottomSheetVisible(false);
                            }}
                        >
                            <Text>{label}</Text>
                        </TouchableOpacity>
                    ))}
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
                        ? { flexDirection: 'column' }
                        : {
                              alignSelf: 'center',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              maxWidth: 1200,
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
        justifyContent: 'flex-end',
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    bottomSheetButton: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 8,
        alignItems: 'center',
    },
});
