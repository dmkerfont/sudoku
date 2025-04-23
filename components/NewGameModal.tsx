import { Difficulty } from '@/hooks/useGenerateBoard';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface NewGameModalProps {
    isVisible: boolean;
    onNewGameSelected: (difficulty: Difficulty) => void;
    onRequestDismiss: VoidFunction;
}

export const NewGameModal: React.FC<NewGameModalProps> = ({
    onNewGameSelected,
    isVisible,
    onRequestDismiss,
}) => {
    return (
        <>
            <TouchableOpacity
                onPress={onRequestDismiss}
                style={[
                    styles.backdrop,
                    { display: isVisible ? 'flex' : 'none' },
                ]}
            ></TouchableOpacity>
            <View
                style={[
                    styles.content,
                    { display: isVisible ? 'flex' : 'none' },
                ]}
            >
                <Text style={styles.largeFont}>Select Difficulty</Text>

                <Pressable onPress={() => onNewGameSelected(Difficulty.Easy)}>
                    <Text selectable={false} style={styles.difficultyButton}>
                        Easy
                    </Text>
                </Pressable>

                <Pressable onPress={() => onNewGameSelected(Difficulty.Medium)}>
                    <Text selectable={false} style={styles.difficultyButton}>
                        Medium
                    </Text>
                </Pressable>

                <Pressable onPress={() => onNewGameSelected(Difficulty.Hard)}>
                    <Text selectable={false} style={styles.difficultyButton}>
                        Hard
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => onNewGameSelected(Difficulty.Extreme)}
                >
                    <Text selectable={false} style={styles.difficultyButton}>
                        Extreme
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
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'center',
        padding: 16,
    },
    largeFont: {
        fontSize: 24,
        paddingBottom: 16,
        fontWeight: 'semibold',
    },
    mediumFont: {
        fontSize: 16,
        paddingBottom: 24,
    },
    difficultyButton: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        flex: 1,
        textAlign: 'center',
        marginVertical: 4,
    },
});
