import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-paper';

export interface PencilMarkButtonProps {
    onPencilMarkToggle: VoidFunction;
    isSelected: boolean;
}

export const PencilMarkButton: React.FC<PencilMarkButtonProps> = ({onPencilMarkToggle, isSelected}) => {

    const pencilMarks = [];
    for (let i = 1; i <= 9; i++){
        pencilMarks.push(
            <View style={styles.pencilMarkContainer} key={i}>
                <Text selectable={false} style={styles.pencilMarkText}>{i}</Text>
            </View>
        );
    }

    if(isSelected){
        return(
            <Pressable onPress={onPencilMarkToggle} style={[styles.button, styles.sudokuCell, styles.selected ]}>
                {pencilMarks}
                <View style={{position: 'absolute'}}>
                    <Icon source={'pencil-outline'} size={36} color={'#F2C464'}/>
                </View>
            </Pressable>
        );
    }
    
    return (
        <Pressable onPress={onPencilMarkToggle} style={[styles.button, styles.sudokuCell, ]}>
            <Icon source={'pencil-outline'} size={36} color={'#808080'}/>
        </Pressable>
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
        height: `${100/9}%`
    },
    selected: {
        backgroundColor: '#99e6ff'
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
    pencilMarkText: {        
        fontSize: 14,
        lineHeight: 14
    },
});