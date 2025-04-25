import { Difficulty } from '@/hooks/useGenerateBoard';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface NewGameModalProps {
    isVisible: boolean;
    onNewGameSelected: (difficulty: Difficulty) => void;
    onRequestClose: VoidFunction;
}

export const NewGameModal: React.FC<NewGameModalProps> = ({
    onNewGameSelected,
    isVisible,
    onRequestClose,
}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={isVisible}
            animationType="fade"
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onRequestClose}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select Difficulty</Text>
                    <Pressable
                        onPress={() => onNewGameSelected(Difficulty.Easy)}
                    >
                        <Text
                            selectable={false}
                            style={styles.difficultyButton}
                        >
                            Easy
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onNewGameSelected(Difficulty.Medium)}
                    >
                        <Text
                            selectable={false}
                            style={styles.difficultyButton}
                        >
                            Medium
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onNewGameSelected(Difficulty.Hard)}
                    >
                        <Text
                            selectable={false}
                            style={styles.difficultyButton}
                        >
                            Hard
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onNewGameSelected(Difficulty.Extreme)}
                    >
                        <Text
                            selectable={false}
                            style={styles.difficultyButton}
                        >
                            Extreme
                        </Text>
                    </Pressable>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        maxWidth: 600,
        width: '90%',
    },
    difficultyButton: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        textAlign: 'center',
        marginVertical: 4,
    },
    modalTitle: {
        fontSize: 24,
        paddingBottom: 16,
        fontWeight: 'semibold',
        alignSelf: 'center',
    },
});
