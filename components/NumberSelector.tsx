import { useMemo } from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle, Pressable } from "react-native";

export interface NumberSelectorProps {
    onNumberSelect: (num: number) => void;
    selectedNumber: number | null;
    style?: StyleProp<ViewStyle>;
};

export const NumberSelector = (props: NumberSelectorProps) => {
    const buttonComponents: JSX.Element[] = [] = useMemo(() => {
        const buttons = [];
        for(let i = 1; i <= 9; i++){
            buttons.push(
                <Pressable 
                    onPress={() => props.onNumberSelect(i)} 
                    style={[styles.numberButton, props.selectedNumber === i ? styles.selected : undefined]} 
                    key={i}
                >
                    <Text selectable={false} style={styles.numberText}>{i}</Text>
                </Pressable>
            );
        }
        return buttons;
    }, [props.selectedNumber]);

    return (
        <View style={[styles.numbersContainer, props.style]}>
            {buttonComponents}
        </View>
    );
};

const styles = StyleSheet.create({
    numbersContainer: {        
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'column',
        height: '100%'
    },
    numberButton: {
        borderWidth: 1,
        backgroundColor: 'F5F5F5',
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        height: `${100/9}%`
    },
    selected: {
        borderWidth: 2,
        borderColor: 'blue',
        backgroundColor: '#99e6ff'
    },
    numberText: {
        fontSize: 36,
        lineHeight: 36,
        fontWeight: 'semibold'
    }
});