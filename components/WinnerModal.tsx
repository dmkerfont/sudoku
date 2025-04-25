import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface WinnerModalProps {
    isVisible: boolean;
    onNewGamePress: VoidFunction;
    onRequestClose: VoidFunction;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
    isVisible,
    onNewGamePress,
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
                    <Text style={styles.winningText}>Wow! You Won!</Text>
                    <Text style={styles.provokeText}>
                        Bet you can't do it again.
                    </Text>

                    <Pressable onPress={onNewGamePress}>
                        <Text selectable={false} style={styles.modalButton}>
                            Do It Again
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
    winningText: {
        fontSize: 24,
        paddingBottom: 8,
        fontWeight: 'semibold',
        textAlign: 'center',
    },
    provokeText: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 16,
    },
});
