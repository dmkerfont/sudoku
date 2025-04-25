import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { CellState } from '@/types/CellState';
import { HightlightColors } from '@/types/HighlightColors';
import { PenColors } from '@/types/PenColors';
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
    isInitialCell: boolean;
    showError: boolean;
    highlightColor: HightlightColors;
    penColor: PenColors;
}

export const SudokuCell = (props: SudokuCellProps) => {
    const { value } = props.state;
    const onPress = () => props.onPress(props.state);

    const containerStyle: StyleProp<ViewStyle> = [styles.sudokuCell];
    props.showHighlight &&
        containerStyle.push({ backgroundColor: props.highlightColor });
    props.showError && containerStyle.push(styles.errorBorder);

    const { cellFontStyles } = useDynamicFontSizes();

    if (value) {
        return (
            <Pressable onPress={onPress} style={containerStyle}>
                <Text
                    selectable={false}
                    style={[
                        cellFontStyles.cellFontLarge,
                        props.isInitialCell
                            ? styles.bold
                            : [styles.penMark, { color: props.penColor }],
                    ]}
                >
                    {value}
                </Text>
            </Pressable>
        );
    }

    const pencilMarks = [];
    for (let i = 1; i <= 9; i++) {
        pencilMarks.push(
            <View style={[styles.pencilMarkContainer]} key={i}>
                <Text
                    selectable={false}
                    style={[
                        cellFontStyles.cellPencilMarkFont,
                        styles.pencilMark,
                        { color: props.penColor },
                    ]}
                >
                    {props.state.pencilMarks?.includes(i) ? i : undefined}
                </Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            {pencilMarks}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sudokuCell: {
        flexBasis: '33.33%', // Ensures each block takes up 1/3 of the row
        height: '33.33%', // Makes the blocks square by setting their height to 1/3 of the container
        borderWidth: 1,
        borderColor: '#505050',
        boxSizing: 'border-box', // Ensure padding/border are included in the width/height
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pencilMarkContainer: {
        flexBasis: '33.33%',
        height: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorBorder: {
        borderWidth: 2,
        borderColor: 'red',
    },
    bold: {
        color: '#505050',
        fontWeight: '700',
    },
    penMark: {
        fontWeight: '500',
    },
    pencilMark: {
        fontWeight: '500',
    },
});
