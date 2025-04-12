import { useMemo } from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle, Pressable } from "react-native";

export interface NumberSelectorProps {
    onNumberSelect: (num: number) => void;
    getSelectedNumberCount: (selectedNumber: number) => number;
    selectedNumber: number | null;
    style?: StyleProp<ViewStyle>;
};

export const NumberSelector = (props: NumberSelectorProps) => {
    const buttons: JSX.Element[] = [];
    for(let i = 1; i <= 9; i++){
        const totalCount = props.getSelectedNumberCount(i);

        const buttonStyles: StyleProp<ViewStyle> = [styles.numberButton];
        totalCount === 9 && buttonStyles.push(styles.disabled);
        props.selectedNumber === i && buttonStyles.push(styles.selected);

        buttons.push(            
            <Pressable 
                onPress={() => props.onNumberSelect(i)} 
                style={buttonStyles} 
                key={i}
            >
                <Text selectable={false} style={styles.numberText}>{i}</Text>
                <Text>{`(${totalCount})`}</Text>
            </Pressable>
        );
    }

    return (
        <View style={[styles.numbersContainer, props.style]}>
            {buttons}
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
        backgroundColor: 'white',
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
    },
    disabled: {
        backgroundColor: 'F5F5F5',
    }
});