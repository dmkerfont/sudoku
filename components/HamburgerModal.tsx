import {
    Modal,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Pressable,
} from 'react-native';

export interface HamburgerModalProps {
    isVisible: boolean;
    onValidateBoard: VoidFunction;
    onResetGame: VoidFunction;
    onNewGame: VoidFunction;
    onShowSettings: VoidFunction;
    onRequestClose: VoidFunction;
}

export const HamburgerModal: React.FC<HamburgerModalProps> = ({
    isVisible,
    onValidateBoard,
    onResetGame,
    onNewGame,
    onShowSettings,
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
                    <Pressable onPress={onValidateBoard}>
                        <Text style={styles.modalButton}>Validate</Text>
                    </Pressable>

                    <Pressable onPress={onResetGame}>
                        <Text style={styles.modalButton}>Reset</Text>
                    </Pressable>

                    <Pressable onPress={onNewGame}>
                        <Text style={styles.modalButton}>New Game</Text>
                    </Pressable>

                    <Pressable onPress={onShowSettings}>
                        <Text style={styles.modalButton}>Settings</Text>
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
    modalButton: {
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
});
