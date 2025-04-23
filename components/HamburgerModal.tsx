import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export interface HamburgerModalProps {
    isVisible: boolean;
    onValidateBoard: VoidFunction;
    onResetGame: VoidFunction;
    onNewGame: VoidFunction;
    onRequestClose: VoidFunction;
}

export const HamburgerModal: React.FC<HamburgerModalProps> = ({
    isVisible,
    onValidateBoard,
    onResetGame,
    onNewGame,
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
                <View style={styles.bottomSheetContainer}>
                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            onValidateBoard();
                        }}
                    >
                        <Text>Validate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            onResetGame();
                        }}
                    >
                        <Text>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.bottomSheetButton}
                        onPress={() => {
                            onNewGame();
                        }}
                    >
                        <Text>New Game</Text>
                    </TouchableOpacity>
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
