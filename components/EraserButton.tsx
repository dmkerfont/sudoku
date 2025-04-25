import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { HightlightColors } from '@/types/HighlightColors';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Icon } from 'react-native-paper';

export interface EraserButtonProps {
    onEraserToggle: VoidFunction;
    isSelected: boolean;
    highlightColor: HightlightColors;
    style?: StyleProp<ViewStyle>;
}

export const EraserButton: React.FC<EraserButtonProps> = ({
    onEraserToggle,
    isSelected,
    highlightColor,
    style,
}) => {
    const { cellFontStyles } = useDynamicFontSizes();

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onEraserToggle}
            style={[
                styles.button,
                style,
                isSelected ? { backgroundColor: highlightColor } : undefined,
            ]}
        >
            <Icon
                source={'eraser'}
                size={
                    (isSelected
                        ? cellFontStyles.numberSelectorFont.fontSize
                        : cellFontStyles.cellFontLarge.fontSize) || 36
                }
                color={isSelected ? '#FF69B4' : '#808080'}
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
});
