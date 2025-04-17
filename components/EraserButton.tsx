import { UseDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

export interface EraserButtonProps {
    onEraserToggle: VoidFunction;
    isSelected: boolean;
}

export const EraserButton: React.FC<EraserButtonProps> = ({
    onEraserToggle,
    isSelected,
}) => {
    const { cellFontSizes, onCellLayoutEvent } = UseDynamicFontSizes();

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onEraserToggle}
            style={[styles.button, isSelected ? styles.selected : undefined]}
            onLayout={onCellLayoutEvent}
        >
            <Icon
                source={'eraser'}
                size={cellFontSizes.cellFontLarge.fontSize || 36}
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
        aspectRatio: 1,
        height: `${100 / 9}%`,
    },
    selected: {
        backgroundColor: '#99e6ff',
    },
});
