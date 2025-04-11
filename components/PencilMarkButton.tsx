import { Pressable, StyleSheet } from "react-native";
import { Icon } from 'react-native-paper';

export interface PencilMarkButtonProps {
    onPencilMarkToggle: VoidFunction;
    isSelected: boolean;
}

export const PencilMarkButton: React.FC<PencilMarkButtonProps> = ({onPencilMarkToggle, isSelected}) => {
    return (
        <Pressable onPress={onPencilMarkToggle} style={[styles.button, isSelected ? styles.selected : undefined]}>
            <Icon source={'pencil-outline'} size={36} color={'#F2C464'}/>
        </Pressable>
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