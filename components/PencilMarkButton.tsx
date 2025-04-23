import { useBoardSizeContext } from '@/hooks/context/BoardSizeContext';
import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Icon } from 'react-native-paper';

export interface PencilMarkButtonProps {
    onPencilMarkToggle: VoidFunction;
    isSelected: boolean;
    style?: StyleProp<ViewStyle>;
}

export const PencilMarkButton: React.FC<PencilMarkButtonProps> = ({
    onPencilMarkToggle,
    isSelected,
    style,
}) => {
    const { cellFontStyles } = useDynamicFontSizes();

    const pencilMarks = [];
    for (let i = 1; i <= 9; i++) {
        pencilMarks.push(
            <View style={styles.pencilMarkContainer} key={i}>
                <Text
                    selectable={false}
                    style={cellFontStyles.cellPencilMarkFont}
                >
                    {i}
                </Text>
            </View>
        );
    }

    if (isSelected) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPencilMarkToggle}
                style={[
                    styles.button,
                    style,
                    styles.sudokuCell,
                    styles.selected,
                ]}
            >
                {pencilMarks}
                <View style={{ position: 'absolute' }}>
                    <Icon
                        source={'pencil-outline'}
                        size={cellFontStyles.numberSelectorFont.fontSize || 36}
                        color={'#F2C464'}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPencilMarkToggle}
            style={[styles.button, style, styles.sudokuCell]}
        >
            <Icon
                source={'pencil-outline'}
                size={
                    (isSelected
                        ? cellFontStyles.numberSelectorFont.fontSize
                        : cellFontStyles.cellFontLarge.fontSize) || 36
                }
                color={'#808080'}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        backgroundColor: '#99e6ff',
    },
    sudokuCell: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        boxSizing: 'border-box', // Ensure padding/border are included in the width/height
    },
    pencilMarkContainer: {
        flexBasis: '33.33%',
        height: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
