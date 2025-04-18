import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import {
    StyleSheet,
    Text,
    View,
    StyleProp,
    ViewStyle,
    Pressable,
} from 'react-native';

export interface NumberSelectorProps {
    onNumberSelect: (num: number) => void;
    getSelectedNumberCount: (selectedNumber: number) => number;
    selectedNumber: number | null;
    style?: StyleProp<ViewStyle>;
}

export const NumberSelector = (props: NumberSelectorProps) => {
    const { cellFontStyles } = useDynamicFontSizes();

    const buttons: JSX.Element[] = [];
    for (let i = 1; i <= 9; i++) {
        const totalCount = props.getSelectedNumberCount(i);
        const isSelected = props.selectedNumber === i;

        const buttonStyles: StyleProp<ViewStyle> = [
            styles.numberButton,
            totalCount === 9 ? styles.disabled : undefined,
        ];

        buttons.push(
            <Pressable
                onPress={() => props.onNumberSelect(i)}
                style={buttonStyles}
                key={i}
            >
                <Text
                    selectable={false}
                    style={[
                        cellFontStyles.cellFontMedium,
                        isSelected
                            ? [
                                  styles.selectedText,
                                  cellFontStyles.cellFontLarge,
                              ]
                            : undefined,
                    ]}
                >
                    {i}
                </Text>
                <Text
                    style={cellFontStyles.cellPencilMarkFont}
                    selectable={false}
                >{`(${totalCount})`}</Text>
            </Pressable>
        );
    }

    return (
        <View style={[styles.numbersContainer, props.style]}>{buttons}</View>
    );
};

const styles = StyleSheet.create({
    numbersContainer: {
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'column',
        height: '100%',
    },
    numberButton: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        height: `${100 / 9}%`,
    },
    selectedText: {
        fontWeight: '600',
    },
    selected: {
        backgroundColor: '#99e6ff',
    },
    disabled: {
        backgroundColor: '#D3D3D3',
    },
});
