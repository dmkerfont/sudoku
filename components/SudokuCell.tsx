import { UseDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { CellState } from '@/types/CellState';
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
    isBold: boolean;
}

export const SudokuCell = (props: SudokuCellProps) => {
    const { value, showError } = props.state;
    const onPress = () => props.onPress(props.state);

    const containerStyle: StyleProp<ViewStyle> = [styles.sudokuCell];
    props.showHighlight && containerStyle.push(styles.highLight);
    showError && containerStyle.push(styles.errorBorder);

    const { onCellLayoutEvent, cellFontSizes } = UseDynamicFontSizes();

    if (value) {
        return (
            <Pressable
                onPress={onPress}
                style={containerStyle}
                onLayout={onCellLayoutEvent}
            >
                <Text
                    selectable={false}
                    style={[
                        cellFontSizes.cellFontLarge,
                        props.isBold ? styles.bold : undefined,
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
            <View style={styles.pencilMarkContainer} key={i}>
                <Text
                    selectable={false}
                    style={cellFontSizes.cellPencilMarkFont}
                >
                    {props.state.pencilMarks?.includes(i) ? i : undefined}
                </Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={containerStyle}
            onLayout={onCellLayoutEvent}
        >
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
    highLight: {
        backgroundColor: '#99e6ff',
    },
    bold: {
        fontWeight: '600',
    },
});
