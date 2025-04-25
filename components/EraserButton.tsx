import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
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
    style?: StyleProp<ViewStyle>;
}

export const EraserButton: React.FC<EraserButtonProps> = ({
    onEraserToggle,
    isSelected,
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
                isSelected ? styles.selected : undefined,
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
    selected: {
        backgroundColor: '#B9FCFF',
    },
});
