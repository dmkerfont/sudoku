import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-paper';

export interface EraserButtonProps {
    onEraserToggle: VoidFunction;
    isSelected: boolean;
};

export const EraserButton: React.FC<EraserButtonProps> = ({onEraserToggle, isSelected}) => {
    return (
        <TouchableOpacity onPress={onEraserToggle} style={[styles.button, isSelected ? styles.selected : undefined]}>
            <Icon source={'eraser'} size={24}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
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
});