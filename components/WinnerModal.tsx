import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface WinnerModalProps {
    show: boolean;
    onNewGamePress: VoidFunction;
}

export const WinnerModal = (props: WinnerModalProps) => {
    return (
        <>
            <View
                style={[
                    styles.backdrop,
                    { display: props.show ? 'flex' : 'none' },
                ]}
            ></View>
            <View
                style={[
                    styles.content,
                    { display: props.show ? 'flex' : 'none' },
                ]}
            >
                <Text style={styles.winningText}>Wow! You Won!</Text>
                <Text style={styles.provokeText}>
                    Bet you can't do it again.
                </Text>

                <Pressable onPress={props.onNewGamePress}>
                    <Text selectable={false} style={styles.newGameButton}>
                        Do It Again
                    </Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'center',
    },
    winningText: {
        fontSize: 24,
        paddingBottom: 16,
        fontWeight: 'semibold',
    },
    provokeText: {
        fontSize: 16,
        paddingBottom: 24,
    },
    newGameButton: {
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
