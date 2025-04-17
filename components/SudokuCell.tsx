import { CellState } from '@/types/CellState';
import { useMemo } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';

export interface SudokuCellProps {
    state: CellState;
    onPress: (cell: CellState) => void;
    showHighlight: boolean;
}

export const SudokuCell = (props: SudokuCellProps) => {
    const { value, showError } = props.state;

    const onPress = () => props.onPress(props.state);

    const style: StyleProp<ViewStyle> = useMemo(() => {
        const result: StyleProp<ViewStyle> = [styles.sudokuCell];
        props.showHighlight && result.push(styles.highLight);
        showError && result.push(styles.errorBorder);

        return result;
    }, [props.showHighlight, showError]);

    if (value) {
        return (
            <Pressable onPress={onPress} style={style}>
                <Text selectable={false} style={styles.valueText}>
                    {value}
                </Text>
            </Pressable>
        );
    }

    const pencilMarks = [];
    for (let i = 1; i <= 9; i++) {
        pencilMarks.push(
            <View style={styles.pencilMarkContainer} key={i}>
                <Text selectable={false} style={styles.pencilMarkText}>
                    {props.state.pencilMarks?.includes(i) ? i : undefined}
                </Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            {pencilMarks}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sudokuCell: {
        flexBasis: '33.33%', // Ensures each block takes up 1/3 of the row
        height: '33.33%', // Makes the blocks square by setting their height to 1/3 of the container
        borderWidth: 1,
        borderColor: 'gray',
        boxSizing: 'border-box', // Ensure padding/border are included in the width/height
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueText: {
        fontSize: 36,
        fontWeight: 'semibold',
    },
    pencilMarkContainer: {
        flexBasis: '33.33%',
        height: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pencilMarkText: {
        fontSize: 14,
        lineHeight: 14,
    },
    errorBorder: {
        borderWidth: 2,
        borderColor: 'red',
    },
    highLight: {
        backgroundColor: '#99e6ff',
    },
});
